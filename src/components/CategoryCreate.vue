<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form v-on:submit.prevent="create">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model.trim="name"
              v-on:blur="$v.name.$touch()"
          >
          <label for="name">Название</label>
          <small class="helper-text invalid" v-if="!$v.name.required && $v.name.$dirty">Поле обязательно для заполнения</small>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.trim.number="limit"
              v-on:blur="$v.limit.$touch()"
          >
          <label for="limit">Лимит</label>
          <small class="helper-text invalid" v-if="!$v.limit.required && $v.limit.$dirty">Поле обязательно для заполнения</small>
          <small class="helper-text invalid" v-else-if="!$v.limit.minValue && $v.limit.$dirty">Минимальный лимит: <b>{{$v.limit.$params.minValue.min}}</b></small>

        </div>
        <button
            class="btn waves-effect waves-light"
            type="submit"
            v-bind:disabled="$v.$invalid"
        >
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
let startLimit = 1
export default {
  name: 'CategoryCreate',
  data () {
    return {
      name: '',
      limit: startLimit
    }
  },
  validations: {
    name: { required },
    limit: { required, minValue: minValue(startLimit) }
  },
  computed: {},
  methods: {
    async create () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          name: this.name,
          limit: this.limit
        })
        this.clearForm()
        this.$message('Категория была создана')
        this.$emit('created', category)
      } catch (e) {}
    },
    clearForm () {
      this.name = ''
      this.limit = startLimit
      this.$v.$reset()
    }
  },
  mounted() {
    M.updateTextFields()
  }
}
</script>

<style scoped>

</style>
