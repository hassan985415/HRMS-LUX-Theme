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
<!--          title="Letter Fields"-->
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
                <v-toolbar-title><h3>Letter Fields</h3></v-toolbar-title>
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
                      v-on="on"

                      rounded
                    >
                      Create Letter Fields
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
                                <v-select
                                  v-model="editedItem.company_id"
                                  :items="companies"
                                  :item-text="companies.text"
                                  :item-value="companies.value"
                                  label="Select Company"
                                ></v-select>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-text-field
                                  label="Order By"
                                  type="number"
                                  v-model="editedItem.order_by"
                                  :rules="[ (value) => !!value || 'This  field is required']"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-checkbox
                                  v-model="editedItem.both_language"
                                  :false-value="0"
                                  :true-value="1"
                                  label="Both Language"
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
                                  label="Language"
                                  v-model="editedItem.language"
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
                        @click="dialog = false"
                        rounded
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                        rounded
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
import MaterialCard from "../../../components/base/MaterialCard";
import Vue from "vue";
import {mapActions, mapMutations} from "vuex";
export default {
  name: "letter-fields",
  components: {MaterialCard },
  middleware: ['auth'],
  data(){
    return{
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Serial id', value: 'serial_id' },
        { text: 'Doc type', value: 'doc_type' },
        { text: 'Request', value: 'request' },
        { text: 'En name', value: 'en_name' },
        { text: 'Ar name', value: 'ar_name' },
        { text: 'Ar description', value: 'ar_description' },
        { text: 'En description', value: 'en_description' },
        { text: 'Language', value: 'language' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        order_by: '',
        format: '',
        letter_id: '',
        column_id: '',
        language: '',
        both_language: '0',
      },
      countryId:[],
      allData: [],
      companies: [],
      branches: [],
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
      return this.editedIndex === -1 ? 'New Letter Fields' : 'Edit Letter Fields'
    }
  },
  created () {
    this.getColumn()
    this.getList()
  },
  methods: {
    ...mapActions('app', ['list', 'update', 'create', 'delete']),
    ...mapMutations('app', ['SHOW_LOADER','SHOW_SNACKBAR']),
    getColumn () {
      let arr = []
      let data = { path: "/column_selects/1" }
      this.list(data).then(response => {
        console.log(response, 'here')
        // response.data.data.forEach(data => {
        //   arr.push({
        //     text : data.en_name +' '+ data.ar_name,
        //     value: data.id
        //   })
        // })
        // this.companies = arr
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
          this.dialog = false
          this.SHOW_LOADER ( true);
          await this.update(data).then(response => {
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
          this.dialog = false
          this.SHOW_LOADER ( true);
          await this.create(data).then(response => {
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
    deleteItem (id) {
      this.countryId[0]=id
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      this.dialogDelete = false
      this.SHOW_LOADER ( true);
      let data = {
        'ids': this.countryId,
        'path' : '/delete_letters'
      }
      await this.delete(data).then(response => {
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
    },
    reset() {
      this.editedItem.order_by = ''
      this.editedItem.format = ''
      this.editedItem.letter_id = ''
      this.editedItem.column_id = ''
      this.editedItem.language = ''
      this.editedItem.both_language = '0'
      this.countryId = []
      this.editedIndex = -1
    }
  },
}
</script>

<style scoped>

</style>
