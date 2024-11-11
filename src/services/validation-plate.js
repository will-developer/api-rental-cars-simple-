function validatePlateFormat(plate) {
  if (plate.length !== 8) return false

  const letters =
    plate[0] >= 'A' &&
    plate[0] <= 'Z' &&
    plate[1] >= 'A' &&
    plate[1] <= 'Z' &&
    plate[2] >= 'A' &&
    plate[2] <= 'Z'

  const hyphen = plate[3] === '-'
  const firstDigit = plate[4] >= '0' && plate[4] <= '9'
  const letterOrNumber =
    (plate[5] >= 'A' && plate[5] <= 'J') || (plate[5] >= '0' && plate[5] <= '9')
  const secondToLastNumber = plate[6] >= '0' && plate[6] <= '9'
  const lastNumber = plate[7] >= '0' && plate[7] <= '9'

  return (
    letters &&
    hyphen &&
    firstDigit &&
    letterOrNumber &&
    secondToLastNumber &&
    lastNumber
  )
}

module.exports = { validatePlateFormat }
