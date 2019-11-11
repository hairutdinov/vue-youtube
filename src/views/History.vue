<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loading" />
    <p v-bind:class="'center'" v-else-if="!records.length">Записей пока нет</p>
    <section v-else>
      <HistoryTable
          v-bind:records="records"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
export default {
  name: 'History',
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted () {
    // this.records = await this.$store.dispatch('fetchRecords')
    let records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).name,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    })
    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>

<style scoped>

</style>
