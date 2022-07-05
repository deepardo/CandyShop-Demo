<template>
  <div>
    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title>
        <p>Add Candy</p>
      </template>
      <b-form v-if="show" name="add-form" :validated="validated">
        <b-form-group
          id="input-group-1"
          label="Candy Name:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.name"
            placeholder="Enter name"
            :state="isStateValid(form.name)"
            required
          ></b-form-input>
          <b-form-invalid-feedback id="input-1">
            Name is required
          </b-form-invalid-feedback>
          <b-form-valid-feedback
            :state="isStateValid(form.name)"
          ></b-form-valid-feedback>
        </b-form-group>
        <b-form-group id="input-group-2" label="Details:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.details"
            placeholder="Enter Details"
            :state="isStateValid(form.details)"
            required
          ></b-form-input>
          <b-form-invalid-feedback> Details required </b-form-invalid-feedback>
          <b-form-valid-feedback
            :state="isStateValid(form.details)"
          ></b-form-valid-feedback>
        </b-form-group>
        <b-button @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
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
.err {
  color: red;
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
      validated: false,
      show: true,
      isError: false,
      candyName: null,
      candyDetails: null,
    };
  },
  props: {
    getAddedCandy: Function,
  },
  methods: {
    isStateValid(variable) {
      if (this.validated) {
        return variable.length > 0 ? true : false;
      }
      return null;
    },

    onSubmit() {
      // event.preventDefault();
      this.validated = true;
      this.getAddedCandy(JSON.stringify(this.form));
      const jsonData = JSON.stringify(this.form);
      const jsonParseData = JSON.parse(jsonData);
      if (typeof jsonData === "string") {
        if (jsonParseData.name != "" && jsonParseData.details != "") {
          this.show = false;
          this.form.details = "";
          this.form.name = "";
          this.$bvModal.hide("bv-modal-example");
        } else if (jsonParseData.name == "") {
          this.$bvModal.show("bv-modal-example");
        } else if (jsonParseData.details == "") {
          this.candyDetails = false;
          this.$bvModal.show("bv-modal-example");
        }
      }
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>