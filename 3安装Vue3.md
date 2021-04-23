# 1. Vue3.0-快速上手
    创建Vue3的3种方式
    1 Vue CLI
    2 Webpack
    3 Vite
# 2.什么是Vite?
    Vite是Vue作者开发的一款 意图取代webpack的工具
    其实现原理是利用ES6的import会发送请求去加载文件的特性，
    拦截这些请求，做一些预编译， 省去webpack冗长的打包时间
# 安装Vite
    npm install -g create-vite-app
    利用Vite创建Vue3项目
    create-vite-app projectName 
    安装依赖运行项目
    cd projectName
    npm install
    npm run dev