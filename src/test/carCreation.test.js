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

test('should create a new car', async () => {
  const response = await request(app).post('/api/v1/cars').send({
    brand: 'Fiat',
    model: 'Uno',
    year: 2021,
    plate: 'ABC-1D23'
  })

  expect(response.status).toBe(201)
  expect(response.body).toHaveProperty('id')
  expect(response.body.brand).toBe('Fiat')
  expect(response.body.model).toBe('Uno')
})
