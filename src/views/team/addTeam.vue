<template>
  <el-dialog
    title="添加战队"
    :visible.sync="addTeamVisible"
    width="40%"
    center>

    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px" style="padding: 15px 35px 30px;">
      <el-form-item label="战队名称" prop="teamName">
        <el-input size="medium" maxlength="15" show-word-limit v-model="addForm.teamName" placeholder="起个帅气点的？"/>
      </el-form-item>

      <el-form-item label="电竞项目" prop="game">
        <el-select v-model="addForm.game" filterable placeholder="请选择" size="medium">
          <el-option
            v-for="item in gameList"
            :key="item.gameId"
            :label="item.gameName"
            :value="item.gameId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="负责人" prop="teamBoss">
        <el-input size="medium" maxlength="23" v-model="addForm.teamBoss" style="width:205px"/>
      </el-form-item>

      <el-form-item label="联系方式" prop="teamContact">
        <el-input size="medium" maxlength="50" v-model="addForm.teamContact" placeholder="微信，手机，QQ，邮箱任一"/>
      </el-form-item>

      <el-form-item label="战队简介">
        <el-input type="textarea" 
          :autosize="{ minRows: 2, maxRows: 4}" 
          size="medium" maxlength="100" 
          v-model="addForm.teamIntroduction" 
          placeholder="战队的目标，加入条件等"/>
      </el-form-item>
    
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="addTeamVisible = false" size="medium">取 消</el-button>
      <el-button type="primary" @click="addTeamVisible = false" size="medium">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "addTeam",
    data() {
      return {
        addTeamVisible: false,
        addForm: {
          teamName: '',
          game: '',
          teamBoss: '',
          teamContact: '',
          teamIntroduction: ''
        },
        
      }
    },
    methods: {
      showDialog() {
        this.addTeamVisible = true
      }
    },
  }
</script>

<style scoped>

</style>