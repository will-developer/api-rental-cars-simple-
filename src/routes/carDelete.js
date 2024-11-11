const carsServices = require('../services/carsServices')
const handleError = require('../errors/errorHandler')

module.exports = (app) => {
  app.delete('/api/v1/cars/:id', async (req, res) => {
    try {
      const { id } = req.params

      const car = await carsServices.findCarById(id)
      if (!car) {
        return res.status(404).json({
          errors: ['car not found']
        })
      }

      await carsServices.deleteCarItems(id)
      await carsServices.deleteCarById(id)

      return res.status(204).send()
    } catch (error) {
      handleError(res, error)
    }
  })
}
