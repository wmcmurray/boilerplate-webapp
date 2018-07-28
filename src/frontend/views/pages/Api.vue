<template>
  <div class="api-page">

    <section class="bg-white">
      <div class="limit-width padded">
        <h2>About</h2>
        <pre>{{about}}</pre>
      </div>
    </section>

    <section class="spinner-container">
      <div class="limit-width padded">
        <div class="grid-12">
          <div class="col-7_sm-6_xs-12">
            <h2>Users list</h2>
            <template v-if="users && users.length">
              <ul>
                <li v-for="user in users">
                  <p><b>{{user.username}} #{{user._id || user.id}}</b> <span class="shy">({{user.points}} points)</span>&nbsp;&nbsp;&nbsp;<span class="clickable bad" v-on:click="deleteUser(user)">DELETE</span></p>
                </li>
              </ul>
            </template>
            <template v-else>
              <p>No users found.</p>
            </template>
          </div>
          <div class="col-5_sm-6_xs-12">
            <h2>Create user</h2>
            <div class="form-row">
              <input type="text" name="newuser" v-model="newusername" placeholder="Username">
              <button class="button" name="newuserbtn" v-on:click="createUser" :disabled="newusername == '' || loading">Create</button>
            </div>
          </div>
        </div>
      </div>
      <overlay-spinner v-if="loading" />
    </section>

  </div>
</template>

<script>
import ApiMixin from 'ROOT/mixins/Api.js'

export default {
  name: 'api-page',
  mixins: [
    ApiMixin,
  ],
  data: function(){
    return {
      newusername: '',
      users: [],
      about: {},
    }
  },
  methods: {
    // get all users from API and update view
    getUsers: function(){
      return this.api('get', '/users').then(function(res){
        this.users = res;
      }.bind(this));
    },

    // create a user into database
    createUser: function(){
      if(this.newusername != ''){
        this.api('post', '/users/'+this.newusername).then(function(res){
          this.$snotify.success('User created !');
          this.getUsers();
        }.bind(this));
      } else {
        this.$snotify.error('Write down a username please.');
      }
    },

    // delete user from database
    deleteUser: function(user){
      if(user.username){
        this.api('delete', '/users/'+user.username).then(function(res){
          this.$snotify.success('User deleted !');
          this.getUsers();
        }.bind(this));
      }
    },
  },
  created: function(){
    // get initial users list
    this.getUsers();

    // get infos about api
    this.api('get', '/').then(function(res){
      this.about = res;
    }.bind(this));
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config";

.api-page {
  > section {
    padding-top: $globalSpacing;
    padding-bottom: $globalSpacing;
  }
  .form-row {
    display: flex;
    input {
      flex-grow: 1;
      min-width: 0px;
      margin-right: $globalPadding * 0.5;
    }
  }
}
</style>
