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
<!--          title="Branch"-->
<!--          class="px-5 py-3"-->
<!--        >-->
          <v-data-table
            :headers="headers"
            :items="allData"
            sort-by="en_name"
            v-if="!dialog"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title><h3>{{ $t("branch.title") }}</h3></v-toolbar-title>
                <v-spacer></v-spacer>
                  <template>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      rounded
                      @click="dialog= true"
                    >
                      {{ $t("branch.create") }}
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
                        :rules="[ (value) => !!value || 'This  field is required']"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-select
                        v-model="editedItem.country_id"
                        :items="countries"
                        :item-text="countries.text"
                        :item-value="countries.value"
                        label="Select Country"
                        @change="getCountyCites"
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
                        label="Branch Name in English"
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
                        label="Branch Name in Arabic"
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
                        label="Manager Name in Arabic"
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
                      <v-select
                        v-model="editedItem.city_id"
                        :items="cities"
                        :item-text="cities.text"
                        :item-value="cities.value"
                        label="Select City"
                        :rules="[ (value) => !!value || 'This  field is required']"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.address_1"
                        label="Address_1"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.address_2"
                        label="Address_2"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.address_3"
                        label="Address_3"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.address_4"
                        label="Address_4"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.postal_code"
                        label="postal_code"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.state_region"
                        label="state_region"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.phone_1"
                        label="phone_1"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.phone_2"
                        label="phone_2"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.phone_3"
                        label="phone_3"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.fax_1"
                        label="fax_1"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.fax_2"
                        label="fax_2"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.fax_3"
                        label="fax_3"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.email"
                        label="email"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.website"
                        label="website"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.status"
                        label="status"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.remarks_1"
                        label="remarks_1"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.remarks_2"
                        label="remarks_2"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.remarks_3"
                        label="remarks_3"
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
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import MaterialCard from '../../../components/base/MaterialCard'
import Vue from 'vue'
export default {
  name: 'Branch',
  middleware: ['auth'],
  components: { MaterialCard },
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
        { text: 'En Manager Name', value: 'en_manager_name' },
        { text: 'Ar Manager Name', value: 'ar_manager_name' },
        { text: 'Address 1', value: 'address_1' },
        { text: 'Address 2', value: 'address_2' },
        { text: 'Address 3', value: 'address_3' },
        { text: 'Address 4', value: 'address_4' },
        { text: 'postal code', value: 'postal_code' },
        { text: 'state region', value: 'state_region' },
        { text: 'phone 1', value: 'phone_1' },
        { text: 'phone 2', value: 'phone_2' },
        { text: 'phone 3', value: 'phone_3' },
        { text: 'fax 1', value: 'fax_1' },
        { text: 'fax 2', value: 'fax_2' },
        { text: 'fax 3', value: 'fax_3' },
        { text: 'email', value: 'email' },
        { text: 'website', value: 'website' },
        { text: 'status', value: 'status' },
        { text: 'remarks 1', value: 'remarks_1' },
        { text: 'remarks 2', value: 'remarks_2' },
        { text: 'remarks 3', value: 'remarks_3' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        en_name: '',
        ar_name: '',
        en_manager_name: '',
        ar_manager_name: '',
        address_1: '',
        address_2: '',
        address_3: '',
        address_4: '',
        postal_code: '',
        state_region: '',
        country_id: '',
        city_id: '',
        company_id: '',
        phone_1: '',
        phone_2: '',
        phone_3: '',
        fax_1: '',
        fax_2: '',
        fax_3: '',
        email: '',
        website: '',
        status: '',
        remarks_1: '',
        remarks_2: '',
        remarks_3: ''
      },
      countryId:[],
      allData: [],
      companies: [],
      countries: [],
      cities: []
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
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Branch' : 'Edit Branch'
    }
  },
  created () {
    this.getCompanies()
    this.getCountries()
    // this.getCities()
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
    getCountries () {
      const arr = []
      const data = { path: '/all_countries' }

      this.list(data).then((response) => {
        response.data.data.forEach((data) => {
          arr.push({
            text : data.en_name,
            value: data.id
          })
        })
        this.countries = arr
      })
    },
    getCities () {
      const arr = []
      const data = { path: '/cities' }

      this.list(data).then((response) => {
        response.data.data.forEach((data) => {
          arr.push({
            text : data.en_name,
            value: data.id
          })
        })
        this.cities = arr
      })
    },
    getCountyCites () {
      const arr = []
      const data = { path: '/cities?country_id=' + this.editedItem.country_id }

      this.list(data).then((response) => {
        response.data.data.forEach((data) => {
          arr.push({
            text : data.en_name,
            value: data.id
          })
        })
        this.SHOW_LOADER ( false)
        this.cities = arr
      })
    },

    getList() {
      const data = { path: '/company_branches' }

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
            path:'/company_branch/' + this.editedItem.id,
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
            path:'/company_branches',
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
      this.editedItem.country_id = item.country_id.id
      this.editedItem.city_id = item.city_id.id

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
        'path' : '/delete_company_branches'
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
      this.editedItem.en_manager_name = ''
      this.editedItem.ar_manager_name = ''
      this.editedItem.address_1 = ''
      this.editedItem.address_2 = ''
      this.editedItem.address_3 = ''
      this.editedItem.address_4 = ''
      this.editedItem.postal_code = ''
      this.editedItem.state_region = ''
      this.editedItem.country_id = ''
      this.editedItem.city_id = ''
      this.editedItem.company_id = ''
      this.editedItem.phone_1 = ''
      this.editedItem.phone_2 = ''
      this.editedItem.phone_3 = ''
      this.editedItem.fax_1 = ''
      this.editedItem.fax_2 = ''
      this.editedItem.fax_3 = ''
      this.editedItem.email = ''
      this.editedItem.website = ''
      this.editedItem.remarks_1 = ''
      this.editedItem.remarks_2 = ''
      this.editedItem.remarks_3 = ''
      this.editedItem.status = ''
      this.countryId = []
      this.editedIndex = -1
    }
  }
}
</script>

<style scoped>
.direction {
  direction: rtl;
}
</style>
