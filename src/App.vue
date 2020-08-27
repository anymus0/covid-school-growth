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
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <h2>How much has covid infections grown since the new school year has started?</h2>
            <differenceOfInfections
              :date1="latestByCountry"
              :date2="whenSchoolStarted"
            />
            <h2>Between the quarantine has started and ended:</h2>
            <differenceOfInfections
              :date1="whenSchoolStarted"
              :date2="whenQuarantineStarted"
            />
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
      this.whenSchoolStarted = await Fetchy.Get('https://covid19-api.org/api/status/hu?date=2020-08-26')
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