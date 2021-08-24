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
            v-if="!dialog && !view"
          class="row-pointer"
            @click:row.self="viewItem"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title><h3>{{ $t("beneficiary.title") }}</h3></v-toolbar-title>
                <v-spacer></v-spacer>
                  <template>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      rounded
                      @click="dialog = true"
                    >
                      {{ $t("beneficiary.create") }}
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
            <span v-if="view" class="headline">View Beneficiary Type </span>
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
                      <v-text-field
                        v-model="editedItem.ar_name"
                        :label="$t('beneficiary.nameArabic')"
                        :disabled="view"
                        :filled="view"
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
                       :label="$t('beneficiary.nameEnglish')"
                        :disabled="view"
                        :filled="view"
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
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        :label="$t('beneficiary.parentBenefit')"
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
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        :label="$t('beneficiary.finalSetFlag')"
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
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        :label="$t('beneficiary.moneyValueFlag')"
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
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        :label="$t('beneficiary.holidayFlag')"
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
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        :label="$t('beneficiary.printable')"
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
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        :label="$t('beneficiary.modifyFlag')"
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
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        :label="$t('beneficiary.isActive')"
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
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        :label="$t('beneficiary.creditGlid')"
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
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        :label="$t('beneficiary.showInReport')"
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
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        :label="$t('beneficiary.mulfactor')"
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
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        :label="$t('beneficiary.percentForSalary')"
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
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        :label="$t('beneficiary.mb')"
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
<!--              <v-col cols="12" sm="6" md="6"><h3> Parent Benefit </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.parentbenefit}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Final Set Flag </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.finalsetflag}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Money Value Flag </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.moneyvalueflag}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Holiday Flag </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.holidayflag}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Printable </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.printable}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Modify Flag </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.modifyflag}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Is Active </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.is_active}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Credit Glid </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.credit_glid}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Show in Report </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.showinreport}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Mulfactor </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.mulfactor}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Percent for Salary </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.percent_frsalary}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> mb </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.mb}} </span> </v-col>-->
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
  name: 'BeneficiaryTypes',
  components: { MaterialCard },
  middleware: ['auth'],
  data() {
    return {
      dialog: false,
      view: false,
      dialogDelete: false,
      headers: [
        {
          text: this.$i18n.t("common.id"),
          align: 'start',
          value: 'id'
        },
        { text: this.$i18n.t("beneficiary.nameEnglish"), value: 'en_name' },
        { text: this.$i18n.t("beneficiary.nameArabic"), value: 'ar_name' },
        { text: this.$i18n.t("beneficiary.parentBenefit"), value: 'parentbenefit' },
        { text: this.$i18n.t("beneficiary.finalSetFlag"), value: 'finalsetflag' },
        { text: this.$i18n.t("beneficiary.moneyValueFlag"), value: 'moneyvalueflag' },
        { text: this.$i18n.t("beneficiary.holidayFlag"), value: 'holidayflag' },
        { text: this.$i18n.t("beneficiary.printable"), value: 'printable' },
        { text: this.$i18n.t("beneficiary.modifyFlag"), value: 'modifyflag' },
        { text: this.$i18n.t("beneficiary.isActive"), value: 'is_active' },
        { text: this.$i18n.t("beneficiary.creditGlid"), value: 'credit_glid' },
        { text: this.$i18n.t("beneficiary.showInReport"), value: 'showinreport' },
        { text: this.$i18n.t("beneficiary.mulfactor"), value: 'mulfactor' },
        { text: this.$i18n.t("beneficiary.percentForSalary"), value: 'percent_frsalary' },
        { text: this.$i18n.t("beneficiary.mb"), value: 'mb' },
        { text:  this.$i18n.t("common.action"), value: 'actions', sortable: false }
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
      return this.editedIndex === -1 ? this.$t('beneficiary.new') : this.$t('beneficiary.edit')
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
    viewItem (item) {
      this.editedIndex = 2
      // this.editedIndex =this.desserts.indexOf(item)
      // console.log('index',this.desserts.indexOf(item))
      this.editedItem = Vue.util.extend({}, item)
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
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
.delete-font {
  font-size: 15px !important;
}
</style>
