<template>
    <div class="rumour-box" v-loading="loading">
        <el-timeline>
            <el-timeline-item
                v-for="item in rumourData"
                size="large"
                :timestamp="item.explain"
                :key="item.id"
                :color="getColor(item)"
                placement="top"
            >
                <el-card>
                    <div class="box">
                        <div>
                            <img :src="item.imgsrc" />
                        </div>
                        <div class="content">{{item.summary}}</div>
                        <div class="title">{{item.title}}</div>
                        <div class="desc">{{item.desc}}</div>
                    </div>
                    <!-- <div class="box">
                        <a :href="item.sourceUrl" traget="_blank" class="title">
                            {{item.title}}
                        </a>
                        <div class="content">
                            {{item.summary}}
                        </div>
                        <div class="bottom">
                            <span class="city">
                                地区：{{item.provinceName}}
                            </span>
                            <span class="source">
                                信息来源：{{item.infoSource}}
                            </span>
                        </div>
                    </div>-->
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <div>
            <!-- <div v-for="item in rumourData" :key="item.id" class="box" :class="boxClass(item)">
                <div>
                    <img :src="item.imgsrc" />
                </div>
                <div class="title">{{item.title}}</div>
                <div class="desc">{{item.desc}}</div>
            </div>-->
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
    name: 'Rumour',
    components: {}
})
export default class Rumour extends Vue {
    loading: Boolean = true
    get rumourData() {
        return this.$store.state.rumourData || []
    }
    getRumourData() {
        this.$store
            .dispatch('getRumourData', {
                page: 1,
                num: 20
            })
            .then((res: any) => {
                this.loading = false
            })
            .catch(err => {
                this.loading = false
            })
    }
    boxClass(item: any) {
        return {
            warning: item.explain === '尚无定论',
            danger: item.explain === '谣言',
            success: item.explain === '确有此事'
        }
    }
    getColor(item: any) {
        let color = ''
        if (item.explain === '尚无定论') {
            color = 'rgba(230, 162, 60, 0.8)'
        }
        if (item.explain === '谣言') {
            color = 'rgba(245, 108, 108, 0.8)'
        }
        if (item.explain === '确有此事') {
            color = 'rgba(103, 194, 58, 0.8)'
        }
        return color
    }
    created() {
        this.getRumourData()
    }
}
</script>
<style lang="stylus" scoped>
.rumour-box
  padding 25px 8px
  /deep/
    .el-card__body
      padding 0
.box
  position relative
  overflow hidden
  .title
    font-size 16px
    padding 6px 8px
    font-weight bold
  img
    width 100%
  .desc
    padding 8px
    font-size 16px
  .explain
    font-size 12px
    background yellow
    position absolute
    right 10px
    top 10px
    border 2px solid #fff
    border-radius 50%
    width 60px
    height 60px
    color #fff
    line-height 60px
    text-align center
  &.danger
    background rgba(245, 108, 108, 0.8)
  &.warning
    background rgba(230, 162, 60, 0.8)
  &.info
    background rgba(144, 147, 153, 0.8)
  &.success
    background rgba(103, 194, 58, 0.8)
</style>
