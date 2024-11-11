class CustomError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
    this.isCustom = true
  }
}

module.exports = CustomError
