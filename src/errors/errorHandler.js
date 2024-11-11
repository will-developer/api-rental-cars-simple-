function handleError(res, error) {
  console.error(error)
  const status = error.status || 500
  const message =
    status === 500
      ? 'an internal server error occurred'
      : error.message || 'error unexpected'

  return res.status(status).json({ errors: [message] })
}

module.exports = handleError
