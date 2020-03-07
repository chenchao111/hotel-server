<template>
  <div class="room-info-manager-page">
    <el-dialog
      title="添加房间"
      :visible.sync="addRoom"
      width="70%">
      <el-form :model="room" label-width="120px">
        <el-form-item label="房间ID">
          <el-input v-model="room.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="房间名">
          <el-input v-model="room.name"></el-input>
        </el-form-item>
        <el-form-item label="房间号">
          <el-input v-model="room.roomNo"></el-input>
        </el-form-item>
        <el-form-item label="房间类型：">
          <el-select v-model="room.type" placeholder="请选择" clearable @change="hanldeSelectChange(value)">
            <el-option
              v-for="({type, title}) in category"
              :key="type"
              :label="title"
              :value="type">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面图片">
          <el-upload
            class="upload-demo"
            drag
            :action="`${prefix}/hotel-server/upload/room/cover?roomNo=${room.roomNo}`"
            :data="room.id"
            name="img-upload"
            :before-upload="handleHeforeUpload"
            :on-success="success"
            :on-error="error"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-search">
        <el-form :inline="true">
          <el-form-item label="房间类型：">
            <el-select v-model="value" placeholder="请选择" clearable @change="hanldeSelectChange(value)">
              <el-option
                v-for="({type, title}) in category"
                :key="type"
                :label="title"
                :value="type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addRoom = true">添加房间</el-button>
        </el-form>
      </div>
      <el-table
        border
        :data="list"
        style="width: 100%"
        :default-sort = "{prop: 'id', order: 'ascending'}"
        >
        <el-table-column
          prop="id"
          label="房间ID"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="roomNo"
          label="房间号"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="房间名">
        </el-table-column>
        <el-table-column
          prop="typeDesc"
          label="房间类型"
          >
        </el-table-column>
        <el-table-column
          prop="price"
          label="房间原价"
          sortable>
          <template slot-scope="scope">
            <div class="total-price">¥<span class="total-price-num">{{scope.row.originalPrice | integer }}</span>.{{scope.row.originalPrice | decimals}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="房间优惠价"
          sortable>
          <template slot-scope="scope">
            <div class="total-price">¥<span class="total-price-num">{{scope.row.price | integer }}</span>.{{scope.row.price | decimals}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="isCheck"
          label="是否预定"
          :formatter="({isCheck}) => isCheck ? '已预订' : '未预定'"
          >
            <template slot-scope="scope">
              <div class="check">
                <span class="desc">{{scope.row.isCheck ? '已预订' : '未预定'}}</span>
                <el-switch
                  style="display: block"
                  v-model="scope.row.isCheck"
                  active-color="#ff4949"
                  @change="handleRoomCheck(scope.$index, scope.row)"
                  >
                  </el-switch>
              </div>
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
import {prefix} from '@/api/prefix'
export default {
  name: 'room-info-manager-page',
  data() {
    return {
      prefix,
      addRoom: false,
      room: {
        id: '',
        roomNo: '',
        name: '',
        type: 1,
        typeDesc: '',
        cover: '',
        images: '',
        isCheck: '',
        originalPrice: '',
        price: '',
        tags: [],
        traits: [],
        assorts: [],
        descs: [],
        isUp: true
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
      'rooms'
    ])
  },
  methods: {
    // formatter({isCheck}, column) {console.log('row: ', row)},
    ...mapActions('hotel', [
      'queryRoomsInfo',
      'editRoomInfo'
    ]),
    // 查找房间
    async init(type = 0) {
      try {
        this.list = []
        this.category = []
        const rooms = await this.queryRoomsInfo()
        const roomsType = await this.queryRoomsInfo({type})
        rooms.forEach(({type, title}) => this.category.push({type, title}))
        roomsType.forEach(({list}) => this.list.push(...list))
        console.log('rooms: ', rooms)
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
    // 切换房间上下架状态
    handleRoomUp(index, room) {
      console.log('index: ', index)
      console.log('room: ', room)
    },
    // 添加新的房间
    hanldeAddRoom() {

    },
    // 上传封面图片之前钩子函数
    handleHeforeUpload(file) {
      const { roomNo } = this.room
      console.log('roomNo: ', roomNo)
      console.log('file: ', file)
      if (roomNo.length !== 3) {
        this.$message.error('请先填写正确的房间号再上传图片')
        return false
      }
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
.header-search .el-form-item {
  margin-bottom: 0;
}
</style>