<template>
  <form class="card auth-card" v-on:submit.prevent="login">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="email"
            v-model.trim="email"
            v-bind:class="{ invalid : $v.email.$error }"
            v-on:blur="$v.email.$touch()"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="!$v.email.required && $v.email.$dirty">Поле email обязательно для заполнения</small>
        <small class="helper-text invalid" v-else-if="!$v.email.email">Введите email адрес</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            v-bind:class="{ invalid : $v.password.$error }"
            v-on:blur="$v.password.$touch()"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="!$v.password.required && $v.password.$dirty">Поле пароль обязательно для заполнения</small>
        <small class="helper-text invalid" v-else-if="!$v.password.minLength">Минимальное количество символов: <b>{{ $v.password.$params.minLength.min }}</b>. Сейчас символов: <b>{{password.length}}</b></small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
            v-bind:disabled="$v.$invalid"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    login () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
