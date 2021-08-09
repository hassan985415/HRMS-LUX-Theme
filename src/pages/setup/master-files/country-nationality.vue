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
<!--          title="Country Nationality"-->
<!--          class="px-5 py-3"-->
<!--        >-->
          <v-data-table
            :headers="headers"
            :items="countries"
            sort-by="en_name"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <!--                <v-toolbar-title>Country CRUD</v-toolbar-title>-->
                <!--                <v-divider-->
                <!--                  class="mx-4"-->
                <!--                  inset-->
                <!--                  vertical-->
                <!--                ></v-divider>-->
                <v-toolbar-title><h3>Country Nationality</h3></v-toolbar-title>
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
                      Create Country
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-form ref="form">
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                            >
                              <v-text-field
                                v-model="editedItem.en_name"
                                label="Country Name(EN)"
                                required
                                :rules="[ (value) => !!value || 'This  field is required']"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                            >
                              <v-text-field
                                v-model="editedItem.ar_name"
                                label="Country Name(AR)"
                                required
                                :rules="[ (value) => !!value || 'This  field is required']"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                            >
                              <v-text-field
                                v-model="editedItem.en_nationality"
                                label="Country Nationality(EN)"
                                required
                                :rules="[ (value) => !!value || 'This  field is required']"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                            >
                              <v-text-field
                                v-model="editedItem.ar_nationality"
                                label="Country Nationality(AR)"
                                required
                                :rules="[ (value) => !!value || 'This  field is required']"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                            >
                              <v-text-field
                                v-model="editedItem.code"
                                label="Code"
                                required
                                :rules="[ (value) => !!value || 'This  field is required',
                                          (value) => (value && value.length <= 3) || 'maximum 3 characters',]"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                            >
                              <v-text-field
                                v-model="editedItem.phonecode"
                                label="Phone Code"
                                required
                                :rules="[ (value) => !!value || 'This  field is required',
                                          (value) => (value && value.length <= 3) || 'maximum 3 characters',]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog=false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="390px" persistent>
                  <v-card>
                    <v-card-title class="headline">Are you sure you want to delete this country?</v-card-title>
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
import MaterialCard from '~/components/base/MaterialCard'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'CountryNationality',
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
          // sortable: false,
          value: 'id'
        },
        { text: 'En Name', value: 'en_name' },
        { text: 'En Nationality', value: 'en_nationality' },
        { text: 'Ar Name', value: 'ar_name' },
        { text: 'Ar Nationality', value: 'ar_nationality' },
        { text: 'Code', value: 'code' },
        { text: 'Phone Code', value: 'phonecode' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        en_name: '',
        en_nationality: '',
        ar_name: '',
        ar_nationality: '',
        code: '',
        phonecode: ''

      },
      defaultItem: {
        en_name: '',
        en_nationality: '',
        ar_name: '',
        ar_nationality: '',
        code: '',
        phonecode: ''
      },
      countryId:[]
    }
  },
  computed: {
    ...mapState('app', ['countries']),
    formTitle () {
      return this.editedIndex === -1 ? 'New Country' : 'Edit Country'
    }
  },
  created () {
    this.countryList()
  },
  methods: {
    ...mapActions('app', ['list', 'update', 'create', 'delete']),
    ...mapMutations('app', ['SHOW_LOADER','SHOW_SNACKBAR', 'COUNTRIES_LIST']),
    countryList() {
      const data = {
        path:'/all_countries'
      }

      this.list(data)
        .then((response) => {
          this.COUNTRIES_LIST (response.data.data)
          this.SHOW_LOADER ( false)
          this.SHOW_SNACKBAR( {
            snackbar: true,
            color: 'green',
            message: response.data.message
          })
        }).catch((error) => {
          this.SHOW_LOADER ( false)
          this.SHOW_SNACKBAR ({  snackbar:true,color:'red',message:error.response.data.message })
        })
    },
    async save () {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          const data = {
            path:'/country/' + this.editedItem.id,
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
            this.countryList()
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
            path:'/countries',
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
            this.countryList()
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
      this.editedItem = item
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
        'path' : '/delete_countries'
      }

      await this.delete(data).then((response) => {
        this.SHOW_LOADER ( false)
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: 'green',
          message: response.data.message
        })
        this.countryList()
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
      this.editedItem.en_name = ''
      this.editedItem.en_nationality = ''
      this.editedItem.ar_name = ''
      this.editedItem.ar_nationality = ''
      this.editedItem.code = ''
      this.editedItem.phonecode = ''
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
