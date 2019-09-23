<template>
  <div class="container">
    <b-field label="Name" :label-position="'on-border'" grouped>
      <b-input v-model="inputName" placeholder="input name..." type="search"></b-input>
      <p class="control">
        <b-button class="button is-primary" @click="addUser">Add User</b-button>
      </p>
    </b-field>

    <b-table :data="users">
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="name" label="Name">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column label="Delete">
          <b-button class="is-danger" @click="deleteUser(props.row.id)">Delete</b-button>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
// import gql from 'graphql-tag'
import queryUsers from '../graphql/queryUsers.graphql'
import mutationCreateUser from '../graphql/mutationCreateUser.graphql'
import mutationDeleteUser from '../graphql/mutationDeleteUser.graphql'

export default {
  name: "User",
  data() {
    return {
      inputName: '',
    }
  },
  apollo: {
    // Vue-Apollo options here
    // users: gql`query {
    //     users {
    //         id
    //         name
    //     }
    // }`,
    users: {
      query: queryUsers,
      // 幾秒並發一次
      // pollInterval: 5000, // ms
    }
  },
  methods: {
    addUser() {
      this.$apollo.mutate({
        mutation: mutationCreateUser,
        variables: {
          name: this.inputName
        },
        update: (store, {data: {name}}) => {
          // eslint-disable-next-line no-console
          console.log('store', store)
          // eslint-disable-next-line no-console
          console.log('name', name)

          // 簡單使用 refetch
          this.$apollo.queries.users.refetch()
        }
      })
    },
    deleteUser(id) {
      console.log('id', id)
      this.$apollo.mutate({
        mutation: mutationDeleteUser,
        variables: {
          id
        },
        update: (store, {data: {name}}) => {
          // eslint-disable-next-line no-console
          console.log('store', store)
          // eslint-disable-next-line no-console
          console.log('name', name)

          // 簡單使用 refetch
          this.$apollo.queries.users.refetch()
        }
      })
    }
  }
}


</script>

<style scoped>
.container {
  padding: 30px;
}
</style>
