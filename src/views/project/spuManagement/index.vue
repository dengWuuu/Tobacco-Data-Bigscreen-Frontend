<script setup lang="ts">
import {ref, onMounted, reactive, nextTick} from 'vue'
import {reqSpuList} from "@/api/spu";
import {httpErrorHandle} from "@/utils";
import {Spu, Spus, SpuResponseData} from "@/api/spu/type";
import {Edit, Delete} from '@element-plus/icons-vue'

let pageNo = ref<number>(1)

let pageSize = ref<number>(5)

let total = ref<number>(0)
let drawer = ref<boolean>(false)

let spuParams = reactive<Spu>({
  id: '',
  skuName: '',
  type: 0,
  price: 0,
  purchasePrice: 0,
  image: '',
  status: 0,
  num: 0,
})

// 表单中东非数据
let spuArr = ref<Spus>([])
// 表单信息
let formRef = ref<any>()
let skuName = ref<string>('')

// 获取用户功能
const getSpuList = async (pager = 1) => {
  pageNo.value = pager
  let res = await reqSpuList(
      pageNo.value,
      pageSize.value,
      skuName.value,
  );
  if (res && res.data) {
    console.log(res)
    if (res.code === 200) {
      total.value = res.data.total
      spuArr.value = res.data.spus
    }
    return
  }
  httpErrorHandle()
}
// 挂载
onMounted(() => {
  getSpuList()
})

const getSpuType = (typeId: number) => {
  if (typeId === 1) {
    return '烟草'
  }
  if (typeId === 2) {
    return '零食'
  }
}

// 添加用户按钮功能
const addUser = () => {
}
</script>
<template>
  <div>

    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名:">
          <el-input placeholder="请你输入搜索用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default">搜索</el-button>
          <el-button size="default">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" size="default" @click="addUser">
        添加用户
      </el-button>
      <el-button
          type="danger"
          size="default"
      >
        批量删除
      </el-button>
      <el-table
          style="margin: 10px 0"
          :data="spuArr"
          border
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="商品id" align="center" prop="id"></el-table-column>
        <el-table-column
            label="商品名字"
            align="center"
            prop="skuName"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            label="商品类型"
            align="center"
            prop="type"
            show-overflow-tooltip
        >
          <template #default="scope">
            {{ getSpuType(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
            label="商品价格"
            align="center"
            prop="price"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            label="商品进价"
            align="center"
            prop="purchasePrice"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            label="商品图片"
            align="center"
            prop="image"
            show-overflow-tooltip
        >
          <template #default="scope">
            <el-image :src="scope.row.image"></el-image>
          </template>
        </el-table-column>
        <el-table-column
            label="商品状态"
            align="center"
            prop="status"
            show-overflow-tooltip
        >
          <template #default="scope">
            <el-tag
                :type="scope.row.status == 0 ? '' : 'success'"
                disable-transitions
            >{{ scope.row.status == 1 ? '已上架' : '已下架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            label="商品库存"
            align="center"
            prop="num"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" :icon="Edit">编辑
            </el-button>
            <el-popconfirm :title="`你确定删除${row.username}`" width="260px">
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

      />
    </el-card>
    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ spuParams.id ? '更新用户' : '添加用户' }}</h4>
      </template>
      <template #default>
        <el-form ref="formRef">
          <el-form-item label="用户姓名" prop="username">
            <el-input
                placeholder="请您输入用户姓名"

            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input
                placeholder="请您输入用户昵称"

            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input
                placeholder="请您输入用户密码"
            ></el-input>
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
  justify-content: space-between;
  align-items: center;
}
</style>
