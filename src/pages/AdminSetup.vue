<template>
  <div>
    <v-dialog v-model="showForm" max-width="650">
      <div slot="activator"><v-btn color="primary" >Create Admin</v-btn></div>
      <v-card>
        <v-card-title class="headline lighten-2" primary-title
          >Create Admin
        </v-card-title>
        <v-card-text>
          <v-form ref="adminForm" v-model="adminForm">
            <v-text-field
              label="Name"
              name="name"
              type="text"
              v-model="newAdmin.name"
              :error="error"
              :rules="[rules.required]"
            />
          
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :items="email"
                label="Email"
                item-text="email"
                item-value="email"
                v-model="newAdmin.email"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :items="password"
                label="Password"
                item-text="password"
                item-value="password"
                v-model="newAdmin.password"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :items="role"
                label="SuperAdmin/Admin"
                item-text="name"
                item-value="id"
                v-model="newAdmin.role"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :items="phone"
                label="PhoneNo"
                item-text="phone"
                item-value="phone"
                v-model="newAdmin.phone"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

           
            <v-checkbox
              v-model="newAdmin.isPublic"
              :label="'IsPublic'"
            ></v-checkbox>

            <label for="file">Admin Image</label> <br />
            <input
              type="file"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            />

            <v-img
              class="img"
              v-if="imageUrl != ''"
              :src="imageUrl"
              width="200"
              height="150"
              contain
            >
            </v-img>


          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="saveAdmin">Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      class="table"
      :headers="headers"
      :items="admin"
      :rows-per-page-items="[10, 25]"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.password }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left" v-if="props.item.role == 1">SuperAdmin</td>
        <td class="text-xs-left" v-if="props.item.role == 2">Admin</td>
        <td class="text-xs-left">{{ props.item.phone }}</td>
        <td class="text-xs-left">{{ props.item.isPublic }}</td>
        <td class="text-xs-left">
          <v-icon class="edit" small @click="edit(props)">edit</v-icon>
          <v-icon class="delete" small @click="deleteItem(props)"
            >delete</v-icon
          >
        </td>
        <!-- <td class="text-xs-left">{{ props.item.address.city }}</td> -->
      </template>
    </v-data-table>
    <v-dialog v-model="deleteDialog" width="450">
      <v-card>
        <v-card-title class="headline lighten-2"> Delete Confirm</v-card-title>
        <v-card-text>
          Are you sure you want to delete {{ selectDemo.name }} ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warn" @click="deleteAdmin(selectDemo.id)"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar color="red" v-model="showResult" :timeout="2000" top>
      {{ result }}
    </v-snackbar>
  </div>
</template>

<script>
import utils from "../utils/utils";
import api from "../utils/api.js";
export default {
  data() {
    return {
      localDomain: utils.constant.localDomain,
      showForm: false,
      
      status: [
        {
          name: "Super Admin",
          id: 1
        },
        {
          name: "Admin",
          id: 2
        }
      ],
      role:[],
      name: [],
      email: [],
      password: [],
      phone:[],
      adminForm: false,
      showResult: false,
      result: "",
      tmpImagePath : "",
      selectDemo: {},
      deleteDialog: false,
      newAdmin: {
        id: null,
        name: "",
        email: null,
        password: null,
        phone:null,
        isPublic: false,
        role:null,
        imagePath: "",
      
      },
      rules: {
        required: value => !!value || "Required."
      },
      imageName: "",
      imageUrl: "",
      imageFile: "",
      error: false,
      admin: [],
      headers: [
        {
          text: "Name",
          value: "name",
          align: "left",
          sortable: true
        },
        {
          text: "Email",
          value: "email",
          align: "left",
          sortable: true
        },
        {
          text: "Password",
          value: "password",
          align: "left",
          sortable: true
        },
        {
          text: "SuperAdmin/Admin",
          value: "adminType",
          align: "left",
          sortable: true
        },
        {
          text: "PhoneNO",
          value: "phone",
          align: "left",
          sortable: true
        },
        {
          text: "IsPublic",
          value: "isPublic",
          align: "left",
          sortable: true
        },
        { text: "Actions", value: "actions" }
      ]
    };
  },

  methods: {
    async getAllAdmin() {
      const resp = await api.get("admin/get/admins");
      if (resp) {
        const data = await resp.json();
        if (data) this.name = data;
      } else {
        console.log("something wrong");
      }
    },

   
    },
    // saveCar() {
    //   const vm = this;
    //   vm.showForm = false;
    // },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
          console.log(this.imageUrl), console.log(this.imageFile);
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },

    async saveAdmin() {
      if (this.$refs.adminForm.validate()) {
        let respPosterData = null;
        if (this.imageFile !== "") {
        const respPoster = await utils.http.postMedia(
          "/admin/file/create",
          this.imageFile,
          this.imageFile.type
        );
        if (respPoster.status === 200) {
          respPosterData = await respPoster.text();
        } else {

        }
       
        } else {
          respPosterData = this.tmpImagePath;
        }

        if (this.newAdmin.id == null) {
        if (respPosterData) {
          const respCar = await utils.http.post("/admin/create", {
            name: this.newAdmin.name,
            password: this.newAdmin.password,
            email: this.newAdmin.email,
            role:this.newAdmin.role,
            phone: this.newAdmin.phone,
            isPublic: this.newAdmin.isPublic,
            imagePath: respPosterData,
            video: this.newAdmin.video
          });
        }
        } else {
        if (respPosterData) {
          const respCar = await api.update("admin/update/" +  + this.newAdmin.id, {
            id : this.newAdmin.id,
            name: this.newAdmin.name,
            password: this.newAdmin.password,
            email: this.newAdmin.email,
            role:this.newAdmin.role,
            phone: this.newAdmin.phone,
            isPublic: this.newAdmin.isPublic,
            description: this.newAdmin.description,
            imagePath: respPosterData,
            video: this.newAdmin.video
          });
        }
        }

      } else {
        this.result = "Please check required fields";
        this.showResult = true;
      }
    },

    async edit(props) {
      const resp = await api.get("admin/" + props.item.id);
      if (resp) {
        const data = await resp.json();
        if (data) {
          this.newAdmin.id = data.id;
          this.newAdmin.name = data.name;
          this.newAdmin.password = data.password;
          this.newAdmin.email = data.email;
          this.newAdmin.role=data.role;
          this.newAdmin.phone = data.phone;
          this.newAdmin.isPublic = data.isPublic;
          this.newAdmin.video = data.video;
          this.imageUrl = this.localDomain + '/car' + data.imagePath;
          this.tmpImagePath = data.imagePath,
          this.showForm = true;
        }
      } else {
        console.log("something wrong");
      }
    },

    async deleteItem(props) {
      this.deleteDialog = true;
      this.selectDemo = props.item;
    },

    async deleteAdmin(id) {
      const resp = await api.remove("admin/delete/" + id);
      
    },
    async created() {
    /*await this.getAllAdmin();*/
    
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

.img {
  margin-left: 0px;
}

.lighten-2 {
  background-color: #e07001 !important;
}

.edit {
  color: #ff9800 !important;
  font-size: 20px !important;
}

.delete {
  color: #f44336 !important;
  font-size: 20px !important;
}
</style>
