<template>
  <section id="popular" class="py-14">
    <div class="container-main">
      <SectionHeading
        title="⭐ Popular Tools"
        description="The most used tools by our visitors."
      />

      <!-- No results -->
      <p v-if="tools.length === 0" class="text-gray-400 text-sm">
        No popular tools match your search.
      </p>

      <!-- Tool grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <ToolCard v-for="tool in tools" :key="tool.slug" :tool="tool" />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  tools: {
    type: Array,
    required: true,
  },
});
</script>
