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
          :label="labelText"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker dark v-model="date" @input="menu = false; send()"></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
  export default {
    name: 'Calendar',
    props: ['labelText'],
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false
    }),
    methods: {
      send: function () {
        console.log(this.date)
      }
    }
  }
</script>