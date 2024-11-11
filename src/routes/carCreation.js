const carsServices = require('../services/carsServices')
const handleError = require('../errors/errorHandler')
const { validatePlateFormat } = require('../services/validation-plate')

module.exports = (app) => {
  app.post('/api/v1/cars', async (req, res) => {
    try {
      const { brand, model, year, plate } = req.body
      const errors = []

      if (!brand) errors.push('brand is required')
      if (!model) errors.push('model is required')
      if (!year) errors.push('year is required')
      if (!plate) errors.push('plate is required')

      const currentYear = new Date().getFullYear() + 1
      const minYear = currentYear - 10
      if (year && (year < minYear || year > currentYear)) {
        errors.push(`year must be between ${minYear} and ${currentYear}`)
      }

      if (plate && !validatePlateFormat(plate)) {
        errors.push('plate must be in the correct format ABC-1C34')
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      const existingCar = await carsServices.findCarByPlate(plate)
      if (existingCar) {
        return res.status(409).json({ errors: ['car already registered'] })
      }

      await carsServices.findCarByPlate(plate)

      const newCar = await carsServices.addCar({ brand, model, year, plate })
      res.status(201).json(newCar)
    } catch (error) {
      handleError(res, error)
    }
  })
}
