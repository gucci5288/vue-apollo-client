<template>
  <div>
    <div>
      <input v-model="inputName"/>
      <button @click="addUser">Add User</button>
    </div>
    <div v-for="user in users" :key="user.id">{{user.name}}</div>
  </div>
</template>

<script>
// import gql from 'graphql-tag'
import queryUsers from '../graphql/queryUsers.graphql'
import mutationCreateUser from '../graphql/mutationCreateUser.graphql'

export default {
  name: "User",
  data() {
    return {
      inputName: ''
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
          console.log('store',store)
          // eslint-disable-next-line no-console
          console.log('name',name)

          // 簡單使用 refetch
          this.$apollo.queries.users.refetch()
        }
      })
    }
  }
}


</script>

<style scoped>

</style>
