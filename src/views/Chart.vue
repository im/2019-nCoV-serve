<template>
    <div class="echarts"></div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
const echarts = require('echarts')
const PINYIN = [
    'hubei',
    'guangdong',
    'zhejiang',
    'zhongqing',
    'hunan',
    'anhui',
    'beijing',
    'shanghai',
    'henan',
    'sichuan',
    'shandong',
    'guangxi',
    'jiangxi',
    'fujian',
    'jiangsu',
    'hainan',
    'liaoning',
    'shanxi',
    'yunnan',
    'tianjin',
    'heilongjiang',
    'hebei',
    'shanxi',
    'xianggang',
    'guizhou',
    'jilin',
    'gansu',
    'ningxia',
    'taiwan',
    'xinjiang',
    'aomen',
    'neimenggu',
    'qinghai',
    'xicang'
]
const NAME = [
    '湖北',
    '广东',
    '浙江',
    '重庆',
    '湖南',
    '安徽',
    '北京',
    '上海',
    '河南',
    '四川',
    '山东',
    '广西',
    '江西',
    '福建',
    '江苏',
    '海南',
    '辽宁',
    '陕西',
    '云南',
    '天津',
    '黑龙江',
    '河北',
    '山西',
    '香港',
    '贵州',
    '吉林',
    '甘肃',
    '宁夏',
    '台湾',
    '新疆',
    '澳门',
    '内蒙古',
    '青海',
    '西藏'
]
@Component({
    name: 'Chart',
    components: {}
})
export default class Chart extends Vue {
    chart: any = null
    province: String = 'china'

    get ncovCityData() {
        return this.$store.state.ncovCityData || []
    }

    chartData() {
        const data = this.ncovCityData.map((v: any) => {
            return {
                name: v.provinceShortName,
                value: v.confirmedCount
            }
        })
        return this.province === 'china' ? data : this.getCitiesChartData()
    }

    get cityName() {
        return this.getNameByPinyin(this.province)
    }

    getPinyinByName(name: any) {
        let index = NAME.indexOf(name)

        if (index > -1) {
            return PINYIN[index]
        } else {
            return null
        }
    }

    getNameByPinyin(pinyin: any) {
        let index = PINYIN.indexOf(pinyin)

        if (index > -1) {
            return NAME[index]
        } else {
            return null
        }
    }

    handleClick(params: any) {
        console.log('params: ', params)
    }

    getCitiesChartData() {
        const cityName = this.getNameByPinyin(this.province)
        const cityData = this.ncovCityData.filter(
            (v: any) => v.provinceShortName === cityName
        )[0]
        if (cityData) {
            return cityData.cities.map((item: any) => {
                return {
                    name: item.cityName + '市',
                    value: item.confirmedCount
                }
            })
        }
        return []
    }

    @Watch('$store.state.ncovCityData')
    changeNcovCityData(to: any) {
        this.init()
    }

    init() {
        const self = this
        if (this.chart) {
            return
        }
        if (this.province !== 'china') {
            const provinceMap = require(`echarts/map/json/province/${this.province}`)
            echarts.registerMap(`${this.province}`, provinceMap)
        } else {
            const provinceMap = require(`echarts/map/json/china`)
            echarts.registerMap('china', provinceMap)
        }

        this.chart = echarts.init(this.$el)
        this.chart.showLoading()
        const option = {
            // tooltip: {
            //     trigger: 'item',
            //     formatter: '{b}<br/> 确诊 ({c}) 人'
            // },
            visualMap: {
                min: 0,
                max: 1000,
                // type: 'piecewise',
                top: 40,
                // right: 10,
                realtime: false,
                calculable: true,
                showLabel: true,
                itemWidth: 10,
                itemHeight: 40,
                textStyle: {
                    fontSize: 10
                },
                // pieces: [
                //     { min: 1000 },
                //     { min: 500, max: 999 },
                //     { min: 100, max: 499 },
                //     { min: 10, max: 99 },
                //     { min: 1, max: 9 }
                // ],
                inRange: {
                    color: ['#ffc0b1', '#ff8c71', '#ef1717', '#9c0505']
                }
            },
            series: [
                {
                    type: 'map',
                    zoom: 1.2,
                    map: this.province, // 自定义扩展图表类型
                    label: {
                        show: true,
                        position: 'inside',
                        fontSize: 8
                    },
                    data: this.chartData()
                }
            ]
        }
        this.chart.clear()
        this.chart.setOption(option)

        this.chart.off('click')

        this.chart.on('click', function(params: any) {
            if (params.name) {
                self.province = self.getPinyinByName(params.name) || 'china'
                self.destroy()
                self.init()
                const cityName =
                    self.province === 'china' ? '全国' : params.name
                self.$emit('chartClick', cityName)
            }
            return false
        })
        this.chart.hideLoading()
    }
    destroy() {
        if (this.chart) {
            this.chart.dispose()
            this.chart = null
        }
    }
    destroyed() {
        this.destroy()
    }
    mounted() {
        if (this.ncovCityData.length) {
            this.init()
        }
    }
}
</script>
<style lang="stylus" scoped>
.echarts
    width auto
    height 400px
</style>
