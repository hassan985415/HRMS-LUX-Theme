<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <!--        <MaterialCard-->
        <!--          color="success"-->
        <!--          title="Banks"-->
        <!--          class="px-5 py-3"-->
        <!--        >-->
        <v-data-table v-if="!dialog" :headers="headers" :items="allData" sort-by="en_name">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title><h3>{{ $t("bank.title") }}</h3></v-toolbar-title>
              <v-spacer></v-spacer>
                <template>
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    rounded
                    @click="dialog= true"
                  >
                   {{ $t("bank.create") }}
                  </v-btn>
                </template>
            </v-toolbar>
          </template>

          <template v-slot:item.actions="{ item }">
            <div class="d-flex">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item.id)">
                mdi-delete
              </v-icon>
            </div>
          </template>
        </v-data-table>
        <v-card v-else>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form">
                <v-container class="py-0">
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="editedItem.company_id"
                        :items="companies"
                        :item-text="companies.text"
                        :item-value="companies.value"
                        label="Select Company"
                        :rules="[
                                  value => !!value || 'This  field is required'
                                ]"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="editedItem.country_id"
                        :items="countries"
                        :item-text="countries.text"
                        :item-value="countries.value"
                        label="Select Country"
                        :rules="[
                                  value => !!value || 'This  field is required'
                                ]"
                        @change="getCountyCites"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="editedItem.city_id"
                        :items="cities"
                        :item-text="cities.text"
                        :item-value="cities.value"
                        label="Select City"
                        :rules="[
                                  value => !!value || 'This  field is required'
                                ]"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="editedItem.branch_id"
                        :items="branches"
                        :item-text="branches.text"
                        :item-value="branches.value"
                        label="Select branch"
                        :rules="[
                                  value => !!value || 'This  field is required'
                                ]"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="editedItem.currency_id"
                        :items="currencies"
                        :item-text="currencies.text"
                        :item-value="currencies.value"
                        label="Select currency"
                        :rules="[
                                  value => !!value || 'This  field is required'
                                ]"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.ar_name"
                        class="direction"
                        label="Name in Arabic"

                        :rules="[
                                  value => !!value || 'This  field is required',
                                  value =>
                                    (value && value.length <= 50) ||
                                    'maximum 50 characters'
                                ]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.en_name"
                        label="Name in English"
                        :rules="[
                                  value => !!value || 'This  field is required',
                                  value =>
                                    (value && value.length <= 50) ||
                                    'maximum 50 characters'
                                ]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.account_type"
                        label="Account Type"
                        :rules="[
                                  value => !!value || 'This  field is required',
                                  value =>
                                    (value && value.length <= 50) ||
                                    'maximum 50 characters'
                                ]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.account_no"
                        label="Account No"
                        type="number"
                        :rules="[
                                  value => !!value || 'This  field is required',
                                  value =>
                                    (value && value.length <= 50) ||
                                    'maximum 50 characters'
                                ]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.address_1"
                        label="Address_1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.address_2"
                        label="Address_2"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.address_3"
                        label="Address_3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.address_4"
                        label="Address_4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.gl_acct_code"
                        label="gl_acct_code"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.bank_code"
                        label="bank_code"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.bank_file"
                        label="bank_file"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.payment_type"
                        label="payment_type"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              rounded
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text rounded @click="save">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="dialogDelete" max-width="390px" persistent>
          <v-card>
            <v-card-title class="headline"
            >Are you sure you want to delete this record?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="blue darken-1"
                text
                @click="dialogDelete = false"
              >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--        </MaterialCard>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from "../../../components/base/MaterialCard";
import Vue from "vue";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "Banks",
  components: { MaterialCard },
  middleware: ['auth'],
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "ID",
          align: "start",
          value: "id"
        },
        { text: "En Name", value: "en_name" },
        { text: "Ar Name", value: "ar_name" },
        { text: "Account Type", value: "account_type" },
        { text: "Account No", value: "account_no" },
        { text: "Address_1", value: "address_1" },
        { text: "Address_2", value: "address_2" },
        { text: "Address_3", value: "address_3" },
        { text: "Address_4", value: "address_4" },
        { text: "Gl_acct_code", value: "gl_acct_code" },
        { text: "Bank Code", value: "bank_code" },
        { text: "Bank File", value: "bank_file" },
        { text: "Payment Type", value: "payment_type" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        company_id: "",
        country_id: "",
        city_id: "",
        branch_id: "",
        currency_id: "",
        en_name: "",
        ar_name: "",
        account_type: "",
        account_no: "",
        address_1: "",
        address_2: "",
        address_3: "",
        address_4: "",
        gl_acct_code: "",
        bank_code: "",
        bank_file: "",
        payment_type: ""
      },
      countryId: [],
      allData: [],
      companies: [],
      countries: [],
      cities: [],
      branches: [],
      currencies: []
    };
  },
  watch: {
    dialog: function (val) {
      if(!val){
        this.$refs.form.reset()
        this.editedIndex = -1
      }
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Bank" : "Edit Bank";
    }
  },
  created() {
    this.getCompanies();
    this.getCountries();
    // this.getCities()
    this.getBranches();
    this.getCurrencies();
    this.getList();
  },
  methods: {
    ...mapActions("app", ["list", "update", "create", "delete"]),
    ...mapMutations("app", ["SHOW_LOADER", "SHOW_SNACKBAR"]),
    getCompanies() {
      const arr = [];
      const data = { path: "/companies" };

      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text: data.en_name,
            value: data.id
          });
        });
        this.companies = arr;
      });
    },
    getCountries() {
      const arr = [];
      const data = { path: "/all_countries" };

      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text: data.en_name,
            value: data.id
          });
        });
        this.countries = arr;
      });
    },
    getCities() {
      const arr = [];
      const data = { path: "/cities" };

      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text: data.en_name,
            value: data.id
          });
        });
        this.cities = arr;
      });
    },
    getCountyCites() {
      const arr = [];
      const data = { path: "/cities?country_id=" + this.editedItem.country_id };

      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text: data.en_name,
            value: data.id
          });
        });
        this.SHOW_LOADER(false);
        this.cities = arr;
      });
    },
    getBranches() {
      const arr = [];
      const data = { path: "/company_branches" };

      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text: data.en_name,
            value: data.id
          });
        });
        this.branches = arr;
      });
    },
    getCurrencies() {
      const arr = [];
      const data = { path: "/currencies" };

      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text: data.en_name,
            value: data.id
          });
        });
        this.currencies = arr;
      });
    },
    getList() {
      const data = { path: "/compnay_banks" };

      this.list(data).then(response => {
        this.allData = response.data.data;
        this.SHOW_LOADER(false);
        this.SHOW_SNACKBAR({
          snackbar: true,
          color: "green",
          message: response.data.message
        });
      });
    },
    async save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          const data = {
            path: "/compnay_bank/" + this.editedItem.id,
            data: this.editedItem
          };

          this.SHOW_LOADER(true);
          await this.update(data)
            .then(response => {
              this.dialog = false;
              this.SHOW_LOADER(false);
              this.SHOW_SNACKBAR({
                snackbar: true,
                color: "green",
                message: response.data.message
              });
              this.getList();
            })
            .catch(error => {
              this.SHOW_LOADER(false);
              this.SHOW_SNACKBAR({
                snackbar: true,
                color: "error",
                message: error.response.data.message
              });
            });
        } else {
          const data = {
            path: "/compnay_banks",
            data: this.editedItem
          };

          this.SHOW_LOADER(true);
          await this.create(data)
            .then(response => {
              this.dialog = false;
              this.SHOW_LOADER(false);
              this.SHOW_SNACKBAR({
                snackbar: true,
                color: "green",
                message: response.data.message
              });
              this.getList();
            })
            .catch(error => {
              this.SHOW_LOADER(false);
              this.SHOW_SNACKBAR({
                snackbar: true,
                color: "error",
                message: error.response.data.message
              });
            });
        }
      }
    },
    editItem(item) {
      this.editedIndex = 2;
      // this.editedIndex =this.desserts.indexOf(item)
      // console.log('index',this.desserts.indexOf(item))
      this.editedItem = Vue.util.extend({}, item);
      this.editedItem.company_id = item.company_id.id;
      this.editedItem.country_id = item.country_id.id;
      this.editedItem.city_id = item.city_id.id;
      this.editedItem.branch_id = item.branch_id.id;
      this.editedItem.currency_id = item.currency_id.id;
      this.dialog = true;
    },
    deleteItem(id) {
      this.countryId[0] = id;
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      this.dialogDelete = false;
      this.SHOW_LOADER(true);
      const data = {
        ids: this.countryId,
        path: "/delete_compnay_banks"
      };

      await this.delete(data)
        .then(response => {
          this.SHOW_LOADER(false);
          this.SHOW_SNACKBAR({
            snackbar: true,
            color: "green",
            message: response.data.message
          });
          this.getList();
        })
        .catch(error => {
          this.SHOW_LOADER(false);
          this.SHOW_SNACKBAR({
            snackbar: true,
            color: "error",
            message: error.response.data.message
          });
        });
    },
    reset() {
      this.editedItem.en_name = "";
      this.editedItem.ar_name = "";
      this.editedItem.company_id = "";
      this.editedItem.country_id = "";
      this.editedItem.city_id = "";
      this.editedItem.branch_id = "";
      this.editedItem.currency_id = "";
      this.editedItem.account_type = "";
      this.editedItem.account_no = "";
      this.editedItem.address_1 = "";
      this.editedItem.address_2 = "";
      this.editedItem.address_3 = "";
      this.editedItem.address_4 = "";
      this.editedItem.gl_acct_code = "";
      this.editedItem.bank_code = "";
      this.editedItem.bank_file = "";
      this.editedItem.payment_type = "";
      this.countryId = [];
      this.editedIndex = -1;
    }
  }
};
</script>

<style scoped>
.direction {
  direction: rtl;
}
</style>
