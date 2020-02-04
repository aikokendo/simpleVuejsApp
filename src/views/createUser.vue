<template>
    <div>
        <p/>
        <form  @submit.prevent="createUser">
            <label for="firstname">
                First Name:
            </label>
            <input v-model="firstname" type="text" name="firstname" value> *
            <p/>
             <label for="lastname">
                Last Name:
            </label>
            <input v-model="lastname" type="text" name="lastname" value>
            <p/>
            <button type="submit" name="button"> Create User </button>
                <p> {{ error }} </p>
                <p> {{ success }}</p>
         
        </form>
    </div>
</template>

<script>

import axios from 'axios'
    export default {
        data(){
            return {
                firstname: null,
                lastname: null,
                error: null,
                success: null
            }
        },
        methods: {
            createUser(){
                axios.post('//192.168.99.100:4001/users/',{firstName: this.firstname, lastName: this.lastname})
                .then(() => {
                    this.success = "User Created Successfully"
                    this.firstname = null
                    this.lastname = null
                    this.error = null
                })
                .catch(() => {
                    this.error = "first name is required"
                    this.success = null
        })

              
            }
        }

        
    }
</script>

<style lang="scss" scoped>

</style>