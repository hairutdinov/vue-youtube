<template>
  <form class="card auth-card" v-on:submit.prevent="signup">
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
      <div class="input-field">
        <input
            id="name"
            type="text"
            class="validate"
            v-model.trim="name"
            v-bind:class="{ invalid : $v.name.$error }"
            v-on:blur="$v.name.$touch()"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="!$v.name.required && $v.name.$dirty">Поле Имя обязательно для заполнения</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span class="helper-text" v-bind:class="{ 'invalid' : !agree }" >С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
            v-bind:disabled="$v.$invalid"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v }
  },
  methods: {
    async signup () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      let formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>

<style scoped>

</style>
