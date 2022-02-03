<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-row gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple" v-for="match in competitionList" :key="match.competitionId">
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <div class="competition-card">
                      <a @click="gotoViewTeam()" class="competition-card pic-margin">
                        <div>
                          <img :src="match.teamRed.teamAvatar" height="64" width="64">
                        </div>
                      </a>
                      <div class="competition-card">
                        <h3 style="margin: 10px 0">{{match.teamRed.teamName}}</h3>
                        <div class="record-size">{{match.teamRed.record}}</div>
                      </div>
                    </div>
                  </td>
                  <td class="match-center">
                    <div>{{match.competitionStartDate}}</div>
                    <div>{{match.gameName}}</div>
                  </td>
                  <td>
                    
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

  </div>
</template>

<script>
import gameMap from '@/utils/gameMap'
import { mapGetters } from 'vuex'


export default {
  name: 'Dashboard',
  data() {
    return {
      competitionList: [],
      
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    for (let i = 0; i < 8; i++) {
      this.competitionList.push({
        competitionId: i,
        teamRed: {
          teamAvatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          teamName: 'IG战队',
          record: '11-4'
        },
        teamBlue: {
          teamAvatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          teamName: 'IG战队',
          record: '11-4'
        },
        competitionStartDate: '17:00',
        gameId: 3
      })
    }
    this.competitionList.forEach(x => x.gameName = gameMap.get(x.gameId));
  }
}
</script>

<style>

</style>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.bg-purple {
  background: #f3f3f3;
}
.grid-content {
  margin: 16px 0 16px 0;
  padding: 1.3rem;
  -webkit-box-shadow: 0 0 0 0.1rem rgb(0 0 0 / 5%), 0 0.2rem 0.3rem 0 rgb(0 0 0 / 10%);
  -webkit-box-sizing: border-box;
  min-height: 100px;
}
.competition-card {
  display: inline-block;
  padding-bottom: 0px;
  vertical-align: middle;
}
.pic-margin {
  margin: 8px 10px 0 0;
}
.match-center {
  align-content: center;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  width: 300px;
}
.record-size {
  font-size: 14px;
}
</style>
