const carDatabase = require('../database/CarDatabase')

module.exports = (app) => {
  app.get('/api/v1/cars', async (req, res) => {
    const { year, final_plate, brand, page = 1, limit = 5 } = req.query

    let query = carDatabase.queryCars()

    if (year) {
      query = query.where('year', '>=', year)
    }

    if (final_plate) {
      query = query.whereRaw('RIGHT(plate, ?) = ?', [
        final_plate.length,
        final_plate
      ])
    }

    if (brand) {
      query = query.where('brand', 'like', `%${brand}%`)
    }

    const pageSize = Math.max(1, Math.min(parseInt(limit), 10))
    const currentPage = Math.max(1, parseInt(page))

    try {
      const countResult = await query.clone().count('* as total').first()
      const totalCars = countResult ? countResult.total : 0

      const totalPages = Math.ceil(totalCars / pageSize)

      const cars = await query
        .select('id', 'brand', 'model', 'year', 'plate', 'created_at')
        .limit(pageSize)
        .offset((currentPage - 1) * pageSize)

      res.status(200).json({
        count: totalCars,
        pages: totalPages,
        data: cars
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'An internal server error occurred' })
    }
  })
}
