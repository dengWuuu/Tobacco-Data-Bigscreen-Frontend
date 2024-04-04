import {RouteRecordRaw} from 'vue-router'
import {PageEnum} from '@/enums/pageEnum'

// 引入路径
const importPath = {
    'PageEnum.BASE_HOME_NAME': () => import('@/views/project/index.vue'),
    'PageEnum.BASE_HOME_ITEMS_NAME': () => import('@/views/project/items/index.vue'),
    'PageEnum.BASE_HOME_EMPLOYEE_MANAGEMENT_NAME': () => import('@/views/project/employeeManagement/index.vue'),
    'PageEnum.BASE_HOME_SPU_MANAGEMENT_NAME': () => import('@/views/project/spuManagement/index.vue'),
    'PageEnum.BASE_HOME_SPU_TYPE_MANAGEMENT_NAME': () => import('@/views/project/spuTypeManagement/index.vue'),
    'PageEnum.BASE_HOME_SHOP_MANAGEMENT_NAME': () => import('@/views/project/shopManagement/index.vue')
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
        {
            path: PageEnum.BASE_HOME_SPU_MANAGEMENT,
            name: PageEnum.BASE_HOME_SPU_MANAGEMENT_NAME,
            component: importPath['PageEnum.BASE_HOME_SPU_MANAGEMENT_NAME'],
            meta: {
                title: '商品管理'
            }
        },
        {
            path: PageEnum.BASE_HOME_SPU_TYPE_MANAGEMENT,
            name: PageEnum.BASE_HOME_SPU_TYPE_MANAGEMENT_NAME,
            component: importPath['PageEnum.BASE_HOME_SPU_TYPE_MANAGEMENT_NAME'],
            meta: {
                title: '商品类型管理'
            }
        },
        {
            path: PageEnum.BASE_HOME_SHOP_MANAGEMENT,
            name: PageEnum.BASE_HOME_SHOP_MANAGEMENT_NAME,
            component: importPath['PageEnum.BASE_HOME_SHOP_MANAGEMENT_NAME'],
            meta: {
                title: '店铺管理'
            }
        }
    ]
}

export default projectRoutes
