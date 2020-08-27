<template>
  <div>
    <p class="value"><strong>{{ percentageOfDifference }}%</strong></p>
    <p>In numbers:</p>
    <p class="value"><strong>{{ numOfDifference }}</strong></p>
  </div>
</template>

<script>
export default {
  name: 'differenceOfInfections',
  props: ['date1', 'date2'],
  computed: {
    numOfDifference() {
      return this.date1.cases - this.date2.cases
    },
    percentageOfDifference() {
      return (((this.date1.cases - this.date2.cases) / ((this.date1.cases + this.date2.cases) / 2)) * 100).toFixed(1)
    }
  },
}
</script>

<style lang="scss" scoped>
.value {
  color: rgba(214, 87, 87, 0.815);
  font-size: 1.3rem;
}
</style>