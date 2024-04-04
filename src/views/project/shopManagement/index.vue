<script setup lang="ts">
import {ref, onMounted, reactive, nextTick} from 'vue'

let pageNo = ref<number>(1)

let pageSize = ref<number>(5)

let total = ref<number>(0)
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
      <el-button type="primary" size="default">
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
          border
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="id" align="center" prop="id"></el-table-column>
        <el-table-column
            label="用户名字"
            align="center"
            prop="username"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            label="用户名称"
            align="center"
            prop="name"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            label="用户角色"
            align="center"
            prop="roleName"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column
            label="更新时间"
            align="center"
            prop="updateTime"
            show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #="{ row, $index }">
            <el-button size="small" icon="User">
              分配角色
            </el-button>
            <el-button
                type="primary"
                size="small"
                icon="Edit"

            >
              编辑
            </el-button>
            <el-popconfirm
                :title="`你确定删除${row.username}`"
                width="260px"

            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">
                  删除
                </el-button>
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
    <el-drawer>
      <template #header>
        <h4></h4>
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