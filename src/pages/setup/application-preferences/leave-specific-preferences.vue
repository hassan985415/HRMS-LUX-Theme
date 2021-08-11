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
<!--          title="Leave Specific Preferences"-->
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
                <v-toolbar-title><h3>Leave Specific Preferences</h3></v-toolbar-title>
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
                      Create Leave Specific Preference
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
                                ></v-select>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-checkbox
                                  v-model="editedItem.forward_vacation_days_balance"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Forward vacation days"
                                  color="success"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-checkbox
                                  v-model="editedItem.use_latest_salary_calc"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Use latest salary calc"
                                  color="success"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-checkbox
                                  v-model="editedItem.include_vacation_days"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Include vacation days"
                                  color="success"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-checkbox
                                  v-model="editedItem.days_in_year"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Days in year"
                                  color="success"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-checkbox
                                  v-model="editedItem.include_eos"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Include eos"
                                  color="success"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-checkbox
                                  v-model="editedItem.current_days_month"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Current days month"
                                  color="success"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-text-field
                                  label="Vacation per contract"
                                  type="number"
                                  v-model="editedItem.vacation_per_contract"
                                  :rules="[ (value) => !!value || 'This  field is required']"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-text-field
                                  label="Vacation per contract"
                                  type="number"
                                  v-model="editedItem.vacation_days_per_contract"
                                  :rules="[ (value) => !!value || 'This  field is required']"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-text-field
                                  label="Fiscal year end"
                                  type="date"
                                  v-model="editedItem.fiscal_year_end"
                                  :rules="[ (value) => !!value || 'This  field is required']"
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
import MaterialCard from "../../../components/base/MaterialCard";
import Vue from "vue";
import {mapActions, mapMutations} from "vuex";

export default {
  name: "leave_specific_preferences",
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
        { text: 'Forward vacation days balance', value: 'forward_vacation_days_balance' },
        { text: 'Use latest salary calc', value: 'use_latest_salary_calc' },
        { text: 'Include vacation days', value: 'include_vacation_days' },
        { text: 'Days in year', value: 'days_in_year' },
        { text: 'Include eos', value: 'include_eos' },
        { text: 'Current days month', value: 'current_days_month' },
        { text: 'Fiscal year end', value: 'fiscal_year_end'},
        { text: 'Vacation per contract', value: 'vacation_per_contract' },
        { text: 'Vacation days per contract', value: 'vacation_days_per_contract' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        company_id: '',
        branch_id: '',
        forward_vacation_days_balance: '0',
        use_latest_salary_calc: '0',
        include_vacation_days: '0',
        days_in_year: '0',
        include_eos: '0',
        current_days_month: '0',
        fiscal_year_end: '',
        vacation_per_contract: '',
        vacation_days_per_contract: '',
      },
      countryId:[],
      allData: [],
      companies: [],
      branches: [],
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Leave Specific Preferences' : 'Edit Leave Specific Preferences'
    }
  },
  created () {
    this.getCompanies()
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
            text : data.en_name,
            value: data.id
          })
        })
        this.companies = arr
      })
    },
    getBranches () {
      let arr = []
      let data = { path: "/company_branches" }
      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text : data.en_name,
            value: data.id
          })
        })
        this.branches = arr
      })
    },
    getList(){
      let data = { path: "/leave_specific_preferences" }
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
            path:"/leave_specific_preference/"+this.editedItem.id,
            data:this.editedItem
          }
          this.dialog = false
          this.SHOW_LOADER ( true);
          await this.update(data).then(response => {
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
            path:"/leave_specific_preferences",
            data:this.editedItem
          }
          this.dialog = false
          this.SHOW_LOADER ( true);
          await this.create(data).then(response => {
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
        'path' : '/delete_leave_specific_preferences'
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
      this.editedItem.gosi_alert_days = ''
      this.editedItem.company_id = ''
      this.editedItem.branch_id = ''
      this.editedItem.forward_vacation_days_balance = '0'
      this.editedItem.use_latest_salary_calc = '0'
      this.editedItem.include_vacation_days = '0'
      this.editedItem.days_in_year = '0'
      this.editedItem.include_eos = '0'
      this.editedItem.current_days_month = '0'
      this.editedItem.fiscal_year_end =''
      this.editedItem.vacation_per_contract =''
      this.editedItem.vacation_days_per_contract = ''
      this.countryId = []
      this.editedIndex = -1
    }
  },
}
</script>

<style scoped>

</style>
