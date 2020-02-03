<template>
    <div class="home">
        <div class="list">
            <a-list :loading="loading" itemLayout="vertical" :dataSource="postList">
                <a-list-item slot="renderItem" slot-scope="item, index">
                    <template slot="actions">
                        <span>
                            <a-icon type="schedule" style="margin-right: 8px" />
                            {{item.ts | formatDate}}
                        </span>
                    </template>
                    <a-list-item-meta :description="item.content">
                        <router-link
                            :to="{ name: 'post', params: { id: item.id }}"
                            slot="title"
                        >{{item.title}}</router-link>
                        <!-- <a slot="title" :href="'/post/' + item.id">{{item.title}}</a> -->
                        <a-avatar
                            slot="avatar"
                            src="https://avatars3.githubusercontent.com/u/12029165?s=460&v=4"
                        />
                    </a-list-item-meta>
                    <img slot="extra" width="272" height="200" alt="logo" :src="`https://picsum.photos/272/200/?random&t=` + Math.random()" />
                    <div class="footer">
                        <div>
                            <a-tag color="pink" v-for="tag in item.tags">{{tag}}</a-tag>
                        </div>
                        <div class="tools">
                            <a-button
                                type="primary"
                                @click="showEditDialog(item)"
                                shape="circle"
                                icon="edit"
                                size="small"
                            />
                            <a-popconfirm
                                title="确定删除?"
                                @confirm="deletePost(item)"
                                okText="Yes"
                                cancelText="No"
                            >
                                <a-button type="danger" shape="circle" icon="delete" size="small" />
                            </a-popconfirm>
                        </div>
                    </div>
                </a-list-item>
            </a-list>
        </div>
        <EditDialog
            :visible.sync="isShowEditDialog"
            @changePost="changePost"
            :postId="activePostId"
        ></EditDialog>
    </div>
</template>
<script lang="ts">
import axios from 'axios'
import dayjs from 'dayjs'
import { Component, Vue } from 'vue-property-decorator'
import EditDialog from './EditDialog.vue'
Vue.filter('formatDate', function(ts: any) {
    return dayjs(ts / 1000).format('YYYY-MM-DD hh:mm:ss')
})
@Component({
    name: 'app',
    components: {
        EditDialog
    }
})
export default class Add extends Vue {
    loading: Boolean = true
    loadingMore: Boolean = false
    isShowEditDialog: Boolean = false
    activePostId: Number = 0
    onLoadMore() {}

    postList: any = []

    formatData(data: Array<any>) {
        return data.map(item => {
            const content = item.data
            return {
                id: item.ref['@ref'].id,
                ts: item.ts,
                ...content
            }
        })
    }
    async deletePost(post: any) {
        const postId = post.id
        const data = {
            postId
        }
        const res = await axios.post(
            `/.netlify/functions/deletePost/`,
            JSON.stringify(data)
        )
        if (res.status === 200) {
            this.$message.success('删除成功', 1)
            this.getPostData()
        } else {
            this.$message.error('删除失败')
        }
    }

    showEditDialog(post: any) {
        this.activePostId = post.id
        this.isShowEditDialog = true
    }

    changePost(post: Object) {
        this.getPostData()
    }

    async getPostData() {
        const res = await axios.get(`/.netlify/functions/getPosts/`)
        this.postList = this.formatData(res.data || [])
        this.loading = false
    }

    created() {
        this.getPostData()
    }
}
</script>
<style lang="stylus" scoped>
.home
    padding 20px
.list
    min-height 146px
    border 1px solid #ebedf0
    padding 0 20px
    color rgba(0, 0, 0, 0.65)
.footer
    display flex
    justify-content space-between
.tools
    button
        margin 0 10px
</style>
