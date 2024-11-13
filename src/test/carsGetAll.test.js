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

test.skip('should return all cars', async () => {
  await db('cars').insert([
    { brand: 'Fiat', model: 'Uno', year: 2021, plate: 'ABC-1234' }
  ])

  const response = await request(app).get('/api/v1/cars')

  expect(response.status).toBe(200)
  expect(response.body.data[0]).toHaveProperty('brand', 'Fiat')
})

test('should return an empty array if there are no cars', async () => {
  const response = await request(app).get('/api/v1/cars')

  expect(response.status).toBe(200)
  expect(response.body.data).toEqual([])
  expect(response.body.count).toBe(0)
  expect(response.body.pages).toBe(0)
})
