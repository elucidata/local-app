export function autofocus(el, andSelect) {
  el && el.focus && el.focus()
  if (andSelect == true) el && el.select && el.select()
}

export default autofocus