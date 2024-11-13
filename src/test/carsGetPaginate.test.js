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

test('should return paginated cars', async () => {
  await db('cars').insert([
    { brand: 'Fiat', model: 'Uno', year: 2021, plate: 'ABC-1234' },
    { brand: 'Honda', model: 'Civic', year: 2020, plate: 'DEF-5678' },
    { brand: 'Ford', model: 'Focus', year: 2019, plate: 'GHI-9012' },
    { brand: 'Chevrolet', model: 'Cruze', year: 2022, plate: 'JKL-3456' },
    { brand: 'Nissan', model: 'Sentra', year: 2021, plate: 'MNO-7890' }
  ])

  const response = await request(app).get('/api/v1/cars?page=1&limit=3')

  expect(response.status).toBe(200)
  expect(response.body.data.length).toBe(3)
  expect(response.body.count).toBe(5)
  expect(response.body.pages).toBe(2)
})

test('should filter cars by year', async () => {
  await db('cars').insert([
    { brand: 'Fiat', model: 'Uno', year: 2021, plate: 'ABC-1234' },
    { brand: 'Honda', model: 'Civic', year: 2020, plate: 'DEF-5678' },
    { brand: 'Ford', model: 'Focus', year: 2021, plate: 'GHI-9012' }
  ])

  const response = await request(app).get('/api/v1/cars?year=2021')

  expect(response.status).toBe(200)
  expect(response.body.data.length).toBe(2)
  expect(response.body.data[0]).toHaveProperty('year', 2021)
  expect(response.body.data[1]).toHaveProperty('year', 2021)
})

test('should filter cars by final_plate', async () => {
  await db('cars').insert([
    { brand: 'Fiat', model: 'Uno', year: 2021, plate: 'ABC-1234' },
    { brand: 'Honda', model: 'Civic', year: 2020, plate: 'DEF-5678' },
    { brand: 'Ford', model: 'Focus', year: 2021, plate: 'XYZ-5678' }
  ])

  const response = await request(app).get('/api/v1/cars?final_plate=5678')

  expect(response.status).toBe(200)
  expect(response.body.data.length).toBe(2)
  expect(response.body.data[0].plate.endsWith('5678')).toBe(true)
  expect(response.body.data[1].plate.endsWith('5678')).toBe(true)
})

test('should filter cars by brand', async () => {
  await db('cars').insert([
    { brand: 'Fiat', model: 'Uno', year: 2021, plate: 'ABC-1234' },
    { brand: 'Fiat', model: 'Pálio', year: 2022, plate: 'DEF-5678' },
    { brand: 'Honda', model: 'Civic', year: 2020, plate: 'GHI-9012' }
  ])

  const response = await request(app).get('/api/v1/cars?brand=Fiat')

  expect(response.status).toBe(200)
  expect(response.body.data.length).toBe(2)
})
