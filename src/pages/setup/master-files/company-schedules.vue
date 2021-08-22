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
        <!--          title="Company Schedules"-->
        <!--          class="px-5 py-3"-->
        <!--        >-->
        <v-data-table
          v-if="!dialog && !view"
          :headers="headers"
          :items="allData"
          sort-by="en_name"
          class="row-pointer"
          @click:row.self="viewItem"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title><h3>Company Schedules</h3></v-toolbar-title>
              <v-spacer></v-spacer>
              <template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  rounded
                  @click="dialog = true"
                >
                  Create Company Schedule
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
            <span v-if="view" class="headline">View Company Schedule </span>
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
                        :items="companies"
                        :item-text="companies.text"
                        :item-value="companies.value"
                        :disabled="view"
                        :filled="view"
                        label="Select Company"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.ar_description"
                        :disabled="view"
                        :filled="view"
                        label="Description in Arabic"
                        class="direction"
                        :rules="[ (value) => !!value || 'This  field is required',
                                  (value) => (value && value.length <= 50) || 'maximum 50 characters',]"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.en_description"
                        :disabled="view"
                        :filled="view"
                        label="Description in English"
                        :rules="[ (value) => !!value || 'This  field is required',
                                  (value) => (value && value.length <= 50) || 'maximum 50 characters',]"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.date_from"
                        :disabled="view"
                        :filled="view"
                        label="Date From"
                        type="date"
                        :rules="[ (value) => !!value || 'This  field is required']"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.date_to"
                        :disabled="view"
                        :filled="view"
                        label="Date To"
                        type="date"
                        :rules="[ (value) => !!value || 'This  field is required']"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.date_from_h"
                        :disabled="view"
                        :filled="view"
                        label="Date From_h"
                        type="date"
                        :rules="[ (value) => !!value || 'This  field is required']"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.date_to_h"
                        :disabled="view"
                        :filled="view"
                        label="Date To_h"
                        type="date"
                        :rules="[ (value) => !!value || 'This  field is required']"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-checkbox
                        v-model="editedItem.no_work"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="No Work"
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
                        v-model="editedItem.for_schedule"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="For Schedule"
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
                        v-model="editedItem.paid_overtime"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Paid Overtime"
                        color="success"
                        hide-details
                      ></v-checkbox>
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
        <!--              <v-col cols="12" sm="6" md="6"><h3> En Description </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.en_description}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Ar Description </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.ar_description}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Date From </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.date_from}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Date To </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.date_to}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Date From_h </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.date_from_h}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Date To_h </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.date_to_h}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> No Work </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.no_work}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> For Schedule </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.for_schedule}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Paid Overtime </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.paid_overtime}} </span> </v-col>-->
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
  name: 'CompanySchedules',
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
        { text: 'En Description', value: 'en_description' },
        { text: 'Ar Description', value: 'ar_description' },
        { text: 'Date From', value: 'date_from' },
        { text: 'Date To', value: 'date_to' },
        { text: 'Date From_h', value: 'date_from_h' },
        { text: 'Date To_h', value: 'date_to_h' },
        { text: 'No Work', value: 'no_work' },
        { text: 'For Schedule', value: 'for_schedule' },
        { text: 'Paid Overtime', value: 'paid_overtime' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        company_id: '',
        en_description: '',
        ar_description: '',
        date_from: '',
        date_to: '',
        date_from_h: '',
        date_to_h: '',
        no_work: '0',
        for_schedule: '0',
        paid_overtime: '0'
      },
      countryId:[],
      allData: [],
      companies: []
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Company Schedule' : 'Edit Company Schedule'
    }
  },
  watch: {
    dialog: function (val) {
      if (!val) {
        this.$refs.form.reset()
        this.editedIndex = -1
      }
    }
  },
  created () {
    this.getCompanies()
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
    getList() {
      const data = { path: '/company_schedules' }

      this.list(data).then((response) => {
        this.allData = response.data.data
        this.SHOW_LOADER ( false)
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: 'green',
          message: response.data.message
        })
      })
    },
    async save () {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          const data = {
            path:'/company_schedule/' + this.editedItem.id,
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
          }).catch((error) => {
            this.SHOW_LOADER ( false)
            this.SHOW_SNACKBAR( {
              snackbar: true,
              color: 'error',
              message: error.response.data.message
            })
          })
        }
        else {
          const data = {
            path:'/company_schedules',
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
      this.dialog = true
    },
    viewItem (item) {
      this.editedIndex = 2
      // this.editedIndex =this.desserts.indexOf(item)
      // console.log('index',this.desserts.indexOf(item))
      this.editedItem = Vue.util.extend({}, item)
      this.editedItem.company_id = item.company_id.id
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
        'path' : '/delete_company_schedules'
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
      this.editedItem.en_description = ''
      this.editedItem.ar_description = ''
      this.editedItem.company_id = ''
      this.editedItem.date_from = ''
      this.editedItem.date_to = ''
      this.editedItem.date_from_h = ''
      this.editedItem.date_to_h = ''
      this.editedItem.no_work = '0'
      this.editedItem.for_schedule = '0'
      this.editedItem.paid_overtime = '0'
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
