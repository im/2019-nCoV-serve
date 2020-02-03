<template>
    <div class="add-box">
        <a-form :layout="formLayout.layout" :form="form" @submit="handleSubmit">
            <a-form-item
                label="标题"
                :label-col="formLayout.labelCol"
                :wrapper-col="formLayout.wrapperCol"
            >
                <a-input
                    placeholder="请输入标题"
                    v-decorator="[
                'title',
                { rules: [{ required: true, message: '请输入标题!' }] }
                ]"
                />
            </a-form-item>
            <a-form-item
                :label-col="formLayout.labelCol"
                :wrapper-col="formLayout.wrapperCol"
                label="标签"
            >
                <a-select
                    mode="tags"
                    placeholder="请选择标签"
                    v-decorator="[
                'tags',
                { rules: [{ required: true, message: '请选择标签!' }] }
                ]"
                    style="width: 200px"
                >
                    <a-select-option v-for="item in tagList" :key="item">{{item}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item
                :label-col="formLayout.labelCol"
                :wrapper-col="formLayout.wrapperCol"
                label="内容"
            >
                <a-textarea
                    v-decorator="[
                'content',
                { rules: [{ required: true, message: '请输入内容!' }] }
                ]"
                    placeholder="请输入内容"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">提交</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script lang="ts">
import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Add extends Vue {
    formLayout: any = {
        layout: 'horizontal',
        wrapperCol: {
            span: 20
        },
        labelCol: {
            span: 4
        }
    }
    tagList: Array<String> = ['js', 'css', 'node', 'java']
    res: any = {}
    beforeCreate() {
        this.form = this.$form.createForm(this)
    }

    async addPost(values: Object) {
        const res = await axios.post(
            `/.netlify/functions/addPost/`,
            JSON.stringify(values)
        )
        if (res.status === 200) {
            this.$message.success('创建成功', 1)
            this.form.resetFields()
        } else {
            this.$message.error('This is a message of error')
        }
    }

    handleSubmit(e: any) {
        e.preventDefault()
        this.form.validateFields((err: any, values: any) => {
            if (!err) {
                this.addPost(values)
            }
        })
    }
}
</script>
<style lang="stylus" scoped>
.add-box
    width 600px
    margin 50px auto
</style>
