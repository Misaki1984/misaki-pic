<template>
  <div class="chat-code">
    <el-input v-model="code" maxlength="4" placeholder="房间号"></el-input>
    <el-button class="blue-button" style="margin-left:20px" @click="showCreateChatDialog()" icon="el-icon-plus"></el-button>
    <el-button class="blue-button" @click="enterChat()" icon="el-icon-right"></el-button>
    
  </div>
</template>

<script>

export default {
  name: 'Chat',
  data() {
    return {
      loading: false,
      code: '',
    }
  },
  watch: {
  },
  mounted(){
  },
  methods: {
    showCreateChatDialog() {
      
    },
    enterChat() {

    }
  }
}
</script>

<style lang="scss">
.chat-code {
  .el-input__inner {
    width: 100px;
    margin: 20px;
  }
}
</style>

<style lang="scss" scoped>

  


</style>