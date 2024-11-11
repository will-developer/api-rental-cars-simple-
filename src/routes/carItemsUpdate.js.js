const carItemService = require('../services/carItemService')
const handleError = require('../errors/errorHandler')
const validateItems = require('../services/validate-items')

module.exports = (app) => {
  app.put('/api/v1/cars/:id/items', async (req, res) => {
    try {
      const { id } = req.params
      const items = req.body

      const errors = validateItems(items)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      const result = await carItemService.updateCarItems(id, items)
      return res.status(200).json(result)
    } catch (error) {
      handleError(res, error)
    }
  })
}
