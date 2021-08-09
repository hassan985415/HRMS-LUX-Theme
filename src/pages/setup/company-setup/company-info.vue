<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
<!--        <MaterialCard color="success" title="Company Info" class="px-5 py-3">-->
          <v-data-table :headers="headers" :items="allData" sort-by="en_name">
            <template v-slot:item.logo="{ item }">
              <img
                v-if="item.logo"
                :src="fileUrl + item.logo"
                alt=""
                style="display: flex;border-radius: 50%;"
                width="50"
                height="50"
              />
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title><h3>Company Info</h3></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog"
                          max-width="500px"
                          fullscreen
                          hide-overlay
                          transition="dialog-bottom-transition"
                          scrollable
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
                      Create Company Info
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar
                      flat
                      dark
                      color="primary"
                    >
                      <v-btn
                        icon
                        dark
                        @click="dialog = false"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>{{formTitle}}</v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
<!--                    <v-card-title>-->
<!--                      <span class="headline">{{ formTitle }}</span>-->
<!--                    </v-card-title>-->
                    <v-card-text>
                      <v-container>
                        <v-form ref="form">
                          <v-container class="py-0">
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="editedItem.en_name"
                                  label="Name in English"
                                  :rules="[
                                    value =>
                                      !!value || 'This  field is required',
                                    value =>
                                      (value && value.length <= 50) ||
                                      'maximum 50 characters'
                                  ]"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="editedItem.ar_name"
                                  label="Name in Arabic"
                                  class="direction"
                                  :rules="[
                                    value =>
                                      !!value || 'This  field is required',
                                    value =>
                                      (value && value.length <= 50) ||
                                      'maximum 50 characters'
                                  ]"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="editedItem.en_register_name"
                                  label="Register Name in English"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="editedItem.er_register_name"
                                  label="Register Name in Arabic"
                                  class="direction"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="editedItem.en_type_of_business"
                                  label="En type of business"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="editedItem.ar_type_of_business"
                                  label="Ar type of business"
                                  class="direction"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="editedItem.incorporation_date"
                                  label="Incorporation Date"
                                  type="date"
                                  :rules="[
                                    value =>
                                      !!value || 'This  field is required'
                                  ]"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  id="file"
                                  label="Logo"
                                  type="file"
                                ></v-text-field>
                              </v-col>
                              <!--                              <v-col-->
                              <!--                                cols="12"-->
                              <!--                                sm="6"-->
                              <!--                                md="6"-->
                              <!--                              >-->
                              <!--                                <v-text-field-->
                              <!--                                  label="no_br"-->
                              <!--                                  v-model="editedItem.no_br"-->
                              <!--                                  :rules="[ (value) => !!value || 'This  field is required',-->
                              <!--                                (value) => (value && value.length <= 10) || 'maximum 6 characters',]"-->
                              <!--                                ></v-text-field>-->
                              <!--                              </v-col>-->
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
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="390px" persistent>
                  <v-card>
                    <v-card-title
                      class="headline"
                    >Are you sure you want to delete this
                      record?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogDelete = false"
                      >Cancel</v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                      >OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }" >
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
import { mapState, mapActions, mapMutations } from 'vuex'
import MaterialCard from '../../../components/base/MaterialCard.vue'
import Vue from 'vue'
import { baseURL } from '~/configs/urls'
export default {
  name: 'CompanyInfo',
  //middleware: ['auth'],
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
        { text: 'Logo', value: 'logo' },
        { text: 'En Name', value: 'en_name' },
        { text: 'Ar Name', value: 'ar_name' },
        { text: 'En Register Name', value: 'en_register_name' },
        { text: 'Ar Register Name', value: 'er_register_name' },
        { text: 'Incorporation Date', value: 'incorporation_date' },
        { text: 'En Type of Business', value: 'en_type_of_business' },
        { text: 'Ar Type of Business', value: 'ar_type_of_business' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        en_name: '',
        ar_name: '',
        en_register_name: '',
        er_register_name: '',
        incorporation_date: '',
        en_type_of_business: '',
        ar_type_of_business: '',
        incorporation_date_hijri: '',
        no_br: ''
      },
      countryId: [],
      allData: [],
      fileUrl: baseURL.FILE_URL
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Company Info' : 'Edit Company Info'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions('app', ['list', 'update', 'create', 'delete']),
    ...mapMutations('app', ['SHOW_LOADER','SHOW_SNACKBAR']),

    getList() {
      const data = { path: '/companies' }

      this.list(data).then((response) => {
        this.allData = response.data.data
        this.SHOW_LOADER( false)
        this.SHOW_SNACKBAR({
          snackbar: true,
          color: 'green',
          message: response.data.message
        })
      })
    },
    async save () {
      if (this.$refs.form.validate()) {
        const formData = new FormData()

        formData.append('en_name', this.editedItem.en_name)
        formData.append('ar_name', this.editedItem.ar_name)
        formData.append('en_register_name', this.editedItem.en_register_name)
        formData.append('er_register_name', this.editedItem.er_register_name)
        formData.append('incorporation_date', this.editedItem.incorporation_date)
        formData.append('en_type_of_business', this.editedItem.en_type_of_business)
        formData.append('ar_type_of_business', this.editedItem.ar_type_of_business)
        formData.append('incorporation_date_hijri', this.editedItem.incorporation_date_hijri)
        formData.append('no_br', this.editedItem.no_br)
        if (this.editedIndex > -1) {
          const imagefile = document.querySelector('#file')

          if (imagefile.files[0]) {
            formData.append('logo', imagefile.files[0])
          } else {
            formData.append('logo', null)
          }
          const data = {
            path:'/company/' + this.editedItem.id,
            data: formData
          }

          this.SHOW_LOADER( true)
          await this.update(data).then((response) => {
            this.dialog = false
            this.SHOW_LOADER( false)
            this.SHOW_SNACKBAR({
              snackbar: true,
              color: 'green',
              message: response.data.message
            })
            this.getList()
          }).catch((error) => {
            this.SHOW_LOADER( false)
            this.SHOW_SNACKBAR({
              snackbar: true,
              color: 'error',
              message: error.response.data.message
            })
          })
        }
        else {
          const imagefile = document.querySelector('#file')

          formData.append('logo', imagefile.files[0])
          const data = {
            path:'/companies',
            data: formData
          }

          this.SHOW_LOADER( true)
          await this.create( data).then((response) => {
            this.dialog = false
            this.SHOW_LOADER( false)
            this.SHOW_SNACKBAR({
              snackbar: true,
              color: 'green',
              message: response.data.message
            })
            this.getList()
          }).catch((error) => {
            this.SHOW_LOADER( false)
            this.SHOW_SNACKBAR({
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
      this.SHOW_LOADER( true)
      const data = {
        'ids': this.countryId,
        'path' : '/delete_companies'
      }

      await this.delete(data).then((response) => {
        this.SHOW_LOADER( false)
        this.SHOW_SNACKBAR({
          snackbar: true,
          color: 'green',
          message: response.data.message
        })
        this.getList()
      }).catch((error) => {
        this.SHOW_LOADER( false)
        this.SHOW_SNACKBAR({
          snackbar: true,
          color: 'error',
          message: error.response.data.message
        })
      })
    },
    reset() {
      this.editedItem.en_name = ''
      this.editedItem.ar_name = ''
      this.editedItem.en_register_name = ''
      this.editedItem.er_register_name = ''
      this.editedItem.incorporation_date = ''
      this.editedItem.en_type_of_business = ''
      this.editedItem.ar_type_of_business = ''
      this.editedItem.no_br = ''
      if (document.getElementById('file'))
        document.getElementById('file').value = null
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
