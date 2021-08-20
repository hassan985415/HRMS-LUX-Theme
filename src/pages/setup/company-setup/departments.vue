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
        <!--          title="Departments"-->
        <!--          class="px-5 py-3"-->
        <!--        >-->
        <v-data-table
          v-if="!dialog && !view"
          :headers="headers"
          :items="allData"
          sort-by="en_name"
          @click:row.self="viewItem"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title><h3>Departments</h3></v-toolbar-title>
              <v-spacer></v-spacer>
              <template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  rounded
                  @click="dialog = true"
                >
                  Create Department
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
            <span v-if="view" class="headline">View Department </span>
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
                        :rules="[ (value) => !!value || 'This  field is required']"
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
                        :disabled="view"
                        :filled="view"
                        label="Select Branch"
                        :rules="[ (value) => !!value || 'This  field is required']"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.en_name"
                        :disabled="view"
                        :filled="view"
                        label="Name in English"
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
                        v-model="editedItem.ar_name"
                        :disabled="view"
                        :filled="view"
                        label="Name in Arabic"
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
                        v-model="editedItem.en_manager_name"
                        :disabled="view"
                        :filled="view"
                        label="Manager Name in English"
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
                        v-model="editedItem.ar_manager_name"
                        :disabled="view"
                        :filled="view"
                        label="Manager Name in Arabic"
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
                        v-model="editedItem.acctgbranch"
                        :disabled="view"
                        :filled="view"
                        label="Acctgbranch"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.fabranch"
                        :disabled="view"
                        :filled="view"
                        label="Fabranch"
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
            <v-card-title class="headline">Are you sure you want to delete this record?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete=false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--        </MaterialCard>-->
        <!--        view single record-->
        <!--        <v-card v-if="view">-->
        <!--          <v-card-title>-->
        <!--            <span class="headline"> View </span>-->
        <!--          </v-card-title>-->
        <!--          <v-card-text>-->
        <!--            <v-row>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> En Name </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.en_name }} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Ar Name </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.ar_name }} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> En Manager Name </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.en_manager_name }} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Ar Manager Name </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.ar_manager_name }} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> acctgbranch </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.acctgbranch }} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> fabranch </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.fabranch }} </span> </v-col>-->
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
  name: 'Departments',
  components: { MaterialCard },
  middleware: ['auth'],
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      view: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        { text: 'En Name', value: 'en_name' },
        { text: 'Ar Name', value: 'ar_name' },
        { text: 'En Manager Name', value: 'en_manager_name' },
        { text: 'Ar Manager Name', value: 'ar_manager_name' },
        { text: 'acctgbranch', value: 'acctgbranch' },
        { text: 'fabranch', value: 'fabranch' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        company_id: '',
        branch_id: '',
        en_name: '',
        ar_name: '',
        en_manager_name: '',
        ar_manager_name: '',
        acctgbranch: '',
        fabranch: ''
      },
      countryId:[],
      allData: [],
      companies: [],
      branches: []
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Department' : 'Edit Department'
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
    this.getBranches()
    this.getList()
  },
  methods: {
    ...mapActions('app', ['list', 'update', 'create', 'delete']),
    ...mapMutations('app', ['SHOW_LOADER','SHOW_SNACKBAR']),
    getCompanies () {
      const arr = []
      const data = { path: '/companies' }

      this.list (data).then((response) => {
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
      const data = { path: '/company_departments' }

      this.list(data).then((response) => {
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
            path:'/company_department/' + this.editedItem.id,
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
            path:'/company_departments',
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
        'path' : '/delete_company_departments'
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
      this.editedItem.company_id = ''
      this.editedItem.branch_id = ''
      this.editedItem.en_manager_name = ''
      this.editedItem.ar_manager_name = ''
      this.editedItem.acctgbranch = ''
      this.editedItem.fabranch = ''
      this.countryId = []
      this.editedIndex = -1
    }
  }
}
</script>

<style scoped>

</style>
