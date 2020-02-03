<template>
    <div class="city-list">
        <ul class="header">
            <li class="city">地区</li>
            <li class="danger">确诊</li>
            <li class="info">死亡</li>
            <li class="success">治愈</li>
        </ul>
        <ul class="list">
            <li v-for="item in caseData" :key="item.id">
                <ul class="item">
                    <li class="city">{{item.provinceShortName}}</li>
                    <li class="danger">{{item.confirmedCount}}</li>
                    <li class="info">{{item.deadCount}}</li>
                    <li class="success">{{item.curedCount}}</li>
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
    get ncovData() {
        return this.$store.state.ncovData || {}
    }

    get caseData() {
        return (this.ncovData.case || []).reverse()
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
      background #F56C6C
      width 21%
    &.info
      background #909399
      width 22%
    &.success
      background #67C23A
      width 22%
.list
  & > li
    text-align center
    height 40px
    line-height 40px
  .item
    display flex
    li
      text-align center
      height 40px
      line-height 40px
      &.city
        width 35%
      &.danger
        width 21%
      &.info
        width 22%
      &.success
        width 22%
</style>
