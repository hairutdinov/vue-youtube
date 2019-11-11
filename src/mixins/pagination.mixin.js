import _ from 'lodash'
export default {
  data () {
    return {
      currentPage: +this.$route.query.page || 1,
      rowsOnPage: 2,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    setupPagination (serverData) {
      this.allItems = _.chunk(serverData, this.rowsOnPage)
      this.pageCount = _.size(this.allItems)
      this.items = (this.allItems[this.currentPage - 1] !== undefined) ? this.allItems[this.currentPage - 1] : this.allItems[0]
      if (this.allItems[this.currentPage - 1] === undefined) {
        this.currentPage = 1
      }
    },
    pageChangeHandler (page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page] || this.allItems[0]
    }
  }
}
