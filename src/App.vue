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
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="6">
            <h3>Growth of cases since the new school year has started</h3>
            <differenceOfInfections
              :date1="latestByCountry"
              :date2="whenSchoolStarted"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <h3>Growth of cases between the quarantine has started and ended</h3>
            <differenceOfInfections
              :date1="whenSchoolStarted"
              :date2="whenQuarantineStarted"
            />
          </v-col>
        </v-row>
        <v-row class="pt-12">
          <v-col cols="12" class="text-center">
            <h3>Compare two different dates</h3>
          </v-col>
        </v-row>
        <v-row class="pt-12" align="center" justify="center">
          <v-col cols="12" sm="6" md="5" class="text-center">
            <Calendar labelText="From:" />
          </v-col>
          <v-col cols="12" sm="6" md="5" class="text-center">
            <Calendar labelText="To:" />
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
import Calendar from './components/Calendar'
import {Fetchy} from './Fetch'

export default {
  name: 'App',
  components: {
    differenceOfInfections,
    Calendar
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
      this.whenSchoolStarted = await Fetchy.Get('https://covid19-api.org/api/status/hu?date=2020-09-01')
      this.whenQuarantineStarted = await Fetchy.Get('https://covid19-api.org/api/status/hu?date=2020-03-28')
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