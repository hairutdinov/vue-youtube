<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate v-on:created="addCategory" />
        <CategoryUpdate
            v-if="categories.length"
            v-bind:categories="categories"
            v-on:categoryUpdated="categoryUpdated"
            v-bind:key="categories.length + updateCount"
        />
        <p
            v-else
            class="center"
        >Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryUpdate from '@/components/CategoryUpdate'
import category from "../store/category";

export default {
  name: 'Categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  methods: {
    addCategory (category) {
      this.categories.push(category)
    },
    categoryUpdated (categoryData) {
      let { id, name, limit } = categoryData
      let categoryIndex = this.categories.findIndex(c => c.id === id)
      this.categories[categoryIndex]['name'] = name
      this.categories[categoryIndex]['limit'] = limit
      this.updateCount += 1
    }
  },
  components: {
    CategoryCreate, CategoryUpdate
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    // this.categories = []
    this.loading = false
    // console.log(this.categories)
  }
}
</script>

<style scoped>

</style>
