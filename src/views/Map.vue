<template>
    <div class="map-box">
        <div class="update-date">
            <h2>全国疫情状态</h2>
            <span>截止 {{modifyTime}} ({{duration}})</span>
            <i class="el-icon-refresh" @click="updateData"></i>
        </div>
        <div>
            <div class="sum">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="box danger">
                            <div class="add">+{{desc.confirmedIncr}}</div>
                            <div class="num">{{desc.confirmedCount}}</div>
                            <div class="text">确诊</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="box warning">
                            <div class="add">+{{desc.suspectedIncr}}</div>
                            <div class="num">{{desc.suspectedCount}}</div>
                            <div class="text">疑似</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="box info">
                            <div class="add">+{{desc.deadIncr}}</div>
                            <div class="num">{{desc.deadCount}}</div>
                            <div class="text">死亡</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="box success">
                            <div class="add">+{{desc.curedIncr}}</div>
                            <div class="num">{{desc.curedCount}}</div>
                            <div class="text">治愈</div>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="map">
                <img :src="desc.imgUrl" />
            </div>

            <CityList></CityList>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios'
import moment from 'moment'
import CityList from './CityList.vue'
import { Component, Vue } from 'vue-property-decorator'
const veMap = require('v-charts/lib/map')
moment.locale('zh-cn')
@Component({
    name: 'Map',
    components: {
        CityList,
        veMap
    }
})
export default class Map extends Vue {
    loading: Boolean = false
    chartSettings: any = {
        position: 'china'
        // label: false,
        // itemStyle: {
        //   normal: {
        //     borderColor: '#00f'
        //   }
        // },
        // zoom: 1.2
    }
    chartExtend: any = {
        visualMap: {
            show: false,

            min: 0, //最小值

            max: 10, //最大值

            calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。

            inRange: {
                color: [
                    '#0487ED',

                    '#C7C52C',

                    '#E26B5B',

                    '#3EB177',

                    '#794EDC',

                    '#B46B2A'
                ] //颜色
            },

            textStyle: {
                color: '#fff'
            }
        },

        series: {
            itemStyle: {
                normal: {
                    // areaColor: 'rgba(11,36,35,1)',
                    borderColor: 'rgba(27, 94, 79, 1)',
                    borderWidth: 1
                }
            },

            label: {
                show: true,
                fontSize: 14,
                color: '#fff'
            },

            data: [
                // { name: '济南市', selected: false, value: 1 },
                // { name: '青岛市', selected: false, value: 2 },
                // { name: '潍坊市', selected: false, value: 3 },
                // { name: '烟台市', selected: false, value: 4 },
                // { name: '菏泽市', selected: false, value: 5 },
                // { name: '枣庄市', selected: false, value: 6 }
            ]
        }
    }
    chartData: any = {
        columns: ['位置', '人口'],
        rows: [
            { 位置: '吉林', ' 人口': 123 },
            { 位置: '北京', ' 人口': 1223 },
            { 位置: '上海', ' 人口': 2123 },
            { 位置: '浙江', ' 人口': 4123 }
        ]
    }
    get ncovData() {
        return this.$store.state.ncovData || {}
    }

    get desc() {
        return this.ncovData.desc || {}
    }

    get modifyTime() {
        return moment(new Date(this.desc.modifyTime)).format(
            'YYYY-MM-DD HH:mm:ss'
        )
    }

    get duration() {
        const date1 = moment(new Date(), 'hh:mm')
        const date2 = moment(new Date(this.desc.modifyTime), 'hh:mm')
        const date3 = date2.diff(date1, 'minute')
        return moment.duration(date3, 'minutes').humanize(true) || ''
    }

    updateData() {
        if (this.loading) return
        this.loading = true
        this.$store
            .dispatch('getNcovData')
            .then(res => {
                this.$message({
                    duration: 1000,
                    message: '更新成功',
                    type: 'success'
                })

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
