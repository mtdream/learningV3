## setup 是什么
    基于 Options API 的方式我们必须在 
    data、computed、methods 三个选项中跳转，来完成这段逻辑。
    而通过 Composition API的方式我们把相同逻辑关注点的代码并列在一起，形成了一个独立的逻辑函数。

## setup函数的生命周期
    setup 这个函数是在beforeCreate和created之前运行的,所以你可以用它来代替这两个钩子函数
## VUE3与VUE2生命周期的对比
    你可以通过在生命周期钩子前面加上 “on” 来访问组件的生命周期钩子。
    下表包含如何在 setup () 内部调用生命周期钩子：
    
    beforeCreate  -> setup()
    created       -> setup()
    beforeMount   -> onBeforeMount
    mounted       -> onMounted
    beforeUpdate  -> onBeforeUpdate
    updated       -> onUpdated
    beforeDestroy -> onBeforeUnmount
    destroyed     -> onUnmounted
    activated     -> onActivated
    deactivated   -> onDeactivated
    errorCaptured -> onErrorCaptured

>TIP
>
>因为 setup 是围绕 beforeCreate 和 created >生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任>何代码都应该直接在 setup 函数中编写。

```javeScript
这些函数接受一个回调函数，当钩子被组件调用时将会被执行:
// MyBook.vue

export default {
  setup() {
    // mounted
    onMounted(() => {
      console.log('Component is mounted!')
    })
  }
}

```