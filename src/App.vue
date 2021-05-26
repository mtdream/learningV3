<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <refSetup /> -->
  <todoList />
</template>

<script>
import refSetup from './components/refSetup.vue'   //
import todoList from './components/todoList.vue'   //
export default {
  name: 'App',
  components: {
    refSetup,
    todoList
  }
}
</script>
<style lang="">
  ul li {
    list-style: none;
  }
  * {
    margin: 0;
    padding: 0;
  }
</style>
