<template>

<div>
  <v-btn
              dark

              @click="showForm=true">ADD BRAND</v-btn>
             <v-dialog  v-model="showForm" max-width="500px">
                <v-card>
                  <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">Create Brand</h1>
                        <div class="text-center mt-4">
                          <!-- <v-btn class="mx-2" fab color="red" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn> -->
                          <img src="static/car1.PNG" width="72px" />

<!--
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn> -->
                        </div>
                        <!-- <h4 class="text-center mt-4">Ensure your email for registration</h4> -->
                        <v-form>
                          <v-text-field
                            label="Brand Name"
                            name="Name"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            label="Produce Country"
                            name="Name"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                          />

                          <!-- <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                          /> -->
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal accent-3" text @click="close">
                    Cancel
                </v-btn>
                <v-btn color="teal accent-3" text @click="save">
                    Save
                </v-btn>
            </v-card-actions>
                    </v-col>
                </v-card>
                        </v-dialog>
  <v-data-table
    class="table"
    :headers="headers"
    :items="users"
    :rows-per-page-items="[10, 25]">
<v-btn>add</v-btn>
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">
        <v-avatar size="42">
          <img :src="randomAvatar()" alt="avatar">
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
  'https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
  'https://avataaars.io/?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
  'https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
  'https://avataaars.io/?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
  'https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
  'https://avataaars.io/?'
];
export default {
  data () {
    return {
      showForm:false,
        users: [],
      headers: [
        {
          value: 'Avatar',
          align: 'left',
          sortable: false
        },
        {
          text: 'Name',
          value: 'Name',
          align: 'left',
          sortable: true
        },
        {
          text: 'User Name',
          value: 'Username',
          align: 'left',
          sortable: true
        },
        {
          text: 'Email',
          value: 'Email',
          align: 'left',
          sortable: true
        },
        {
          text: 'Phone',
          value: 'Phone',
          align: 'left',
          sortable: true
        },
        {
          text: 'Company',
          value: 'Company',
          align: 'left',
          sortable: true
        },
        {
          text: 'Website',
          value: 'Website',
          align: 'left',
          sortable: true
        }
      ]
    }
  },

  methods: {
    randomAvatar () {

      return avatars[Math.floor(Math.random() * avatars.length)];
    },
    addBrand(){
      console.log('working')
    }
  },

  created() {
    const vm = this;

    vm.axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
      var result = response && response.data;

      vm.users = result;
    });
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
