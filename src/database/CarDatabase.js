const db = require('../config/database')

const CarDatabase = {
  async addCar(carData) {
    const [id] = await db('cars').insert(carData)
    return { id, ...carData }
  }
}

module.exports = CarDatabase
