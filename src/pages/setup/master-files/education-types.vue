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
<!--          title="Education Types"-->
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
                <v-toolbar-title><h3>{{ $t("education.title") }}</h3></v-toolbar-title>
                <v-spacer></v-spacer>
                  <template>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      rounded
                      @click="dialog = true"
                    >
                      {{ $t("education.create") }}
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
            <span v-if="view" class="headline">View Education Type </span>
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
                        label="Education Types in Arabic"
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
                        label="Education Types in English"
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
                        label="Educ Remark"
                        v-model="editedItem.educ_remark"
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
                        v-model="editedItem.is_sponsored"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Is Sponsored"
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
            <v-card-title class="headline delete-font">Are you sure you want to delete this record?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete=false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
<!--              <v-col cols="12" sm="6" md="6"><h3> Educ Remark </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.educ_remark}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Is Sponsored </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.is_sponsored}} </span> </v-col>-->
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
  name: "EducationTypes",
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
        { text: 'Educ Remark', value: 'educ_remark' },
        { text: 'Is Sponsored', value: 'is_sponsored' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        en_name: '',
        ar_name: '',
        educ_remark: '',
        is_sponsored: '0',
      },
      countryId:[],
      allData: []
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Education Type' : 'Edit Education Type'
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
      let data = { path: "/educations" }
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
            path:"/education/"+this.editedItem.id,
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
            path:"/educations",
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
        'path' : '/delete_educations'
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
      this.editedItem.educ_remark = ''
      this.editedItem.is_sponsored = '0'
      this.countryId = []
      this.editedIndex = -1
    }
  },
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
