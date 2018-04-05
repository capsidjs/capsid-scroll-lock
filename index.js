const LOCK = 'capsid-scroll-lock/LOCK'
const UNLOCK = 'capsid-scroll-lock/UNLOCK'
const DEFAUTL_NAME = 'scroll-lock'

const STYLE_KEYS = [
  'boxSizing',
  'height',
  'overflow',
  'paddingRight',
  'position'
]

const LOCK_STYLES = {
  boxSizing: 'border-box',
  overflow: 'hidden',
  position: 'relative',
  height: '100%',
}

exports.LOCK = LOCK
exports.UNLOCK = UNLOCK

exports.install = ({ def, on }, { name } = {}) => {
  name = name || DEFAULT_NAME

  class ScrollLock {
    constructor () {
      this.count = 0
      this.originalStyle = {}
    }

    @on(LOCK)
    lock () {
      if (this.count === 0) {
        this.lockStyle()
      }

      this.count += 1
    }

    @on(UNLOCK)
    unlock () {
      if (this.count === 1) {
        this.unlockStyle()
      }

      this.count = Math.max(this.count - 1, 0)
    }

    lockStyle () {
      STYLE_KEYS.forEach(key => {
        this.originalStyle[key] = this.el.style[key]
      })

      Object.keys(LOCK_STYLES).forEach(key => {
        this.el.style[key] = LOCK_STYLES[key]
      })

      this.adjustPaddingRight()
    }

    adjustPaddingRight () {
      const currentPadding = parseInt(this.originalStyles.paddingRight, 10) || 0
      const adjustedPadding = window.innerWidth - this.el.clientWidth + currentPadding || 0

      this.el.style.paddingRight = adjustedPadding
    }

    unlockStyle () {
      Object.assign(this.el.style, this.originalStyle)
    }
  }

  def(name, ScrollLock)
}
