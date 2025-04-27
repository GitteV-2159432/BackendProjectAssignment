const sanitizeBooleanQueryParam = (value) => {
  return ['true', 'on', '1'].includes(String(value).trim().toLowerCase())
}

export { sanitizeBooleanQueryParam }
