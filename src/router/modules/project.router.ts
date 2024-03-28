import {RouteRecordRaw} from 'vue-router'
import {PageEnum} from '@/enums/pageEnum'

// 引入路径
const importPath = {
    'PageEnum.BASE_HOME_NAME': () => import('@/views/project/index.vue'),
    'PageEnum.BASE_HOME_ITEMS_NAME': () => import('@/views/project/items/index.vue'),
    'PageEnum.BASE_HOME_EMPLOYEE_MANAGEMENT_NAME': () => import('@/views/project/employeeManagement/index.vue')
}

const projectRoutes: RouteRecordRaw = {
    path: PageEnum.BASE_HOME,
    name: PageEnum.BASE_HOME_NAME,
    component: importPath['PageEnum.BASE_HOME_NAME'],
    redirect: PageEnum.BASE_HOME_ITEMS,
    meta: {
        title: '项目',
        isRoot: true
    },
    children: [
        {
            path: PageEnum.BASE_HOME_ITEMS,
            name: PageEnum.BASE_HOME_ITEMS_NAME,
            component: importPath['PageEnum.BASE_HOME_ITEMS_NAME'],
            meta: {
                title: '我的项目'
            }
        },
        {
            path: PageEnum.BASE_HOME_EMPLOYEE_MANAGEMENT,
            name: PageEnum.BASE_HOME_EMPLOYEE_MANAGEMENT_NAME,
            component: importPath['PageEnum.BASE_HOME_EMPLOYEE_MANAGEMENT_NAME'],
            meta: {
                title: '员工管理'
            }
        },
    ]
}

export default projectRoutes
