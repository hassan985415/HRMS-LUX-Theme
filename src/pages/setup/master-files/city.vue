<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <!--        <MaterialCard-->
        <!--          color="success"-->
        <!--          title="City"-->
        <!--          class="px-5 py-3"-->
        <!--        >-->
        <v-data-table
          v-if="!dialog && !view"
          class="row-pointer"
          :headers="headers"
          :items="cityData"
          sort-by="en_name"
          @click:row.self="viewItem"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <!--                <v-toolbar-title>Country CRUD</v-toolbar-title>-->
              <!--                <v-divider-->
              <!--                  class="mx-4"-->
              <!--                  inset-->
              <!--                  vertical-->
              <!--                ></v-divider>-->
              <v-toolbar-title><h3>{{ $t("city.title") }}</h3></v-toolbar-title>
              <v-spacer></v-spacer>
              <template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  rounded
                  @click="dialog = true"
                >
                  {{ $t("city.create") }}
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
            <span v-if="view" class="headline">View City </span>
            <span v-else class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form">
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="editedItem.country_id"
                      :disabled="view"
                      :filled="view"
                      :items="countryData"
                      :label="$t('city.country')"
                      required
                      :rules="[
                        value => !!value || 'This  field is required'
                      ]"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.region"
                      :disabled="view"
                      :filled="view"
                      :label="$t('city.region')"
                      required
                      :rules="[
                        value => !!value || 'This  field is required'
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.en_name"
                      :disabled="view"
                      :filled="view"
                      :label="$t('city.nameEnglish')"
                      required
                      :rules="[
                        value => !!value || 'This  field is required'
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.ar_name"
                      :disabled="view"
                      :filled="view"
                      class="direction"
                      :label="$t('city.nameArabic')"
                      required
                      :rules="[
                        value => !!value || 'This  field is required'
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.ticket_value"
                      :disabled="view"
                      :filled="view"
                      :label="$t('city.ticketValue')"
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
            <v-card-title
              class="headline"
            >{{ $t("common.deleteRecord") }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialogDelete = false"
              >{{ $t("common.cancel") }}</v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="deleteItemConfirm"
              >{{ $t("common.ok") }}</v-btn>
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
        <!--              <v-col cols="12" sm="6" md="6"><h3> Region </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.region}} </span> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><h3> Ticket Value </h3> </v-col>-->
        <!--              <v-col cols="12" sm="6" md="6"><span>{{ editedItem.ticket_value}} </span> </v-col>-->
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
import Vue from 'vue'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'City',
  middleware: ['auth'],
  components: { MaterialCard },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      view: false,
      headers: [
        {
          text: this.$i18n.t("common.id"),
          align: 'start',
          value: 'id'
        },
        { text: this.$i18n.t("city.nameEnglish"), value: 'en_name' },
        { text: this.$i18n.t("city.nameArabic"), value: 'ar_name' },
        // { text: 'Region', value: 'region' },
        { text: this.$i18n.t("city.ticketValue"), value: 'ticket_value' },
        { text: this.$i18n.t("city.country"), value: 'country_id.en_name' },
        { text: this.$i18n.t("common.action"), value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        en_name: '',
        ar_name: '',
        region: '',
        ticket_value: '',
        country_id: ''
      },
      cityData: [],
      cityId: []
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
  created() {
    this.cityList()
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? this.$t('city.new') : this.$t('city.edit')
    },
    ...mapState('app', ['countries']),
    countryData() {
      const { countries } = this
      const arr = []

      countries.forEach((data) => {
        arr.push({
          value: data.id,
          text: data.en_name
        })
      })

      return arr
    }
  },
  methods: {
    ...mapActions('app', ['list', 'update', 'create', 'delete']),
    ...mapMutations('app', ['SHOW_LOADER', 'SHOW_SNACKBAR']),
    cityList() {
      const data = {
        path: '/cities'
      }

      this.list(data).then((response) => {
        this.cityData = response.data.data
        this.SHOW_LOADER(false)
        this.SHOW_SNACKBAR({
          snackbar: true,
          color: 'green',
          message: response.data.message
        })
      })
    },
    editItem(item) {
      this.editedIndex = 2
      // console.log('index',item.country_id.id)
      this.editedItem = Vue.util.extend({}, item)
      this.editedItem.country_id = item.country_id.id
      // this.editedItem.country_id=item.country_id.id
      // console.log('item',this.editedItem)

      this.dialog = true
    },
    viewItem(item) {
      this.editedIndex = 2
      // console.log('index',item.country_id.id)
      this.editedItem = Vue.util.extend({}, item)
      this.editedItem.country_id = item.country_id.id
      // this.editedItem.country_id=item.country_id.id
      // console.log('item',this.editedItem)

      this.view = true
      this.dialog = true
    },
    async save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          const data = {
            path: '/city/' + this.editedItem.id,
            data: this.editedItem
          }

          this.SHOW_LOADER(true)
          await this.update(data)
            .then((response) => {
              this.dialog = false
              this.SHOW_LOADER(false)
              this.SHOW_SNACKBAR({
                snackbar: true,
                color: 'green',
                message: response.data.message
              })
              this.cityList()
            })
            .catch((error) => {
              this.SHOW_LOADER(false)
              this.SHOW_SNACKBAR({
                snackbar: true,
                color: 'error',
                message: error.response.data.message
              })
            })
        } else {
          const data = {
            path: '/cities',
            data: this.editedItem
          }

          this.SHOW_LOADER(true)
          await this.create(data)
            .then((response) => {
              this.dialog = false
              this.SHOW_LOADER(false)
              this.SHOW_SNACKBAR({
                snackbar: true,
                color: 'green',
                message: response.data.message
              })
              this.cityList()
            })
            .catch((error) => {
              this.SHOW_LOADER(false)
              this.SHOW_SNACKBAR({
                snackbar: true,
                color: 'error',
                message: error.response.data.message
              })
            })
        }
      }
    },
    deleteItem(id) {
      this.cityId[0] = id
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      this.dialogDelete = false
      this.SHOW_LOADER(true)
      const data = {
        ids: this.cityId,
        path: '/delete_cities'
      }

      await this.delete(data)
        .then((response) => {
          this.SHOW_LOADER(false)
          this.SHOW_SNACKBAR({
            snackbar: true,
            color: 'green',
            message: response.data.message
          })
          this.cityList()
        })
        .catch((error) => {
          this.SHOW_LOADER(false)
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
      this.editedItem.region = ''
      this.editedItem.ticket_value = ''
      this.editedItem.country_id = ''
      this.editedIndex = -1
    }
  }
}
</script>

<style scoped>
.heading {
  font-size: 30px !important;
  color: white !important;
}
.direction {
  direction: rtl;
}
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
