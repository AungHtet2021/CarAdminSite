<template>
  <div>
    <v-dialog v-model="showForm" max-width="650">
      <div slot="activator"><v-btn color="primary">Create Car</v-btn></div>
      <v-card>
        <v-card-title class="headline lighten-2" primary-title
          >Create Car
        </v-card-title>
        <v-card-text>
          <v-form ref="carForm" v-model="carForm">
            <v-text-field
              label="Name"
              name="carname"
              type="text"
              v-model="newCar.name"
              :error="error"
              :rules="[rules.required]"
            />
            <v-col cols="12" sm="6" md="4">
              <v-select
                :items="status"
                label="Used_Car/Brand_Car"
                item-text="name"
                item-value="id"
                v-model="newCar.status"
                :rules="[rules.required]"
              ></v-select>
            </v-col>

            <v-text-field
              label="Quantity"
              name="quantity"
              type="number"
              v-model="newCar.quantity"
              :error="error"
              :rules="[rules.required]"
            />
            <v-text-field
              label="Price"
              name="price"
              type="number"
              v-model="newCar.price"
              :error="error"
              :rules="[rules.required]"
              suffix="$"
            />
            <v-text-field
              label="Waiting Time"
              name="waitingTime"
              type="number"
              v-model="newCar.waitingTime"
              :error="error"
              :rules="[rules.required]"
              suffix="Week"
            />

            <v-checkbox
              v-model="newCar.isPublic"
              :label="'IsPublic'"
            ></v-checkbox>

            <label for="file">Car Image</label> <br />
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

            <v-text-field
              label=" Video"
              name="video"
              type="text"
              v-model="newCar.video"
            />

            <v-textarea
              label="Description"
              name="description"
              v-model="newCar.description"
              :error="error"
              :rules="[rules.required]"
            />
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="saveCar">
            <span v-if="!loading">Save</span>
            <v-progress-circular
              v-else
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      class="table"
      :headers="headers"
      :items="users"
      :rows-per-page-items="[10, 25]"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">
          <v-avatar size="42">
            <img :src="randomAvatar()" alt="avatar" />
          </v-avatar>
        </td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.username }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.phone }}</td>
        <td class="text-xs-left">{{ props.item.company.name }}</td>
        <td class="text-xs-left">{{ props.item.website }}</td>
        <!-- <td class="text-xs-left">{{ props.item.address.city }}</td> -->
      </template>
    </v-data-table>
  </div>
</template>

<script>
const avatars = [
  "https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban",
  "https://avataaars.io/?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun",
  "https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong",
  "https://avataaars.io/?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair",
  "https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly",
  "https://avataaars.io/?"
];
import utils from "../utils/utils";
export default {
  data() {
    return {
      showForm: false,
      status: [
        {
          name: "Brand New",
          id: 1
        },
        {
          name: "Used",
          id: 2
        }
      ],
      carForm: false,
      loading: false,
      newCar: {
        id: null,
        name: "",
        description: "",
        isPublic: false,
        price: null,
        waitingTime: null,
        quantity: null,
        status: null,
        imagePath: "",
        video: ""
      },
      rules: {
        required: value => !!value || "Required."
      },
      imageName: "",
      imageUrl: "",
      imageFile: "",
      error: false,
      users: [],
      headers: [
        {
          value: "Avatar",
          align: "left",
          sortable: false
        },
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
    randomAvatar() {
      return avatars[Math.floor(Math.random() * avatars.length)];
    },

    saveCar() {
      const vm = this;
      vm.showForm = false;
    },

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

    async createMovie() {
      if (this.$refs.carForm.validate()) {
        this.errorAlert = false;
        this.loading = true;



          let respPosterData = null;
          const respPoster = await utils.http.postMedia(
            "/admin/file/create",
            this.poster,
            this.poster.type
          );
          if (respPoster.status === 200) {
            respPosterData = await respPoster.text();
          } else {
            this.errorAlert = true;
          }

          let respTrailerData = null;
          const respTrailer = await utils.http.postMedia(
            "/admin/file/create",
            this.trailer,
            this.trailer.type
          );
          if (respTrailer.status === 200) {
            respTrailerData = await respTrailer.text();
          } else {
            this.errorAlert = true;
          }

          if (respPosterData && respTrailerData) {
            const respMovie = await utils.http.post("/admin/movie/create", {
              title: this.title,
              overview: this.overview,
              budget: this.budget,
              category: { id: this.category },
              adult: this.adult,
              posterPath: respPosterData,
              trailerPath: respTrailerData
            });
            if (respMovie.status === 200) {
              this.$router.push({ path: "/admin" });
            } else {
              this.errorAlert = true;
            }
          }


        this.loading = false;
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

.img {
  margin-left: 0px;
}

.lighten-2 {
  background-color: #e07001 !important;
}
</style>
