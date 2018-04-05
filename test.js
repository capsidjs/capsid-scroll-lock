require('@babel/register')

const Window = require('window')

const window = new Window()
global.window = window
global.document = window.document

const { describe, context, it, beforeEach } = require('kocha')
const assert = require('assert')
const capsid = require('capsid')
const { make } = capsid
const capsidScrollLock = require('./index.js')
const { LOCK, UNLOCK } = capsidScrollLock

capsidScrollLock.install(capsid)

const body = () => window.document.createElement('body')

describe('capsid-scroll-lock', () => {
  describe('install', () => {
    it('defines scroll-lock component', () => {
      make('scroll-lock', body())
    })

    context('when name option is given', () => {
      it('defines the component of the given name', () => {
        capsidScrollLock.install(capsid, { name: 'foo0' })
        make('foo0', body())
      })
    })
  })

  describe('scroll-lock component', () => {
    let el

    beforeEach(() => {
      el = body()
      make('scroll-lock', el)
    })

    context('when LOCK event is dispatched', () => {
      it('applies the styles for locking the body scroll', () => {
        el.dispatchEvent(new window.CustomEvent(LOCK))

        assert.strictEqual(el.style.overflow, 'hidden')
      })
    })

    context('when LOCK dispatched once and UNLOCK dispatched once', () => {
      it('unlocks the body scroll', () => {
        el.dispatchEvent(new window.CustomEvent(LOCK))
        el.dispatchEvent(new window.CustomEvent(UNLOCK))

        assert.strictEqual(el.style.overflow, '')
      })
    })

    context('when LOCK dispatched twice and UNLOCK dispatched once', () => {
      it('does not unlock the body scroll', () => {
        el.dispatchEvent(new window.CustomEvent(LOCK))
        el.dispatchEvent(new window.CustomEvent(LOCK))
        el.dispatchEvent(new window.CustomEvent(UNLOCK))

        assert.strictEqual(el.style.overflow, 'hidden')
      })
    })
  })
})
