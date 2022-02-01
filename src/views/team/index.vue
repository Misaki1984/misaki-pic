<template>
<!-- curd，表格管理 -->
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" :inline="true">

      <el-form-item label="战队名称">
        <el-input size="medium" v-model="form.name"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="teamSearch" size="medium">检索</el-button>
      </el-form-item>  
  
      <el-form-item>
        <!-- <el-switch v-model="form.delivery" /> -->
        <el-button type="primary" @click="shwoAddTeamDialog" size="medium">新增战队</el-button>
      </el-form-item>

    </el-form>

    <el-table
      :data="tableData"
      height="500"
      border
      style="width: 100%"
      v-loading="loading">
      <el-table-column
        prop="teamName"
        label="战队名"
        width="150">
      </el-table-column>
      <el-table-column
        sortable
        prop="memberCount"
        label="人数"
        width="80">
      </el-table-column>
      <el-table-column
        sortable
        prop="gameId"
        label="游戏名"
        :formatter="setGame"
        width="100">
      </el-table-column>
      
      <el-table-column
        sortable
        prop="teamCreateDate"
        label="成立时间"
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="teamStatus"
        label="状态"
        :formatter="setStatus"
        width="90">
      </el-table-column>
      <el-table-column
        prop="teamIntroduction"
        label="战队简介">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="160">
        <template slot-scope="scope">
          <!-- 查看 -->
          <el-button icon="el-icon-search" @click="viewTeam(scope.row)" style="padding:10px 10px" size="medium"></el-button>
          <!-- 编辑-->
          <el-button icon="el-icon-edit" @click="updateTeam(scope.row)" style="padding:10px 10px" type="warning" size="medium"></el-button>
          <!-- 删除 -->
          <el-button icon="el-icon-delete" @click="deleteTeam(scope.row)" style="padding:10px 10px" type="danger" size="medium"></el-button>
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
    
    <el-dialog>
      <!-- 查看使用description -->
    </el-dialog>      


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
      loading: true,
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
      addForm: {
        teamName: '',
        game: '',
        teamBoss: '',
        teamContact: '',
        teamIntroduction: ''
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
      pageSize: 10,
      addTeamVisible: false,
      rules: {
        teamName: [
          { required: true, message: '请输入战队名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        game: [
          { required: true, message: '请选电竞项目', trigger: 'change' }
        ],
        teamBoss: [
          { required: true, message: '请填写负责人', trigger: 'blur' }
        ],
        teamContact: [
          { required: true, message: '联系方式不能为空', trigger: 'blur' }
        ]
      },
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
      // switch (row.teamStatus) {
      //   case 0:
      //     return "准备中";
      //   case 1:
      //     return "可比赛";
      //   default:
      //     return "准备中";
      // }
      return this.statusMap.get(row.teamStatus);
    },
    setGame(row, column) {
      return this.gameMap.get(row.gameId);
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
    shwoAddTeamDialog() {
      this.addTeamVisible = true;
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
     },
     viewTeam() {

     },
     // 编辑管理
     updateTeam() {
       this.$router.push({name: 'UpdateTeam', params:{teamId: '1'}});
     },
     deleteTeam() {

     }
  },
  created () {
    for (let i = 0; i < 14; i++) {
      this.tableData.push({
        teamId: '1',
        teamName: 'IG战队',
        memberCount: 18,
        gameId: 3,
        teamIntroduction: 'iG（Invictus Gaming）电子竞技战队成立于2011年，旗下拥有英雄联盟分部、DOTA2分部、星际争霸Ⅱ分部等。',
        teamCreateDate: '2014-11-05',
        teamStatus: 0
      })
    }
    this.tableData.push({
        teamId: '2',
        teamName: 'LGD战队',
        memberCount: 11100,
        gameId: 2,
        teamIntroduction: '暂无',
        teamCreateDate: '2018-11-05',
        teamStatus: 1
    })
    for (let j = 0; j < this.teamStatusList.length; j++) {
      const element = this.teamStatusList[j];
      this.statusMap.set(element.statusId, element.statusName);
    }
    for (let n = 0; n < this.gameList.length; n++) {
      const element = this.gameList[n];
      this.gameMap.set(element.gameId, element.gameName);
    }
    this.loading = false;
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

