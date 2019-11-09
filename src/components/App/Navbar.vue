<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a v-on:click.prevent="toggleSidebar" class="cursor-pointer">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | dateFilter('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              data-target="dropdown"
              ref="dropdown"
          >
            USER NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a class="black-text" v-on:click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    date: new Date(),
    _interval: null,
    _dropdown: null
  }),
  methods: {
    toggleSidebar () {
      document.querySelector('.app-sidenav').classList.toggle('open')
      document.querySelector('.app-content').classList.toggle('full')
    },
    logout () {
      console.log('Logout')
      this.$router.push('/login?message=logout')
    }
  },
  mounted () {
    this._dropdown = M.Dropdown.init(this.$refs.dropdown)
    this._interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy () {
    console.log('Before destroy')
    clearInterval(this._interval)
    if (this._dropdown && this._dropdown.destroy) {
      this._dropdown.destroy()
    }
  }
}
</script>

<style>
  .cursor-pointer {
    cursor: pointer;
  }
</style>
