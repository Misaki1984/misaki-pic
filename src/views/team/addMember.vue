<template>
  <el-dialog
    title="添加队员"
    :visible.sync="addMemberVisible"
    width="40%"
    center
    >

    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px" style="padding: 10px 35px 1px;">
      <el-form-item label="姓名" prop="memberName">
        <el-input size="medium" maxlength="15" show-word-limit v-model="addForm.memberName"/>
      </el-form-item>

      <el-form-item label="手机号" prop="memberPhone">
        <el-input size="medium" maxlength="18" v-model="addForm.memberPhone"/>
      </el-form-item>
      <el-form-item label="身份证号" prop="identityNumber">
        <el-input size="medium" maxlength="18" v-model="addForm.identityNumber"/>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="textarea" 
          :autosize="{ minRows: 2, maxRows: 4}" 
          size="medium" maxlength="100" 
          v-model="addForm.memberIntroduction" 
          placeholder="擅长的游戏/职位"/>
      </el-form-item>
      <el-form-item label="上传头像">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="addMemberVisible = false" size="medium">取 消</el-button>
      <el-button type="primary" @click="addMemberVisible = false" size="medium">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "addMember",
    data() {
      return {
        addMemberVisible: false,
        addForm: {
          memberName: '',
          memberPhone: '',
          identityNumber: '',
          memberIntroduction: '',
          memberAvatar: ''
        },
        rules: {
          memberName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          identityNumber: [
            { required: true, message: '请填写真实身份证', trigger: 'blur' }
          ],
          memberPhone: [
            { required: true, message: '请填写真实手机号', trigger: 'blur' }
          ]
        },
      }
    },
    methods: {
      showDialog() {
        this.addMemberVisible = true
      }
    },
  }
</script>

<style scoped>

</style>