const request = require('supertest')
const app = require('../app')
const db = require('../config/database')

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('car_items').del()
  await db('cars').del()
})

afterAll(async () => {
  await db.destroy()
})

test.skip('should update car items successfully', async () => {
  await db('cars').insert({
    brand: 'Fiat',
    model: 'Uno',
    year: 2021,
    plate: 'ABC-1234'
  })
  const car = await db('cars').where({ plate: 'ABC-1234' }).first()

  const response = await request(app)
    .put(`/api/v1/cars/${car.id}/items`)
    .send(['Ar Condicionado', 'Trava Eletrica', 'Vidro Elétrico'])

  expect(response.status).toBe(204)
})

test.skip('should return an error if items list is empty', async () => {
  const car = await db('cars').insert(
    {
      brand: 'Fiat',
      model: 'Uno',
      year: 2021,
      plate: 'XYZ-5678'
    },
    ['id']
  )

  const response = await request(app)
    .put(`/api/v1/cars/${car[0]}/items`)
    .send([])

  expect(response.status).toBe(400)
  expect(response.body.errors).toContain('Items is required')
})

test('should return an error if items list contains duplicates', async () => {
  const car = await db('cars').insert(
    {
      brand: 'Fiat',
      model: 'Uno',
      year: 2020,
      plate: 'DEF-4567'
    },
    ['id']
  )

  const response = await request(app)
    .put(`/api/v1/cars/${car[0].id}/items`)
    .send(['Ar condicionado', 'Trava Elétrico', 'Ar condicionado'])

  expect(response.status).toBe(400)
  expect(response.body.errors).toContain('items cannot be repeated')
})

test('should return an error if car is not found', async () => {
  const response = await request(app)
    .put('/api/v1/cars/9999/items')
    .send(['Ar condicionado', 'Trava Elétrico', 'Vidro Elétrico'])

  expect(response.status).toBe(404)
  expect(response.body.errors).toContain('car not found')
})
