const db = require('../config/database')
const CustomError = require('../errors/CustomError')

const carItemService = {
  async updateCarItems(carId, items) {
    const car = await db('cars').where({ id: carId }).first()
    if (!car) {
      throw new CustomError('car not found', 404)
    }

    await db('car_items').where({ car_id: carId }).del()
    const itemsData = items.map((item) => ({ name: item, car_id: carId }))
    await db('car_items').insert(itemsData)

    return { message: 'New items inserted successfully' }
  }
}

module.exports = carItemService
