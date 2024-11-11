const db = require('../config/database')
const CustomError = require('../errors/CustomError')

const carService = {
  async findCarByPlate(plate) {
    const car = await db('cars').where({ plate }).first()
    if (car) {
      throw new CustomError('car already registered', 409)
    }
    return car
  },

  async addCar(carData) {
    const [id] = await db('cars').insert(carData)
    return db('cars').where({ id }).first()
  }
}

module.exports = carService
