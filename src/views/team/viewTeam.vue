<template>
  <el-dialog
    title="战队详情"
    :visible.sync="viewTeamVisible"
    width="60%"
    center>
    <!-- 查看使用description -->
    <el-descriptions class="margin-top" :column="3" border>
      <template slot="title">
        <h1>{{team.teamName}}</h1>
      </template>
      <!-- 战队头像 -->
      <template slot="extra">
        <el-image
          style="width: 100px; height: 100px"
          :src="team.teamAvator"></el-image>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          游戏
        </template>
        <el-tag size="small">{{team.game}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          状态
        </template>
        {{team.teamStatus}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          胜点
        </template>
        <el-tag size="small">{{team.winPoint}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          负责人
        </template>
        {{team.teamBoss}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          联系方式
        </template>
        {{team.teamContact}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          人数
        </template>
        {{team.memberCount}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          队伍介绍
        </template>
        {{team.teamIntroduction}}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
  export default {
    name: "viewTeam",
    data() {
      return {
        viewTeamVisible: false,
        team: {
          teamName: 'IG战队',
          teamBoss: 'Misaki',
          game: '炉石传说',
          teamContact: '10171413@qq.com',
          teamIntroduction: 'fdfdsaf大大师傅电风扇犯得上发的萨芬是dsafdsa',
          teamCreateDate: '2022-01-11',
          teamStatus: '可比赛',
          winPoint: 12,
          memberCount: 11,
          teamAvator: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        
      }
    },
    methods: {
      showDialog(teamId) {
        // 查询后台
        this.viewTeamVisible = true
      }
    },
  }
</script>

<style>
.el-dialog--center .el-dialog__body {
  padding: 5px 25px 25px;
}
</style>
<style scoped>

</style>