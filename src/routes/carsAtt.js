const carDatabase = require('../database/CarDatabase')

module.exports = (app) => {
  app.patch('/api/v1/cars/:id', async (req, res) => {
    const { id } = req.params
    const { brand, model, year, plate } = req.body
    const errors = []

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

    const car = await carDatabase.findCarById(id)
    if (!car) {
      return res.status(404).json({ errors: ['car not found'] })
    }

    if (!model) errors.push('model must also be informed')

    if (year && (year < 2015 || year > 2025))
      errors.push('year must be between 2015 and 2025')

    if (plate && !validatePlateFormat(plate))
      errors.push('plate must be in the correct format ABC-1D23')

    if (plate) {
      const existingCar = await carDatabase.findCarByPlate(plate)
      if (existingCar.id !== parseInt(id)) {
        return res.status(409).json({ errors: ['car already registered'] })
      }
    }
    console.log(errors)
    if (errors.length > 0) {
      return res.status(400).json({ errors })
    }

    return res.status(200).json({ message: 'is okay with the syntax?' })
  })
}
