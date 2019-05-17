//@ts-ignore
import EllipsisOverlay, { show, hide, invalidateCSS } from './support/EllipsisOverlay.svelte'

const _overlay = new EllipsisOverlay({
  target: document.body
})

export function expandEllipsis(el, options) {
  // console.log('expandEllipsis', options)
  el.addEventListener("mouseenter", mouseEnter);

  let _timer;

  function mouseEnter(e) {
    if (el.offsetWidth < el.scrollWidth) {
      el.addEventListener("mouseleave", mouseLeave);
      if (options && options.delay) {
        _timer = setTimeout(() => show(el), options.delay)
      }
      else {
        show(el)
      }
    }
  }
  function mouseLeave(e) {
    el.removeEventListener("mouseleave", mouseLeave);
    hide()
    clearTimeout(_timer)
  }

  function update() {
    invalidateCSS(el)
  }
  function destroy() {
    el.removeEventListener("mouseenter", mouseEnter);
    el.removeEventListener("mouseleave", mouseLeave);
  }

  return { update, destroy };
}

export default expandEllipsis;