<template lang="html">
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resumer</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topbar'
}
</script>

<style lang="css">
  #topbar {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .25);
    height: 64px;
  }

  #topbar > .wrapper {
    min-width: 1024px;
    max-width: 1440px;
    margin: 0 auto;
    height:64px;
  }

  #topbar > .wrapper {
    display: flex;
    align-items: center;
    padding: 0 16px;
  }

  #topbar .logo {
    font-size: 24px;
    color: black;
  }
</style>
