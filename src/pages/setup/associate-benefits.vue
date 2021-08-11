<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="12"
      >
<!--        <MaterialCard-->
<!--          color="success"-->
<!--          title="Associate Benefits"-->
<!--          class="px-5 py-3"-->
<!--        >-->
          <v-data-table
            :headers="headers"
            :items="allData"
            sort-by="en_name"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title><h3>Associate Benefits</h3></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"

                      rounded
                    >
                      Create Associate Benefit
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-form ref="form">
                          <v-container class="py-0">
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-select
                                  v-model="editedItem.company_id"
                                  :items="companies"
                                  :item-text="companies.text"
                                  :item-value="companies.value"
                                  label="Select Company"
                                  :rules="[ (value) => !!value || 'This  field is required',]"
                                ></v-select>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-select
                                  v-model="editedItem.designation_id"
                                  :items="designations"
                                  :item-text="designations.text"
                                  :item-value="designations.value"
                                  label="Select designation"
                                  :rules="[ (value) => !!value || 'This  field is required',]"
                                ></v-select>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-select
                                  v-model="editedItem.beneficiary_id"
                                  :items="beneficiaries"
                                  :item-text="beneficiaries.text"
                                  :item-value="beneficiaries.value"
                                  label="Select beneficiary"
                                  :rules="[ (value) => !!value || 'This  field is required',]"
                                ></v-select>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-select
                                  v-model="editedItem.branch_id"
                                  :items="branches"
                                  :item-text="branches.text"
                                  :item-value="branches.value"
                                  label="Select branch"
                                  :rules="[ (value) => !!value || 'This  field is required',]"
                                ></v-select>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-text-field
                                  label="Amount From"
                                  type="number"
                                  v-model="editedItem.amount_from"
                                  :rules="[ (value) => !!value || 'This  field is required',
                                (value) => (value && value.length <= 10) || 'maximum 5 characters',]"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-text-field
                                  label="Amount To"
                                  type="number"
                                  v-model="editedItem.amount_to"
                                  :rules="[ (value) => !!value || 'This  field is required',
                                (value) => (value && value.length <= 10) || 'maximum 5 characters',]"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-text-field
                                  label="Status"
                                  type="number"
                                  v-model="editedItem.status"
                                  :rules="[ (value) => !!value || 'This  field is required',
                                (value) => (value && value.length <= 20) || 'maximum 2 characters',]"
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
                        @click="dialog = false"
                        rounded
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                        rounded
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="390px" persistent>
                  <v-card>
                    <v-card-title class="headline">Are you sure you want to delete this record?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialogDelete=false">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
<!--        </MaterialCard>-->
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import MaterialCard from "../../components/base/MaterialCard";
import Vue from "vue";
import {mapActions, mapMutations} from "vuex";
export default {
  name: "associate-benefits.vue",
  components: {MaterialCard },
  middleware: ['auth'],
  data(){
    return{
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Amount From', value: 'amount_from' },
        { text: 'Amount To', value: 'amount_to' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        company_id: '',
        designation_id: '',
        beneficiary_id: '',
        branch_id: '',
        amount_from: '',
        amount_to: '',
        status: '',
      },
      countryId:[],
      allData: [],
      companies: [],
      designations: [],
      beneficiaries: [],
      branches: [],
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Associate Benefit' : 'Edit Associate Benefit'
    }
  },
  watch: {
    dialog: function (val) {
      if(!val){
        this.$refs.form.reset()
        this.editedIndex = -1
      }
    },
  },
  created () {
    this.getCompanies()
    this.getDesignations()
    this.getBeneficiaries()
    this.getBranches()
    this.getList()
  },
  methods: {
    ...mapActions('app', ['list', 'update', 'create', 'delete']),
    ...mapMutations('app', ['SHOW_LOADER','SHOW_SNACKBAR']),
    getCompanies () {
      let arr = []
      let data = { path: "/companies" }
      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text : data.en_name +' '+ data.ar_name,
            value: data.id
          })
        })
        this.companies = arr
      })
    },
    getDesignations () {
      let arr = []
      let data = { path: "/designations" }
      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text : data.en_name +' '+ data.ar_name,
            value: data.id
          })
        })
        this.designations = arr
      })
    },
    getBeneficiaries () {
      let arr = []
      let data = { path: "/beneficiary_types" }
      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text : data.en_name +' '+ data.ar_name,
            value: data.id
          })
        })
        this.beneficiaries = arr
      })
    },
    getBranches () {
      let arr = []
      let data = { path: "/company_branches" }
      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text : data.en_name +' '+ data.ar_name,
            value: data.id
          })
        })
        this.branches = arr
      })
    },
    getCurrencies () {
      let arr = []
      let data = { path: "/currencies" }
      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text : data.en_name +' '+ data.ar_name,
            value: data.id
          })
        })
        this.currencies = arr
      })
    },
    getList(){
      let data = { path: "/benefit_posts" }
      this.list(data).then(response => {
        this.allData = response.data.data
        this.SHOW_LOADER ( false);
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: "green",
          message: response.data.message
        });
      });
    },
    async save () {
      if(this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          let data={
            path:"/benefit_post/"+this.editedItem.id,
            data:this.editedItem
          }
          this.SHOW_LOADER ( true);
          await this.update(data).then(response => {
            this.dialog = false
            this.SHOW_LOADER ( false);
            this.SHOW_SNACKBAR( {
              snackbar: true,
              color: "green",
              message: response.data.message
            });
            this.getList()
          }).catch(error => {
            this.SHOW_LOADER ( false);
            this.SHOW_SNACKBAR( {
              snackbar: true,
              color: "error",
              message: error.response.data.message
            });
          })
        }
        else {
          let data={
            path:"/benefit_posts",
            data:this.editedItem
          }
          this.SHOW_LOADER ( true);
          await this.create(data).then(response => {
            this.dialog = false
            this.SHOW_LOADER ( false);
            this.SHOW_SNACKBAR( {
              snackbar: true,
              color: "green",
              message: response.data.message
            });
            this.getList()
          }).catch(error => {
            this.SHOW_LOADER ( false);
            this.SHOW_SNACKBAR( {
              snackbar: true,
              color: "error",
              message: error.response.data.message
            });
          })
        }
      }

    },
    editItem (item) {
      this.editedIndex = 2
      // this.editedIndex =this.desserts.indexOf(item)
      // console.log('index',this.desserts.indexOf(item))
      this.editedItem = Vue.util.extend({}, item);
      this.editedItem.company_id = item.company_id.id
      this.editedItem.designation_id = item.designation_id.id
      this.editedItem.beneficiary_id = item.beneficiary_id.id
      this.editedItem.branch_id = item.branch_id.id
      this.dialog = true
    },
    deleteItem (id) {
      this.countryId[0]=id
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      this.dialogDelete = false
      this.SHOW_LOADER ( true);
      let data = {
        'ids': this.countryId,
        'path' : '/delete_benefit_posts'
      }
      await this.delete(data).then(response => {
        this.SHOW_LOADER ( false);
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: "green",
          message: response.data.message
        });
        this.getList()
      }).catch(error => {
        this.SHOW_LOADER ( false);
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: "error",
          message: error.response.data.message
        });
      })
    },
    reset() {
      this.editedItem.amount_from = ''
      this.editedItem.amount_to = ''
      this.editedItem.status = ''
      this.editedItem.company_id = ''
      this.editedItem.designation_id = ''
      this.editedItem.beneficiary_id = ''
      this.editedItem.branch_id = ''
      this.countryId = []
      this.editedIndex = -1
    }
  }
}
</script>

<style scoped>

</style>
