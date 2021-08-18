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
<!--          title="Deductions"-->
<!--          class="px-5 py-3"-->
<!--        >-->
          <v-data-table
            :headers="headers"
            :items="allData"
            sort-by="en_name"
            v-if="!dialog && !view"
            @click:row.self="viewItem"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title><h3>{{ $t("deduction.title") }}</h3></v-toolbar-title>
                <v-spacer></v-spacer>
                  <template>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      rounded
                      @click="dialog = true"
                    >
                      {{ $t("deduction.create") }}
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
                        label="Competence Name in Arabic"
                        class="direction"
                        v-model="editedItem.ar_name"
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
                        label="Competence Name in English"
                        v-model="editedItem.en_name"
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
                        label="Credit Glid"
                        v-model="editedItem.credit_glid"
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
                        v-model="editedItem.is_fixed"
                        :false-value="0"
                        :true-value="1"
                        label="Is Fixed"
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
                        v-model="editedItem.parentdeduction"
                        :false-value="0"
                        :true-value="1"
                        label="parentdeduction"
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
                        v-model="editedItem.is_request"
                        :false-value="0"
                        :true-value="1"
                        label="Is Request"
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
                        v-model="editedItem.is_mb"
                        :false-value="0"
                        :true-value="1"
                        label="Is mb"
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
              @click="dialog=false"
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
        <v-card v-if="view">
          <v-card-title>
            <span class="headline"> View </span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="6"><h3> En Name </h3> </v-col>
              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.en_name}} </span> </v-col>
              <v-col cols="12" sm="6" md="6"><h3> Ar Name </h3> </v-col>
              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.ar_name}} </span> </v-col>
              <v-col cols="12" sm="6" md="6"><h3> Is Fixed </h3> </v-col>
              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.is_fixed}} </span> </v-col>
              <v-col cols="12" sm="6" md="6"><h3> Credit Glid </h3> </v-col>
              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.credit_glid}} </span> </v-col>
              <v-col cols="12" sm="6" md="6"><h3> Parent Deduction </h3> </v-col>
              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.parentdeduction}} </span> </v-col>
              <v-col cols="12" sm="6" md="6"><h3> Is Request </h3> </v-col>
              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.is_request}} </span> </v-col>
              <v-col cols="12" sm="6" md="6"><h3> Modify Flag </h3> </v-col>
              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.modifyflag}} </span> </v-col>
              <v-col cols="12" sm="6" md="6"><h3> Is mb </h3> </v-col>
              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.is_mb}} </span> </v-col>
              <v-col cols="12" sm="6" md="6"><h3> Printable </h3> </v-col>
              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.Printable}} </span> </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text rounded @click="view = false; editedItem = {}; editedIndex = -1">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text rounded @click="dialog = true; view = false">
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from "../../../components/base/MaterialCard";
import Vue from "vue";
import {mapActions, mapMutations} from "vuex";
export default {
  name: "Deductions",
  components: {MaterialCard },
  middleware: ['auth'],
  data(){
    return{
      dialog: false,
      view: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'En Name', value: 'en_name' },
        { text: 'Ar Name', value: 'ar_name' },
        { text: 'Is Fixed', value: 'is_fixed' },
        { text: 'Credit Glid', value: 'credit_glid' },
        { text: 'Parent Deduction', value: 'parentdeduction' },
        { text: 'Is Request', value: 'is_request' },
        { text: 'Modify Flag', value: 'modifyflag' },
        { text: 'Is mb', value: 'is_mb' },
        { text: 'Printable', value: 'printable' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        en_name: '',
        ar_name: '',
        credit_glid: '',
        is_fixed: '0',
        parentdeduction: '0',
        is_request: '0',
        modifyflag: '0',
        is_mb: '0',
        printable: '0',
      },
      countryId:[],
      allData: []
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Deduction' : 'Edit Deduction'
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
    getList(){
      let data = { path: "/deductions" }
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
            path:"/deduction/"+this.editedItem.id,
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
            path:"/deductions",
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
      this.dialog = true
    },
    viewItem (item) {
      this.editedIndex = 2
      // this.editedIndex =this.desserts.indexOf(item)
      // console.log('index',this.desserts.indexOf(item))
      this.editedItem = Vue.util.extend({}, item);
      this.view = true
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
        'path' : '/delete_deductions'
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
      this.editedItem.en_name = ''
      this.editedItem.ar_name = ''
      this.editedItem.credit_glid = ''
      this.editedItem.is_fixed = '0'
      this.editedItem.parentdeduction = '0'
      this.editedItem.is_request = '0'
      this.editedItem.modifyflag = '0'
      this.editedItem.is_mb = '0'
      this.editedItem.printable = '0'
      this.countryId = []
      this.editedIndex = -1
    }
  },
}
</script>

<style scoped>

</style>
