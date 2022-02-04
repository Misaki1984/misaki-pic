<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>


<style>
/* 暂时将公共CSS提到这里 */
::-webkit-scrollbar-track
{
	border: 1px solid black;
	background-color: #F5F5F5;
}
::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}
::-webkit-scrollbar-thumb
{
	background-color: #002d9c;	
}

/* 按钮样式 */
.el-button {
  border-radius: 0;
  padding: 10px 16px;
}


.blue-button {
  background: #0062ff !important;
  color: #fff;
  opacity: 1;
  border: 0.1px;
}
.blue-button:active {
  background: #0453E7 !important;
}
/*按钮悬浮*/
.blue-button:hover {
  background: #0453E7 !important;
  color: white !important;
}
/*按钮点击*/
.blue-button:focus {
  background: #0453E7 !important;
  color: white !important;
}


</style>