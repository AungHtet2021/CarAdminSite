<template>
  <v-toolbar
    dark
    app
    :color="$root.themeColor">
    <v-toolbar-title>
      <v-toolbar-side-icon @click="toggleNavigationBar"></v-toolbar-side-icon>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu  class="toolbar-menu-item" offset-y origin="center center" :nudge-bottom="10" transition="scale-transition" content-class="language-menu">
      <v-btn icon large flat slot="activator" :ripple="false" >
        <img :src="selectedLanguageFlag" class="selected-language-flag" />
      </v-btn>
      <v-list class="languages-list">
        <v-list-tile
          v-for="(language,index) in languages"
          @click="selectLanguage(language.languageCode)"
          :key="index"
          class="languages-list-item">
            <v-list-tile-action v-if="language.path">
              <img :src="language.path" class="language-flag" />
            </v-list-tile-action>
            <v-list-tile-content class="languages-list-item-title">
              <v-list-tile-title >{{ language.name }}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-menu class="toolbar-menu-item" offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn icon large flat slot="activator" :ripple="false">
        <v-avatar size="42px">
          <img :src="this.imageUrl"/>
        </v-avatar>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item,index) in items"
          :key="index"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          @click="item.click">
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      localDomain: utils.constant.localDomain,
      imageUrl: "",
      rating: null,
      dialog: false,
      dialogSettings: false,
      switchEmailNotification: true,
      showPassword: null,
      showPasswordConfirm: null,
      userEmail: null,
      password: null,
      passwordConfirm: null,
      error: false,
      showResult: false,
      result: '',
      items: [
        {
          icon: 'exit_to_app',
          href: '#',
          title: 'Log Out',
          click: () => {
            const vm = this;

            vm.$router.push({ name: 'Login' });
          }
        }
      ],
      notifications:
      [
        {
          title: 'New mail from Adam Joe',
          color: 'light-blue',
          icon: 'email',
          actionAt: '12 min ago',
          isActive: true,
          onClick: () => {
            const vm = this;

            vm.$router.push({ name: 'Mailbox' });
          }
        },
        {
          title: 'Scheculed meeting',
          color: 'red',
          icon: 'calendar_today',
          actionAt: '46 min ago',
          isActive: true,
          onClick: () => {
            const vm = this;

            vm.$router.push({ name: 'Calendar' });
          }
        },
        {
          title: 'New mail from Github',
          color: 'light-blue',
          icon: 'email',
          isActive: true,
          timeLabel: '2 hour ago',
          onClick: () => {
            const vm = this;

            vm.$router.push({ name: 'Mailbox' });
          }
        }
      ],
      languages: [
        { name: 'English', languageCode: 'en', path: require('../../assets/flags/en.png') },

        { name: 'Japanese', languageCode: 'ja', path: require('../../assets/flags/ja.png') },

      ]
    }

  },
  async created() {
    const level = JSON.parse(localStorage.getItem("adminLevel"));
    this.imageUrl=this.localDomain + '/user' + level.imagePath;
  },
  computed: {
    selectedLanguageFlag() {
      const vm = this;

      switch(vm.$i18n.locale) {
        case 'en': return require('../../assets/flags/en.png');
        case 'tr': return require('../../assets/flags/tr.png');
        case 'fr': return require('../../assets/flags/fr.png');
        case 'de': return require('../../assets/flags/de.png');
        case 'ja': return require('../../assets/flags/ja.png');
        case 'ch': return require('../../assets/flags/ch.png');
      }
    }
  },
  methods: {
    toggleNavigationBar() {
      const vm = this;

      vm.$emit('toggleNavigationBar');
    },

    setUpSettings() {
      const vm = this;

      if (vm.userEmail === null || vm.password === null || vm.passwordConfirm === null) {

        vm.result = "Email and Password can't be null.";
        vm.showResult = true;

        return;
      }

      if (vm.password !== vm.passwordConfirm) {

        vm.error = true;
        vm.result = "Passwords does not match the confirm password.";
        vm.showResult = true;

        return;
      }

      vm.$root.userEmail = vm.userEmail;
      vm.$root.userPassword = vm.password;

      vm.result = "Email and password changed succesfully.";
      vm.showResult = true;

      vm.dialogSettings = false;
    },

    selectLanguage(code) {
      const vm = this;

      vm.$root.setLanguage(code);
    }
  }
};
</script>
<style>
  .toolbar-menu-item {
    padding-left: 5px;
  }

  .selected-language-flag {
    max-width: 45px;
  }

  .language-flag {
    max-width: 40px;
  }


  .languages-list-item {
    cursor: pointer;
    margin-top: -2px;
    margin-left: 1px;
  }

  .languages-list-item-title {
    font-size: 16px;
  }

  .languages-list-item-title:hover {
    color: #41B883;
    font-weight: bold;
  }
  .language-menu {
    border-radius: 25px;
    width: 235px;
    margin-right: 10px;
  }


</style>
