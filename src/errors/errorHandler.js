function handleError(res, error) {
  console.error(error)
  if (error.isCustom) {
    return res.status(error.status).json({ errors: [error.message] })
  }
  return res.status(500).json({ errors: ['an internal server error occurred'] })
}

module.exports = handleError
