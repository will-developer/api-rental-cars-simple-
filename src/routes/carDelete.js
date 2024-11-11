const carDatabase = require('../database/CarDatabase')

module.exports = (app) => {
  app.delete('/api/v1/cars/:id', async (req, res) => {
    try {
      const { id } = req.params

      const car = await carDatabase.findCarById(id)
      if (!car) {
        return res.status(404).json({
          errors: ['car not found']
        })
      }

      await carDatabase.deleteCarItems(id)
      await carDatabase.deleteCarById(id)

      return res.status(204).send()
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ error: 'An internal server error occurred' })
    }
  })
}
