<template>
  <div>
    <v-dialog v-model="dialog" width="650">
      <div slot="activator"><v-btn color="primary">Create Brand</v-btn></div>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Create Brand
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field name="brandName" label="Brand Name" type="text" v-model="newList.brandName" :error="error"
              :rules="[rules.required]" />
            <v-text-field name="produceCountry" label="Produce Country" type="text" v-model="newList.produceCountry"
              :error="error" :rules="[rules.required]" />
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table :headers="headers" :items="brands" :items-per-page="7" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.brandName }}</td>
        <td class="text-xs-left">{{ props.item.produceCountry }}</td>
        <td class="text-xs-left">
          <v-icon small @click="deleteItem(props)">delete</v-icon>
          <v-icon small @click="editBrand(props)">edit</v-icon>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="deleteDialog" width="450">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this CAR BRAND?</v-card-title>
        <v-card-text>ID - {{ selectDemo.id }}</v-card-text>
        <v-card-text>Brand Name - {{ selectDemo.brandName }}</v-card-text>
        <v-card-text>Produce Country - {{ selectDemo.produceCountry }}</v-card-text>
        <v-btn @click="deleteBrand(selectDemo.id)">Delete</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Brand</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field v-model="brand.id" label="Brand Id"></v-text-field>
            <v-text-field v-model="brand.brandName" label="Brand name"></v-text-field>
            <v-text-field v-model="brand.produceCountry" label="Produce Country"></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editSave(brand.id)">
            editSave
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from '../utils/api.js'
export default {
  data() {
    return {
      editDialog: false,
      deleteDialog: false,
      selectDemo: {},
      brands: [],
      brand: [],
      newList: {
        brandName: "",
        produceCountry: "",
      },
      dialog: false,
      rules: {
        required: value => !!value || "Required."
      },
      error: false,
      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: "Brand Name",
          value: "brandName",
          align: "left",
          sortable: false
        },
        {
          text: "Produce Country",
          value: "produceCountry",
          align: "left",
          sortable: false
        },
        { text: 'Actions', value: 'actions' },
      ]
    };
  },
  async created() {
    await this.getAllBrands();
  },
  methods: {
    deleteItem(props) {
      this.deleteDialog = true;
      this.selectDemo = props.item;
    },
    async deleteBrand(id) {
      const resp = await api.remove("brand/delete/" + id);
      if (resp.status == 200) {
        this.deleteDialog = false;
        console.log('delete is working')
        await this.getAllBrands();
      }
      else {
        console.log("sth wrong in delete id");
      }
    },
    async getAllBrands() {
      const resp = await api.get("brand/get/brands");
      if (resp) {
        const data = await resp.json();
        if (data) this.brands = data;
      }
      else {
        console.log("something wrong")
      }
    },
    async save() {
      const resp = await api.save("brand/create",
        {
          brandName: this.newList.brandName,
          produceCountry: this.newList.produceCountry,
        });
      if (resp) {
        this.newList = {};
        this.getAllBrands();
        this.dialog = false;
      }
    },
    async editBrand(props) {
      this.editDialog = true;
      const resp = await api.get("brand/get/brand/" + props.item.id);
      if (resp) {
        const data = await resp.json();
        if (data) this.brand = data;
      }
      else {
        console.log("something wrong")
      }
    },
    async editSave(id) {
      const resp = await api.update("brand/update/" + id, {
        id: this.brand.id,
        brandName: this.brand.brandName,
        produceCountry: this.brand.produceCountry,
      });
      if (resp) {
        this.getAllBrands();
        this.editDialog = false;
      }
    },
  }
}
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
