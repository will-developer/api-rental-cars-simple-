const db = require('../config/database')

const CarDatabase = {
  addCar: async function (carData) {
    const [id] = await db('cars').insert(carData) //destructuring
    const newCar = await db('cars').where({ id }).first()
    return newCar
  },

  findCarByPlate: function (plate) {
    return db('cars').where({ plate }).first()
  }
}

module.exports = CarDatabase
