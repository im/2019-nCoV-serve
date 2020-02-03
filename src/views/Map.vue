<template>
    <div class="map-box" v-loading="loading">
        <div class="update-date">
            <span>截止 {{modifyTime}} ({{duration}}) 全国数据统计</span>
            <i class="el-icon-refresh" @click="updateData"></i>
        </div>
        <div class="info">
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
            <img :src="desc.dailyPic" />
        </div>

        <CityList></CityList>
        <!-- {{ncovData}} -->
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
    padding 8px
    display flex
    align-items center
    font-size 12px
  .el-icon-refresh
    color #1989fa
    cursor pointer
    transition All 0.4s ease-in-out
    margin-left 10px
    font-weight bold
.box
  text-align center
  padding 10px
  .add
    font-size 12px
  .num
    text-align center
    font-size 18px
    font-weight bold
  .text
    font-size 12px
  &.danger
    color #F56C6C
  &.warning
    color #E6A23C
  &.info
    color #909399
  &.success
    color #67C23A
.map
  img
    width 100%
</style>
