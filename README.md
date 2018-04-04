# capsid-scroll-lock v0.1.0

> :clamp: Body Scroll Lock as [capsid][] module :pill:

# Usage

Install via npm:

    npm i --save-dev capsid capsid-scroll-lock

Install it to [capsid][].

```js
capsid.install(require('capsid-scroll-lock'))
```

Then, add `scroll-lock` class to your body tag.

```html
<body class="scroll-lock">
  ...
</body>
```

Then dispatch `capsid-scroll-lock/LOCK` custom DOM event to lock the scroll of `body` and `capsid-scroll-lock/UNLOCK` event to unlock it.

Those event names are available as `LOCK` and `UNLOCK` values from the module.

```js
const { LOCK, UNLOCK } = require('capsid-scroll-lock')

console.log(LOCK) // => "capsid-scroll-lock/LOCK"
console.log(UNLOCK) // => "capsid-scroll-lock/UNLOCK"
```

# Example

If you use vanilla.js

```js
const { LOCK, UNLOCK } = require('capsid-scroll-lock')

document.body.dispatchEvent(new CustomEvent(LOCK))
document.body.dispatchEvent(new CustomEvent(UNLOCK))
```

If you use capsid.js

```js
const { LOCK, UNLOCK } = require('capsid-scroll-lock')
const { component, emits } = require('capsid')

@component('my-component')
class MyComponent {
  @emits(LOCK)
  lockMethod () { ... }

  @emits(UNLOCK)
  unlockMethod () { ... }
}
```

And put `my-component` somewhere in body

```html
<body class="scroll-lock">
  ...
  <div class="my-component">
  </div>
  ...
</body>
```

Then invoking `lockMethod` locks the body and `unlockMethod` unlocks the body.

# API

```js
const { install, LOCK, UNLOCK } = require('capsid-scroll-lock')
```

## install(capsid, { name })

- @param capsid - The capsid object
- @param {string} name - The name of scroll-lock class. Default `scroll-lock`.

Installs the module to capsid.

```js
require('capsid-scroll-lock').install(capsid, { name: 'my-scroll-lock' })
```

Alternatively you can call it like:

```js
capsid.install(require('capsid-scroll-lock'), { name: 'my-scroll-lock' })
```

## LOCK, UNLOCK

```js
const LOCK = 'capsid-scroll-lock/LOCK'
const UNLOCK = 'capsid-scroll-lock/UNLOCK'
```

These are custom event names for locking and unlocking the body scroll.

# License

MIT

[capsid]: https://github.com/capsidjs/capsid
