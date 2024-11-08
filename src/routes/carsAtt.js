const carDatabase = require('../database/CarDatabase')

module.exports = (app) => {
  app.patch('/api/v1/cars/:id', async (req, res) => {
    return res.status(200).json({ message: 'testing patch route' })
  })
}
