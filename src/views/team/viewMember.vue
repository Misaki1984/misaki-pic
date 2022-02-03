<template>
  <el-dialog
    title="队员信息"
    :visible.sync="viewMemberVisible"
    width="60%"
    center>
    <!-- 查看使用description -->
    <el-descriptions class="margin-top" :column="3" border>
      <template slot="title">
        <h1>{{member.memberName}}</h1>
      </template>
      <!-- 战队头像 -->
      <template slot="extra">
        <el-image
          style="width: 100px; height: 100px"
          :src="member.memberAvatar"></el-image>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          手机
        </template>
        {{member.memberPhone}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          身份证
        </template>
        {{member.identityNumber}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          入队时间
        </template>
        {{member.joinDate}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          个人胜点
        </template>
        <el-tag size="small">{{member.selfPoint}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          个人简介
        </template>
        {{member.memberIntroduction}}
      </el-descriptions-item>
    </el-descriptions>

    <!-- <el-divider content-position="left">最近比赛</el-divider> -->

  </el-dialog>
</template>

<script>
  export default {
    name: "viewMember",
    data() {
      return {
        viewMemberVisible: false,
        member: {
          memberName: 'Sakakibara',
          memberPhone: 12321312342,
          identityNumber: '21321321321312',
          memberIntroduction: 'LOL擅长中路法师，上单；fps擅长狙；懂得指挥',
          joinDate: '2022-01-11',
          selfPoint: 12,
          memberAvatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
      }
    },
    methods: {
      showDialog(memberId) {
        // 查询后台
        this.viewMemberVisible = true
      }
    },
  }
</script>

<style>
.el-dialog--center .el-dialog__body {
  padding: 5px 25px 25px;
}
.el-descriptions-item__cell el-descriptions-item__label is-bordered-label {
  width:120px;
}
</style>
<style scoped>

</style>