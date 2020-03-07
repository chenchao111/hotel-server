<template>
  <div class="hotel-manager-page">
    <el-card class="box-card">
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :xs="24" :sm="18" :md="16" :lg="16" :xl="16">
            <el-form-item label="酒店名称">
              <el-input v-model="hotelname" placeholder="请输入酒店名称" clearable></el-input>
            </el-form-item>  
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="18" :md="16" :lg="16" :xl="16">
            <el-form-item label="封面图片">
              <el-input v-model="cover" placeholder="请输入酒店封面图片名" clearable>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="18" :md="16" :lg="16" :xl="16">
            <el-form-item label="酒店地址">
              <el-input type="textarea" autosize v-model="location" placeholder="请输入酒店地址" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="18" :md="16" :lg="16" :xl="16">
            <el-form-item label="联系电话">
              <el-input v-model="phone" placeholder="请输入酒店联系电话" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-form-item>
            <el-button type="danger" @click="onSubmit">提交编辑信息</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'hotel-manager-page',
  data() {
    return {
      
    }
  },
  created() {
    this.init()
  },
  computed: {
     ...mapGetters([
      'hotelname',
      'cover',
      'location',
      'phone'
    ])
  },
  methods: {
    ...mapActions('hotel', [
      'queryHotelInfo'
    ]),
    ...mapMutations('hotel', [
      'set_date'
    ]),
    async init() {
      try {
        const hotel = await this.queryHotelInfo()
        console.log('hotel: ', hotel)
        
      } catch (error) {
        console.error(error)
      }
    },
    onSubmit() {
      
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

