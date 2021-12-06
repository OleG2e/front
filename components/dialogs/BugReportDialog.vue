<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogShow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Feedback form</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="report.message"
                  label="Message*"
                  auto-grow
                  clearable
                  counter
                  outlined
                  rows="1"
                  prepend-icon="mdi-comment"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-file-img
                  :is-loading="isLoading"
                  :image="report.screenshot"
                  @uploadedImage="report.screenshot = $event"
                ></v-file-img>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onClose">Close</v-btn>
          <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VFileImg from '../VFileImg'
export default {
  name: 'BugReportDialog',
  components: { VFileImg },
  data() {
    return {
      report: {
        message: '',
        screenshot: {},
      },
    }
  },
  computed: {
    ...mapGetters('dialogs/bugReport', { isLoading: 'getIsLoading' }),
    isDialogShow: {
      set(val) {
        this.$store.commit('dialogs/bugReport/setIsDialogShow', val)
      },
      get() {
        return this.$store.getters['dialogs/bugReport/getIsDialogShow']
      },
    },
  },
  methods: {
    ...mapActions('dialogs/bugReport', ['createItem']),
    async onSave() {
      await this.createItem(this.report)
      this.isDialogShow = false
    },
    onClose() {
      this.isDialogShow = false
    },
  },
}
</script>

<style scoped></style>
