<template>
    <div id="app" v-loading="loading">
        <div id="nav">
            <el-tabs v-model="current" tab-position="top" @tab-click="tabClick" stretch>
                <el-tab-pane label="疫情地图" name="map"></el-tab-pane>
                <el-tab-pane label="实时播报" name="broadcast"></el-tab-pane>
                <el-tab-pane label="谣言" name="rumour"></el-tab-pane>
            </el-tabs>
        </div>
        <router-view />
    </div>
</template>
<script lang="ts">
import axios from 'axios'
import { Component, Vue, Watch } from 'vue-property-decorator'
declare module 'vue/types/vue' {
    interface Vue {
        [key: string]: any
    }
}
@Component({})
export default class App extends Vue {
    current: String = 'map'
    loading: Boolean = true
    err: Boolean = false

    tabClick(tab: any) {
        this.$router.push({ name: tab.name })
    }

    @Watch('$route')
    changeTab(to: any) {
        this.current = <string>this.$route.name || 'map'
    }
    getNcovData() {
        this.$store
            .dispatch('getNcovData')
            .then(res => {
                this.loading = false
            })
            .catch(err => {
                this.loading = false
                this.err = true
            })
    }

    async created() {
        this.current = <string>this.$route.name
        this.getNcovData()
        this.$store.dispatch('getNcovCityData')
    }
}
</script>
<style src="../style/app.styl" lang="stylus"></style>
<style lang="stylus" >
html, body
    width 100%
    height 100%
    margin 0
    padding 0
    .el-tabs
        .el-tabs__header
            margin 0
</style>
