// todoList

<template>
<div>
  <form>
    <input type="text" v-model="newState.item.name">
    <input type="text" v-model="newState.item.age">
    <input type="submit" @click="addItem">
  </form>
  <ul>
    <!-- 可以不要key值 -->
    <li v-for="(item, index) in state.items" @click="removeItem(index)">   
      No.{{index}} - {{item.name}} - {{item.age}}
    </li>
  </ul>
</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'TodoList',
  //进行封装------------------------------------------------------------
  // setup() {
  //   let state = reactive({
  //     items:[
  //       {
  //         name:'张三',
  //         age:15
  //       },
  //       {
  //         name:'李四',
  //         age:18
  //       },
  //       {
  //         name:'王五',
  //         age:24
  //       }
  //     ]
  //   })

  //   let newState = reactive({
  //     item:{
  //       name:'',
  //       age:''
  //     }
  //   })

  //   function addItem(e) {
  //     e.preventDefault()
  //     state.items.push(newState.item)
  //     newState.item = {
  //       name:'',
  //       age:''
  //     }
  //   }

  //   function removeItem(i) {
  //     state.items = state.items.filter((item,index) => index !== i)
  //   }

  //   return {
  //     state,
  //     removeItem,
  //     newState,
  //     addItem
  //   }
  // }
  //进行封装------------------------------------------------------------

 
  setup() {
    let {state, removeItem} = originalData();
    let {newState, addItem} = newData(state);
    return {
      state,
      removeItem,
      newState,
      addItem
    }
  }
}


//一下是函数，也可以封装成js
function originalData() {
  let state = reactive({
    items: [
      {
        name: '张三',
        age: '56'
      },
      {
        name: '李四',
        age: '54'
      },
      {
        name: '王五',
        age: '77'
      }
    ]
  })
  function removeItem(i) {
    state.items = state.items.filter((item, index) => index != i);
  }
  return {
    state,
    removeItem
  }
}

function newData(state) {
  let newState = reactive({
    item: {
      name: '',
      age: ''
    }
  })
  function addItem(e) {
    e.preventDefault();
    state.items.push(Object.assign({}, newState.item));
    newState.item.name = '';
    newState.item.age = '';
  }
  return {
    newState,
    addItem
  }
}



</script>