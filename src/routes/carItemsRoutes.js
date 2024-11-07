module.exports = (app) => {
  app.put('/api/v1/cars/:id/items', async (req, res) => {
    const items = req.body
    const errors = []

    if (items.length === 0) errors.push('Items is required')
    if (items.length > 5) errors.push('items must be a maximum of 5')
  })
}
