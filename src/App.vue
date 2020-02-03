<template>
    <div id="app">
        <div id="nav">
            <a-menu v-model="current" mode="horizontal">
                <a-menu-item key="home">
                    <router-link to="/">
                        <a-icon type="home" />首页
                    </router-link>
                </a-menu-item>
                <a-menu-item key="add">
                    <router-link to="/add">
                        <a-icon type="user-add" />添加
                    </router-link>
                </a-menu-item>
            </a-menu>
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
    res: String = ''
    current:Array<String> = ['home']


    @Watch('$route')
    changeTab (to:any) {
       this.current = [to.name]
    }

    async created() {
        this.current = [<String>this.$route.name]
        // const res = await axios.post(`/.netlify/functions/helloworld/`)
        // this.res = JSON.stringify(res)

    }
}
</script>
<style lang="stylus" >
html, body
    width 100%
    height 100%
#nav
    margin-bottom 10px
    .ant-menu-horizontal
        text-align center
</style>
