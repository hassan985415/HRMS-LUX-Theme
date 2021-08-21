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
        <v-card v-if="dialog">
          <v-card-title>
            <span v-if="view" class="headline">View Branch </span>
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
                        :label="$t('branch.company')"
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
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.country')"
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
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.englishName')"
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
                        :label="$t('branch.arabicName')"
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
                        :label="$t('branch.managerEnglish')"
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
                        :label="$t('branch.managerArabic')"
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
                        :disabled="view"
                        :filled="view"
                        :items="cities"
                        :item-text="cities.text"
                        :item-value="cities.value"
                        :label="$t('branch.city')"
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
                        :disabled="view"
                        :filled="view"
                       :label="$t('branch.address1')"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.address_2"
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.address2')"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.address_3"
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.address3')"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.address_4"
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.address4')"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.postal_code"
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.postalCode')"
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
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.stateRegion')"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.phone_1"
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.telephone1')"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.phone_2"
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.telephone2')"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.phone_3"
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.telephone3')"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.fax_1"
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.faxno1')"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.fax_2"
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.faxno2')"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.fax_3"
                        :disabled="view"
                        :filled="view"
                        label="fax_3"
                      ></v-text-field>
                    </v-col> -->
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.email"
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.email')"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.website"
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.website')"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.status"
                        :disabled="view"
                        :filled="view"
                        :label="$t('branch.status')"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.remarks_1"
                        :disabled="view"
                        :filled="view"
                        label="remarks_1"
                      ></v-text-field>
                    </v-col> -->
                    <!-- <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.remarks_2"
                        :disabled="view"
                        :filled="view"
                        label="remarks_2"
                      ></v-text-field> -->
                    <!-- </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.remarks_3"
                        :disabled="view"
                        :filled="view"
                        label="remarks_3"
                      ></v-text-field>
                    </v-col> -->

                  </v-row>
                </v-container>
              </v-form>

            </v-container>
          </v-card-text>

          <v-card-actions v-if="!view">
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              rounded
              @click="dialog = false"
            >
              {{ $t("common.cancel") }}
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              rounded
              @click="save"
            >
              {{ $t("common.save") }}
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
            <v-card-title class="headline">{{ $t("common.deleteRecord") }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete=false">{{ $t("common.cancel") }}</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">{{ $t("common.ok") }}</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
               <!-- </MaterialCard> -->
        <!--        <v-card v-if="view">-->
        <!--          <v-card-title>-->
        <!--            <span class="headline"> View </span>-->
        <!--          </v-card-title>-->
        <!--          <v-card-text>-->
        <!--            <v-row>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> En Name </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.en_name}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Ar Name </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.ar_name}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> En Manager Name </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.en_manager_name}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Ar Manager Name </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.ar_manager_name}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Address 1 </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.address_1}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Address 2 </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.address_2}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Address 3 </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.address_3}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Address 4 </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.address_4}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Postal code </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.postal_code}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> state region </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.state_region}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Phone 1 </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.phone_1}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Phone 2 </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.phone_2}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Phone 3 </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.phone_3}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Fax 1 </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.fax_1}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Fax 2 </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.fax_2}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Fax 3 </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.fax_3}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Email </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.email}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Website </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.website}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Status </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.status}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Remarks 1 </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.remarks_1}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Remarks 2 </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.remarks_2}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Remarks 3 </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.remarks_3}} </span> </v-col>-->
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
      view: false,
      headers: [
        {
          text: this.$i18n.t("branch.id"),
          align: 'start',
          value: 'id'
        },
        { text: this.$i18n.t("branch.arabicName"), value: 'en_name' },
        { text: this.$i18n.t("branch.englishName"), value: 'ar_name' },
        { text: this.$i18n.t("branch.managerArabic"), value: 'en_manager_name' },
        { text: this.$i18n.t("branch.managerEnglish"), value: 'ar_manager_name' },
        { text: this.$i18n.t("branch.address1"), value: 'address_1' },
        { text: this.$i18n.t("branch.address2"), value: 'address_2' },
        { text: this.$i18n.t("branch.address3"), value: 'address_3' },
        { text: this.$i18n.t("branch.address4"), value: 'address_4' },
        { text: this.$i18n.t("branch.postalCode"), value: 'postal_code' },
        { text: this.$i18n.t("branch.stateRegion"), value: 'state_region' },
        { text: this.$i18n.t("branch.telephone1"), value: 'phone_1' },
        { text: this.$i18n.t("branch.telephone2"), value: 'phone_2' },
        { text: this.$i18n.t("branch.telephone3"), value: 'phone_3' },
        { text: this.$i18n.t("branch.faxno1"), value: 'fax_1' },
        { text: this.$i18n.t("branch.faxno2"), value: 'fax_2' },
        // { text: 'fax 3', value: 'fax_3' },
        { text: this.$i18n.t("branch.email"), value: 'email' },
        { text: this.$i18n.t("branch.website"), value: 'website' },
        { text: this.$i18n.t("branch.status"), value: 'status' },
        { text: this.$i18n.t("branch.country"), value: 'country' },
        { text: this.$i18n.t("branch.city"), value: 'city' },
        // { text: 'remarks 3', value: 'remarks_3' },
        { text: this.$i18n.t("common.action"), value: 'actions', sortable: false }
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
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? this.$t('branch.new') : this.$t('branch.edit')
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
    viewItem(item) {
      this.editedIndex = 2
      // this.editedIndex =this.desserts.indexOf(item)
      // console.log('index',this.desserts.indexOf(item))
      this.editedItem = Vue.util.extend({}, item)
      this.editedItem.company_id = item.company_id.id
      this.editedItem.country_id = item.country_id.id
      this.editedItem.city_id = item.city_id.id
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
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
