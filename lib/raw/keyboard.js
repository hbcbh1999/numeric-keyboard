import tmpl from '../utils/tmpl'
import { Options, Interface } from '../func/keyboard'
import '../style/keyboard.styl'

const rcapital = /[A-Z]/g

const template = `
<div class="numeric-keyboard">
<table>
  <% layout.forEach(function (r) { %>
  <tr>
    <% r.forEach(function (c) { %>
    <td rowspan="<%=c.rowspan%>" colspan="<%=c.colspan%>" data-key="<%=c.key%>" data-icon="<%=keys[c.key].icon%>" style="<%=keys[c.key].csstext%>"></td>
    <% }); %>
  </tr>
  <% }); %>
</table>
</div>
`

export default function Keyboard(el, options) {
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }

  this.init(options)

  for (let key in this._keys) {
    let css = ''
    for (let name in this._keys[key].style) {
      css += `${name.replace(rcapital, s => '-' + s.toLowerCase())}:${this._keys[key].style[name]};`
    }
    this._keys[key].csstext = css
  }
  
  el.innerHTML = tmpl(template, {
    layout: this._layout,
    keys: this._keys
  })

  el.addEventListener('touchstart', this.touchstart.bind(this), false)
  el.addEventListener('touchend', this.touchend.bind(this), false)

  this._options = options
}

Keyboard.prototype = Interface
Keyboard.prototype.constructor = Keyboard
Keyboard.prototype.dispatch = function (event, ...args) {
  const callback = this._options[`on${event}`]
  if (callback) {
    callback(...args)
  } 
}
Keyboard.prototype.touchstart = function (e) {
  if (e.target.tagName === 'TD') {
    this.ontouchstart(this._keys[e.target.getAttribute('data-key')], e)
  }
}
Keyboard.prototype.touchend = function (e) {
  if (e.target.tagName === 'TD') {
    this.ontouchend(this._keys[e.target.getAttribute('data-key')], e)
  }
}