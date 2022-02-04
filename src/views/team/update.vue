<template>
<!-- curd，表格管理 -->
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <el-form ref="form" :model="form" label-width="80px" size="medium">

          <el-form-item label="战队名称">
            <el-input v-model="team.teamName" style="width: 85%"/>
          </el-form-item>
            <el-form-item label="负责人">
              <el-input v-model="team.teamBoss" style="width: 85%"/>
            </el-form-item>
              
          <el-form-item label="联系方式">
            <el-input v-model="team.teamContact" style="width: 85%"/>
          </el-form-item>
          <el-form-item label="电竞项目" prop="game">
            <el-select v-model="team.gameId" filterable placeholder="请选择">
              <el-option
                v-for="item in gameList"
                :key="item.gameId"
                :label="item.gameName"
                :value="item.gameId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="队伍状态" prop="game">
            <el-select v-model="team.teamStatus" filterable placeholder="请选择">
              <el-option
                v-for="item in teamStatusList"
                :key="item.statusId"
                :label="item.statusName"
                :value="item.statusId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="战队简介">
            <el-input type="textarea"
              :autosize="{ minRows: 2, maxRows: 5}" 
              maxlength="100" 
              v-model="team.teamIntroduction" 
              placeholder="战队的目标，加入条件等"
               style="width: 530px;"/>
          </el-form-item>


        </el-form>
            <el-button class="blue-button" @click="save()" style="margin-left:10px">更新</el-button>
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
        <h2>胜点: 24</h2>
      </el-col>
      <el-col :span="12">
        <el-button style="margin-bottom:16px" class="blue-button" @click="addMember()">添加队员</el-button>
        <el-table
          :data="tableData"
          height="550px"
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
              <el-button icon="el-icon-edit" @click="updateMember(scope.row)" style="padding:10px 10px" type="warning" size="medium"></el-button>
              <el-button icon="el-icon-delete" @click="deleteTeam(scope.row)" style="padding:10px 10px" type="danger" size="medium"></el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
    </el-row> 

    <view-member ref="viewMember"></view-member>
    <add-member ref="addMember"></add-member>
  </div>
</template>

<script>
import viewMember from  './viewMember.vue';
import addMember from './addMember.vue';

export default {
  components : {
    addMember,
    viewMember
  },
  data() {
    return {
      team: {
        id: '1',
        teamName: 'IG战队',
        memberCount: 18,
        gameId: 3,
        teamIntroduction: 'iG（Invictus Gaming）电子竞技战队成立于2011年，旗下拥有英雄联盟分部、DOTA2分部、星际争霸Ⅱ分部等。',
        teamCreateDate: '2014-11-05',
        teamStatus: 0,
        teamBoss: 'misaki',
        teamContact: '1234567@gmail.com'
      },
      
      gameList: [
        {
          gameId: 1,
          gameName: 'CS:GO',
        },
        {
          gameId: 2,
          gameName: 'LOL',
        },
        {
          gameId: 3,
          gameName: '炉石传说',
        },
        {
          gameId: 4,
          gameName: 'APEX',
        },
        {
          gameId: 5,
          gameName: '守望先锋',
        }
      ],
      imageUrl: '',
      tableData: [],
      pageSize: 10,
      addTeamVisible: false,

      teamStatusList: [
        {
          statusId: 0,
          statusName: '准备中'
        },
        {
          statusId: 1,
          statusName: '可比赛'
        },
        {
          statusId: 2,
          statusName: '已预约'
        },
        {
          statusId: 3,
          statusName: '比赛中'
        }
      ],
      statusMap: new Map(),
      gameMap: new Map()
    }
  },
  methods: {
    setStatus(row, column) {
      return this.statusMap.get(row.teamStatus);
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
    updateMember(row) {
      this.$router.push({name: 'UpdateMember', params:{memberId: row.memberId}});
    },
    // 编辑管理
    updateTeam() {
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
    for (let i = 0; i < 12; i++) {
      this.tableData.push({
        memberId: i,
        memberName: '阿尔米',
        age: i,
        selfPoint: 21,
        joinDate: '2022-01-14'
      })
    }

    for (let n = 0; n < this.gameList.length; n++) {
      const element = this.gameList[n];
      this.gameMap.set(element.gameId, element.gameName);
    }
    for (let j = 0; j < this.teamStatusList.length; j++) {
      const element = this.teamStatusList[j];
      this.statusMap.set(element.statusId, element.statusName);
    }
  }
}
</script>
<style>
.el-dialog {
  margin-top: 8vh !important;
  margin-bottom: 8vh !important;
  overflow: auto;
}
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
.body {
  background-color:blueviolet;
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

