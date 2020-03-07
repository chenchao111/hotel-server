<template>
  <div class="order-info-manager-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <span>查询时间&nbsp;:&nbsp;&nbsp;&nbsp;</span>
              <el-date-picker
                v-model="date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="6">
            <span>订单状态：</span>
            <el-select v-model="status" placeholder="请选择" clearable @change="hanldeSelectChange(value)">
              <el-option
                v-for="({val, desc}) in statusList"
                :key="val"
                :label="desc"
                :value="val">
              </el-option>
            </el-select>
          </el-col>
           <el-col :span="6">
            <div>
              <el-input
                placeholder="请输入单号/姓名/联系电话"
                prefix-icon="el-icon-search"
                v-model="search" clearable>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-table
        border
        :data="orderHotel"
        style="width: 100%"
        :default-sort = "{prop: 'createTime', order: 'descending'}"
        >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单编号">
                <span>{{ props.row.no }}</span>
              </el-form-item>
              <el-form-item label="下单客户名">
                <span>{{ props.row.user.name }}</span>
              </el-form-item>
              <el-form-item label="微信昵称">
                <span>{{ props.row.user.nickname }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.user.tel }}</span>
              </el-form-item>
              <el-form-item label="房间名称">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="房间id">
                <span>{{ props.row.room }}</span>
              </el-form-item>
              <el-form-item label="住宿时间">
                <span>{{`${props.row.start}至${props.row.end}`}}</span>
              </el-form-item>
              <el-form-item label="单价">
                <span class="total-price">¥ &nbsp;<span class="total-price-num">{{props.row.price | integer }}</span>.{{props.row.price | decimals}}</span>
              </el-form-item>
              <el-form-item label="下单时间">
                <span>{{ (new Date(props.row.createTime)).toLocaleString() }}</span>
              </el-form-item>
              <el-form-item label="天数">
                <span>{{ props.row.day }}</span>
              </el-form-item>
              <el-form-item label="总价">
                <span class="total-price">¥ &nbsp;<span class="total-price-num">{{props.row.total | integer }}</span>.{{props.row.total | decimals}}</span>
              </el-form-item>
              <el-form-item label="订单状态">
                <div :class="['normal', Number(props.row.status)? 'color' : '']">{{Number(props.row.status) === 0 ? '已完成' : '待支付'}}</div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="no"
          label="订单编号"
          >
        </el-table-column>
        <el-table-column
          prop="user.name"
          label="下单客户名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="user.tel"
          label="联系电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="title"
          label="房间名称">
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          width="100"
          >
          <template slot-scope="scope">
            <div class="total-price">¥<span class="total-price-num">{{scope.row.price | integer }}</span>.{{scope.row.price | decimals}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="day"
          label="天数"
          width="80">
        </el-table-column>
        <el-table-column
          prop="total"
          label="总价"
          width="100"
          >
          <template slot-scope="scope">
            <div class="total-price">¥<span class="total-price-num">{{scope.row.total | integer }}</span>.{{scope.row.total | decimals}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="下单时间"
          sortable
          :formatter="({createTime}) => (new Date(createTime)).toLocaleString()">
        </el-table-column>
        <el-table-column
          label="住宿时间"
          :formatter="({start, end}) => `${start}至${end}`">
        </el-table-column>
        <el-table-column
          label="订单状态"
          width = "100"
          :formatter="({status}) => status === 0 ? '已完成' : '待支付'">
          <template slot-scope="scope">
            <div :class="['normal', Number(scope.row.status)? 'color' : '']">{{Number(scope.row.status) === 0 ? '已完成' : '待支付'}}</div>
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
  name: 'order-info-manager-page',
  data() {
    return {
      status: 2,
      statusList: [
        {
          val: 2,
          desc: '全部'
        },
        {
          val: 1,
          desc: '待支付'
        },
        {
          val: 0,
          desc: '已完成'
        }
      ],
      date: '',
      search: '',
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
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
      'orderHotel'
    ])
  },
  methods: {
    // formatter({isCheck}, column) {console.log('row: ', row)},
    ...mapActions('order', [
      'queryOrders',
    ]),
    async init({type = 1} = {}) {
      try {
        const {orders, type} = await this.queryOrders({type})
        console.log('orders: ', orders)
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
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .normal {
    font-weight: bold;
    font-size: 20px;
  }
  .color {
    color: #fe5455;
  }
</style>