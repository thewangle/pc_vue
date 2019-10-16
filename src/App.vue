<template>
  <div id="app">
    <router-view/>
    <img src="./assets/img/ftop.png" alt="" class="ftop" style="position: fixed;right: 20px;bottom: 40px;z-index: 9999;display: none;width: 66px;height: 66px;cursor: pointer;" @click="backUp">
  </div>
</template>

<script>
import $ from 'jquery'
$(document).scroll(function() {
  if (document.documentElement.scrollTop > 30) {
    $('.ftop').show(1000)
  } else {
    $('.ftop').hide(1000)
  }
})
export default{
  name: 'App',
  methods: {
  	backUp() {
  	  (function smoothscroll(){
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo (0,currentScroll - (currentScroll/5));
        }
      })();
  	},
  },
}
</script>
<style>
.fengebr {
  width: 100%;
  padding: 60px 0 40px 0;
  text-align: center;
  cursor: pointer;
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
  border-bottom: 1px solid rgb(220,220,220);
}
.noDate {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.nodataImg {
  width: 200px;
  height: 200px;
}
.nodataSpan {
  color: rgba(180,180,180);
  font-size: 16px;
  font-weight: bold;
}
.tag_blue {
  color: #409EFF;
  font-weight: bold;
}
.tag_red {
  color: #F56C6C;
  font-weight: bold;
}
.tag_yellow {
  color: #E6A23C;
  font-weight: bold;
}
.tag_green {
  color: #67C23A;
  font-weight: bold;
}
.el-badge__content.is-fixed {
  top: 10px;
  right: 80px;
}
.addB {
  text-align:center;
  font-weight: bold;
  font-size: 19px;
  color: #409EFF;
}
.el-range-separator {
  width: 20px !important;
}
</style>
