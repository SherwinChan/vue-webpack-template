// require.ensure 是 Webpack 的特殊语法， 用来设置 code - split point（ 代码分块）
// const AllContainer = resolve => {
//   require.ensure([], () => {
//     resolve(require('../views/allcontainer.vue'))
//   })
// }

const AllContainer = () => import('../views/allcontainer.vue');


export const constantRouterMap = [
  {
    path: '/',
    name: '/',
    redirect: {
      name: 'index'
    },
    meta: {
      title: '首页'
    },
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页',
      menu_name: 'index'
    },
    component: AllContainer,
  },
  {
    // 功能开发中
    path: '*',
    name: '404',
    meta: {
      title: '404 找不到页面',
    },
    component: () => import('../views/building.vue'),
  },
]

// // 异步addRouter路由
// export const asyncRouterMap = []