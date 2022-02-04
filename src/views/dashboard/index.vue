<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-row gutter="20">
      <el-col :span="12">
        <div class="flex-card-between" style="margin-bottom:10px">
          <div class="page-title">
            近期赛程
          </div>
          <div class="date-picker">
            <el-date-picker
              v-model="competitionDate"
              type="date"
              :picker-options="pickerOptions"
              placeholder="选择比赛日期">
            </el-date-picker>
          </div>
        </div>
        
        <div style="height:77vh;overflow-y:auto">
          <div class="grid-content bg-purple flex-card-between" v-for="match in competitionList" :key="match.competitionId">
            
            <div class="flex-card card-word">
              <img :src="match.teamRed.teamAvatar" height="64" width="64">
              <div class="left-team">
                <div class="team-word">{{match.teamRed.teamName}}</div>
                <div class="record-font">{{match.teamRed.record}}</div>
              </div>
            </div>
            <!-- 点击左右队伍头像，显示viewTeam的dialog -->
            <!-- 点击时间跳转赛事详细，如果比赛进行中，则显示进行中，点击跳转到直播平台 -->
            <a @click="gotoCompetitionDetial()" style="width: 150px">
              <div class="center-time">
                <div class="match-time">{{match.competitionStartDate}}</div>
                <div class="match-game">{{match.gameName}}</div>
              </div>  
            </a>

            <div class="flex-card card-word">
              <div class="right-team">
                <div class="team-word">{{match.teamBlue.teamName}}</div>
                <div class="record-font">{{match.teamBlue.record}}</div>
              </div>
              <img :src="match.teamBlue.teamAvatar" height="64" width="64">
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        
      </el-col>
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
      pickerOptions: {
        disabledDate: time => {
          return this.dealDisabledDate(time);
        }
      },
      competitionDate: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    dealDisabledDate (time) {
      // time 是一个new Date数据
      if (new Date(time).getTime() > new Date().getTime()) { // 如果选中之后的时间（未来）
        return time.getTime() >= Date.now() + 5 * 8.64e7;//时间范围必须是时间戳
      } else { // （过去）
        return time.getTime() < Date.now() - 5 * 8.64e7;//8.64e7就是一天的时间戳 24*60*60*1000   两天之内 根据自己需求来定
      }
    },
  },
  created() {
    for (let i = 0; i < 6; i++) {
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
    this.competitionDate = new Date();
  }
}
</script>

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
.flex-card {
  display: flex;
}
.flex-card-between {
  display: flex;
  justify-content: space-between;
}
.card-word {
  align-items: center;
}
.team-word {
  font-size: 22px;
  font-weight: 500;
}
.left-team {
  margin: 0 0 0 10px;
}
.right-team {
  margin: 0 10px 0 0;
  text-align: right;
}
.center-time {
  margin: 20px 0 0 0;
  text-align: center;
}
.record-font {
  font-size: 13px;
  color: #777677;
}
.match-time {
  font-size: 20px;
}
.match-game {
  font-size: 13px;
  color: #777677;
}
.page-title {
  font-size: 30px;
  font-weight: 520;
  display: inline-block;
}
.date-picker {
  text-align: right;
  display: inline-block;
}
.grid-content {
  margin: 0 0 16px 0;
  padding: 0.8rem;
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
