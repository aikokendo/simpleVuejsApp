<template>
    <div>
        <p/>
        <form  @submit.prevent="login">
            <label for="username">
                Username:
            </label>
            <input v-model="username" type="text" name="username" value>
            <p/>
             <label for="password">
                Password:
            </label>
            <input v-model="password" type="password" name="password" value>
            <p/>
            <button type="submit" name="button"> Log in </button>
                <p> {{ error }} </p>
         
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username: '',
                password: '',
                error: null
            }
        },
        methods: {
            login(){
                this.$store.dispatch('login', {username: this.username, password: this.password})
                .then(()=>{
                    this.$router.push({ name: 'dashboard'})
                })
                .catch(() => {
                    this.error = "Invalid username or password"
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>