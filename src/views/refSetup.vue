// ref & setup
<template>
<div>
  <p>{{count}}</p>
  <button @click="getClick">button</button>
</div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'RefSetup',
  setup() {
    let count = ref(0);
    function getClick() {
      count.value ++;
    }
    return {
      count,
      getClick
    };
  }
}


//#Ref
// Ref是这样的一种数据结构：它有个key为Symbol的属性做类型标识，有个属性value用来存储数据。这个数据可以是任意的类型，唯独不能是被嵌套了Ref类型的类型。

// Ref类型的数据，是一种响应式的数据。

// Ref写法简单，但也有弊端，它只能监听一些如数字、字符串、布尔之类的简单数据。复杂数据需要用到以后讲的 reactive 。（实际上也可以用 Ref 来封装对象，只不过在访问上多一层 value ，稍微麻烦了一些）。

// ---------------------------------------------------------------------------------------------------------------------------

// #setup
// setup，就是我们最近老是能听到的 Composition API，组合式 API。关于这个 API 的细节，还请参阅官方文档，这里我只期望说一下简单的内容。

// setup 选项应该是一个接受 props 和 context 的函数。此外，我们从 setup 返回的所有内容都将暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。

// 也就是说，setup 中创建并 return 的所有东西，都将被得到外部的解析，无论是过去在 data 中创建的数据也好，还是在 methods 创建的方法也好，都将变成允许被响应式地使用，仿佛 Vue2 中的这些 API 都被融合在一起了一样，而实际上 Vue3 也是为了实现这个目的。

// 有了这两点认识（ref和setup），我想上面的代码就变得简单了起来。

// #我们用这个 API 来实现试一下Todo List, 用组合 API 来实现

</script>
