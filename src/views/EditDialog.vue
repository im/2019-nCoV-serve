<template>
    <div class="home">
        <a-modal
            title="修改"
            :visible="visible"
            @ok="handleOk"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
        >
            <a-form :layout="formLayout.layout" :form="form">
                <a-form-item
                    label="标题"
                    :label-col="formLayout.labelCol"
                    :wrapper-col="formLayout.wrapperCol"
                >
                    <a-input
                        placeholder="请输入标题"
                        v-decorator="[
                'title',
                { rules: [{ required: true, message: '请输入标题!' }],initialValue: initForm.title  }
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
                { rules: [{ required: true, message: '请选择标签!' }],initialValue: initForm.tags }
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
                { rules: [{ required: true, message: '请输入内容!' }],initialValue: initForm.content }
                ]"
                        placeholder="请输入内容"
                        :autosize="{ minRows: 2, maxRows: 6 }"
                    />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'edit-dialog'
})
export default class EditDialog extends Vue {
    confirmLoading: Boolean = false

    initForm: Object = {}

    @Prop({})
    visible: any

    @Prop({})
    postId: any

    @Watch('visible')
    changeVisible(val: Boolean) {
        if (val) {
            this.initFormData()
        }
    }

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

    async initFormData() {
        const postId = this.postId
        const res = await axios.get(`/.netlify/functions/getPost/`, {
            params: {
                postId
            }
        })
        this.initForm = res.data.data || {}
    }

    async editPost(postData: Object) {
        const postId = this.postId
        const data = {
            postId,
            postData
        }
        const res = await axios.post(
            `/.netlify/functions/updatePost/`,
            JSON.stringify(data)
        )
        if (res.status === 200) {
            this.$message.success('修改成功', 1)
        } else {
            this.$message.error('修改失败')
        }
        this.$emit('update:visible', false)
        this.$emit('changePost', postData)
    }

    handleOk() {
        this.form.validateFields((err: any, values: any) => {
            if (!err) {
                this.editPost(values)
            }
        })
    }
    handleCancel() {
        this.$emit('update:visible', false)
    }
}
</script>
<style lang="stylus" scoped></style>
