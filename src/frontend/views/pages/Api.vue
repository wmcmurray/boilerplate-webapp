<template>
  <div class="api-page">

    <section class="bg-white">
      <div class="limit-width padded">
        <h2>About</h2>
        <pre>{{about}}</pre>
      </div>
    </section>

    <section class="limit-width padded">
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
            <button class="button" name="newuserbtn" v-on:click="createUser" :disabled="newusername == ''">Create</button>
          </div>
          <p>{{feedback}}&nbsp;</p>
        </div>
      </div>
    </section>

    <overlay-spinner v-if="loading" />

  </div>
</template>

<script>
import API from 'ROOT/api.js'
import IsLoading from 'ROOT/views/mixins/IsLoading.js'

export default {
  name: 'api-page',
  mixins: [
    IsLoading,
  ],
  data: function(){
    return {
      newusername: '',
      feedback: '',
      users: [],
      about: {},
    }
  },
  methods: {
    // get all users from API and update view
    getUsers: function(){
      this.startLoading('get-users');
      return API('get', '/users').then(function(res){
        this.users = res;
        this.stopLoading('get-users');
      }.bind(this));
    },

    // create a user into database
    createUser: function(){
      this.feedback = '';
      if(this.newusername != ''){
        this.startLoading('create-users');
        API('post', '/users/'+this.newusername).then(function(res){
          this.feedback = 'Success !';
          this.getUsers();
          this.stopLoading('create-users');
        }.bind(this)).catch(function(err){
          this.feedback = err;
          this.stopLoading('create-users');
        }.bind(this));
      } else {
        this.feedback = 'Write down a username please.';
      }
    },

    // delete user from database
    deleteUser: function(user){
      this.feedback = '';
      if(user.username){
        this.startLoading('delete-users');
        API('delete', '/users/'+user.username).then(function(res){
          this.feedback = 'Success !';
          this.getUsers();
          this.stopLoading('delete-users');
        }.bind(this)).catch(function(err){
          this.feedback = err;
          this.stopLoading('delete-users');
        }.bind(this));
      }
    },
  },
  created: function(){
    // get initial users list
    this.getUsers();

    // get infos about api
    API('get', '/').then(function(res){
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
