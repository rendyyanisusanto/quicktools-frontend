<template>
  <section id="categories" class="py-14 bg-gray-50">
    <div class="container-main">
      <SectionHeading
        title="🗂️ All Tools by Category"
        description="Browse all tools organized by category."
      />

      <!-- No results state -->
      <div v-if="groups.length === 0" class="text-center py-12">
        <p class="text-gray-400 text-sm">No tools match your search. Try a different keyword.</p>
      </div>

      <!-- Category groups -->
      <div v-else class="space-y-12">
        <div
          v-for="group in groups"
          :key="group.category.key"
          class="bg-white rounded-2xl border border-gray-100 p-6"
        >
          <!-- Category header -->
          <div class="mb-5">
            <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span>{{ group.category.icon }}</span>
              <span>{{ group.category.label }}</span>
            </h2>
            <p class="text-gray-500 text-sm mt-1">{{ group.category.description }}</p>
          </div>

          <!-- Tools grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <ToolCard
              v-for="tool in group.tools"
              :key="tool.slug"
              :tool="tool"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  /**
   * Array of { category: CategoryMeta, tools: Tool[] }
   * from getFilteredToolsByCategory() or getToolsByCategory()
   */
  groups: {
    type: Array,
    required: true,
  },
});
</script>
