<template>
  <div class="page">
    <header>
      <Topbar/>
    </header>
    <main>
      <ResumeEditor/>
      <ResumePreview/>
    </main>
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
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #EAEBEC;
  }

  .page > main {
    flex-grow: 1;
  }

  .page > main {
    min-width: 1024px;
    max-width: 1440px;
    margin-top: 16px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    width: 100%;
    align-self: center;
  }

  #resumeEditor {
    width: 35%;
    background: #444;
  }

  #resumePreview {
    flex-grow: 1;
    margin-left: 16px;
    background: #777;
  }
</style>
