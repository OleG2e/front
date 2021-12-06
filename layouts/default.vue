<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" clipped fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
        <bug-report-dialog></bug-report-dialog>
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" right temporary fixed app>
      <v-list>
        <v-list-item @click="bugReportDialogShow(true)">
          <v-list-item-action>
            <v-icon>mdi-bug</v-icon>
          </v-list-item-action>
          <v-list-item-title>Bug report</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
import BugReportDialog from '@/components/dialogs/BugReportDialog'

export default {
  components: { BugReportDialog },
  data() {
    return {
      drawer: false,
      dialogs: {
        bugReport: false,
      },
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  methods: {
    ...mapMutations('dialogs/bugReport', { bugReportDialogShow: 'setIsDialogShow' }),
  },
}
</script>
