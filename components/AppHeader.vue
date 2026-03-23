<template>
  <header class="bg-white border-b border-gray-100 sticky top-0 z-50">
    <div class="container-main">
      <nav class="flex items-center justify-between h-16" aria-label="Main navigation">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="~/assets/images/logo.png" alt="QuickTools Logo" class="h-10 w-auto md:h-12" />
        </NuxtLink>

        <!-- Desktop nav links -->
        <ul class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <li>
            <NuxtLink to="/" class="hover:text-primary-600 transition-colors">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/#categories" class="hover:text-primary-600 transition-colors">Tools</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
// AppHeader — sticky top navigation bar
</script>
