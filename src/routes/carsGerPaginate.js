module.exports = (app) => {
  app.get('/api/v1/cars', async (req, res) => {
    return res.status(200).json({ message: 'ok' })
  })
}
