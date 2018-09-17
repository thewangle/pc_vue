import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
const checkedId = []
function getCheckedId(menulist) {
  menulist.forEach(item => {
    checkedId.push(item.id)
    if (item.childs.length) {
      getCheckedId(item.childs)
    }
  })
}

function findIdRoute(asyncRouterMap, id) {
  asyncRouterMap.forEach(item => {
    if (id === item.id) {
      item.hidden = false
    }
    if (item.children) {
      findIdRoute(item.children, id)
    }
  })
}

function getRoutes(asyncRouterMap) {
  checkedId.forEach(id => {
    findIdRoute(asyncRouterMap, +id)
  })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, menulist) {
      getCheckedId(menulist)
      getRoutes(asyncRouterMap)
      return new Promise(resolve => {
        const accessedRouters = asyncRouterMap
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
