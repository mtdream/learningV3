<!-- 
<template>
<div> 
  <p>{{msg1}}</p>
  <button @click="c1">button1</button>
  <p>{{msg2}}</p>
  <button @click="c2">button2</button>
</div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  name: 'App',
  data() {
    return {
      msg1: 0
    }
  },
  methods: {
    c1() {
      this.msg1 ++;
    }
  },
  setup() {
    let msg2 = ref(0);
    function c2() {
      msg2.value ++;
    }
    return {
      msg2,
      c2
    };
  }
}
</script>
--> 

<!--
//composition api 和 option api 允许混用。option api 就是过去那种 data，computed 的 Vue2.x 函数定义方案。
// 以下这是一个 两个api 相互之间没有交互的示例
// 记得，只有 option api 引用 composition api 的份，没有反过来的份。
// 而且由于 composition api 立即执行并 return 的原因，它不被允许作为 async 异步函数进行定义。
--> 

<template>
<div>
  <p>{{msg1}}</p>
  <button @click="c1">button1</button>
  <p>{{msg2}}</p>
  <button @click="c2">button2</button>
</div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  name: 'App',
  data() {
    return {
      msg1: 0
    }
  },
  methods: {
    c1() {
      this.msg1 ++;
      this.msg2 --;
    }
  },
  setup() {
    let msg2 = ref(0);
    function c2() {
      msg2.value ++;
    }
    return {
      msg2,
      c2
    };
  }
}

</script>
