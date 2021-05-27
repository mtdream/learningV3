// ref & setup
<template>
  <div>
    <button @click="getClick('refSetup')">refSetup</button>
    <button @click="getClick('todoList')">todoList</button>
    <button @click="getClick('compositionANDoption')">compositionANDoption</button>
  </div>
</template>

<script>

import { useRouter } from 'vue-router';
export default {
  name: 'Home',
  setup() {
    const router = useRouter();
    function getClick(type) {
      if(type === 'refSetup') {
        router.push('/refSetup')
      }
      if(type === 'todoList') {
        router.push('/todoList')
      }
      if(type === 'compositionANDoption') {
        router.push('/compositionANDoption')
      }
    }
    return {
      getClick
    };
  }
}

</script>
<style lang="">
  button {
    padding:0 20px;
    height: 30px;
    display: block;
    margin: 10px auto;
    cursor: pointer;
  }
</style>