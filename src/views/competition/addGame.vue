<template>
  <el-dialog
    title="新增/更新游戏"
    :visible.sync="addGameVisible"
    width="40%"
    center>

    <el-form ref="addGame" :model="addGame" :rules="rules" label-width="80px" style="padding: 15px 35px 30px;">
      <el-form-item label="游戏名称" prop="gameName">
        <el-input size="medium" maxlength="30" v-model="addGame.gameName"/>
      </el-form-item>

      <el-form-item label="游戏类型" prop="gameType">
        <!-- <el-input size="medium" maxlength="23" v-model="addGame.gameType" style="width:205px"/>
      </el-form-item>
      <el-form-item label="电竞项目" prop="game"> -->
        <el-select v-model="addGame.gameType" filterable placeholder="请选择游戏类型" size="medium">
          <el-option
            v-for="item in gameTypeList"
            :key="item.gameTypeId"
            :label="item.gameTypeName"
            :value="item.gameTypeId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="游戏人数" prop="gameNumber">
        <el-input-number v-model="addGame.gameNumber" @change="handleChange" :min="1" :max="200"></el-input-number>
        <!-- <el-input size="medium" maxlength="23" v-model="addGame.gameNumber" style="width:205px"/> -->
      </el-form-item>

      <el-form-item label="发行商" prop="gamePublisher">
        <el-input size="medium" maxlength="50" v-model="addGame.gamePublisher" placeholder="如: 微软，卡普空，暴雪，拳头等"/>
      </el-form-item>

      <el-form-item label="游戏简介">
        <el-input type="textarea" 
          :autosize="{ minRows: 2, maxRows: 4}" 
          size="medium" maxlength="100" 
          v-model="addGame.gameInfo" 
          placeholder="游戏的主要玩法等"/>
      </el-form-item>
    
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false" size="medium">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false" size="medium">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "addGame",
    data() {
      return {
        addGameVisible: false,
        addGame: {
          gameName: '',
          gameType: '',
          gameNumber: '',
          gamePublisher: '',
          gameInfo: ''
        },
        rules: {
          gameName: [
            { required: true, message: '请输入游戏名', trigger: 'blur' }
          ],
          gameType: [
            { required: true, message: '请选择游戏类型', trigger: 'change' }
          ],
          gameNumber: [
            { required: true, message: '标准游戏人数', trigger: 'blur' }
          ]
        },
        gameTypeList: [
          {
            gameTypeId: 1,
            gameTypeName: 'MOBA'
          },
          {
            gameTypeId: 2,
            gameTypeName: 'FPS'
          },
          {
            gameTypeId: 3,
            gameTypeName: 'RTS'
          },
          {
            gameTypeId: 4,
            gameTypeName: 'FTG'
          },
          {
            gameTypeId: 5,
            gameTypeName: 'RPG'
          },
          {
            gameTypeId: 6,
            gameTypeName: 'SLG'
          },
        ],
      }
    },
    methods: {
      showDialog(memberId) {
        if(memberId != undefined) {
          // 修改，请求接口，将form覆盖
          this.addGame = {
            gameId: 5,
            gameName: '守望先锋',
            gameNumber: 12,
            gameType: 'FPS',
            gamePublisher: '暴雪',
            gameInfo: '暴雪旗下...'
          }
        }
        this.addGameVisible = true
      }
    },
  }
</script>

<style scoped>

</style>