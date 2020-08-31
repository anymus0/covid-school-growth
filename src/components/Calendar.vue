<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          dark
          reactive
          v-model="date"
          :label='type + ":"'
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker dark v-model="date" @input="menu = false; sendDate()"></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
  export default {
    name: 'Calendar',
    props: ['type'],
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false
    }),
    methods: {
      async sendDate() {
        if (this.type === 'from') {
          this.$emit('fromDateChange', this.date)
        } else {
          this.$emit('toDateChange', this.date)
        }
      }
    }
  }
</script>