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
<!--          title="Beneficiary Types"-->
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
                <v-toolbar-title><h3>Beneficiary Types</h3></v-toolbar-title>
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
                      rounded
                      v-on="on"
                      @click="reset"
                    >
                      Create Beneficiary Type
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
                                <v-text-field
                                  v-model="editedItem.ar_name"
                                  label="Beneficiary Type in Arabic"
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
                                  v-model="editedItem.en_name"
                                  label="Beneficiary Type in English"
                                  :rules="[ (value) => !!value || 'This  field is required',
                                            (value) => (value && value.length <= 50) || 'maximum 50 characters',]"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-checkbox
                                  v-model="editedItem.parentbenefit"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Parent Benefit"
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
                                  v-model="editedItem.finalsetflag"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Final set Flag"
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
                                  v-model="editedItem.moneyvalueflag"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Money Value Flag"
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
                                  v-model="editedItem.holidayflag"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Holiday Flag"
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
                                  v-model="editedItem.printable"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Printable"
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
                                  v-model="editedItem.modifyflag"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Modify Flag"
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
                                  v-model="editedItem.is_active"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Is Active"
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
                                  v-model="editedItem.credit_glid"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Credit Glid"
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
                                  v-model="editedItem.showinreport"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Show in Report"
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
                                  v-model="editedItem.mulfactor"
                                  :false-value="0"
                                  :true-value="1"
                                  label="mulfactor"
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
                                  v-model="editedItem.percent_frsalary"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Percent for Salary"
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
                                  v-model="editedItem.mb"
                                  :false-value="0"
                                  :true-value="1"
                                  label="mb"
                                  color="success"
                                  hide-details
                                ></v-checkbox>
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
                        @click="dialog=false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        rounded
                        @click="save"
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
import MaterialCard from '../../../components/base/MaterialCard'
import Vue from 'vue'
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'BeneficiaryTypes',
  components: { MaterialCard },
  //middleware: ['auth'],
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        { text: 'En Name', value: 'en_name' },
        { text: 'Ar Name', value: 'ar_name' },
        { text: 'Parent Benefit', value: 'parentbenefit' },
        { text: 'Final Set Flag', value: 'finalsetflag' },
        { text: 'Money Value Flag', value: 'moneyvalueflag' },
        { text: 'Holiday Flag', value: 'holidayflag' },
        { text: 'Printable', value: 'printable' },
        { text: 'Modify Flag', value: 'modifyflag' },
        { text: 'Is Active', value: 'is_active' },
        { text: 'Credit Glid', value: 'credit_glid' },
        { text: 'Show in Report', value: 'showinreport' },
        { text: 'Mulfactor', value: 'mulfactor' },
        { text: 'Percent for Salary', value: 'percent_frsalary' },
        { text: 'mb', value: 'mb' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        en_name: '',
        ar_name: '',
        parentbenefit: '0',
        finalsetflag: '0',
        moneyvalueflag: '0',
        holidayflag: '0',
        printable: '0',
        modifyflag: '0',
        is_active: '0',
        credit_glid: '0',
        showinreport: '0',
        mulfactor: '0',
        percent_frsalary: '0',
        mb: '0'
      },
      countryId:[],
      allData: []
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Beneficiary Type' : 'Edit Beneficiary Type'
    }
  },
  created () {
    this.getList()
  },
  methods: {
    ...mapActions('app', ['list', 'update', 'create', 'delete']),
    ...mapMutations('app', ['SHOW_LOADER','SHOW_SNACKBAR']),
    getList() {
      const data = { path: '/beneficiary_types' }

      this.list (data).then((response) => {
        this.allData = response.data.data
        this.SHOW_LOADER ( false)
        this.SHOW_SNACKBAR ( {
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
            path:'/beneficiary_type/' + this.editedItem.id,
            data:this.editedItem
          }

          this.SHOW_LOADER ( true)
          await this.update (data).then((response) => {
            this.dialog = false
            this.SHOW_LOADER ( false)
            this.SHOW_SNACKBAR ( {
              snackbar: true,
              color: 'green',
              message: response.data.message
            })
            this.getList()
          }).catch((error) => {
            this.SHOW_LOADER ( false)
            this.SHOW_SNACKBAR ( {
              snackbar: true,
              color: 'error',
              message: error.response.data.message
            })
          })
        }
        else {
          const data = {
            path:'/beneficiary_types',
            data:this.editedItem
          }

          this.SHOW_LOADER ( true)
          await this.create (data).then((response) => {
            this.dialog = false
            this.SHOW_LOADER ( false)
            this.SHOW_SNACKBAR ( {
              snackbar: true,
              color: 'green',
              message: response.data.message
            })
            this.getList()
          }).catch((error) => {
            this.SHOW_LOADER ( false)
            this.SHOW_SNACKBAR ( {
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
        'path' : '/delete_beneficiary_types'
      }

      await this.delete (data).then((response) => {
        this.SHOW_LOADER ( false)
        this.SHOW_SNACKBAR ( {
          snackbar: true,
          color: 'green',
          message: response.data.message
        })
        this.getList()
      }).catch((error) => {
        this.SHOW_LOADER ( false)
        this.SHOW_SNACKBAR ( {
          snackbar: true,
          color: 'error',
          message: error.response.data.message
        })
      })
    },
    reset() {
      this.editedItem.en_name = ''
      this.editedItem.ar_name = ''
      this.editedItem.parentbenefit = '0'
      this.editedItem.finalsetflag = '0'
      this.editedItem.holidayflag = '0'
      this.editedItem.printable = '0'
      this.editedItem.modifyflag = '0'
      this.editedItem.is_active = '0'
      this.editedItem.credit_glid = '0'
      this.editedItem.showinreport = '0'
      this.editedItem.mulfactor = '0'
      this.editedItem.percent_frsalary = '0'
      this.editedItem.mb = '0'
      this.editedItem.moneyvalueflag = '0'
      this.countryId = []
      this.editedIndex = -1
    }

  }
}
</script>

<style scoped>

</style>
