<template>
  <div class="hint">
      <h3>{{title}}</h3>
      <p>{{content}}</p>
  </div>
</template>

<script>
  export default {
    props: ['title', 'content']
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hint{
    background-color: #ebf8fd;
    border: 1px solid #ceeef9;
    border-radius: 5px;
    padding:5px 15px 7px 20px;
    margin-bottom: 12px;
  }

  .hint h3{
    line-height: 30px;
    color: #84d2f1;
  }

  .hint p{
    line-height: 22px;
  }
</style>
