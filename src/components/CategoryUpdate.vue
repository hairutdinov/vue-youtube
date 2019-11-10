<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form v-on:submit.prevent="update">
        <div class="input-field">
          <select
              ref="select"
              v-model="current"
          >
            <option value="" disabled selected>Выберите категорию</option>
            <option
                v-for="category in categories"
                v-bind:key="category.id"
                v-bind:value="category.id"
            >{{category.name}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
              id="category-update_name"
              type="text"
              v-model.trim="name"
              v-on:blur="$v.name.$touch()"
          >
          <label for="category-update_name">Название</label>
          <small class="helper-text invalid" v-if="!$v.name.required && $v.name.$dirty">Поле обязательно для заполнения</small>
        </div>

        <div class="input-field">
          <input
              id="category-update_limit"
              type="number"
              v-model.trim.number="limit"
              v-on:blur="$v.limit.$touch()"
          >
          <label for="category-update_limit">Лимит</label>
          <small class="helper-text invalid" v-if="!$v.limit.required && $v.limit.$dirty">Поле обязательно для заполнения</small>
          <small class="helper-text invalid" v-else-if="!$v.limit.minValue && $v.limit.$dirty">Минимальный лимит: <b>{{$v.limit.$params.minValue.min}}</b></small>
        </div>

        <button
            class="btn waves-effect waves-light"
            type="submit"
            v-bind:disabled="$v.$invalid"
        >
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
let startLimit = null
export default {
  name: 'CategoryUpdate',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    name: '',
    limit: startLimit,
    current: null,
  }),
  validations: {
    name: { required },
    limit: { required, minValue: minValue(startLimit) }
  },
  watch: {
    current (categoryId) {
      let { name, limit } = this.categories.find(category => category.id === categoryId)
      this.name = name
      this.limit = limit
    }
  },
  methods: {
    async update () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        let categoryData = { id: this.current, name: this.name, limit: this.limit }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория успешно обновлена')
        this.$emit('categoryUpdated', categoryData)
      } catch (e) {}
    }
  },
  created () {
    let { id, name, limit } = this.categories[0]
    this.current = id
    this.name = name
    this.limit = limit
  },
  mounted () {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
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
