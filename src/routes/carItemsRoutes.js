module.exports = (app) => {
  app.put('/api/v1/cars/:id/items', async (req, res) => {
    const items = req.body
    const errors = []

    if (items.length === 0) errors.push('Items is required')
  })
}
