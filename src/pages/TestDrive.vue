

<template>

  <v-data-table :headers="headers" :items="testDrives" :items-per-page="7" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.gmail }}</td>
        <td class="text-xs-left">{{ props.item.gender }}</td>
        <td class="text-xs-left">{{ props.item.country}}</td>
        <td class="text-xs-left">{{ props.item.phone}}</td>
        <td class="text-xs-left">{{ props.item.date}}</td>
        <td class="text-xs-left">
          <v-icon class="edit" small @click="editBrand(props)">edit</v-icon>
          <v-icon class="delete" small @click="deleteItem(props)">delete</v-icon>
        </td>
      </template>
    </v-data-table>
</template>
<script >
import api from '../utils/api.js'
export default{
  data(){
    return{
      testDrives:[],

      headers: [
        {
          text: " Name",
          value: "Name",
          align: "left",
          sortable: false
        },
        {
          text: "Gmail",
          value: "Gamil",
          align: "left",
          sortable: false
        },
        {
          text: "Gender",
          value: "Gender",
          align: "left",
          sortable: false
        },
        {
          text: "Country",
          value: "Country",
          align: "left",
          sortable: false
        },
        {
          text: "Phone",
          value: "Phone",
          align: "left",
          sortable: false
        },
        {
          text: "Date",
          value: "Date",
          align: "left",
          sortable: false
        },
        { text: 'Actions', value: 'actions' },
      ]
    }
  },
  async created() {
    await this.getAllTestDrive();
  },
  methods:{
    async getAllTestDrive() {
      const resp = await api.get("testDrive/get/testDrives");
      if (resp) {
        const data = await resp.json();
        if (data) this.testDrives = data;
      }
      else {
        console.log("something wrong")
      }
    },
  }
}
</script>
<style>

</style>
