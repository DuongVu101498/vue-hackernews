<template>
  <div  :class="{ hidden: hidden, error: error }" class="progress" :style="{ width: `${percent}%` }">{{this.message}}</div>
</template>
<script>

export default {
  data() {
    return {
      hidden: true,
      percent: 0,
      error: false,
    };
  },
  
  computed:{
    message: function(){
      if (this.error === true){
        return 'Fail to load !!!'
      }else{
        return this.percent + '%'
      }

    }
  },
  methods: {
    start() {
      this.hidden = false;
      this.percent = 0;
      this.error= false;
      this.timer = setInterval(() => {
        if(this.percent < 99){
          this.percent++;
        }
      }, 100);
    },
    finish() {
      this.percent = 100;
      this.hidden = true;
      clearInterval(this.timer)
    },
    fail(){
      this.error=true
      this.percent = 100;
      clearInterval(this.timer)
    }
  },
};
</script>
<style scoped>
.progress {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 0%;
  transition: width 0.2s, opacity 0.4s;
  opacity: 1;
  background-color: #095af1;
  z-index: 999999;
  color: rgb(245, 245, 245);
}
.hidden {
    display: none;
}
.error {
  background-color: red;
}
</style>>
