import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'

// Имитация localStorage для тестов Node.js
const storage = new Map()

Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: {
    getItem: (key) => storage.get(key) ?? null,

    setItem: (key, value) => {
      storage.set(key, String(value))
    },

    removeItem: (key) => {
      storage.delete(key)
    },

    clear: () => {
      storage.clear()
    },
  },
})

// Загружаем Zustand только после создания localStorage
const {
  useCartStore,
  selectCartTotal,
  selectCanCheckout,
} = await import('./useCartStore.ts')

const tshirt = {
  id: 'tshirt-01',
  name: 'ODD T-Shirt',
  price: 1500,
  images: [],
  sizes: ['M', 'L'],
}

beforeEach(() => {
  useCartStore.getState().clearCart()
})

test('Добавление товара в корзину', () => {
  useCartStore.getState().addItem(tshirt, 'M')

  const items = useCartStore.getState().items

  assert.equal(items.length, 1)
  assert.equal(items[0].quantity, 1)
})

test('Повторное добавление увеличивает количество', () => {
  useCartStore.getState().addItem(tshirt, 'M')
  useCartStore.getState().addItem(tshirt, 'M', 2)

  assert.equal(useCartStore.getState().items[0].quantity, 3)
})

test('Разные размеры — отдельные позиции', () => {
  useCartStore.getState().addItem(tshirt, 'M')
  useCartStore.getState().addItem(tshirt, 'L')

  assert.equal(useCartStore.getState().items.length, 2)
})

test('Товар PRICE TBC нельзя добавить', () => {
  const unknownPrice = { ...tshirt, price: null }

  useCartStore.getState().addItem(unknownPrice, 'M')

  assert.equal(useCartStore.getState().items.length, 0)
})

test('Итоговая стоимость рассчитывается правильно', () => {
  useCartStore.getState().addItem(tshirt, 'M', 2)

  assert.equal(selectCartTotal(useCartStore.getState()), 3000)
})

test('Оформление пустой корзины запрещено', () => {
  assert.equal(selectCanCheckout(useCartStore.getState()), false)
})

test('После добавления товара оформление разрешено', () => {
  useCartStore.getState().addItem(tshirt, 'M')

  assert.equal(selectCanCheckout(useCartStore.getState()), true)
})

test('Удаление товара и очистка корзины', () => {
  useCartStore.getState().addItem(tshirt, 'M')
  useCartStore.getState().addItem(tshirt, 'L')

  useCartStore.getState().removeItem('tshirt-01', 'M')

  assert.equal(useCartStore.getState().items.length, 1)
  assert.equal(useCartStore.getState().items[0].size, 'L')

  useCartStore.getState().clearCart()

  assert.equal(useCartStore.getState().items.length, 0)
})

test('Изменение количества товара', () => {
  useCartStore.getState().addItem(tshirt, 'M', 2)
  useCartStore.getState().updateQuantity('tshirt-01', 5, 'M')

  assert.equal(useCartStore.getState().items[0].quantity, 5)
})

test('Нельзя добавить отрицательное количество', () => {
  useCartStore.getState().addItem(tshirt, 'M', -2)

  assert.equal(useCartStore.getState().items.length, 0)
})

test('Нельзя добавить товар без выбора размера', () => {
  useCartStore.getState().addItem(tshirt)

  assert.equal(useCartStore.getState().items.length, 0)
})

test('Оформление запрещено при устаревшей цене PRICE TBC', () => {
  const unknownPrice = { ...tshirt, price: null }

  useCartStore.setState({
    items: [{ product: unknownPrice, size: 'M', quantity: 1 }],
  })

  assert.equal(selectCanCheckout(useCartStore.getState()), false)
})

test('Persist сохраняет товары в localStorage', () => {
  useCartStore.getState().addItem(tshirt, 'M', 2)

  const saved = JSON.parse(
    globalThis.localStorage.getItem('odd-cart-v1')
  )

  assert.equal(saved.state.items.length, 1)
  assert.equal(saved.state.items[0].quantity, 2)
  assert.equal(saved.state.items[0].product.id, 'tshirt-01')
})

test('Persist восстанавливает корзину из localStorage', async () => {
  const savedCart = {
    state: {
      items: [
        {
          product: tshirt,
          size: 'L',
          quantity: 2,
        },
      ],
    },
    version: 0,
  }

  // Сначала очищаем текущее состояние
  useCartStore.getState().clearCart()

  // Имитируем данные, оставшиеся после прошлого посещения
  globalThis.localStorage.setItem(
    'odd-cart-v1',
    JSON.stringify(savedCart)
  )

  // Запускаем восстановление
  await useCartStore.persist.rehydrate()

  const items = useCartStore.getState().items

  assert.equal(items.length, 1)
  assert.equal(items[0].product.id, 'tshirt-01')
  assert.equal(items[0].size, 'L')
  assert.equal(items[0].quantity, 2)
})