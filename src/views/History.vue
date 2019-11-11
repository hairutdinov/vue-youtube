<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="loading" />
    <p v-bind:class="'center'" v-else-if="!records.length">Записей пока нет</p>
    <section v-else>
      <HistoryTable
          v-bind:records="items"
      />
      <Paginate
          v-model="currentPage"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
      >
      ></Paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
import PaginationMixin from '@/mixins/pagination.mixin.js'
import { Pie } from 'vue-chartjs'
export default {
  name: 'History',
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  extends: Pie,
  mixins: [ PaginationMixin ],
  async mounted () {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')

    this.setup()

    this.loading = false
  },
  components: {
    HistoryTable
  },
  methods: {
    async setup () {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(c => c.id === record.categoryId).name,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      }))

      this.renderChart({
        labels: this.categories.map(c => c.name),
        datasets: [{
          label: 'Расходы по категориям',
          data: this.categories.map(c => {
            return this.records.reduce((sum, record) => {
              if (record.categoryId === c.id && record.type === "outcome") {
                sum += +record.amount
              }
              return sum
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
    }
  }
}
</script>

<style scoped>

</style>
