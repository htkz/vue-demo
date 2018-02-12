<template>
  <div id="app">
    <Topbar/>
    <ResumeEditor/>
    <ResumePreview/>
  </div>
</template>

<script>

import './assets/reset.css'
import 'normalize.css/normalize.css'

import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'


export default {
  name: 'App',
  data: () => {
    return {
      text: 'hello'
    }
  },
  components: {Topbar, ResumeEditor, ResumePreview}
}
</script>

<style>

</style>
