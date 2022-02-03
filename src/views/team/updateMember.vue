<template>
<!-- curd，表格管理 -->
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <el-form ref="form" :model="form" label-width="80px" size="medium">

          <el-form-item label="姓名">
            <el-input v-model="member.memberName" style="width: 85%"/>
          </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="member.memberPhone" style="width: 85%"/>
            </el-form-item>
              
          <el-form-item label="身份证号">
            <el-input v-model="member.identityNumber" style="width: 85%"/>
          </el-form-item>

          <el-form-item label="个人简介">
            <el-input type="textarea"
              :autosize="{ minRows: 2, maxRows: 5}" 
              maxlength="100" 
              v-model="member.memberIntroduction" 
              placeholder="擅长游戏等"
              style="width: 530px;"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="save()" size="medium">更新</el-button>
            <el-button @click="cancel()" size="medium">取消</el-button>
          </el-form-item>

        </el-form>
      </el-col>
      <el-col :span="4">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <h2>个人胜点: {{member.selfPoint}}</h2>
      </el-col>
      <el-col :span="12">
        <!-- <el-button style="margin-bottom:16px" type="primary" @click="addMember()" size="medium">添加队员</el-button>
        <el-table
          :data="tableData"
          height="550px"
          border
          style="width: 100%">
          <el-table-column
            prop="memberName"
            label="人名"
            width="130">
          </el-table-column>
          <el-table-column
            sortable
            prop="selfPoint"
            label="个人胜点"
            width="120">
             <template slot-scope="scope">
              <el-tag
                type="primary"
                disable-transitions>{{scope.row.selfPoint}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="age"
            label="年龄"
            width="80">
          </el-table-column>          
          <el-table-column
            prop="joinDate"
            label="入队时间"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button icon="el-icon-search" @click="viewMember(scope.row)" style="padding:10px 10px" size="medium"></el-button>
              <el-button icon="el-icon-edit" @click="updateTeam(scope.row)" style="padding:10px 10px" type="warning" size="medium"></el-button>
              <el-button icon="el-icon-delete" @click="deleteTeam(scope.row)" style="padding:10px 10px" type="danger" size="medium"></el-button>
            </template>
          </el-table-column>

        </el-table> -->
      </el-col>
    </el-row> 
  </div>
</template>

<script>
export default {
  name: "UpdateMember",
  data() {
    return {
      member: {
        memberName: 'Sakakibara',
        memberPhone: 12321312342,
        identityNumber: '21321321321312',
        memberIntroduction: 'LOL擅长中路法师，上单；fps擅长狙；懂得指挥',
        joinDate: '2022-01-11',
        selfPoint: 12,
        memberAvatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      imageUrl: '',
    }
  },
  methods: {
    setStatus(row, column) {
      return this.statusMap.get(row.memberStatus);
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    addMember() {
      this.$refs.addMember.showDialog();
    },
    viewMember(row) {
      this.$refs.viewMember.showDialog(row.memberId);
    },
    // 编辑管理
    updateTeam() {
      this.$router.push({name: 'UpdateTeam', params:{memberId: '1'}});
    },
    deleteTeam() {

    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  created () {
  
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
<style scoped>
.el-textarea__inner {
  height: 30%;
}
.line{
  text-align: center;
}

</style>

