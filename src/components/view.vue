<template>
  <div class="view">
    <Menus></Menus>
    <div class="all-right">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Menus from './menu.vue'

  export default {
    data() {
      return {}
    },
    components: {Menus}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .view {
    background-color: #f2f3f3;
  }

  .all-right {
    margin-left: 260px;
    margin-top: 65px;
    min-width: 1000px;
    padding: 25px;
    box-sizing: border-box;
  }
</style>
