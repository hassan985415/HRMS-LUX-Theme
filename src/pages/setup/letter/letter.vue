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
<!--          title="Letter"-->
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
                <v-toolbar-title><h3>{{ $t("letter.title") }}</h3></v-toolbar-title>
                <v-spacer></v-spacer>
                  <template>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      rounded
                      @click="dialog = true"
                    >
                      {{ $t("letter.create") }}
                    </v-btn>
                  </template>
              </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="attachFields(item.id)"
              >
                mdi-attachment
              </v-icon>
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item.id)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        <v-card v-if="dialog">
          <v-card-title>
            <span v-if="view" class="headline">View Letter </span>
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
                        :label="$t('letter.selectCompany')"
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
                        :label="$t('letter.selectBranch')"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                         :label="$t('letter.serialId')"
                        type="number"
                        v-model="editedItem.serial_id"
                        :disabled="view"
                        :filled="view"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                         :label="$t('letter.docType')"
                        type="number"
                        v-model="editedItem.doc_type"
                        :disabled="view"
                        :filled="view"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-checkbox
                        v-model="editedItem.request"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                         :label="$t('letter.request')"
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
                         :label="$t('letter.nameInArabic')"
                        class="direction"
                        v-model="editedItem.ar_name"
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
                      <v-text-field
                         :label="$t('letter.nameInEnglish')"
                        v-model="editedItem.en_name"
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
                      <v-text-field
                         :label="$t('letter.descriptionInArabic')"
                        class="direction"
                        v-model="editedItem.ar_description"
                        :disabled="view"
                        :filled="view"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        :label="$t('letter.descriptionInEnglish')"
                        v-model="editedItem.en_description"
                        :disabled="view"
                        :filled="view"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                       :label="$t('letter.language')"
                        v-model="editedItem.language"
                        :disabled="view"
                        :filled="view"
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

        <!--                Letter fields model-->
        <v-dialog v-model="dialogAttach" max-width="unset" persistent>
          <v-card>
            <v-card-title class="headline">Attach Letter Fields</v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form">
                  <v-container class="py-0">
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="2"
                      >
                        <v-select
                          v-model="attachData.column_id"
                          :items="column"
                          :item-text="column.text"
                          :item-value="column.value"
                          label="Select Column"
                        ></v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="2"
                      >
                        <v-text-field
                          label="Order by"
                          type="number"
                          v-model="attachData.order_by"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="2"
                      >
                        <v-text-field
                          label="An sequence"
                          type="number"
                          v-model="attachData.ar_sequence"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="2"
                      >
                        <v-text-field
                          label="Format"
                          v-model="attachData.format"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="2"
                      >
                        <v-checkbox
                          v-model="attachData.both_language"
                          :false-value="0"
                          :true-value="1"
                          label="Both language"
                          color="success"
                          hide-details
                        ></v-checkbox>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="2"
                      >
                        <v-text-field
                          label="En sequence"
                          type="number"
                          v-model="attachData.en_sequence"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="1"
                        offset-md="5"
                      >
                        <v-btn color="blue darken-1" text @click="attachWithLetter">Attach</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-container>
              <v-data-table
                :headers="attachHeaders"
                :items="letterFieldsData"
                sort-by="en_name"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon
                    small
                    @click="deleteItem(item.id)"
                  >
                    mdi-delete
                  </v-icon>
                </template>

              </v-data-table>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogAttach=false">Cancel</v-btn>
              <!--                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>-->
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
<!--              <v-col cols="12" sm="6" md="6"><h3> Serial id </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.serial_id }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Doc type </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.doc_type }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Request </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.request }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> En name </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.en_name }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Ar name </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.ar_name }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> En Description </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.en_description }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Ar Description </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.ar_description }} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Language </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.language }} </span> </v-col>-->
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
import MaterialCard from "../../../components/base/MaterialCard";
import Vue from "vue";
import {mapActions, mapMutations} from "vuex";

export default {
  name: "Letter.vue",
  components: {MaterialCard },
  middleware: ['auth'],
  data(){
    return{
      dialog: false,
      view: false,
      dialogDelete: false,
      dialogAttach: false,
      headers: [
        {
          text: this.$i18n.t("common.id"),
          align: 'start',
          value: 'id',
        },
        { text: this.$i18n.t("letter.serialId"), value: 'serial_id' },
        { text: this.$i18n.t("letter.docType"), value: 'doc_type' },
        { text: this.$i18n.t("letter.request"), value: 'request' },
        { text: this.$i18n.t("letter.nameInEnglish"), value: 'en_name' },
        { text: this.$i18n.t("letter.nameInArabic"), value: 'ar_name' },
        { text: this.$i18n.t("letter.descriptionInArabic"), value: 'ar_description' },
        { text: this.$i18n.t("letter.descriptionInEnglish"), value: 'en_description' },
        { text: this.$i18n.t("letter.language"), value: 'language' },
        { text: this.$i18n.t("common.action"), value: 'actions', sortable: false },
      ],
      attachHeaders: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Order by', value: 'order_by' },
        { text: 'Ar sequence', value: 'ar_sequence' },
        { text: 'En sequence', value: 'en_sequence' },
        { text: 'Both language', value: 'both_language' },
        { text: 'Format', value: 'format' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        company_id: '',
        branch_id: '',
        serial_id: '',
        doc_type: '',
        en_name: '',
        ar_name: '',
        en_description: '',
        ar_description: '',
        language: '',
        request: '0',
      },
      attachData :{
        column_id : '',
        letter_id: '',
        order_by: '',
        ar_sequence: '',
        en_sequence: '',
        both_language: '0',
        format: '',
        language: ''
      },
      countryId:[],
      allData: [],
      companies: [],
      branches: [],
      column: [],
      letterFieldsData: [],
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
      return this.editedIndex === -1 ? this.$t('letter.new') : this.$t('letter.edit')
    }
  },
  created () {
    this.getColumn()
    this.getCompanies()
    this.getBranches()
    this.getList()
  },
  methods: {
    ...mapActions('app', ['list', 'update', 'create', 'delete']),
    ...mapMutations('app', ['SHOW_LOADER','SHOW_SNACKBAR']),
    getColumn () {
      let arr = []
      let data = { path: "/column_selects?group_by=1" }
      this.list(data).then(response => {
        if(Array.isArray(response.data.data)) {
          response.data.data.forEach(data => {
            arr.push({
              text : data.en_description,
              value: data.id
            })
          })
        } else {
          arr.push({
            text : response.data.data.en_description,
            value: response.data.data.id
          })
        }
        this.column = arr
      })
    },
    getCompanies () {
      let arr = []
      let data = { path: "/companies" }
      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text : data.en_name,
            value: data.id
          })
        })
        this.companies = arr
      })
    },
    getBranches () {
      let arr = []
      let data = { path: "/company_branches" }
      this.list(data).then(response => {
        response.data.data.forEach(data => {
          arr.push({
            text : data.en_name,
            value: data.id
          })
        })
        this.branches = arr
      })
    },
    getLetterFields () {
      let data = { path: "/letter_fields" }
      this.list(data).then(response => {
        this.letterFieldsData = response.data.data
        this.SHOW_LOADER ( false);
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: "green",
          message: response.data.message
        })
      })
    },
    getList(){
      let data = { path: "/letters" }
      this.list(data).then(response => {
        this.allData = response.data.data
        this.SHOW_LOADER ( false);
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: "green",
          message: response.data.message
        });
      });
    },
    async save () {
      if(this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          let data={
            path:"/letter/"+this.editedItem.id,
            data:this.editedItem
          }
          this.SHOW_LOADER ( true);
          await this.update(data).then(response => {
            this.dialog = false
            this.SHOW_LOADER ( false);
            this.SHOW_SNACKBAR( {
              snackbar: true,
              color: "green",
              message: response.data.message
            });
            this.getList()
          }).catch(error => {
            this.SHOW_LOADER ( false);
            this.SHOW_SNACKBAR( {
              snackbar: true,
              color: "error",
              message: error.response.data.message
            });
          })
        }
        else {
          let data={
            path:"/letters",
            data:this.editedItem
          }
          this.SHOW_LOADER ( true);
          await this.create(data).then(response => {
            this.dialog = false
            this.SHOW_LOADER ( false);
            this.SHOW_SNACKBAR( {
              snackbar: true,
              color: "green",
              message: response.data.message
            });
            this.getList()
          }).catch(error => {
            this.SHOW_LOADER ( false);
            this.SHOW_SNACKBAR( {
              snackbar: true,
              color: "error",
              message: error.response.data.message
            });
          })
        }
      }

    },
    editItem (item) {
      this.editedIndex = 2
      // this.editedIndex =this.desserts.indexOf(item)
      // console.log('index',this.desserts.indexOf(item))
      this.editedItem = Vue.util.extend({}, item);
      this.editedItem.company_id = item.company_id.id
      this.editedItem.branch_id = item.branch_id.id
      this.dialog = true
    },
    viewItem (item) {
      this.editedIndex = 2
      // this.editedIndex =this.desserts.indexOf(item)
      // console.log('index',this.desserts.indexOf(item))
      this.editedItem = Vue.util.extend({}, item);
      this.editedItem.company_id = item.company_id.id
      this.editedItem.branch_id = item.branch_id.id
      this.view = true
      this.dialog = true
    },
    deleteItem (id) {
      this.countryId[0]=id
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      this.dialogDelete = false
      let path = this.dialogAttach === true ? '/delete_letter_fields' : '/delete_letters'
      this.SHOW_LOADER ( true);
      let data = {
        'ids': this.countryId,
        'path' : path
      }
      await this.delete(data).then(response => {
        this.SHOW_LOADER ( false);
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: "green",
          message: response.data.message
        });
        this.getList()
        this.getLetterFields()
      }).catch(error => {
        this.SHOW_LOADER ( false);
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: "error",
          message: error.response.data.message
        });
      })
    },
    reset() {
      this.editedItem.company_id = ''
      this.editedItem.branch_id = ''
      this.editedItem.serial_id = ''
      this.editedItem.doc_type = ''
      this.editedItem.en_name = ''
      this.editedItem.ar_name = ''
      this.editedItem.en_description = ''
      this.editedItem.ar_description = ''
      this.editedItem.language = ''
      this.editedItem.request = '0'
      this.countryId = []
      this.editedIndex = -1
    },
    attachFields(id){
      this.getLetterFields()
      this.dialogAttach = true
      this.attachData.letter_id = id
    },
    attachWithLetter () {
      let data = {
        path:"/letter_fields",
        data:this.attachData
      }
      this.SHOW_LOADER ( true);
        this.create(data).then(response => {
        this.resetAttachData()
        this.SHOW_LOADER ( false);
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: "green",
          message: response.data.message
        });
        this.getLetterFields()
      }).catch(error => {
        this.SHOW_LOADER ( false);
        this.SHOW_SNACKBAR( {
          snackbar: true,
          color: "error",
          message: error.response.data.message
        });
      })
    },
    resetAttachData () {
      this.attachData.column_id  = ''
      this.attachData.letter_id = ''
      this.attachData.order_by = ''
      this.attachData.ar_sequence = ''
      this.attachData.en_sequence = ''
      this.attachData.both_language = '0'
      this.attachData.format = ''
      this.attachData.language = ''
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
