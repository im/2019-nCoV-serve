<template>
    <div class="broadcast">
        <el-timeline>
            <el-timeline-item v-for="item in news" :key="item.id" :timestamp="formatTimestamp(item)" placement="top">
                <el-card>
                    <div class="box">
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
                    </div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script lang="ts">
import axios from 'axios'
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'
@Component({
    name: 'Broadcast',
    components: {}
})
export default class Broadcast extends Vue {
    get ncovData() {
        return this.$store.state.ncovData || {}
    }

    get news() {
        return this.ncovData.news || {}
    }
    formatTimestamp (item:any) {
        return moment(new Date(item.pubDate)).format(
            'YYYY-MM-DD HH:mm:ss'
        ) + `  (${item.pubDateStr})`
    }
}
</script>
<style lang="stylus" scoped>
.broadcast
    padding 8px
    padding-top 20px
    /deep/
        .el-card__body
            padding 10px
.box
    padding 10px
.title
    font-size 16px
    font-weight bold
.content
    padding 10px 0
    line-height 20px
.bottom
    color: gray;
    font-size 12px
    display flex
    justify-content space-between
</style>
