<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currencyFilter('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />
    <p v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>
    <section v-else>
      <div
          v-for="category in categories"
          v-bind:key="category.id"
      >
        <p v-tooltip="category.tooltip">
          <strong>{{category.name}}:</strong>
          {{category.spend | currencyFilter('RUB')}} из {{category.limit | currencyFilter('RUB')}}
        </p>
        <div class="progress">
          <div
              class="determinate"
              v-bind:class="[category.progressColor]"
              v-bind:style="{width:category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'
export default {
  name: 'Planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  methods: {},
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(category => {
      let spend = records
        .filter(r => r.categoryId === category.id && r.type === 'outcome')
        .reduce((sum, record) => { return sum += +record.amount }, 0)
      let percent = spend * 100 / category.limit
      let progressPercent = percent > 100 ? 100 : percent
      let progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      let tooltipValue = category.limit - spend
      let tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

      return { ...category, progressPercent, progressColor, spend, percent, tooltip }
    })
    this.loading = false
  },
  computed: {
    ...mapGetters(['info'])
  }
}
</script>

<style scoped>

</style>
