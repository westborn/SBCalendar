export function isEmpty(val) {
  return val.trim().length === 0
}

export function isValidEmail(val) {
  return new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  ).test(val)
}

// weekday: 'short',
// month: 'short',
// day: 'numeric',
// year: 'numeric',
// hour: 'numeric',
// minute: '2-digit',
// second: '2-digit',
// hour12: true,
export function fmtDateTimeLocal(
  dte = new Date(),
  options = {
    month: 'short',
    day: 'numeric',
  }
) {
  return new Date(dte).toLocaleString('en-AU', options)
}
