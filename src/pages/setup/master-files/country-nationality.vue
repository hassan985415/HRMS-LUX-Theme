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
          v-if="!dialog && !view"
          class="row-pointer"
          :headers="headers"
          :items="countries"
          sort-by="en_name"
          @click:row.self="viewItem"
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
              <v-toolbar-title><h3>{{ $t("countryNationality.title") }}</h3></v-toolbar-title>
              <v-spacer></v-spacer>
              <template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  rounded
                  @click="dialog = true"
                >
                  {{ $t("countryNationality.create") }}
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
            <span v-if="view" class="headline">View Country </span>
            <span v-else class="headline">{{ formTitle }}</span>
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
                      :disabled="view"
                      :filled="view"
                      :label="$t('countryNationality.nameEnglish')"
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
                      :disabled="view"
                      :filled="view"
                       :label="$t('countryNationality.nameArabic')"
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
                      :disabled="view"
                      :filled="view"
                       :label="$t('countryNationality.nationalityEnglish')"
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
                      :disabled="view"
                      :filled="view"
                      :label="$t('countryNationality.nationalityArabic')"
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
                      :disabled="view"
                      :filled="view"
                      :label="$t('countryNationality.code')"
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
                      :disabled="view"
                      :filled="view"
                       :label="$t('countryNationality.phoneCode')"
                      required
                      :rules="[ (value) => !!value || 'This  field is required',
                                (value) => (value && value.length <= 3) || 'maximum 3 characters',]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions v-if="!view">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text rounded @click="dialog = false">
             {{ $t("common.cancel") }}
            </v-btn>
            <v-btn color="blue darken-1" text rounded @click="save">
              {{ $t("common.save") }}
            </v-btn>
          </v-card-actions>
          <v-card-actions v-else>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text rounded @click="view = false; dialog = false; editedItem = {}; editedIndex = -1">
              {{ $t("common.cancel") }}
            </v-btn>
            <v-btn color="blue darken-1" text rounded @click="view = false">
              {{ $t("common.edit") }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="dialogDelete" max-width="390px" persistent>
          <v-card>
            <v-card-title class="headline delete-font">{{ $t("common.deleteRecord") }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete=false">{{ $t("common.cancel") }}</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">{{ $t("common.ok") }}</v-btn>
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
<!--              <v-col cols="12" sm="6" md="6"><h3> En Name </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.en_name}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Ar Name </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.ar_name}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> En Nationality </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.en_nationality}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Ar Nationality </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.ar_nationality}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Code </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.code}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Phone Code </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.phonecode}} </span> </v-col>-->
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
import MaterialCard from '~/components/base/MaterialCard'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'CountryNationality',
  components: { MaterialCard },
  middleware: ['auth'],
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      view: false,
      headers: [
        {
          text: this.$i18n.t("common.id"),
          align: 'start',
          // sortable: false,
          value: 'id'
        },
        { text: this.$i18n.t("countryNationality.nameEnglish"), value: 'en_name' },
        { text: this.$i18n.t("countryNationality.nationalityEnglish"), value: 'en_nationality' },
        { text: this.$i18n.t("countryNationality.nameArabic"), value: 'ar_name' },
        { text: this.$i18n.t("countryNationality.nationalityArabic"), value: 'ar_nationality' },
        { text: this.$i18n.t("countryNationality.code"), value: 'code' },
        { text: this.$i18n.t("countryNationality.phoneCode"), value: 'phonecode' },
        { text: this.$i18n.t("common.action"), value: 'actions', sortable: false }
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
      return this.editedIndex === -1 ? this.$t('countryNationality.new') : this.$t('countryNationality.edit')
    }
  },
  watch: {
    dialog: function (val) {
      if (!val) {
        // this.$refs.form.reset()
        this.editedItem = {}
        this.editedIndex = -1
      }
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
    viewItem (item) {
      this.editedIndex = 2
      // this.editedIndex =this.desserts.indexOf(item)
      // console.log('index',this.desserts.indexOf(item))
      this.editedItem = item
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
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
.delete-font {
  font-size: 15px !important;
}
</style>
