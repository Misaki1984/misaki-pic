<template>
<!-- curd，表格管理 -->
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" :inline="true">

      <el-form-item label="游戏名称">
        <el-input size="medium" v-model="form.name"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="clubSearch" size="medium">检索</el-button>
      </el-form-item>  
  
      <el-form-item>
        <!-- <el-switch v-model="form.delivery" /> -->
        <el-button type="primary" @click="shwoAddClubDialog" size="medium">新增游戏</el-button>
      </el-form-item>

    </el-form>

    <el-table
      :data="tableData"
      height="500"
      border
      style="width: 100%">
      <el-table-column
        prop="gameName"
        label="游戏名"
        width="180">
      </el-table-column>
      <el-table-column
        sortable
        prop="gameNumber"
        label="游戏规模"
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="gameType"
        label="类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="gameInfo"
        label="游戏简介">
      </el-table-column>

      <!-- 成立时间 -->
      
      <el-table-column
        fixed="right"
        label="操作"
        width="160">
        <template slot-scope="scope">
          <!-- 查看 -->
          <el-button icon="el-icon-search" @click="handleClick(scope.row)" style="padding:10px 10px" size="medium"></el-button>
          <!-- 编辑-->
          <el-button icon="el-icon-edit" @click="handleClick(scope.row)" style="padding:10px 10px" type="warning" size="medium"></el-button>
          <!-- 删除 -->
          <el-button icon="el-icon-delete" @click="handleClick(scope.row)" style="padding:10px 10px" type="danger" size="medium"></el-button>
        </template>
      </el-table-column>

    </el-table>
    <div style="margin-top:16px">
      <el-pagination align='center' 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper" 
        :total="tableData.length">
      </el-pagination>  
    </div>
    
    <el-dialog
      title="添加游戏"
      :visible.sync="addClubVisible"
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
          <el-input size="medium" maxlength="50" v-model="addGame.gamePublisher" placeholder="如：微软，卡普空，暴雪，拳头等"/>
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

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      addGame: {
        gameName: '',
        gameType: '',
        gameNumber: '',
        gamePublisher: '',
        gameInfo: ''
      },
      tableData: [
        {
          gameId: 1,
          gameName: 'CS:GO',
          gameNumber: 12,
          gameType: 'FPS',
          gameInfo: '反恐精英：全球行动'
        },
        {
          gameId: 2,
          gameName: 'LOL',
          gameNumber: 10,
          gameType: 'RTS',
          gameInfo: '英雄联盟'
        },
        {
          gameId: 3,
          gameName: '炉石传说',
          gameNumber: 2,
          gameType: 'SLG',
          gameInfo: '即时卡牌对战'
        },
        {
          gameId: 4,
          gameName: '星际争霸2',
          gameNumber: 3,
          gameType: 'RTS',
          gameInfo: '暴雪旗下....'
        },
        {
          gameId: 5,
          gameName: '守望先锋',
          gameNumber: 12,
          gameType: 'FPS',
          gameInfo: '暴雪旗下...'
        }
      ],
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
      pageSize: 10,
      addClubVisible: false,
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
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    shwoAddClubDialog() {
      this.addClubVisible = true;
    },
    // //每页条数改变时触发 选择一页显示多少行
    //  handleSizeChange(val) {
    //      console.log(`每页 ${val} 条`);
    //      this.currentPage = 1;
    //      this.pageSize = val;
    //  },
     //当前页改变时触发 跳转其他页
     handleCurrentChange(val) {
         console.log(`当前页: ${val}`);
         this.currentPage = val;
     }
  },
  created () {
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

