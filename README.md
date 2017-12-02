# Numeric Keyboard

[![Build Status](https://travis-ci.org/viclm/numeric-keyboard.svg?branch=master)](https://travis-ci.org/viclm/numeric-keyboard)

A numeric keyboard works in mobile browsers. It contains a pluggable keyboard component which is used to respond to user input and a textbox + keyboard suit in replace of native input element.

The numeric keyboard have several versions: plain javascript class and Vue 2 component

[Watch the demo video](https://fast.wistia.net/embed/iframe/f40gilnlxp)

## Install
You can intall this component via yarn

```shell
yarn add numeric-keyboard
```

## Usage

### Plain JavaScript
```javascript
import { NumericKeyboard, keys } from 'numeric-keyboard'
new NumericKeyboard('.keyboard-ui', {
  layout: 'tel',
  theme: {
    key: {
      [keys.DEL]: {
        color: '#ffffff',
        backgroundColor: ['#a8b0bc', '#929ba8']
      },
      [keys.ENTER]: {
        color: '#ffffff',
        backgroundColor: ['#a8b0bc', '#929ba8']
      }
    }
  },
  entertext: 'send',
  onpress(key) {
    ...
  }
})
```
### Vue 2
```vue
<template>
   <div class="keyboard">
     <NumericKeyboard layout="tel" :theme="telTheme" entertext="send" @press="press"></NumericKeyboard>
   </div>
</template>

<script>
  import { NumericKeyboard, keys } from 'numeric-keyboard'
  export default {
    components: {
      NumericKeyboard
    },
    data() {
      return {
        telTheme: {
          key: {
            [keys.DEL]: {
              color: '#ffffff',
              backgroundColor: ['#a8b0bc', '#929ba8']
            },
            [keys.ENTER]: {
              color: '#ffffff',
              backgroundColor: ['#a8b0bc', '#929ba8']
            }
          }
        }
      }
    },
    methods: {
      press(key) {
        ...
      }
    }
  }
</script>
```

## options/props
```javascript
// change the layout of keyboard
 layout: {
   type: [String, Array],
   default: 'number'
 },
 // change the style of keyboard
 theme: {
   type: [String, Object],
   default: 'default'
 },
 // change the label of submit button
 entertext: {
   type: String,
   default: 'enter'
 }
```

### `layout`
There are two build-in layout called **number** and **tel** which can be used as a replace of system keyboard. You can still rearrange all the keys to create your own layout. The layout object is two-dimension array which constructs a table layout, you can make table-specific operations like merging cells.

#### number layout
![number layout](https://raw.githubusercontent.com/viclm/numeric-keyboard/master/demo/snapshot_number.png)

#### tel layout
![tel layout](https://raw.githubusercontent.com/viclm/numeric-keyboard/master/demo/snapshot_tel.png)

#### custom layout
```javascript
// the build-in number layout

import { keys } from 'numeric-keyboard'

[
  [
    {
      key: keys.ONE
    },
    {
      key: keys.TWO
    },
    {
      key: keys.THREE
    },
    {
      key: keys.DEL,
      rowspan: 2,
    },
  ],
  [
    {
      key: keys.FOUR
    },
    {
      key: keys.FIVE
    },
    {
      key: keys.SIX
    },
  ],
  [
    {
      key: keys.SEVEN
    },
    {
      key: keys.EIGHT
    },
    {
      key: keys.NINE
    },
    {
      key: keys.ENTER,
      rowspan: 2,
    },
  ],
  [
    {
      key: keys.DOT
    },
    {
      key: keys.ZERO
    },
    {
      key: keys.ESC
    },
  ],
]
```

### `theme`
The style of keyboard can be modified global or per key, currently it only supports several limit style like fontSize or color, however you can override CSS directly for complicated style.
```javascript
// the default style declaration

import { keys } from 'numeric-keyboard'

{
  global: {
    fontSize: '0.46rem',
    color: '#000000',
    backgroundColor: ['#ffffff', '#929ca8'], // specify a pair of colors for active pseudo class
    borderColor: '#cfd4da',
  },
  key: {
    [keys.ENTER]: {
      color: '#ffffff',
      backgroundColor: ['#007aff', '#0051a8'],
    },
  }
}
```

## callback/events

### `press`
the `press` event is emit with a key code when the key is pressed.

## textbox + keyboard suit

The keyboard which created by javascript can not work with normal text input element, the component provide a custom textbox + keyboard suit which can be used in a normal form situation.
### Vue 2
```vue
<template>
  <div class="input">
    <label>Amount: </label>
    <NumericInput placeholder="touch to input" v-model="amount" />
  </div>
</template>

<script>
  import { NumericInput } from 'numeric-keyboard'
  export default {
    components: {
      NumericInput
    },
    data() {
      return {
       amount: 0
      }
    }
  }
</script>

```

### options/props
Since it is a replace of html input element, most properties is supported.
```javascript
// There are only two types: number and tel because it only contains a numeric keyboard
type: {
  type:String,
  default: 'number'
},
autofocus: {
  type: Boolean,
  default: false
},
disabled: {
  type: Boolean,
  default: false
},
maxlength: {
  type: Number
},
name: {
  type: String
},
placeholder: {
  type: String
},
// pass regexp string to test input format
format: {
  type: [String, Function]
},
readonly: {
  type: Boolean,
  default: false
},
value: {
  type: [String, Number]
},
// The keyboard options will be used by keyboard component inside
keyboard: {
  type: Object
}
```

### callback/events

#### `input`
The `input` event is emit when the value of input changes

## License
Licensed under the MIT license
