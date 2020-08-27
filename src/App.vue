<template>
  <v-app id="app" dark>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>Covid19 growth tracker</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <h3>Growth cases since the new school year has started:</h3>
            <differenceOfInfections
              :date1="latestByCountry"
              :date2="whenSchoolStarted"
            />
          </v-col>
          <v-col class="text-center">
            <h3>Growth of cases between the quarantine has started and ended:</h3>
            <differenceOfInfections
              :date1="whenSchoolStarted"
              :date2="whenQuarantineStarted"
            />
          </v-col>
        </v-row>
        <v-row class="pt-12">
          <v-col class="text-center">
            <h3>Compare two different dates</h3>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">Origin of data: Hungary</span>
    </v-footer>
  </v-app>
</template>

<script>
import differenceOfInfections from './components/differenceOfInfections'
import {Fetchy} from './Fetch'

export default {
  name: 'App',
  components: {
    differenceOfInfections
  },
  data() {
    return {
      latestByCountry: {},
      whenSchoolStarted: {},
      whenQuarantineStarted: {}
    }
  },
  methods: {
    async init() {
      this.latestByCountry = await Fetchy.Get('https://covid19-api.org/api/status/hu')
      this.whenSchoolStarted = await Fetchy.Get('https://covid19-api.org/api/status/hu?date=2020-08-02')
      this.whenQuarantineStarted = await Fetchy.Get('https://covid19-api.org/api/status/hu?date=2020-04-01')
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
}
</style>