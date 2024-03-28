<template>
  <div>
    <h2>员工管理</h2>

    <div id="big">
      <!-- 导入element框架的表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column prop="id" label="id" align="center"/>
        <el-table-column prop="name" label="员工名称" align="center"/>
        <el-table-column prop="price" label="员工姓名" align="center"/>
        <el-table-column prop="LoadingDate" label="员工性别" align="center"/>
        <el-table-column prop="isSold" label="员工年龄" align="center" #default="scope">
          <input type="checkbox" v-model="scope.row.isSold">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200" #default="scope">
          <el-button type="danger" size="small" @click="del(scope.$index)">删除</el-button>
          <el-button type="primary" size="small" @click="show(scope.$index,scope.row)">修改</el-button>
          <el-button type="info" size="small">详情</el-button>
        </el-table-column>

      </el-table>
    </div>
    <!-- 模式窗口 -->

    <fieldset>
      <legend>员工管理</legend>
      id：<input type="text" placeholder="请输入商品编号" v-model="productInfo.id">
      <br/><br/>
      员工名称：<input type="text" placeholder="请输入商品名称" v-model="productInfo.name">
      <br/><br/>
      员工姓名：<input type="number" placeholder="请输入商品价格" v-model="productInfo.price">
      <br/><br/>
      员工性别：<input type="date" v-model="productInfo.LoadingDate">
      <br/><br/>
      员工年龄：<input type="number" placeholder="请输入商品价格" v-model="productInfo.price">

      <br/><br/>

      <el-button type="success" @click="add()">添加</el-button>

    </fieldset>

  </div>


</template>


<script lang="ts">
import {reactive} from 'vue';

export default {
  setup() {
    // 定义要渲染到页面的初始数据
    const tableData = reactive([
      {
        id: "201300001",
        name: '农夫山泉',
        price: "1.2",
        LoadingDate: "2013-01-07",
        isSold: "true"
      },
      {
        id: "201300002",
        name: '百岁山',
        price: "3.5",
        LoadingDate: "2014-09-21",
        isSold: "true"
      },
      {
        id: "201300003",
        name: '棒棒糖',
        price: "1.5",
        LoadingDate: "2015-02-01",
        isSold: "false"
      },
      {
        id: "201300004",
        name: '冰激凌',
        price: "8",
        LoadingDate: "2019-06-13",
        isSold: "true"
      },
      {
        id: "201300005",
        name: '蛋糕',
        price: "66",
        LoadingDate: "2021-11-12",
        isSold: "false"
      },
    ]);

    // 文本框双向绑定的值
    const productInfo = reactive({id: "", name: "", price: "", LoadingDate: "", isSold: ""});

    // 删除功能，传索引行数
    function del(index: number) {
      // splice方法，传两个参数：第几行开始，删除多少条（如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素）
      tableData.splice(index, 1)
    }

    // 添加功能
    function add() {
      // 定义对象，存储从文本框获取到的数据
      const addArray = {
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        LoadingDate: productInfo.LoadingDate,
        isSold: productInfo.isSold,
      }
      // push方法，添加一条数据到初始数据的数组中
      tableData.push(addArray);
    }

    // 点击表格上的修改按钮，把该行信息显示到文本框里
    // 传该行的下标（index）与该行（row）信息过来，渲染文本框
    // 注意：要是index参数虽然在这里看似没有用上，但是不写index参数会不实现功能的！！！！
    function show(index: number, row: any) {
      productInfo.id = row.id;
      productInfo.name = row.name;
      productInfo.price = row.price;
      productInfo.LoadingDate = row.LoadingDate;
      productInfo.isSold = row.isSold;
    }

    // 修改功能
    function update() {
      // 也是一样的定义一个对象，用于存储文本框的数据
      const updateArray = {
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        LoadingDate: productInfo.LoadingDate,
        isSold: productInfo.isSold,
      }
      // 返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
      // 大意就是：传入一个参数（id），让id与文本框里的id对比，找到两个id相同的哪个元素，保存
      const index = tableData.findIndex(o => o.id === updateArray.id);
      // 然后删掉index找到的那一条元素，先删，然后再添加文本框里面的数据到数组中
      // splice方法的第三个参数是添加一条新元素到数组里
      tableData.splice(index, 1, updateArray)
    }

    // 暴露方法到页面上
    return {tableData, del, productInfo, add, show, update}
  }
}
</script>
<style scoped>
h2 {
  text-align: center;
}

#big {
  width: 80%;
  margin: auto;
}

fieldset {
  width: 40%;
  margin-left: 10%;
  margin-top: 30px;
}
</style>

