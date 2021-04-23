# diff算法优化: 
    + Vue2中的虚拟dom是进行全量的对比 https://vue-next-template-explorer.netlify.app/
    + Vue3新增了静态标记(PatchFlag),
      在与上次虚拟节点进行对比时候，只对比带有patch flag的节点
      并且可以通过flag的信息得知当前节点要对比的具体内容
    
```javascript
<div>
    <p>mzs</p>
    <p>mzs</p>
    <p>mzs</p>
    <p>{{msg}}}</p>
</div>
```      

```javascript
<!-- 静态提升之前 -->
import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("p", null, "mzs"),
    _createVNode("p", null, "mzs"),
    _createVNode("p", null, "mzs"),
    _createVNode("p", null, _toDisplayString(_ctx.msg) + "}", 1 /* TEXT */)
  ]))
}

// Check the console for the AST
```    
# hoistStatic 静态提升
    + Vue2中无论元素是否参与更新, 每次都会重新创建, 然后再渲染
    + Vue3中对于不参与更新的元素, 会做静态提升, 只会被创建一次, 在渲染时直接复用即可
```javascript
<!-- 静态提升之后 -->
import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"

const _hoisted_1 = /*#__PURE__*/_createVNode("p", null, "mzs", -1 /* HOISTED */)
const _hoisted_2 = /*#__PURE__*/_createVNode("p", null, "mzs", -1 /* HOISTED */)
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "mzs", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _hoisted_1,
    _hoisted_2,
    _hoisted_3,
    _createVNode("p", null, _toDisplayString(_ctx.msg) + "}", 1 /* TEXT */)
  ]))
}

// Check the console for the AST
```
    
# cacheHandlers 事件侦听器缓存
    + 默认情况下onClick会被视为动态绑定, 所以每次都会去追踪它的变化
      但是因为是同一个函数，所以没有追踪变化, 直接缓存起来复用即可

```javascript
<!--开启事件监听缓存之前-->
import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("button", { onClick: _ctx.onClick }, "按钮", 8 /* PROPS */, ["onClick"])
  ]))
}

// Check the console for the AST
```

```javascript
<!--开启事件监听缓存之后-->
import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("button", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClick && _ctx.onClick(...args)))
    }, "按钮")
  ]))
}

// Check the console for the AST
```
#
注意点: 我们只需要观察有没有静态标记即可
        因为我们知道在Vue3的diff算法中, 只有有静态标记的才会进行比较, 才会进行追踪
      
# ssr渲染
    + 当有大量静态的内容时候，这些内容会被当做纯字符串推进一个buffer里面，
      即使存在动态的绑定，会通过模板插值嵌入进去。这样会比通过虚拟dmo来渲染的快上很多很多。
    + 当静态内容大到一定量级时候，会用_createStaticVNode方法在客户端去生成一个static node，
      这些静态node，会被直接innerHtml，就不需要创建对象，然后根据对象渲染。




# 附录: PatchFlags
```javascript
export const enum PatchFlags {
  TEXT = 1,// 动态文本节点
  CLASS = 1 << 1, // 2  // 动态 class
  STYLE = 1 << 2, // 4 // 动态 style
  PROPS = 1 << 3, // 8 // 动态属性，但不包含类名和样式
  FULL_PROPS = 1 << 4, // 16 // 具有动态 key 属性，当 key 改变时，需要进行完整的 diff 比较。
  HYDRATE_EVENTS = 1 << 5, // 32 // 带有监听事件的节点
  STABLE_FRAGMENT = 1 << 6, // 64 // 一个不会改变子节点顺序的 fragment
  KEYED_FRAGMENT = 1 << 7, // 128 // 带有 key 属性的 fragment 或部分子字节有 key
  UNKEYED_FRAGMENT = 1 << 8, // 256 // 子节点没有 key 的 fragment
  NEED_PATCH = 1 << 9, // 512 // 一个节点只会进行非 props 比较
  DYNAMIC_SLOTS = 1 << 10, // 1024 // 动态 slot
  HOISTED = -1, // 静态节点
  // 指示在 diff 过程应该要退出优化模式
  BAIL = -2
}
```