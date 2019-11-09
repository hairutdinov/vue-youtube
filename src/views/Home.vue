<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" v-on:click="updateCurrency">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div v-else  class="row">
      <HomeBill
          v-bind:rates="currency.rates"
      />
      <HomeCurrency
          v-bind:rates="currency.rates"
          v-bind:date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  name: 'home',
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    HomeBill, HomeCurrency
  },
  methods: {
    async updateCurrency () {
      this.loading = true
      this.getCurrency()
    },
    async getCurrency () {
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  async mounted () {
    this.getCurrency()
  }
}
</script>
