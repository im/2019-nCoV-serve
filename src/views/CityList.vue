<template>
    <div class="city-list">
        <ul class="header">
            <li class="city">地区</li>
            <li class="danger">确诊</li>
            <li class="info">死亡</li>
            <li class="success">治愈</li>
        </ul>
        <ul class="list">
            <li v-for="item in ncovCityData" :key="item.locationId">
                <ul class="item">
                    <li class="city">
                        <i class="icon" v-if="item.cities.length" :class="iconClass(item)" @click="show(item)"></i>
                        {{item.provinceShortName}}
                    </li>
                    <li class="danger">{{item.confirmedCount}}</li>
                    <li class="info">{{item.deadCount}}</li>
                    <li class="success">{{item.curedCount}}</li>
                </ul>
                <ul class="sub-list" v-if="item.show" v-for="(cityItem, index) in item.cities" :key="cityItem.cityName + index">
                    <li>
                        <ul class="item">
                            <li class="city">
                                {{cityItem.cityName}}
                            </li>
                            <li class="danger">{{cityItem.confirmedCount}}</li>
                            <li class="info">{{cityItem.deadCount}}</li>
                            <li class="success">{{cityItem.curedCount}}</li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
    name: 'CityList',
    components: {}
})
export default class CityList extends Vue {
    get ncovCityData() {
        return this.$store.state.ncovCityData || []
    }
    show (item:any) {
        if (item.show) {
            item.show = false
        } else {
            this.$set(item, 'show', true)
        }
    }
    iconClass (item:any) {
        return item.show ? 'el-icon-caret-bottom' : 'el-icon-caret-right'
    }
}
</script>
<style lang="stylus" scoped>
.city-list
  width 100%
.header
  display flex
  width 100%
  li
    text-align center
    height 40px
    line-height 40px
    &.city
      background #e7e6f6
      width 35%
    &.danger
      background rgba(245, 108, 108, 0.2);
      width 21%
    &.info
      background rgba(144, 147, 153, 0.2);
      width 22%
    &.success
      background rgba(103, 194, 58, 0.2);
      width 22%
.list
  & > li
    background #fafafa
  .item
    display flex
    li
      text-align center
      height 40px
      line-height 40px
      position relative
      .icon
          position absolute
          height 40px
          line-height 40px
          left 10px
          top 0
      &.city
        width 35%
      &.danger
        width 21%
      &.info
        width 22%
      &.success
        width 22%
.sub-list
    background #fff
</style>
