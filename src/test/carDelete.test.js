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

test('should delete a car successfully', async () => {
  const [carId] = await db('cars')
    .insert({
      brand: 'Toyota',
      model: 'Corolla',
      year: 2021,
      plate: 'ABC-1234'
    })
    .returning('id')

  const response = await request(app).delete(`/api/v1/cars/${carId}`)

  expect(response.status).toBe(204)

  const deletedCar = await db('cars').where({ id: carId }).first()
  expect(deletedCar).toBeUndefined()
})

test('should return an error if the car is not found', async () => {
  const response = await request(app).delete('/api/v1/cars/9999')

  expect(response.status).toBe(404)
})
