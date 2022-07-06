<template>
  <div class="card-items">
    <div v-for="data in cardData" class="card-data">
      <b-card :title="data.name">
        <b-card-text>{{ data.details }}</b-card-text>
      </b-card>
    </div>
  </div>
</template>

<style>
.card-items {
  display: flex;
  margin: 40px;
}
.card-data {
  flex: 1;
  margin: 10px;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      cardData: "modules/addToCart/cardData",
    }),
  },
};
</script>
