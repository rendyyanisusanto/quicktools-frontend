<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import iconUrl from '~/assets/images/icon.png';

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: iconUrl }
  ]
});
</script>
