const carDatabase = require('../database/CarDatabase')

module.exports = (app) => {
  app.put('/api/v1/cars/:id/items', async (req, res) => {
    const { items } = req.body
    const errors = []
    const { id } = req.params

    if (items.length === 0) errors.push('Items is required')
    if (items.length > 5) errors.push('items must be a maximum of 5')

    //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Set
    const compareItems = new Set(items)
    if (compareItems.size !== items.length)
      errors.push('items cannot be repeated')

    if (erros.length > 0) res.status(400).json({ errors })
  })
}
