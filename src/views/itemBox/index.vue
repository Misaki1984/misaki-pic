<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">

      <el-row :gutter="20">
        <el-col span="8">
          <el-form-item label="ItemName">
            <el-input v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col span="4">
            <el-button type="primary" @click="SearchBoxItem">Search</el-button>
        </el-col>

        <el-col span="4">
          <!-- 解锁时需要密码 -->
          <el-form-item label="ItemLock">
            <el-switch v-model="form.delivery" />
          </el-form-item>
        </el-col>
      </el-row>


      <!-- <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item> -->

      <!-- <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item> -->

      


      <!-- <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item> -->

      <!-- <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item> -->

      <!-- <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item> -->

      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item> -->

    </el-form>

    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="itemName"
        label="ItemName"
        width="180">
      </el-table-column>
      <el-table-column
        prop="itemCount"
        label="Count"
        width="100">
      </el-table-column>
      <el-table-column
        prop="itemInfo"
        label="ItemInfo">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operation"
        width="180">
        <template slot-scope="scope">
          <!-- 这里需要判断【物品类型】是否可以使用 -->
          <el-button @click="handleClick(scope.row)" type="success" size="mini">use</el-button>
          <!-- 需要判断【物品类型】是否可以丢弃 -->
          <el-button @click="handleClick(scope.row)" type="danger" size="mini">destroy</el-button>
        </template>
      </el-table-column>

    </el-table>
    

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
      tableData: [{
          itemName: 'Life Potion',
          itemCount: 10,
          itemInfo: 'Heal 10 HP'
        }, {
          itemName: 'Life Potion',
          itemCount: 10,
          itemInfo: 'Heal 10 HP'
        }, {
          itemName: 'Life Potion',
          itemCount: 10,
          itemInfo: 'Heal 10 HP'
        }, {
          itemName: 'Life Potion',
          itemCount: 10,
          itemInfo: 'Heal 10 HP'
        }, {
          itemName: 'Life Potion',
          itemCount: 10,
          itemInfo: 'Heal 10 HP'
        }, {
          itemName: 'Life Potion',
          itemCount: 10,
          itemInfo: 'Heal 10 HP'
        }, {
          itemName: 'Life Potion',
          itemCount: 10,
          itemInfo: 'Heal 10 HP'
        }
      ]
      
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
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}

</style>

