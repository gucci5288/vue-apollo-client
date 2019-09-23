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
import queryUsers from '../graphql/queryUsers.graphql'
import mutationCreateUser from '../graphql/mutationCreateUser.graphql'
import mutationDeleteUser from '../graphql/mutationDeleteUser.graphql'
// import gql from 'graphql-tag'
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

      // We save the user input in case of an error
      const inputName = this.inputName
      // We clear it early to give the UI a snappy feel
      this.inputName = ''

      this.$apollo.mutate({
        mutation: mutationCreateUser,
        variables: {
          name: inputName
        },
        update: (store, {data: {createUser}}) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({query: queryUsers})
          // Add our tag from the mutation to the end
          data.users.push(createUser)
          // Write our data back to the cache.
          store.writeQuery({query: queryUsers, data})
        },
        // Optimistic UI
        // Will be treated as a 'fake' result as soon as the request is made
        // so that the UI can react quickly and the user be happy
        optimisticResponse: {
          __typename: 'Mutation',
          createUser: {
            __typename: 'User',
            id: -1,
            name: inputName,
          },
        },
      }).then((data) => {
        // Result
        console.log('then -> data', data)
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        this.inputName = inputName
      })
    },
    deleteUser(id) {
      this.$apollo.mutate({
        mutation: mutationDeleteUser,
        variables: {
          id
        },
        update: () => {
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
