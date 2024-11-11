const db = require('../config/database')

const carService = {
  async findCarByPlate(plate) {
    return db('cars').where({ plate }).first()
  },

  async addCar(carData) {
    const [id] = await db('cars').insert(carData)
    return db('cars').where({ id }).first()
  },

  async findCarById(id) {
    const car = await db('cars').where({ id }).first()
    if (!car) throw { status: 404, message: 'car not found' }
    return car
  },

  async findCarItems(car_id) {
    return db('car_items').where({ car_id }).select('name')
  },

  async deleteCarItems(carId) {
    await db('car_items').where({ car_id: carId }).del()
  },

  async deleteCarById(carId) {
    await db('cars').where({ id: carId }).del()
  }
}

module.exports = carService
