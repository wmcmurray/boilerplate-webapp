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
        <div class="col-8">
          <h2>Users list</h2>
          <template v-if="users.length">
            <ul>
              <li v-for="user in users">
                <p><b>{{user.username}} #{{user._id}}</b> <span class="shy">({{user.points}} points)</span>&nbsp;&nbsp;&nbsp;<span class="clickable bad" v-on:click="deleteUser(user)">DELETE</span></p>
              </li>
            </ul>
          </template>
          <template v-else>
            <p>No users found.</p>
          </template>
        </div>
        <div class="col-4">
          <h2>Create user</h2>
          <input type="text" name="newuser" v-model="newusername" placeholder="Username">
          <button class="button" name="newuserbtn" v-on:click="createUser" :disabled="newusername == ''">Create</button>
          <p>{{feedback}}&nbsp;</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import API from 'ROOT/controllers/api.js'

export default {
  name: 'api-page',
  data: function(){
    return {
      newusername: '',
      feedback: '',
      users: [],
      about: {},
    }
  },
  created: function(){
    // get initial users list
    this.getUsers();

    // get infos about api
    API('/').then(function(res){
      this.about = res.entity;
    }.bind(this));
  },
  methods: {
    // get all users from API and update view
    getUsers: function(){
      API('/users').then(function(res){
        this.users = res.entity;
      }.bind(this));
    },

    // create a user into database
    createUser: function(){
      this.feedback = '';
      if(this.newusername != ''){
        API('/users/'+this.newusername, {
          method: 'POST'
        }).then(function(res){
          if(res.status.code === 200){
            this.feedback = 'Success !';
            this.getUsers();
          } else {
            this.feedback = res.entity.message || res.entity.error || res.entity.statusCode;
          }
        }.bind(this));
      } else {
        this.feedback = 'Write down a username please.';
      }
    },

    // delete user from database
    deleteUser: function(user){
      this.feedback = '';
      if(user.username){
        API('/users/'+user.username, {
          method: 'DELETE'
        }).then(function(res){
          if(res.status.code === 200){
            this.feedback = 'Success !';
            this.getUsers();
          } else {
            this.feedback = res.entity.message || res.entity.error || res.entity.statusCode;
          }
        }.bind(this));
      }
    }
  }
}
</script>

<style lang="scss">
@import "~ROOT/styles/config";

.api-page {
  > section {
    padding-top: $globalSpacing;
    padding-bottom: $globalSpacing;
  }
}
</style>
