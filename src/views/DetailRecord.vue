<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb" v-on:click.prevent>
          {{record.type === 'income' ? 'Доход' : 'Расход'}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
              class="card"
              v-bind:class="{
                'red' : record.type === 'outcome',
                'green' : record.type === 'income',
              }"
          >
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currencyFilter('RUB')}}</p>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{record.date | dateFilter('date')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Такой записи нет</p>
  </div>
</template>

<script>
export default {
  name: 'DetailRecord',
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted () {
    let recordId = this.$route.params.id
    let record = await this.$store.dispatch('fetchRecordById', recordId)
    let category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
    this.record = {
      ...record,
      categoryName: category.name
    }
    this.loading = false
  }
}
</script>

<style scoped>

</style>
