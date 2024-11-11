function validateItems(items) {
  const errors = []
  if (items.length === 0) errors.push('Items is required')
  if (items.length > 5) errors.push('items must be a maximum of 5')

  const uniqueItems = new Set(items)
  if (uniqueItems.size !== items.length) {
    errors.push('items cannot be repeated')
  }

  return errors
}

module.exports = { validateItems }
