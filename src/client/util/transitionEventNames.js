const eventNames = (function () {
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition': ['transitionstart', 'transitionend', 'animationstart', 'animationend'],
    'OTransition': ['oTransitionStart', 'oTransitionEnd', 'oAnimationStart', 'oAnimationEnd'],
    'MozTransition': ['transitionstart', 'transitionend', 'animationstart', 'animationend'],
    'WebkitTransition': ['webkitTransitionStart', 'webkitTransitionEnd', 'webkitAnimationStart', 'webkitAnimationEnd']
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
  return []
})();

export const transitionEventNames = eventNames

const [transitionStart, transitionEnd, animationStart, animationEnd] = eventNames

export const transitionEvents = {
  transitionStart, transitionEnd, animationStart, animationEnd
}

export default transitionEvents