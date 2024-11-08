const db = require('../config/database')

const CarDatabase = {
  addCar: async function (carData) {
    const [id] = await db('cars').insert(carData) //destructuring
    const newCar = await db('cars').where({ id }).first()
    return newCar
  },

  findCarByPlate: function (plate) {
    return db('cars').where({ plate }).first()
  },

  findCarById: function (id) {
    return db('cars').where({ id }).first()
  },

  updateCarItems: async function (id, items) {
    await db('car_items').where({ car_id: id }).del()

    const itemsObject = items.map((item) => ({ name: item, car_id: id }))
    //console.log(itemsObject)
    return db('car_items').insert(itemsObject)
  }
}

module.exports = CarDatabase
