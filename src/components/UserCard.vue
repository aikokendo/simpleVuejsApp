<template>
    <div class="user-card">
        <span> {{ user.id }}: {{ user.firstName }} {{ user.lastName }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'UserCard',
    props:{
        user: {
            type: Object,
            required: true
        }
    }
}
</script>