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
<!--          title="Evaluation"-->
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
                <v-toolbar-title><h3>{{ $t("evaluationCompetencies.title") }}</h3></v-toolbar-title>
                <v-spacer></v-spacer>
                  <template >
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      rounded
                      @click="dialog = true"
                    >
                      {{ $t("evaluationCompetencies.create") }}
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
            <span v-if="view" class="headline">View Evaluation </span>
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
                        :label="$t('evaluationCompetencies.nameArabic')"
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
                        :label="$t('evaluationCompetencies.nameEnglish')"
                        v-model="editedItem.en_name"
                        :disabled="view"
                        :filled="view"
                        :rules="[ (value) => !!value || 'This  field is required',
                                (value) => (value && value.length <= 50) || 'maximum 50 characters',]"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-checkbox
                        v-model="editedItem.group"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Group"
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
                        v-model="editedItem.eval_cycle"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Eval Cycle"
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
                        v-model="editedItem.max_mark"
                        :disabled="view"
                        :filled="view"
                        :false-value="0"
                        :true-value="1"
                        label="Max Mark"
                        color="success"
                        hide-details
                      ></v-checkbox>
                    </v-col> -->
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
<!--              <v-col cols="12" sm="6" md="6"><h3> Group </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.group}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Eval Cycle </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.eval_cycle}} </span> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><h3> Max Mark </h3> </v-col>-->
<!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.max_mark}} </span> </v-col>-->
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
  name: "EvaluationCompetencies",
  components: {MaterialCard },
  middleware: ['auth'],
  data(){
    return{
      dialog: false,
      dialogDelete: false,
      view: false,
      headers: [
        {
          text: this.$i18n.t("common.id"),
          align: 'start',
          value: 'id',
        },
        { text: this.$i18n.t("evaluationCompetencies.nameEnglish"), value: 'en_name' },
        { text: this.$i18n.t("evaluationCompetencies.nameArabic"), value: 'ar_name' },
        { text: this.$i18n.t("evaluationCompetencies.group"), value: 'group' },
        // { text: 'Eval Cycle', value: 'eval_cycle' },
        // { text: 'Max Mark', value: 'max_mark' },
        { text: this.$i18n.t("common.action"), value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        en_name: '',
        ar_name: '',
        group: '0',
        eval_cycle: '0',
        max_mark: '0'
      },
      countryId:[],
      allData: []
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? this.$t('evaluationCompetencies.new') : this.$t('evaluationCompetencies.edit')
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
      let data = { path: "/evaluations" }
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
            path:"/evaluation/"+this.editedItem.id,
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
            path:"/evaluations",
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
        'path' : '/delete_evaluations'
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
      this.editedItem.group = '0'
      this.editedItem.eval_cycle = '0'
      this.editedItem.max_mark = '0'
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
