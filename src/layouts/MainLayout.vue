<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar />
      <Sidebar />
      <main class="app-content">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/App/Navbar'
import Sidebar from '@/components/App/Sidebar'
import messages from '@/utils/messages'
export default {
  name: 'MainLayout',
  components: { Navbar, Sidebar },
  data: () => ({
    loading: true
  }),
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (firebaseError) {
      console.log(firebaseError)
      this.$error(messages[firebaseError.code] || 'Что то пошло не так...')
    }
  }
}
</script>

<style scoped>

</style>
