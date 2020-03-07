<template>
  <div class="user-manager-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-col :span="6">
          <div>
            <el-input
              placeholder="请输入用户名/微信昵称/手机号"
              prefix-icon="el-icon-search"
              v-model="search" clearable>
            </el-input>
          </div>
        </el-col>
      </div>
       <el-table
        border
        :data="users"
        style="width: 100%"
        :default-sort = "{prop: 'type', order: 'ascending'}"
        >
        <el-table-column label="头像" width="160">
          <template slot-scope="scope">
            <img :src="scope.row.headimgurl" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="contacts.name"
          label="用户名"
          width="120"
          >
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="微信昵称">
        </el-table-column>
        <el-table-column
          prop="contacts.tel"
          label="手机号"
          >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          :formatter="({sex}) => Number(sex) === 1 ? '男' : '女'"
          >
        </el-table-column>
        <el-table-column
          prop="openid"
          label="openid"
          >
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          :formatter="({city, country}) => `${country} ${city}`"
          >
        </el-table-column>
        <el-table-column
          prop="city"
          label="注册时间"
          :formatter="({registerTime}) => (new Date(registerTime)).toLocaleString()"
          >
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
  name: 'user-manager-page',
  data() {
    return {
      value: null,
      search: '',
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
      'users'
    ])
  },
  methods: {
    // formatter({isCheck}, column) {console.log('row: ', row)},
    ...mapActions('client', [
      'queryUserInfo'
    ]),
    async init() {
      try {
        console.log('init--------: ', this.queryUserInfo)
        const users = await this.queryUserInfo()
        console.log('users: ', users)
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
    handleEdit(index, room) {
      console.log('index: ', index)
      console.log('room: ', room)
    },
    // 删除
    handleDelete(index, room) {
      console.log('index: ', index)
      console.log('room: ', room)
    },
    // 切换房间的预定状态
    handleRoomCheck(index, room) {
      console.log('index: ', index)
      console.log('room: ', room)
    },
    // 添加新的房间
    hanldeAddRoom() {

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