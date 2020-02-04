<template>
    <div>
        <h1>Dashboard</h1>
        <template v-if="!isLoading">
            <UserCard v-for="user in users" :key="user.id" :user="user" />
            <p/>
            <router-link to="/createUser">
                Create User
            </router-link>
        </template>
        <p v-else>
            Loading Users
        </p>
    </div>
</template>

<script>

import axios from 'axios'
import UserCard from '../components/UserCard'

export default {
    components: {
        UserCard
    } ,  
    data(){
        return {
            isLoading: true,
            users: []
        }
    },
    created() {
        axios.get('//192.168.99.100:4001/users/').then(({data}) => {
            this.users = data
            this.isLoading = false
        })
    }
}
</script>