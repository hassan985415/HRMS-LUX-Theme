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
        <MaterialCard
          color="success"
          title="Notes"
          class="px-5 py-3"
        >
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-textarea
                    name="input-7-4"
                    rows="3"
                    label="Renew company documents on time"
                  ></v-textarea>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-textarea
                    rows="3"
                    name="input-7-4"
                    label="Remarks for Undertaking"
                  ></v-textarea>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-textarea
                    rows="3"
                    name="input-7-4"
                    label="Remarks for Undertaking"
                  ></v-textarea>
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                  >
                    Create
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </MaterialCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from "../../../components/base/MaterialCard";
export default {
  name: "Notes",
  components: {MaterialCard },
  middleware: ['auth'],
}
</script>

<style scoped>

</style>
