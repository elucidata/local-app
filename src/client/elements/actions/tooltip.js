//@ts-ignore
import TooltipOverlay, { show, hide, adjust } from './support/TooltipOverlay.svelte'

const _tooltip = new TooltipOverlay({
  target: document.body
});

export function tooltip(target, content) {

  target.addEventListener('mouseenter', onEnter)
  target.addEventListener('mouseleave', onLeave)

  function onEnter(e) {
    e.preventDefault()
    // console.log("Enter:", content)
    target.addEventListener('mousedown', onMouseDown)
    show(target, content)
  }

  function onLeave(e) {
    e.preventDefault()
    // console.log("Leave:", content)
    hide()
  }

  function onMouseDown(e) {
    hide()
  }

  function update(newContent) {
    if (newContent == content) return console.warn("Tooltip content didn't change.")
    content = newContent
    adjust(target, content)
  }

  function destroy() {
    target.removeEventListener('mouseenter', onEnter)
    target.removeEventListener('mouseleave', onLeave)
  }

  return { update, destroy }
}

export default tooltip;