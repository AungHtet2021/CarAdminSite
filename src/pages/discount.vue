<template>
  <div>
    <v-dialog v-model="dialog" width="650">
      <div slot="activator"><v-btn color="primary">Create Discount</v-btn></div>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Create Discount
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              name="Discount Name"
              label="Discount Name"
              type="text"
              v-model="discountName"
              :error="error"
              :rules="[rules.required]"
            />

            <v-text-field
              name="Percentage"
              label="Percentage"
              type="number"
              v-model="percentage"
              :error="error"
              :rules="[rules.required]"
            ></v-text-field>

            <div class="row">
              <span> From Date </span>
              <span style="margin-left: 39%;"> To Date </span>
            </div>
            <v-date-picker v-model="fromDate"></v-date-picker>

            <v-date-picker
              v-model="toDate"
              style="margin-left: 15px;"
            ></v-date-picker>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <v-btn color="primary" @click="login">Create Discount</v-btn> -->
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
    <v-snackbar
    color="red"
        v-model="showResult"
        :timeout="2000"
        top>
        {{ result }}
      </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      toDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      loading: false,
      dialog: false,
      discountName: "",
      percentage: "",
      hidePassword: true,
      error: false,
      showResult: false,
      result: "",
      rules: {
        required: value => !!value || "Required."
      },
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

  methods: {
    login() {
      const vm = this;
      if (!vm.discountName || !vm.percentage) {
        vm.result = "Discount Name and Percentage can't be null.";
        vm.showResult = true;

        return;
      } else {
        vm.dialog = false;
      }
    }
  },

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
</style>
