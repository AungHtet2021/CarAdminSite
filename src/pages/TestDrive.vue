<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="testDrives"
      :items-per-page="7"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.gmail }}</td>
        <td class="text-xs-left">{{ props.item.requestDate }}</td>
        <td class="text-xs-left">{{ props.item.gender }}</td>
        <td class="text-xs-left">{{ props.item.country }}</td>
        <td class="text-xs-left">{{ props.item.phone }}</td>

        <td class="text-xs-left">
          <v-icon class="approve" small @click="approveRequest(props)"
            >check</v-icon
          >
          <v-icon class="reject" small @click="rejectRequest(props)"
            >cancel</v-icon
          >
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="rejectDialog" width="450">
      <v-card>
        <v-card-title class="headline lighten-2"> Reject</v-card-title>
        <v-card-text>
          <v-textarea label="Message" name="msg" v-model="message" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            style="margin-bottom: 10px;margin-right: 10px;"
            color="primary"
            @click="reject(selectedId)"
            >Send Email</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="approveDialog" width="450">
      <v-card>
        <v-card-title class="headline lighten-2"> Approve</v-card-title>
        <v-card-text>
          <v-card-text>
            <v-textarea label="Message" name="msg1" v-model="message" />
          </v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            style="margin-bottom: 10px;margin-right: 10px;"
            color="primary"
            @click="approve(selectedId)"
            >Send Email</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import api from "../utils/api.js";
export default {
  mounted() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute("src", "https://smtpjs.com/v3/smtp.js");
    document.head.appendChild(recaptchaScript);
  },
  data() {
    return {
      testDrives: [],
      rejectDialog: false,
      approveDialog: false,
      selectedId: "",
      message: "",
      selectedEmail: "",
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
          text: "Request Date",
          value: "Date",
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

        { text: "Actions", value: "actions" }
      ]
    };
  },
  async created() {
    await this.getAllTestDrive();
  },
  methods: {
    async getAllTestDrive() {
      const resp = await api.get("testDrive/get/testDrives");
      if (resp) {
        const data = await resp.json();
        if (data) this.testDrives = data;
      } else {
        console.log("something wrong");
      }
    },

    async rejectRequest(props) {
      this.rejectDialog = true;
      this.selectedId = props.item.id;
      this.selectedEmail = props.item.gmail;
    },

    async approveRequest(props) {
      this.approveDialog = true;
      this.selectedId = props.item.id;
      this.selectedEmail = props.item.gmail;
    },

    reject(id) {
      tmp = this.message;
      Email.send({
        SecureToken: "79888d3d-3cbf-44ca-a4dd-8bb6076f3c01",
        To: selectedEmail,
        From: "khantminthu199666@gmail.com",
        Subject: "Test Drive Request Notification",
        Body: tmp
      }).then(message => alert(message + "Please Check Your Email"));
      this.rejectDialog = false;
    },

    approve(id) {

      Email.send({
        SecureToken: "79888d3d-3cbf-44ca-a4dd-8bb6076f3c01",
        To: this.selectedEmail,
        From: "khantminthu199666@gmail.com",
        Subject: "Test Drive Request Notification",
        Body:  this.message
      }).then(message => alert("Please Check Your Email"));
      this.approveDialog = false;
    }
  }
};
</script>
<style>
.approve {
  color: #ff9800 !important;
  font-size: 20px !important;
}

.reject {
  margin-left: 10px;
  color: #f44336 !important;
  font-size: 20px !important;
}
</style>
