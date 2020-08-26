<template>
  <div>
    {{ latestByCurrentCountry.deaths }}
  </div>
</template>

<script>
export default {
  name: 'InfectionsSinceSchool',
  props: ['latest'],
  data() {
    return {
      latestByCurrentCountry: this.latest
    }
  }
}
</script>