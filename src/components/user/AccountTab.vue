<template>
  <div class="my-2">
    <div>
      <!--      <v-card v-if="user.disabled" class="warning mb-4" light>-->
      <!--        <v-card-title>User Disabled</v-card-title>-->
      <!--        <v-card-subtitle>This user has been disabled! Login accesss has been revoked.</v-card-subtitle>-->
      <!--        <v-card-text>-->
      <!--          <v-btn dark @click="user.disabled = false">-->
      <!--            <v-icon left small>mdi-account-check</v-icon>Enable User-->
      <!--          </v-btn>-->
      <!--        </v-card-text>-->
      <!--      </v-card>-->

      <v-card>
        <v-card-title>Basic Information</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <div class="d-flex flex-column flex-sm-row">
              <div>
                <v-img
                  :src="user.avatar ? fileUrl + user.avatar : defaultImg"
                  aspect-ratio="1"
                  class="blue-grey lighten-4 rounded elevation-3"
                  max-width="90"
                  max-height="90"
                ></v-img>
                <v-text-field
                  id="file"
                  label="Profile Picture"
                  type="file"
                ></v-text-field>
              </div>
              <div class="flex-grow-1 pt-2 pa-sm-2">
                <v-text-field
                  v-model="user.name"
                  label="Display name"
                  placeholder="name"
                  :rules="[
                    value => !!value || 'This  field is required']"
                ></v-text-field>
                <v-text-field
                  v-model="user.email"
                  label="Email"
                  hide-details
                  :rules="[
                    value => !!value || 'This  field is required']"
                ></v-text-field>
                <v-text-field v-model="user.password" label="Password" hide-details></v-text-field>

                <!--              <div class="d-flex flex-column">-->
                <!--                <v-checkbox v-model="user.verified" dense label="Email Verified"></v-checkbox>-->
                <!--                <div>-->
                <!--                  <v-btn-->
                <!--                    v-if="!user.verified"-->
                <!--                  >-->
                <!--                    <v-icon left small>mdi-email</v-icon>Send Verification Email-->
                <!--                  </v-btn>-->
                <!--                </div>-->
                <!--              </div>-->

                <div class="mt-2">
                  <v-btn color="primary" @click="saveProfile">Save</v-btn>
                </div>
              </div>
            </div>
          </v-form>
        </v-card-text>
      </v-card>

      <!--      <v-expansion-panels v-model="panel" multiple class="mt-3">-->
      <!--        <v-expansion-panel>-->
      <!--          <v-expansion-panel-header class="title">Actions</v-expansion-panel-header>-->
      <!--          <v-expansion-panel-content>-->
      <!--            <div class="mb-2">-->
      <!--              <div class="title">Reset User Password</div>-->
      <!--              <div class="subtitle mb-2">Sends a reset password email to the user.</div>-->
      <!--              <v-btn-->
      <!--                class="mb-2"-->
      <!--                @click-->
      <!--              >-->
      <!--                <v-icon left small>mdi-email</v-icon>Send Reset Password Email-->
      <!--              </v-btn>-->
      <!--            </div>-->

      <!--            <v-divider></v-divider>-->

      <!--            <div class="my-2">-->
      <!--              <div class="title">Export Account Data</div>-->
      <!--              <div class="subtitle mb-2">Export all the platform metadata for this user.</div>-->
      <!--              <v-btn class="mb-2">-->
      <!--                <v-icon left small>mdi-clipboard-account</v-icon>Export User Data-->
      <!--              </v-btn>-->
      <!--            </div>-->

      <!--            <v-divider></v-divider>-->

      <!--            <div class="my-2">-->
      <!--              <div class="error&#45;&#45;text title">Danger Zone</div>-->
      <!--              <div class="subtitle mb-2">Full administrator with access to this dashboard.</div>-->

      <!--              <div class="my-2">-->
      <!--                <v-btn-->
      <!--                  v-if="user.role === 'ADMIN'"-->
      <!--                  color="primary"-->
      <!--                  @click="user.role = 'USER'"-->
      <!--                >-->
      <!--                  <v-icon left small>mdi-security</v-icon>Remove admin access-->
      <!--                </v-btn>-->
      <!--                <v-btn v-else color="primary" @click="user.role = 'ADMIN'">-->
      <!--                  <v-icon left small>mdi-security</v-icon>Set User as Admin-->
      <!--                </v-btn>-->
      <!--              </div>-->

      <!--              <v-divider></v-divider>-->

      <!--              <div class="subtitle mt-3 mb-2">Prevent the user from signing in on the platform.</div>-->
      <!--              <div class="my-2">-->
      <!--                <v-btn-->
      <!--                  v-if="user.disabled"-->
      <!--                  color="warning"-->
      <!--                  @click="user.disabled = false"-->
      <!--                >-->
      <!--                  <v-icon left small>mdi-account-check</v-icon>Enable User-->
      <!--                </v-btn>-->
      <!--                <v-btn-->
      <!--                  v-else-->
      <!--                  color="warning"-->
      <!--                  @click="disableDialog = true"-->
      <!--                >-->
      <!--                  <v-icon left small>mdi-cancel</v-icon>Disable User-->
      <!--                </v-btn>-->
      <!--              </div>-->

      <!--              <v-divider></v-divider>-->
      <!--              <div-->
      <!--                class="subtitle mt-3 mb-2"-->
      <!--              >To delete the user please transfer ownership or delete user's subscriptions.</div>-->
      <!--              <v-btn color="error" @click="deleteDialog = true">-->
      <!--                <v-icon left small>mdi-delete</v-icon>Delete User-->
      <!--              </v-btn>-->
      <!--            </div>-->
      <!--          </v-expansion-panel-content>-->
      <!--        </v-expansion-panel>-->
      <!--        <v-expansion-panel>-->
      <!--          <v-expansion-panel-header class="title">Metadata</v-expansion-panel-header>-->
      <!--          <v-expansion-panel-content class="body-2">-->
      <!--            <span class="font-weight-bold">Created</span>-->
      <!--            {{ user.created | formatDate('lll') }}-->
      <!--            <br />-->
      <!--            <span class="font-weight-bold">Last Sign In</span>-->
      <!--            {{ user.lastSignIn | formatDate('lll') }}-->
      <!--          </v-expansion-panel-content>-->
      <!--        </v-expansion-panel>-->
      <!--      </v-expansion-panels>-->
    </div>

    <!-- disable modal -->
    <v-dialog v-model="disableDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Disable User</v-card-title>
        <v-card-text>Are you sure you want to disable this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="disableDialog = false">Cancel</v-btn>
          <v-btn color="warning" @click="user.disabled = true; disableDialog = false">Disable</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete modal -->
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete User</v-card-title>
        <v-card-text>Are you sure you want to delete this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteDialog = false">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { baseURL } from '~/configs/urls'

export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      panel: [1],
      deleteDialog: false,
      disableDialog: false,
      defaultImg: '/images/avatars/avatar1.svg',
      fileUrl: baseURL.FILE_URL,
      valid: true
    }
  },
  methods : {
    ...mapActions('app', ['list', 'update', 'create', 'delete']),
    ...mapMutations('app', ['SHOW_LOADER', 'SHOW_SNACKBAR']),
    async saveProfile () {
      if (this.$refs.form.validate()) {
        const formData = new FormData()

        formData.append('name', this.user.name)
        formData.append('email', this.user.email)
        formData.append('password ', this.user.password)
        const imagefile = document.querySelector('#file')

        if (imagefile.files[0])
          formData.append('image', imagefile.files[0])

        const data = {
          path: 'update_user/user_id=' + this.user.id,
          data: formData
        }

        this.SHOW_LOADER(true)
        await this.create(data)
          .then((response) => {
            console.log(response, 'after update')
            this.dialog = false
            this.SHOW_LOADER(false)
            this.SHOW_SNACKBAR({
              snackbar: true,
              color: 'green',
              message: response.data.message
            })
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
  }
}
</script>
