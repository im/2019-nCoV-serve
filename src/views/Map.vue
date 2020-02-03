<template>
    <div class="map-box">
        <div class="update-date">
            <h2>{{cityName}}疫情状态</h2>
            <span>截止 {{modifyTime}} ({{duration}})</span>
            <i class="el-icon-refresh" @click="updateData"></i>
        </div>
        <div>
            <div class="sum">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="box danger">
                            <div class="add" v-if="desc.confirmedIncr">+{{desc.confirmedIncr}}</div>
                            <div class="num">{{desc.confirmedCount}}</div>
                            <div class="text">确诊</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="box warning">
                            <div class="add" v-if="desc.suspectedIncr">+{{desc.suspectedIncr}}</div>
                            <div class="num">{{desc.suspectedCount}}</div>
                            <div class="text">疑似</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="box info">
                            <div class="add" v-if="desc.deadIncr">+{{desc.deadIncr}}</div>
                            <div class="num">{{desc.deadCount}}</div>
                            <div class="text">死亡</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="box success">
                            <div class="add" v-if="desc.curedIncr">+{{desc.curedIncr}}</div>
                            <div class="num">{{desc.curedCount}}</div>
                            <div class="text">治愈</div>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="map">
                <Chart @chartClick="chartClick"></Chart>
            </div>

            <CityList></CityList>
        </div>
    </div>
</template>
<script lang="ts">
import moment from 'moment'
import CityList from './CityList.vue'
import Chart from './Chart.vue'
import { Component, Vue } from 'vue-property-decorator'
@Component({
    name: 'Map',
    components: {
        CityList,
        Chart
    }
})
export default class Map extends Vue {
    loading: Boolean = false
    cityName: String = '全国'

    get ncovData() {
        return this.$store.state.ncovData || {}
    }

    get ncovCityData() {
        return this.$store.state.ncovCityData || []
    }

    get desc() {
        if (this.cityName !== '全国') {
            const cityData = this.ncovCityData.filter(
                (v: any) => v.provinceShortName === this.cityName
            )[0]
            return cityData || {}
        }
        return this.ncovData.desc || {}
    }

    get modifyTime() {
        if (!this.ncovData.desc) return ''
        return moment(new Date(this.ncovData.desc.modifyTime)).format(
            'YYYY-MM-DD HH:mm:ss'
        )
    }

    get duration() {
        if (!this.ncovData.desc) return ''
        const date1 = moment(new Date(), 'hh:mm')
        const date2 = moment(new Date(this.ncovData.desc.modifyTime), 'hh:mm')
        const date3 = date2.diff(date1, 'minute')
        return moment.duration(date3, 'minutes').humanize(true) || ''
    }

    chartClick(city: any) {
        this.cityName = city
    }

    updateData() {
        if (this.loading) return
        this.loading = true
        this.$store
            .dispatch('getNcovData')
            .then(res => {
                this.loading = false
            })
            .catch(err => {
                this.loading = false
            })
    }
}
</script>
<style lang="stylus" scoped>
.update-date
  padding 20px 8px 10px 8px
  align-items center
  font-size 12px
  h2
    margin-bottom 15px
  span
    color #b6b6b6
  .el-icon-refresh
    color #1989fa
    cursor pointer
    transition All 0.4s ease-in-out
    margin-left 10px
    font-weight bold
.sum
  padding 10px 10px
.box
  text-align center
  border-radius 3px
  overflow hidden
  .add
    font-size 12px
    line-height 18px
  .num
    text-align center
    font-size 18px
    font-weight bold
    line-height 30px
  .text
    font-size 12px
    width 100%
    height 25px
    line-height 25px
    color #2c3e50
    font-weight bold
  &.danger
    color rgb(245, 108, 108)
    background rgba(245, 108, 108, 0.1)
    .text
      background rgba(245, 108, 108, 0.2)
    .add
      background rgba(245, 108, 108, 0.1)
  &.warning
    color rgb(230, 162, 60)
    background rgba(230, 162, 60, 0.1)
    .text
      background rgba(230, 162, 60, 0.2)
    .add
      background rgba(230, 162, 60, 0.1)
  &.info
    color rgb(144, 147, 153)
    background rgba(144, 147, 153, 0.1)
    .text
      background rgba(144, 147, 153, 0.2)
    .add
      background rgba(144, 147, 153, 0.1)
  &.success
    color rgb(103, 194, 58)
    background rgba(103, 194, 58, 0.1)
    .text
      background rgba(103, 194, 58, 0.2)
    .add
      background rgba(103, 194, 58, 0.1)
.map
  margin-bottom 10px
  img
    width 100%
</style>
