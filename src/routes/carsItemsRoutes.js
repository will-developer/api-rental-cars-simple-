const carDatabase = require('../database/CarDatabase')

module.exports = (app) => {
  app.put('/api/v1/cars/:id/items', async (req, res) => {
    const items = req.body
    const errors = []
    const { id } = req.params

    if (items.length === 0) errors.push('Items is required')
    if (items.length > 5) errors.push('items must be a maximum of 5')

    //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Set
    const compareItems = new Set(items)
    if (compareItems.size !== items.length)
      errors.push('items cannot be repeated')

    if (errors.length > 0) return res.status(400).json({ errors })

    const existCar = await carDatabase.findCarById(id)
    if (!existCar) {
      return res.status(404).json({ errors: ['car not found'] })
    }

    await carDatabase.updateCarItems(id, items)
    return res.status(200).json({ message: 'New items inserted successfully' })
  })
}
