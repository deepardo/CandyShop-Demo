<template>
  <div class="main_container">
    <div>
      <input
        type="text"
        placeholder="Search for candy name..."
        name="search"
        id="myInput"
        v-on:keyup="searchCandy"
      />
      <b-button
        size="sm"
        variant="primary"
        class="add_new_candy"
        @click="$bvModal.show('bv-modal-example')"
        >Add New Candy</b-button
      >
      <b-button @click="goToCartPage()" class="add_new_candy" size="sm"
        >Cart <b-badge variant="light">{{ getCounter }}</b-badge></b-button
      >
      <addcandy :getAddedCandy="getAddedcandyList" />
    </div>
    <table id="myTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Details</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(list, index) in candyItem" data-test="item">
          <td>{{ index + 1 }}</td>
          <td>{{ list.name }}</td>
          <td>{{ list.details }}</td>
          <td>
            <b-button
              size="sm"
              class="on-edit"
              @click="onEdit(list, index)"
              :listRowData="listRowData"
              >Edit</b-button
            >
            <b-button
              size="sm"
              variant="danger"
              class="on-delete"
              @click="onDelete(index)"
              >Delete</b-button
            >
            <b-button size="sm" variant="success" @click="addToCart(list)"
              >Add to Cart</b-button
            >
          </td>
        </tr>
      </tbody>
      <Editcandy :getEditCandyDetails="getEditCandy" />
    </table>
    <b-toast
      data-test="text"
      :id="'add-to-cart'"
      variant="success"
      header-class="d-none"
      toaster="b-toaster-top-center"
    >
      Item Added into cart
    </b-toast>
  </div>
</template>

<style>
.main_container {
  margin: 30px;
}
table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}
td,
th {
  border: 1px solid black;
  padding: 10px;
}
#myInput {
  background-position: 10px 10px;
  background-repeat: no-repeat;
  width: 40%;
  font-size: 16px;
  padding: 3px 20px 3px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
}
.add_new_candy {
  float: right;
  margin-right: 20px;
}
</style>


<script>
import { mapGetters, mapMutations } from "vuex";
import addcandy from "~/components/addcandy";
import Editcandy from "~/components/Editcandy";
import cartpage from "~/pages/cartpage";

export default {
  name: "Homepage",
  components: {
    addcandy,
    Editcandy,
    cartpage,
  },
  data() {
    return {
      candyItem: [],
      listRowData: {},
    };
  },
  computed: {
    ...mapGetters({
      getCounter: "modules/addToCart/getCounter",
    }),
  },
  created() {
    this.candyItem = [
      {
        id: 1,
        name: "Pocky",
        details:
          "This biscuit stick coated with chocolate is also available in a wide variety of other flavors.",
      },
      {
        id: 2,
        name: "Haw flakes",
        details:
          "It is a sweet, tangy, disc shaped candy made from hawthorn fruit, packaged in a cylindrical paper wrapper.",
      },
      { id: 3, name: "Peen tong", details: "Chinese brown sugar candy." },
      {
        id: 4,
        name: "Orange jelly candy",
        details:
          "These finger-sized sticks of soft jelly candy are generally sold in food specialty stores in Hong Kong",
      },
      {
        id: 5,
        name: "Deuk Deuk Tong",
        details:
          'Also known as "Ding Ding Tong", it is a hard maltose candy with sesame and ginger flavours.',
      },
    ];
  },
  methods: {
    ...mapMutations({
      increment: "modules/addToCart/increment",
    }),
    addToCart(item) {
      this.$bvToast.show("add-to-cart");
      this.increment();
      this.$store.dispatch("addToCart/addProductToCart", item);
    },
    goToCartPage() {
      this.$router.push("/cartpage");
    },
    getAddedcandyList(data) {
      console.log(data);
      if (typeof data === "string") {
        if (JSON.parse(data).name != "" && JSON.parse(data).details != "") {
          this.candyItem.push(JSON.parse(data));
        }
      }
    },
    getEditCandy(data) {
      console.log(JSON.parse(data));
      localStorage.getItem("rowIndex");
      this.candyItem.splice(
        localStorage.getItem("rowIndex"),
        1,
        JSON.parse(data)
      );
    },
    onEdit(data, index) {
      this.$bvModal.show("bv-modal-edit");
      console.log(index);
      data.isEdit = true;
      this.listRowData = data;
      localStorage.setItem("rowIndex", index);
      this.$nuxt.$emit("update-event", data);
    },
    onDelete(index) {
      localStorage.setItem("rowIndex", index);
      localStorage.getItem("rowIndex");
      this.candyItem.splice(localStorage.getItem("rowIndex"), 1);
    },
    searchCandy: function () {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    },
  },
};
</script>
