<template>
<!-- curd，表格管理 -->
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" :inline="true">

      <el-form-item label="战队名称">
        <el-input size="medium" v-model="form.name"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="clubSearch" size="medium">检索</el-button>
      </el-form-item>  
  
      <el-form-item>
        <!-- <el-switch v-model="form.delivery" /> -->
        <el-button type="primary" @click="shwoAddClubDialog" size="medium">新增</el-button>
      </el-form-item>

    </el-form>

    <el-table
      :data="tableData"
      height="500"
      border
      style="width: 100%">
      <el-table-column
        prop="itemName"
        label="战队名"
        width="180">
      </el-table-column>
      <el-table-column
        sortable
        prop="itemCount"
        label="人数"
        width="80">
      </el-table-column>
      <el-table-column
        sortable
        prop="gameName"
        label="游戏名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="itemInfo"
        label="战队简介">
      </el-table-column>
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
      title="添加战队"
      :visible.sync="addClubVisible"
      width="40%"
      center>

      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px" style="padding: 15px 35px 30px;">
        <el-form-item label="战队名称" prop="clubName">
          <el-input size="medium" maxlength="15" show-word-limit v-model="addForm.clubName" placeholder="起个帅气点的？"/>
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

        <el-form-item label="负责人" prop="boss">
          <el-input size="medium" maxlength="23" v-model="addForm.boss" style="width:205px"/>
        </el-form-item>

        <el-form-item label="联系方式" prop="contact">
          <el-input size="medium" maxlength="50" v-model="addForm.contact" placeholder="微信，手机，QQ，邮箱任一"/>
        </el-form-item>

        <el-form-item label="战队简介">
          <el-input type="textarea" 
            :autosize="{ minRows: 2, maxRows: 4}" 
            size="medium" maxlength="100" 
            v-model="addForm.introduction" 
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
        clubName: '',
        game: '',
        boss: '',
        contact: '',
        introduction: ''
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
      addClubVisible: false,
      rules: {
        clubName: [
          { required: true, message: '请输入战队名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        game: [
          { required: true, message: '请选电竞项目', trigger: 'change' }
        ],
        boss: [
          { required: true, message: '请填写负责人', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '联系方式不能为空', trigger: 'blur' }
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
    for (let i = 0; i < 14; i++) {
      this.tableData.push({
        itemName: 'IG战队',
        itemCount: 18,
        gameName: '炉石传说',
        itemInfo: 'iG（Invictus Gaming）电子竞技战队成立于2011年，旗下拥有英雄联盟分部、DOTA2分部、星际争霸Ⅱ分部等。'
      })
    }
    this.tableData.push({
        itemName: 'LGD战队',
        itemCount: 11100,
        gameName: '英雄联盟',
        itemInfo: '暂无'
    })
    
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

