<script setup lang="ts">
import {ref, onMounted, reactive, nextTick} from 'vue'
import {Shop, ShopResponseData, Shops} from "@/api/shop/type";
import {reqShopList, reqAddOrUpdateShop, reqRemoveShop, reqDeleteSelectShop} from "@/api/shop";
import {httpErrorHandle} from "@/utils";
import {Edit, Delete} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";

let pageNo = ref<number>(1)

let pageSize = ref<number>(5)

let total = ref<number>(0)
let drawer = ref<boolean>(false)

let shopParams = reactive<Shop>({
  id: '',
  base: '',
  detail: ''
})

// 表单中东非数据
let shopArr = ref<Shops>([])
// 表单信息
let formRef = ref<any>()


// 用于条件查询的字段
let shopBase = ref<string>('')
let shopDetail = ref<string>('')

// 挂载 getShopList
onMounted(() => {
  getShopList()
})

// 获取用户功能
const getShopList = async (pager = 1) => {
  pageNo.value = pager
  let res = await reqShopList(
      pageNo.value,
      pageSize.value,
      shopDetail.value,
      shopBase.value
  );
  if (res && res.data) {
    let data: ShopResponseData = res.data
    if (res.code === 200) {
      total.value = data.total
      shopArr.value = data.shops
    }
    return
  }
  httpErrorHandle()
}
const handler = () => {
  getShopList()
}


// 添加用户按钮功能
const addUser = () => {
  drawer.value = true
  Object.assign(shopParams, {
    id: '',
    base: '',
    detail: ''
  })
  nextTick(() => {
    formRef.value.clearValidate('base')
    formRef.value.clearValidate('detail')
  })
}


// 提交表单对应的数据给后端
const save = async () => {
  formRef.value.validate()
  let res: any = await reqAddOrUpdateShop(shopParams)
  if (res.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: shopParams.id ? '更新成功' : '添加成功',
    })
    window.location.reload()
  } else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: shopParams.id ? '更新失败' : '添加失败',
    })
  }
}


// 删除用户确定
const deleteUser = async (shopId: string) => {
  let res: any = await reqRemoveShop(shopId)
  if (res.code === 200) {
    ElMessage({type: 'success', message: '删除成功'})
    getShopList(shopArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}


let selectIdArr = ref<Shop[]>([])

// 删除选择用户
const deleteSelectUser = async () => {
  let idList: any = selectIdArr.value.map((item) => {
    return item.id
  })
  let res: any = await reqDeleteSelectShop(idList)
  if (res.code === 200) {
    ElMessage({type: 'success', message: '删除成功'})
    getShopList(shopArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}

// 编辑用户按钮
const updateUser = (row: Shop) => {
  drawer.value = true
  Object.assign(shopParams, row)
  nextTick(() => {
    formRef.value.clearValidate('base')
    formRef.value.clearValidate('detail')
  })
}

const search = () => {
  getShopList()
  shopBase.value = ''
  shopDetail.value = ''
}
const selectChange = (value: any) => {
  selectIdArr.value = value
}


// 取消添加商铺的表单
const cancel = () => {
  drawer.value = false
}

</script>
<template>
  <div>

    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="店铺具体位置:">
          <el-input placeholder="输入店铺具体位置：" v-model="shopDetail"></el-input>
        </el-form-item>
        <el-form-item label="店铺区:">
          <el-input placeholder="输入店铺区：" v-model="shopBase"></el-input>
        </el-form-item>
        <el-form-item class="buttonFormItem">
          <el-button type="primary"
                     size="default"
                     :disabled="(shopBase.length==0)&&(shopDetail.length==0)"
                     @click="search">
            搜索
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
      <el-button type="danger" size="default"
                 :disabled="!selectIdArr.length"
                 @click="deleteSelectUser">批量删除
      </el-button>
      <el-table style="margin: 10px 0" :data="shopArr" @selection-change="selectChange" border>
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="商店ID" align="center" prop="id"></el-table-column>
        <el-table-column label="商店地区" align="center" prop="base" show-overflow-tooltip></el-table-column>
        <el-table-column label="商店地址" align="center" prop="detail" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" :icon="Edit" @click="updateUser(row)">编辑</el-button>
            <el-popconfirm @confirm="deleteUser(row.id)" :title="`你确定删除${row.detail}`" width="260px">
              <template #reference>
                <el-button type="danger" size="small" :icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[5, 7, 9, 11]"
          :background="true"
          layout="prev, pager, next, jumper, -> , sizes, total"
          :total="total"
          @current-change="getShopList"
          @size-change="handler"
      />
    </el-card>
    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ shopParams.id ? '更新商铺' : '添加商铺' }}</h4>
      </template>
      <template #default>
        <el-form :model="shopParams" ref="formRef">
          <el-form-item label="商铺地区">
            <el-input placeholder="请您输入商铺地区" v-model="shopParams.base"></el-input>
          </el-form-item>
          <el-form-item label="商铺地址">
            <el-input placeholder="请您输入商铺地址" v-model="shopParams.detail"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <el-drawer>
      <template #header>
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox>
              全选
            </el-checkbox>
            <el-checkbox-group>
              <el-checkbox>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button>取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<style lang="scss" scoped>
.form {
  display: flex;
  align-items: center;
}

.buttonFormItem {
  // 让按钮居右
  margin-left: auto;

}


</style>
