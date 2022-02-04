<template>
<!-- curd，表格管理 -->
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" :inline="true">

      <el-form-item label="游戏名称">
        <el-input size="medium" v-model="form.name"/>
      </el-form-item>

      <el-form-item>
        <el-button class="blue-button" @click="clubSearch" icon="el-icon-search"></el-button>
      </el-form-item>  
  
      <el-form-item>
        <!-- <el-switch v-model="form.delivery" /> -->
        <el-button class="blue-button" @click="showAddGameDialog" icon="el-icon-plus"></el-button>
      </el-form-item>

    </el-form>

    <el-table
      :data="tableData"
      height="500"
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
          <!-- 编辑-->
          <el-button icon="el-icon-edit" @click="updateGame(scope.row)" style="padding:10px 10px" type="warning" size="medium"></el-button>
          <!-- 删除 -->
          <el-button icon="el-icon-delete" @click="deleteGame(scope.row)" style="padding:10px 10px" type="danger" size="medium"></el-button>
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
    
  <add-game ref="addGame"></add-game>
  <!-- <update-game ref="updateGame"></update-game> -->
  </div>
</template>

<script>
import addGame from './addGame.vue';

export default {
  components: {
    addGame
  },
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
    updateGame(row) {
      this.$refs.addGame.showDialog(row.gameId);
    },
    showAddGameDialog() {
      this.$refs.addGame.showDialog();
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

