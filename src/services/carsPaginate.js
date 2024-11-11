const db = require('../config/database')

const carPaginationService = {
  async getPaginatedCars({ year, final_plate, brand, page, limit }) {
    let query = db('cars')

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

    const countResult = await query.clone().count('* as total').first()
    const totalCars = countResult ? countResult.total : 0
    const totalPages = Math.ceil(totalCars / pageSize)

    const cars = await query
      .select('id', 'brand', 'model', 'year', 'plate', 'created_at')
      .limit(pageSize)
      .offset((currentPage - 1) * pageSize)

    return {
      count: totalCars,
      pages: totalPages,
      data: cars
    }
  }
}

module.exports = carPaginationService
