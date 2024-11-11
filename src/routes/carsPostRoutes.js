const CarDatabase = require('../database/CarDatabase')

module.exports = (app) => {
  app.post('/api/v1/cars', async (req, res) => {
    const { brand, model, year, plate } = req.body
    const errors = [] //increment errors with push method

    function validatePlateFormat(plate) {
      // https://developer.mozilla.org/en-US/docs/Glossary/ASCII
      if (plate.length !== 8) return false

      const letters =
        plate[0] >= 'A' &&
        plate[0] <= 'Z' &&
        plate[1] >= 'A' &&
        plate[1] <= 'Z' &&
        plate[2] >= 'A' &&
        plate[2] <= 'Z'

      const hyphen = plate[3] === '-'

      const firstDigit = plate[4] >= '0' && plate[4] <= '9'

      const letterOrNumber =
        (plate[5] >= 'A' && plate[5] <= 'J') ||
        (plate[5] >= '0' && plate[5] <= '9')
      const secondToLastNumber = plate[6] >= '0' && plate[6] <= '9'

      const lastNumber = plate[7] >= '0' && plate[7] <= '9'

      return (
        letters &&
        hyphen &&
        firstDigit &&
        letterOrNumber &&
        secondToLastNumber &&
        lastNumber
      )
    }

    // Required field filled in?
    if (!brand) errors.push('brand is required')
    if (!model) errors.push('model is required')
    if (!year)
      errors.push('year is required', 'year must be between 2015 and 2025')
    if (!plate) errors.push('plate is required')

    // year validation
    const currentYear = new Date().getFullYear() + 1
    const minYear = currentYear - 10
    if (year && (year < minYear || year > currentYear)) {
      errors.push(`year must be between ${minYear} and ${currentYear}`)
    }

    // plate verification
    if (plate && !validatePlateFormat(plate)) {
      errors.push('plate must be in the correct format ABC-1C34')
    }

    // validation errors?
    if (errors.length > 0) {
      return res.status(400).json({ errors })
    }

    try {
      // already exist cars?
      const existingCar = await CarDatabase.findCarByPlate(plate)
      if (existingCar) {
        return res.status(409).json({ errors: ['car already registered'] })
      }

      // Insert new car
      const newCar = await CarDatabase.addCar({ brand, model, year, plate })
      res.status(201).json(newCar)
    } catch (error) {
      // if occour error:
      res.status(500).json({ error: 'An internal server error occurred' })
    }
  })
}
