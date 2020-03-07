<template>
  <div class="food-category-manager-page">
    <el-card class="box-card">
     <el-table
      :data="foods"
      style="width: 100%"
      :default-sort = "{prop: 'type', order: 'ascending'}"
      >
      <el-table-column
        prop="type"
        label="商品类型"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="商品类型描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="list.length"
        label="商品数量"
        sortable
        :formatter="formatter">
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
  name: 'food-category-manager-page',
  data() {
    return {
      
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
    ...mapActions('food', [
      'queryFoodsInfo'
    ]),
    async init() {
      try {
        const foods = await this.queryFoodsInfo()
        console.log('foods: ', foods)
      } catch (error) {
        console.error(error)
      }
    },
    handleEdit(index, food) {
      console.log('index: ', index)
      console.log('food: ', food)
    },
    handleDelete(index, food) {
      console.log('index: ', index)
      console.log('food: ', food)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>