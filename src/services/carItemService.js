const db = require('../config/database')

const carItemService = {
  async updateCarItems(carId, items) {
    const car = await db('cars').where({ id: carId }).first()
    if (!car) throw { status: 404, message: 'car not found' }

    await db('car_items').where({ car_id: carId }).del()
    const itemsData = items.map((item) => ({ name: item, car_id: carId }))
    await db('car_items').insert(itemsData)

    return { message: 'New items inserted successfully' }
  }
}

module.exports = carItemService
