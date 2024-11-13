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

test.skip('should update car information successfully', async () => {
  const [carId] = await db('cars')
    .insert({
      brand: 'Fiat',
      model: 'Uno',
      year: 2021,
      plate: 'ABC-1234'
    })
    .returning('id')

  const response = await request(app).patch(`/api/v1/cars/${carId}`).send({
    brand: 'Fiat',
    model: 'Uno Updated',
    year: 2022,
    plate: 'XYZ-5678'
  })

  expect(response.status).toBe(204)

  const updatedCar = await db('cars').where({ id: carId }).first()
  expect(updatedCar.year).toBe(2022)
  expect(updatedCar.plate).toBe('XYZ-5678')
})

test('should return an error if the car is not found', async () => {
  const response = await request(app).patch('/api/v1/cars/9999').send({
    brand: 'Fiat',
    model: 'Uno Updated',
    year: 2022,
    plate: 'XYZ-5678'
  })

  expect(response.status).toBe(404)
})

test.skip('should return an error if plate is duplicated', async () => {
  const [carId] = await db('cars')
    .insert({
      brand: 'Fiat',
      model: 'Uno',
      year: 2021,
      plate: 'ABC-1234'
    })
    .returning('id')

  await db('cars').insert({
    brand: 'Fiat',
    model: 'Uno',
    year: 2020,
    plate: 'XYZ-5678'
  })

  const response = await request(app).patch(`/api/v1/cars/${carId}`).send({
    plate: 'XYZ-5678'
  })

  expect(response.status).toBe(409)
})

test('should return an error if year is invalid', async () => {
  const [carId] = await db('cars')
    .insert({
      brand: 'Fiat',
      model: 'Uno',
      year: 2021,
      plate: 'ABC-1234'
    })
    .returning('id')

  const response = await request(app).patch(`/api/v1/cars/${carId}`).send({
    year: 2030
  })

  expect(response.status).toBe(400)
})
