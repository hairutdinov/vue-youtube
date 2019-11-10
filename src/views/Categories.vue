<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate v-on:created="addCategory" />
        <CategoryUpdate />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryUpdate from '@/components/CategoryUpdate'

export default {
  name: 'Categories',
  data: () => ({
    categories: []
  }),
  methods: {
    addCategory (category) {
      this.categories.push(category)
      
    }
  },
  components: {
    CategoryCreate, CategoryUpdate
  }
}
</script>

<style scoped>

</style>
