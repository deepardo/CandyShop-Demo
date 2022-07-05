<template>
    <div>
        <div v-for= 'data in cart'>
        <p>{{data.id}}</p>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
export default {
     computed: {
         cart() {
             this.$store.state.cart
         }
    }, 
}
</script>
