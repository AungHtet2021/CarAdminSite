<template>
  <div>
    <vue-excel-xlsx
    class="excel"
    color="secondary"
      :data="users"
      :columns="columns"
      :file-name="'DailySellReport'"
      :file-type="'xlsx'"
      :sheet-name="'sheetname'"
    >
      EXCEL EXPORT
    </vue-excel-xlsx>
    <v-data-table
      class="table"
      :headers="headers"
      :items="users"
      :rows-per-page-items="[10, 25]"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.username }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.phone }}</td>
        <td class="text-xs-left">{{ props.item.company.name }}</td>
        <td class="text-xs-left">{{ props.item.website }}</td>
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
                        label: "Name",
                        field: "name",
                    },
                    {
                        label: "User Name",
                        field: "username",
                        dataFormat: this.priceFormat
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
                        label: "Company",
                        field: "company.name",
                    },
                    {
                        label: "Website",
                        field: "website",
                    }
                ],


      users: [],
      headers: [
        {
          text: "Name",
          value: "Name",
          align: "left",
          sortable: true
        },
        {
          text: "User Name",
          value: "Username",
          align: "left",
          sortable: true
        },
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
          text: "Company",
          value: "Company",
          align: "left",
          sortable: true
        },
        {
          text: "Website",
          value: "Website",
          align: "left",
          sortable: true
        }
      ]
    };
  },

  methods: {},

  created() {
    const vm = this;

    vm.axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        var result = response && response.data;

        vm.users = result;
      });
  }
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
