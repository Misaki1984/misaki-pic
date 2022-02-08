<template>
<!-- curd，表格管理 -->
  <div class="app-container">
    <el-form ref="form" :model="searchForm" label-width="80px" :inline="true">

      <el-form-item label="战队">
        <el-input size="medium" v-model="searchForm.teamName"/>
      </el-form-item>

      <el-form-item label="游戏">
        <el-select popper-class="remove-scrollbar" size="medium" v-model="searchForm.gameId" filterable placeholder="请选择">
          <el-option
            v-for="item in gameList"
            :key="item.gameId"
            :label="item.gameName"
            :value="item.gameId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间">
        <el-date-picker
          v-model="searchForm.competitionDates"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="medium">
        </el-date-picker>
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
        prop="competitionName"
        label="赛事名"
        width="300">
      </el-table-column>
      <el-table-column
        prop="competitionGame"
        label="游戏名"
        width="180">
      </el-table-column>
      <el-table-column
        sortable
        prop="competitionStartDate"
        label="比赛时间"
        width="180">
      </el-table-column>
      <el-table-column
        sortable
        prop="competitionStatus"
        label="状态"
        >
      </el-table-column>

      <!-- 成立时间 -->
      
      <el-table-column
        fixed="right"
        label="操作"
        width="160">
        <template slot-scope="scope">
          <!-- 查看 -->
          <el-button icon="el-icon-search" @click="viewCompetition(scope.row)" style="padding:10px 10px" size="medium"></el-button>
          <!-- 编辑-->
          <el-button icon="el-icon-edit" @click="updateGame(scope.row)" style="padding:10px 10px" type="warning" size="medium"></el-button>
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
      searchForm: {
        teamName: '',
        gameId: '',
        competitionDates: [],
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
      tableData: [],
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
    for (let i = 0; i < 10; i++) {
      this.tableData.push(
        {
          competitionId: i + 1,
          competitionName: '第一届亚洲地区CSGO比赛',
          competitionGame: 'CS:GO',
          competitionStartDate: '2022-01-01 15:30',
          competitionStatus: 1,
        }
      )
    }
  }
}
</script>

<style lang="scss">
.remove-scrollbar{
  // .el-scrollbar__wrap{
  //   overflow: hidden;  //超出部分不滚动，直接显示
  // }
  ::-webkit-scrollbar-track{
    border: none;
    background-color: #fff;
  }
  // .el-scrollbar__thumb{
  //   display: none;  //去掉右侧滚动条
  // }
}
</style>
<style scoped>
.line{
  text-align: center;
}
</style>

