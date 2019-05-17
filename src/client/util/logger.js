import getContrastYIQ from "./getContrastYIQ";
import rgbToHex from "./rgbToHex";


/**
 * 
 * @param {string} key 
 */
export function logger(key) {
  const bgColor = nextColor() //randomColor() 
  const color = getContrastYIQ(bgColor)
  const label = [
    `%c${key}`,
    `background-color:${bgColor}; color:${color}; padding: 2px 3px; border-radius:2px; font-size: 90%;`
  ]

  function log(...args) {
    console.log.apply(console, label.concat(args))
  }

  Object.assign(log, {
    scope(type) {
      return logger(key + ':' + type)
    },
    assert(test, ...args) {
      if (console.assert) {
        console.assert.call(console, test, `[${key}]`, ...args) // `${key}: ${...args}` //...label.concat(args)
      }
    },
    log(...args) {
      console.log.apply(console, label.concat(args))
    },
    debug(...args) {
      console.debug.apply(console, label.concat(args))
    },
    info(...args) {
      console.info.apply(console, label.concat(args))
    },
    warn(...args) {
      console.warn.apply(console, label.concat(args))
    },
    error(...args) {
      console.error.apply(console, label.concat(args))
    },
    table(...args) {
      console.table.apply(console, label.concat(args))
    },
    trace(...args) {
      console.trace.apply(console, label.concat(args))
    },

    time(timerLabel) {
      console.time(`(${key}) ${timerLabel}`)
    },

    timeEnd(timerLabel) {
      console.timeEnd(`(${key}) ${timerLabel}`)
    },
  })

  log.debug("Created logger.", { key, bgColor, color })

  return log
}

export default logger

const randomColor = () => {
  return rgbToHex({
    r: Math.ceil(Math.random() * 254),
    g: Math.ceil(Math.random() * 254),
    b: Math.ceil(Math.random() * 254),
  })
}

const nextColor = (function () {
  let i = 0
  let colors = [
    'slategray',
    'forestgreen',
    'dodgerblue',
    'slateblue',
    'crimson',
    'darkorange',
    'goldenrod',
    'deeppink',
    'mediumorchid',
    'darkcyan',
    'lime',
    'chocolate',
    'maroon',
    'lightseagreen',
    'coral',
    'darkorchid',
    'mediumvioletred'
  ]

  return () => {
    if (i >= colors.length) {
      return randomColor()
      // i = 0
    }
    return colors[i++]
  }
})()
