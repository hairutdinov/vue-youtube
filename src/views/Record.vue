<template>
  <div >
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>
    <form v-else class="form" v-on:submit.prevent="createRecord">
      <div class="input-field">
        <select
            ref="select"
            v-model="selectedCategory"
        >
          <option value="" disabled selected>Выберите категорию</option>
          <option
              v-for="category in categories"
              v-bind:key="category.id"
              v-bind:value="category.id"
          >{{category.name}}</option>
        </select>
        <label>Выберите категорию</label>
        <small class="helper-text invalid" v-if="!$v.selectedCategory.selectedCategoryValidator">Необходимо выбрать категорию</small>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="costType"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="costType"
          />
          <span>Расход</span>
        </label>
      </p>

      <small class="helper-text invalid" v-if="!$v.costType.required && $v.costType.$dirty">Поле Тип обязательно для заполнения</small>
      <small class="helper-text invalid" v-else-if="!$v.costType.radioValidator">Допустимые значения поля Тип: <b>Доход/Расход</b> </small>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            v-on:blur="$v.amount.$touch()"
        >
        <label for="amount">Сумма</label>
        <small class="helper-text invalid" v-if="!$v.amount.required && $v.amount.$dirty">Поле Сумма обязательна для заполнения</small>
        <small class="helper-text invalid" v-else-if="!$v.amount.minValue">Значение должно быть не меньше, чем <b>{{$v.amount.$params.minValue.min}}</b></small>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model.trim="description"
            v-on:blur="$v.description.$touch()"
        >
        <label for="description">Описание</label>
        <small class="helper-text invalid" v-if="!$v.description.required && $v.description.$dirty">Поле Описание обязательна для заполнения</small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

let validators = {
  radio: v => ['outcome', 'income'].includes(v),
  selectedCategory: v => v !== null
}

let startAmount = 1

export default {
  name: 'Record',
  data: () => ({
    categories: [],
    selectedCategory: null,
    select: null,
    loading: true,
    costType: 'outcome',
    amount: startAmount,
    description: ''
  }),
  validations: {
    selectedCategory: { required, selectedCategoryValidator: validators['selectedCategory'] },
    costType: { required, radioValidator: validators['radio'] },
    amount: { required, minValue: minValue(1) },
    description: { required }
  },
  methods: {
    async createRecord () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.selectedCategory,
            amount: this.amount,
            description: this.description,
            type: this.costType,
            date: new Date().toJSON()
          })
          let recalculatedBill = this.costType === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', { bill: recalculatedBill })
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.clearForm()
        } catch (e) {}
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
      }
    },
    clearForm () {
      this.selectedCategory = null
      this.costType = 'outcome'
      this.amount = startAmount
      this.description = ''
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      if (this.costType === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  beforeDestroy () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
      // console.log('Select destroyed')
    }
  }
}
</script>

<style scoped>

</style>
