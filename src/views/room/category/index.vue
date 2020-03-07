<template>
  <div class="room-category-manager-page">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button style="float: right; padding: 3px 0" type="text" @click="hanldeAddRoom">添加房型</el-button>
    </div>
     <el-table
      :data="rooms"
      style="width: 100%"
      :default-sort = "{prop: 'type', order: 'ascending'}"
      >
      <el-table-column
        prop="type"
        label="房间类型"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="房间类型描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="list.length"
        label="房间数量"
        sortable>
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
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%">
      <el-card class="box-card">
        <el-form :model="room" ref="room" label-width="100px" class="demo-ruleForm">
          <el-form-item label="房间类型" prop="type">
            <el-input v-model="room.type" disabled></el-input>
          </el-form-item>
          <el-form-item label="房型描述" prop="typeDesc">
            <el-input v-model="room.title"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="hanldeAddRoomClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'room-category-manager-page',
  data() {
    return {
      dialogVisible: false,
      room: {
        type: 0,
        title: '',
      }
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
    ...mapActions('hotel', [
      'queryRoomsInfo',
      'createRoomsCategory',
      'removeRoomsCategory',
      'editRoomsCategory'
    ]),
    async init() {
      try {
        const rooms = await this.queryRoomsInfo()
        console.log('rooms: ', rooms)
      } catch (error) {
        console.error(error)
      }
    },
    async handleEdit(index, room) {
      try {
        console.log('index: ', index)
        console.log('room: ', room)
        const {_id} = room
        const {value: title} = await this.$prompt('请输入新的房间描述', {
          confirmButtonText: '确定',
          cancelButtonText: '放弃修改',
          inputValue: room.title
        })
        console.log('title: ', title)
        const editResult = await this.editRoomsCategory({_id, title})
        console.log('editResult: ', editResult)
        this.$message({
          message: '编辑房型成功',
          type: 'success'
        })
      } catch (error) {
        console.error(error)
      }
    },
    async handleDelete(index, room) {
      try {
        const { title, type } = room
        await this.$confirm('确定删除当前房型', title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
        await this.removeRoomsCategory({title, type})
        this.$message({
          message: '删除房型成功',
          type: 'success'
        })
      } catch (error) {
        console.error(error)
      }
    },
    hanldeAddRoom() {
      let types = this.rooms.map(({type}) => type)
      this.room.type = !types.length ? 0 : Math.max(...types) + 1
      this.dialogVisible = true
    },
    async hanldeAddRoomClick() {
      try {
        const category = await this.createRoomsCategory(this.room)
        console.log('category: ', category)
        this.$message({
          message: '添加房型信息成功',
          type: 'success'
        })
        this.dialogVisible = false
      } catch (error) {
        console.error(error)
        this.dialogVisible = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>