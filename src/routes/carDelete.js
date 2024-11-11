const carService = require('../services/carService')
const handleError = require('../errors/errorHandler')

module.exports = (app) => {
  app.delete('/api/v1/cars/:id', async (req, res) => {
    try {
      const { id } = req.params

      const car = await carService.findCarById(id)
      if (!car) {
        return res.status(404).json({
          errors: ['car not found']
        })
      }

      await carService.deleteCarItems(id)
      await carService.deleteCarById(id)

      return res.status(204).send()
    } catch (error) {
      handleError(res, error)
    }
  })
}
