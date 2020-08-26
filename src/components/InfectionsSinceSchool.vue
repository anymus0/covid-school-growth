<template>
  <div>
    <p>{{ percentageOfDifference }}%</p>
  </div>
</template>

<script>
export default {
  name: 'InfectionsSinceSchool',
  props: ['latest'],
  data() {
    return {
      //latestByCurrentCountry: this.latest.deaths
    }
  },
  computed: {
    percentageOfDifference() {
      return (((this.latest.deaths - 310) / ((this.latest.deaths + 310) / 2)) * 100).toFixed(1)
    }
  },
}
</script>