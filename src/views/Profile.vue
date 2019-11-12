<template>
  <div>
    <div class="page-title">
      <h3>{{'Профиль' | localizeFilter}}</h3>
    </div>

    <form class="form" v-on:submit.prevent="updateName">
      <div class="input-field">
        <input
            v-model="name"
            id="description"
            type="text"
            v-bind:class="{ invalid : $v.name.$error }"
            v-on:blur="$v.name.$touch()"
        >
        <label for="description">{{'Имя' | localizeFilter}}</label>
        <small class="helper-text invalid" v-if="!$v.name.required && $v.name.$dirty">Поле Имя обязательно для заполнения</small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" v-on:change="changeLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button
          class="btn waves-effect waves-light" type="submit"
          v-bind:disabled="$v.$invalid"
      >
        {{'Обновить' | localizeFilter}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Profile',
  data () {
    return {
      name: '',
      isRuLocale: true
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  mounted () {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  validations: {
    name: { required }
  },
  methods: {
    ...mapActions(['updateInfo']),
    async updateName () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        this.updateInfo({ name: this.name })
      } catch (e) {}
    },
    async changeLocale () {
      try {
        this.updateInfo({ locale: this.isRuLocale ? 'ru-RU' : 'en-US' })
      } catch (e) {}
    }
  }
}
</script>

<style scoped lang='scss'>
  .switch {
    margin: 20px 0;

    label {
      font-size: 16px;
    }
  }
</style>
