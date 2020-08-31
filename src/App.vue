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
        <v-row class="pt-12" v-if="!isEmptyDate">
          <v-col cols="12" class="text-center">
            <h3>Compare two different dates</h3>
          </v-col>
        </v-row>
        <transition name="fade">
          <v-row class="pt-12" align="center" justify="center" v-if="isEmptyDate">
            <v-col cols="12">
              <h3>Growth of cases between your selected dates</h3>
              <differenceOfInfections
                :date1="toDate"
                :date2="fromDate"
              />
            </v-col>
          </v-row>
        </transition>
        <v-row class="pt-12" align="center" justify="center">
          <v-col cols="12" sm="6" md="5" class="text-center">
            <Calendar type="from" @fromDateChange="refreshFromDate" />
          </v-col>
          <v-col cols="12" sm="6" md="5" class="text-center">
            <Calendar type="to" @toDateChange="refreshToDate" />
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
      whenQuarantineStarted: {},
      fromDate: undefined,
      toDate: undefined
    }
  },
  methods: {
    async init() {
      this.latestByCountry = await Fetchy.Get('https://covid19-api.org/api/status/hu')
      this.whenSchoolStarted = await Fetchy.Get('https://covid19-api.org/api/status/hu?date=2020-09-01')
      this.whenQuarantineStarted = await Fetchy.Get('https://covid19-api.org/api/status/hu?date=2020-03-28')
    },
    async refreshFromDate(value) {
      this.fromDate = await Fetchy.Get(`https://covid19-api.org/api/status/hu?date=${value}`)
    },
    async refreshToDate(value) {
      this.toDate = await Fetchy.Get(`https://covid19-api.org/api/status/hu?date=${value}`)
    }
  },
  computed: {
    isEmptyDate() {
      return (this.fromDate !== undefined) && (this.toDate !== undefined)
    }
  },
  async mounted() {
    await this.init()
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
  background-color: rgb(20, 22, 23);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>