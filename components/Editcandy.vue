<template>
  <div>
    <b-modal id="bv-modal-edit" hide-footer>
      <template #modal-title>
        <p>Edit Candy</p>
      </template>
      <b-form v-if="show">
        <b-form-group
          id="input-group-1"
          label="Candy Name:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.name"
            placeholder="Enter name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Details:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.details"
            placeholder="Enter Details"
            required
          ></b-form-input>
        </b-form-group>
        <b-button @click="$bvModal.hide('bv-modal-edit')">Close Me</b-button>
        <b-button class="save-btn" variant="primary" @click="onSubmit"
          >Save</b-button
        >
      </b-form>
    </b-modal>
  </div>
</template>

<style>
.save-btn {
  float: right;
}
</style>


<script>
export default {
  data() {
    return {
      form: {
        name: "",
        details: "",
      },
      show: true,
    };
  },
  created() {
    this.$nuxt.$on("update-event", (data) => {
      this.onDetailsLoad(data);
    });
  },
  props: {
    getEditCandyDetails: Function,
  },
  methods: {
    onDetailsLoad(data) {
      this.form.details = data.details;
      this.form.name = data.name;
    },
    onSubmit() {
      this.getEditCandyDetails(JSON.stringify(this.form));
      this.$bvModal.hide("bv-modal-edit");
      this.show = false;
      this.form.details = "";
      this.form.name = "";
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>