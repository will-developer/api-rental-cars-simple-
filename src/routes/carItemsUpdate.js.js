const carItemService = require('../services/carItemService')
const handleError = require('../errors/errorHandler')

module.exports = (app) => {
  app.put('/api/v1/cars/:id/items', async (req, res) => {
    try {
      const { id } = req.params
      const items = req.body
      const errors = []

      if (items.length === 0) errors.push('Items is required')
      if (items.length > 5) errors.push('items must be a maximum of 5')

      const uniqueItems = new Set(items)
      if (uniqueItems.size !== items.length) {
        errors.push('items cannot be repeated')
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      await carItemService.updateCarItems(id, items)
      return res.status(204).send()
    } catch (error) {
      handleError(res, error)
    }
  })
}
