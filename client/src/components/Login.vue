<template>
  <v-layout wrap align-content-space-around text-xs-center>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <form name="tab-tracker-form" autocomplete="off">
          <v-text-field label="Email" v-model="email"></v-text-field>
          <br>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            autocomplete="new-password"
          ></v-text-field>
        </form>
        <br>
        <div class="danger-alert" v-html="error"/>
        <br>
        <v-btn dark class="cyan" @click="login">Login</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>
<script>
import AuthenticationService from "@/services/AuthenticationService";
import Panel from "@/components/globals/Panel";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    async login() {
      try {
        await AuthenticationService.login({
          email: this.email,
          password: this.password
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  components: {
    Panel
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
