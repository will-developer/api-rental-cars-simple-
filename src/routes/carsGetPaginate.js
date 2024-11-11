const carsPaginate = require('../services/carsPaginate')
const handleError = require('../errors/errorHandler')

module.exports = (app) => {
  app.get('/api/v1/cars', async (req, res) => {
    try {
      const { year, final_plate, brand, page = 1, limit = 5 } = req.query

      const result = await carsPaginate.getPaginatedCars({
        year,
        final_plate,
        brand,
        page,
        limit
      })

      res.status(200).json(result)
    } catch (error) {
      handleError(res, error)
    }
  })
}
