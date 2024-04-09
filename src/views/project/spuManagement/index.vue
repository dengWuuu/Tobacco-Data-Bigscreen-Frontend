<script setup lang="ts">
import {ref, onMounted, reactive, nextTick} from 'vue'
import {reqAddOrUpdateSpu, reqSpuList, reqRemoveSpu, reqDeleteSelectSpu} from "@/api/spu";
import {httpErrorHandle} from "@/utils";
import {Spu, Spus, SpuResponseData} from "@/api/spu/type";
import {Edit, Delete} from '@element-plus/icons-vue'
import {SpuType, SpuTypeResponseData, SpuTypes} from "@/api/spu_type/type";
import {reqAddOrUpdateSpuType, reqDeleteSelectSpuType, reqRemoveSpuType, reqSpuTypeList} from "@/api/spu_type";
import {ElMessage} from "element-plus";

let pageNo = ref<number>(1)

let pageSize = ref<number>(5)

let total = ref<number>(0)
let drawer = ref<boolean>(false)

let spuParams = reactive<Spu>({})

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
const handler = () => {
  getSpuList()
}
// 挂载
onMounted(() => {
  getSpuList()
  getSpuTypeList()
})

const getSpuType = (typeId: number) => {
  if (typeId === 1) {
    return '烟草'
  }
  if (typeId === 2) {
    return '零食'
  }
}
const value = ref('')
// 添加用户按钮功能
const addSpu = () => {
  drawer.value = true
  Object.assign(spuParams, {})
  nextTick(() => {
    formRef.value.clearValidate('skuName')
    formRef.value.clearValidate('type')
    formRef.value.clearValidate('price')
    formRef.value.clearValidate('purchasePrice')
    formRef.value.clearValidate('image')
    formRef.value.clearValidate('status')
    formRef.value.clearValidate('num')
  })
}

// 种类选择框
const options = ref<SpuTypes>([])

const getSpuTypeList = async () => {
  let res = await reqSpuTypeList(
      0,
      0,
      ""
  );
  console.log(res)
  if (res && res.data) {
    let data: SpuTypeResponseData = res.data
    if (res.code === 200) {
      options.value = data.spuTypes
    }
    return
  }
  httpErrorHandle()
}

const save = async () => {
  formRef.value.validate()
  let res: any = await reqAddOrUpdateSpu(spuParams)
  if (res.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: spuParams.id ? '更新成功' : '添加成功',
    })
    window.location.reload()
  } else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: spuParams.id ? '更新失败' : '添加失败',
    })
  }
}
const updateUser = (row: SpuType) => {
  drawer.value = true
  Object.assign(spuParams, row)
  nextTick(() => {
    formRef.value.clearValidate('skuName')
    formRef.value.clearValidate('type')
    formRef.value.clearValidate('price')
    formRef.value.clearValidate('purchasePrice')
    formRef.value.clearValidate('image')
    formRef.value.clearValidate('status')
    formRef.value.clearValidate('num')
  })
}
const search = () => {
  getSpuList()
  skuName.value = ''
}

// 取消添加商铺的表单
const cancel = () => {
  drawer.value = false
}


import {Plus} from '@element-plus/icons-vue'
import type {UploadProps} from 'element-plus'

const handleSuccess = (res: { code: number; data: { fileurl: string | undefined; }; msg: any; }) => {
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '上传成功'
    })
    spuParams.image = res.data.fileurl
  } else {
    ElMessage({
      type: 'warning',
      message: res.msg
    })
  }
}


const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const deleteSpu = async (SpuId: string) => {
  let res: any = await reqRemoveSpu(SpuId)
  if (res.code === 200) {
    ElMessage({type: 'success', message: '删除成功'})
    getSpuList(spuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}

let selectIdArr = ref<SpuType[]>([])
const deleteSelectSpu = async () => {
  let idList: any = selectIdArr.value.map((item) => {
    return item.id
  })
  let res: any = await reqDeleteSelectSpu(idList)
  if (res.code === 200) {
    ElMessage({type: 'success', message: '删除成功'})
    getSpuList(spuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}

const selectChange = (value: any) => {
  selectIdArr.value = value
}
</script>
<template>
  <div>

    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="商品名:">
          <el-input placeholder="请你输入搜索商品名" v-model="skuName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" size="default" @click="addSpu">
        添加商品
      </el-button>
      <el-button
          type="danger"
          size="default"
          @click="deleteSelectSpu"
      >
        批量删除
      </el-button>
      <el-table
          style="margin: 10px 0"
          :data="spuArr"
          @selection-change="selectChange"
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
            <el-button type="primary" size="small" :icon="Edit" @click="updateUser(row)">编辑
            </el-button>
            <el-popconfirm @confirm="deleteSpu(row.id)" :title="`你确定删除${row.skuName}`" width="260px">
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
          @current-change="getSpuList"
          @size-change="handler"
      />
    </el-card>
    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ spuParams.id ? '更新商品' : '添加商品' }}</h4>
      </template>
      <template #default>
        <el-form ref="formRef">
          <el-form-item label="商品名字" prop="skuName">
            <el-input
                placeholder="请您输入商品名字"
                v-model="spuParams.skuName"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品种类" prop="type">
            <el-select
                placeholder="选择商品种类"
                v-model="spuParams.type"
            >
              <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input
                placeholder="请您输入商品价格"
                v-model="spuParams.price"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品进货价" prop="purchasePrice">
            <el-input
                placeholder="请您输入商品进货价"
                v-model="spuParams.purchasePrice"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="image">
            <el-upload
                class="avatar-uploader"
                action="http://localhost:8083/api/project/upload"
                name="object"
                :show-file-list="false"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
            >
              <img v-if="spuParams.image" :src="spuParams.image" class="avatar"/>
              <el-icon v-else class="avatar-uploader-icon">
                <Plus/>
              </el-icon>
            </el-upload>


          </el-form-item>
          <el-form-item label="商品状态" prop="status">
            <el-select v-model="spuParams.status" placeholder="选择商品状态">
              <el-option
                  label="已上架"
                  value=1
              />
              <el-option
                  label="未上架"
                  value=0
              />
            </el-select>
          </el-form-item>

          <el-form-item label="商品库存" prop="num">
            <el-input
                placeholder="请您输入商品库存"
                v-model="spuParams.num"
            ></el-input>
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
  justify-content: space-between;
  align-items: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
