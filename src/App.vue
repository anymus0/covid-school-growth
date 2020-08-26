<template>
  <div id="app">
    <h2>How much has covid infections grown since the new school year has started?</h2>
    <InfectionsSinceSchool :latest="latestByCountry" />
    <h2>Summer data</h2>
    <InfectionsBeforeSchool />
  </div>
</template>

<script>
import InfectionsSinceSchool from './components/InfectionsSinceSchool'
import InfectionsBeforeSchool from './components/InfectionsBeforeSchool'
import {Fetchy} from './Fetch'

export default {
  name: 'App',
  components: {
    InfectionsSinceSchool,
    InfectionsBeforeSchool
  },
  data() {
    return {
      latestByCountry: {}
    }
  },
  methods: {
    async init() {
      this.latestByCountry = await Fetchy.Get('https://covid19-api.org/api/status/hu')
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b4e4fa;
  background-color: #1b1b1b;
  margin-top: 1rem;
  padding: 0.7rem;
}
</style>
