<template>
    <div>

      <v-data-table
        class="table"
        :headers="headers"
        :items="users"
        :rows-per-page-items="[10, 25]"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.password }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.phone }}</td>
          <td class="text-xs-left">{{ props.item.DateofBirth }}</td>
        </template>
      </v-data-table>
    </div>
  </template>

  <script>
  import VueExcelXlsx from "vue-excel-xlsx";
  import Vue from "vue";

  Vue.use(VueExcelXlsx);

  export default {
    data() {
      return {

          columns : [

                      {
                          label: " Name",
                          field: "name",

                      },
                      {
                          label: "Password",
                          field: "password",

                      },
                      {
                          label: "Email",
                          field: "email",
                      },
                      {
                          label: "Phone",
                          field: "phone",
                      },
                      {
                          label: "DateofBirth",
                          field: "dateofbirht",
                      },
                  ],


        users: [],
        headers: [

          {
            text: " Name",
            value: "name",
            align: "left",
            sortable: true
          },
          // {
          //   text: "Password",
          //   value: "password",
          //   align: "left",
          //   sortable: true
          // },
          {
            text: "Email",
            value: "Email",
            align: "left",
            sortable: true
          },
          {
            text: "Phone",
            value: "Phone",
            align: "left",
            sortable: true
          },
          {
            text: "DateofBirth",
            value: "dateofbirth",
            align: "left",
            sortable: true
          }
        ]
      };
    },

    methods: {},


  };
  </script>

  <style>
  .table {
    border-radius: 3px;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.21);
    background-color: transparent;
  }
  .excel {
      background-color: #1976d2 ;
      align-items: center;
      border-radius: 2px;
      height: 36px;
      font-size: 14px;
      font-weight: 500;
      justify-content: center;
      margin: 6px 8px;
      min-width: 13%;
  }
  </style>
