const carService = require('../services/carService')
const handleError = require('../errors/errorHandler')
const { validatePlateFormat } = require('../services/validate-plate')

module.exports = (app) => {
  app.patch('/api/v1/cars/:id', async (req, res) => {
    try {
      const { id } = req.params
      const { brand, model, year, plate } = req.body
      const errors = []

      const car = await carService.findCarById(id)
      if (!car) {
        return res.status(404).json({ errors: ['car not found'] })
      }

      if (!model) errors.push('model must also be informed')
      if (year && (year < 2015 || year > 2025))
        errors.push('year must be between 2015 and 2025')
      if (plate && !validatePlateFormat(plate))
        errors.push('plate must be in the correct format ABC-1D23')

      if (plate) {
        const existingCar = await carService.findCarByPlate(plate)
        if (existingCar && existingCar.id !== parseInt(id)) {
          return res.status(409).json({ errors: ['car already registered'] })
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      const updatedData = {}
      if (brand) updatedData.brand = brand
      if (model) updatedData.model = model
      if (year) updatedData.year = year
      if (plate) updatedData.plate = plate

      await carService.updateCarById(id, updatedData)

      return res.status(204).send()
    } catch (error) {
      handleError(res, error)
    }
  })
}
