<template>
  <div class="food-info-manager-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品类型：</span>
        <el-select v-model="value" placeholder="请选择" clearable @change="hanldeSelectChange(value)">
          <el-option
            v-for="({type, title}) in category"
            :key="type"
            :label="title"
            :value="type">
          </el-option>
        </el-select>
        <el-button style="float: right; padding: 3px 0" type="text" @click="hanldeAddfood">添加商品</el-button>
      </div>
      <el-table
        border
        :data="list"
        style="width: 100%"
        :default-sort = "{prop: 'type', order: 'ascending'}"
        >
        <el-table-column
          prop="id"
          label="商品ID"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="title"
          label="商品名">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="商品描述">
        </el-table-column>
        <el-table-column
          prop="typeDesc"
          label="商品类型"
          >
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          sortable>
          <template slot-scope="scope">
            <div class="total-price">¥<span class="total-price-num">{{scope.row.price | integer }}</span>.{{scope.row.price | decimals}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="isUp"
          label="是否上架"
          >
            <template slot-scope="scope">
              <div class="check">
                <span class="desc">{{scope.row.isUp ? '上架' : '下架'}}</span>
                <el-switch
                  style="display: block"
                  v-model="scope.row.isUp"
                  active-color="#ff4949"
                  @change="handleRoomUp(scope.$index, scope.row)"
                  >
                  </el-switch>
              </div>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'food-info-manager-page',
  data() {
    return {
      value: null,
      list: [],
      category: []
    }
  },
   filters: {
    integer(value) {
      value = Number(value).toFixed(2) + ''
      return value.split('.')[0]
    },
    decimals(value) {
      value = Number(value).toFixed(2) + ''
      return value.split('.')[1]
    }
  },
  created() {
    this.init()
  },
  computed: {
     ...mapGetters([
      'foods'
    ])
  },
  methods: {
    // formatter({isCheck}, column) {console.log('row: ', row)},
    ...mapActions('food', [
      'queryFoodsInfo'
    ]),
    async init(type = 0) {
      try {
        this.list = []
        this.category = []
        const foods = await this.queryFoodsInfo()
        const foodsType = await this.queryFoodsInfo({type})
        console.log('foods: ', foods)
        console.log('foodsType: ', foodsType)
        foods.forEach(({type, title}) => this.category.push({type, title}))
        foodsType.forEach(({list}) => this.list.push(...list))
        console.log('foods: ', foods)
      } catch (error) {
        console.error(error)
      }
    },
    // 查询条件改变
    hanldeSelectChange(value) {
      console.log('value: ', value)
      this.init(value)
    },
    // 编辑
    handleEdit(index, food) {
      console.log('index: ', index)
      console.log('food: ', food)
    },
    // 删除
    handleDelete(index, food) {
      console.log('index: ', index)
      console.log('food: ', food)
    },
    // 切换商品的预定状态
    handlefoodCheck(index, food) {
      console.log('index: ', index)
      console.log('food: ', food)
    },
    // 添加新的商品
    hanldeAddfood() {

    }
  }
}
</script>
<style lang="scss" scoped>
.check {
  display: flex;
  flex-flow: row nowrap;
  .desc {
    width: 60px;
  }
}
.total-price {
  color: #fe5455;
  font-size: 12px;
  display: inline-block;
  font-weight: bold;
}
.total-price-num {
  font-size: 18px;
}
</style>