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
        <!--          title="Payroll Specific Preferences"-->
        <!--          class="px-5 py-3"-->
        <!--        >-->
        <v-data-table
          v-if="!dialog && !view"
          class="row-pointer"
          :headers="headers"
          :items="allData"
          sort-by="en_name"
          @click:row.self="viewItem"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title><h3>Payroll Specific Preferences</h3></v-toolbar-title>
              <v-spacer></v-spacer>
              <template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  rounded
                  @click="dialog = true"
                >
                  Create Payroll Specific Preference
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
        <v-card v-if="dialog">
          <v-card-title>
            <span v-if="view" class="headline">View Payroll Specific Preferences </span>
            <span v-else class="headline">{{ formTitle }}</span>
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
                        :disabled="view"
                        :filled="view"
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
                        :disabled="view"
                        :filled="view"
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
                        v-model="editedItem.sub_ledger_id"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="sub ledger id"
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
                        v-model="editedItem.monthly_pay"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Monthly pay"
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
                        v-model="editedItem.post_to_account"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Post to account"
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
                        v-model="editedItem.return_date"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Return date"
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
                        v-model="editedItem.calculate_extraleave"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Calculate extraleave"
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
                        v-model="editedItem.use_twoglacct_inbenefits"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Use twoglacct inbenefits"
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
                        v-model="editedItem.payroll_rounding"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Payroll rounding"
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
                        v-model="editedItem.map_to_acctg_branch"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Map to branch"
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
                        v-model="editedItem.attendance_mc"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Attendance mc"
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
                        v-model="editedItem.costcenter_based_attendance"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Cost center based attendance"
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
                        v-model="editedItem.entry_overtime"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Entry overtime"
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
                        v-model="editedItem.split_payroll"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Split payroll"
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
                        v-model="editedItem.auto_gosi_calculate"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Auto gosi calculate"
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
                        v-model="editedItem.gosi_alert_days"
                        :disabled="view"
                        :filled="view"
                        label="Gosi alert days"
                        :rules="[ (value) => !!value || 'This  field is required',
                                  (value) => (value && value.length <= 50) || 'maximum 50 characters',]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>

            </v-container>
          </v-card-text>

          <v-card-actions v-if="!view">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text rounded @click="dialog = false">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text rounded @click="save">
              Save
            </v-btn>
          </v-card-actions>
          <v-card-actions v-else>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text rounded @click="view = false; dialog = false; editedItem = {}; editedIndex = -1">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text rounded @click="view = false">
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="dialogDelete" max-width="390px" persistent>
          <v-card>
            <v-card-title class="headline delete-font">Are you sure you want to delete this record?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete=false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--        </MaterialCard>-->
<!--        <v-card v-if="view">-->
<!--          <v-card-title>-->
<!--            <span class="headline"> View </span>-->
<!--          </v-card-title>-->
<!--          <v-card-text>-->
<!--            <v-row>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Sub ledger id </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.sub_ledger_id }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Monthly pay </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.monthly_pay }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Post to account </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.post_to_account }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Return date </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.return_date }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Calculate extra leave </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.calculate_extraleave }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Use two glacct in benefits </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.use_twoglacct_inbenefits }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Payroll rounding </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.payroll_rounding }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Map to acctg branch </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.map_to_acctg_branch }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Attendance mc </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.attendance_mc }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Costcenter based attendance </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.costcenter_based_attendance }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Entry overtime </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.entry_overtime }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Split payroll </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.split_payroll }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Auto gosi calculate </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.auto_gosi_calculate }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Gosi alert days </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.gosi_alert_days }} </span> </v-col>-->
<!--            </v-row>-->
<!--          </v-card-text>-->
<!--          <v-card-actions>-->
<!--            <v-spacer></v-spacer>-->
<!--            <v-btn color="blue darken-1" text rounded @click="view = false; editedItem = {}; editedIndex = -1">-->
<!--              Cancel-->
<!--            </v-btn>-->
<!--            <v-btn color="blue darken-1" text rounded @click="dialog = true; view = false">-->
<!--              Edit-->
<!--            </v-btn>-->
<!--          </v-card-actions>-->
<!--        </v-card>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from '../../../components/base/MaterialCard'
import Vue from 'vue'
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'PayrollSpecificPreferences',
  components: { MaterialCard },
  middleware: ['auth'],
  data() {
    return {
      dialog: false,
      view: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        { text: 'Sub ledger id', value: 'sub_ledger_id' },
        { text: 'Monthly pay', value: 'monthly_pay' },
        { text: 'Post to account', value: 'post_to_account' },
        { text: 'Return date', value: 'return_date' },
        { text: 'Calculate extra leave', value: 'calculate_extraleave' },
        { text: 'Use two glacct in benefits', value: 'use_twoglacct_inbenefits' },
        { text: 'Payroll rounding', value: 'payroll_rounding' },
        { text: 'Map to acctg branch', value: 'map_to_acctg_branch' },
        { text: 'Attendance mc', value: 'attendance_mc' },
        { text: 'Costcenter based attendance', value: 'costcenter_based_attendance' },
        { text: 'Entry overtime', value: 'entry_overtime' },
        { text: 'Split payroll', value: 'split_payroll' },
        { text: 'Auto gosi calculate', value: 'auto_gosi_calculate' },
        { text: 'Gosi alert days', value: 'gosi_alert_days' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        company_id: '',
        branch_id: '',
        gosi_alert_days: '',
        sub_ledger_id: '0',
        monthly_pay: '0',
        post_to_account: '0',
        return_date: '0',
        calculate_extraleave: '0',
        use_twoglacct_inbenefits: '0',
        payroll_rounding: '0',
        map_to_acctg_branch: '0',
        attendance_mc: '0',
        costcenter_based_attendance: '0',
        entry_overtime: '0',
        split_payroll: '0',
        auto_gosi_calculate: '0'
      },
      countryId:[],
      allData: [],
      companies: [],
      branches: []
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Payroll Specific Preferences' : 'Edit Payroll Specific Preferences'
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
      const arr = []
      const data = { path: '/companies' }

      this.list(data).then((response) => {
        response.data.data.forEach((data) => {
          arr.push({
            text : data.en_name,
            value: data.id
          })
        })
        this.companies = arr
      })
    },
    getBranches () {
      const arr = []
      const data = { path: '/company_branches' }

      this.list(data).then((response) => {
        response.data.data.forEach((data) => {
          arr.push({
            text : data.en_name,
            value: data.id
          })
        })
        this.branches = arr
      })
    },
    getList() {
      const data = { path: '/payroll_specific_preferences' }

      this.list(data).then((response) => {
        this.allData = response.data.data
        this.SHOW_LOADER ( false)
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: 'green',
          message: response.data.message
        })
      }).catch((error) => {
        this.SHOW_LOADER ( false)
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: 'error',
          message: error.response.data.message
        })
      })
    },
    async save () {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          const data = {
            path:'/payroll_specific_preference/' + this.editedItem.id,
            data:this.editedItem
          }

          this.SHOW_LOADER ( true)
          await this.update(data).then((response) => {
            this.dialog = false
            this.SHOW_LOADER ( false)
            this.SHOW_SNACKBAR( {
              snackbar: true,
              color: 'green',
              message: response.data.message
            })
            this.getList()
          })
        }
        else {
          const data = {
            path:'/payroll_specific_preferences',
            data:this.editedItem
          }

          this.SHOW_LOADER ( true)
          await this.create(data).then((response) => {
            this.dialog = false
            this.SHOW_LOADER ( false)
            this.SHOW_SNACKBAR( {
              snackbar: true,
              color: 'green',
              message: response.data.message
            })
            this.getList()
          }).catch((error) => {
            this.SHOW_LOADER ( false)
            this.SHOW_SNACKBAR( {
              snackbar: true,
              color: 'error',
              message: error.response.data.message
            })
          })
        }
      }

    },
    editItem (item) {
      this.editedIndex = 2
      // this.editedIndex =this.desserts.indexOf(item)
      // console.log('index',this.desserts.indexOf(item))
      this.editedItem = Vue.util.extend({}, item)
      this.editedItem.company_id = item.company_id.id
      this.editedItem.branch_id = item.branch_id.id
      this.dialog = true
    },
    viewItem (item) {
      this.editedIndex = 2
      // this.editedIndex =this.desserts.indexOf(item)
      // console.log('index',this.desserts.indexOf(item))
      this.editedItem = Vue.util.extend({}, item)
      this.editedItem.company_id = item.company_id.id
      this.editedItem.branch_id = item.branch_id.id
      this.view = true
      this.dialog = true
    },
    deleteItem (id) {
      this.countryId[0] = id
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      this.dialogDelete = false
      this.SHOW_LOADER ( true)
      const data = {
        'ids': this.countryId,
        'path' : '/delete_payroll_specific_preferences'
      }

      await this.delete(data).then((response) => {
        this.SHOW_LOADER ( false)
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: 'green',
          message: response.data.message
        })
        this.getList()
      }).catch((error) => {
        this.SHOW_LOADER ( false)
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: 'error',
          message: error.response.data.message
        })
      })
    },
    reset() {
      this.editedItem.gosi_alert_days = ''
      this.editedItem.company_id = ''
      this.editedItem.branch_id = ''
      this.editedItem.sub_ledger_id = '0'
      this.editedItem.monthly_pay = '0'
      this.editedItem.post_to_account = '0'
      this.editedItem.return_date = '0'
      this.editedItem.calculate_extraleave = '0'
      this.editedItem.use_twoglacct_inbenefits = '0'
      this.editedItem.payroll_rounding = '0'
      this.editedItem.map_to_acctg_branch = '0'
      this.editedItem.attendance_mc = '0'
      this.editedItem.costcenter_based_attendance = '0'
      this.editedItem.entry_overtime = '0'
      this.editedItem.split_payroll = '0'
      this.editedItem.auto_gosi_calculate = '0'
      this.countryId = []
      this.editedIndex = -1
    }
  }
}
</script>

<style scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
.delete-font {
  font-size: 15px !important;
}
</style>
