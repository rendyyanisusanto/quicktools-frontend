<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Search Section -->
    <SearchToolsSection v-model="searchQuery" />

    <!-- Popular Tools Section (hidden when searching) -->
    <PopularToolsSection v-if="!searchQuery" :tools="popularTools" />

    <!-- All Tools by Category (filtered) -->
    <ToolsCategorySection :groups="filteredGroups" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getPopularTools, getFilteredToolsByCategory } from '~/utils/toolHelpers.js';

// SEO metadata for the homepage
useSeoMeta({
  title: 'QuickTools — Free Online Tools for PDF, Image, WA, Text & More',
  description:
    'QuickTools offers free online tools for PDF, image, WhatsApp, text, calculator, education, and developer needs. No sign-up required.',
  ogTitle: 'QuickTools — Free Online Tools',
  ogDescription:
    'Free online tools for PDF, image, WhatsApp, text, calculator, education, and developer needs.',
});

// Search state
const searchQuery = ref('');

// Popular tools (static — not affected by search to keep section visible)
const popularTools = getPopularTools();

// Filtered category groups — reactive to searchQuery
const filteredGroups = computed(() => getFilteredToolsByCategory(searchQuery.value));
</script>
