<template>
  <footer class="bg-gray-50 border-t border-gray-100 mt-16 pt-12 pb-8">
    <div class="container-main">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        <!-- Brand & Description -->
        <div class="md:col-span-8">
          <div class="flex items-center gap-2 mb-4">
            <img src="~/assets/images/logo.png" alt="QuickTools Logo" class="h-8 w-auto md:h-10 opacity-80 hover:opacity-100 transition-opacity" />
          </div>
          <p class="text-sm text-gray-500 max-w-sm leading-relaxed">
            Free online tools for PDF, image, WhatsApp, text, calculator, education, and developer needs. Gratis, aman, dan tanpa perlu login.
          </p>
        </div>

        <!-- Links -->
        <div class="md:col-span-4">
          <h3 class="font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm">QuickTools</h3>
          <ul class="space-y-3 text-sm text-gray-500">
            <li><NuxtLink to="/about" class="hover:text-primary-600 transition-colors">About</NuxtLink></li>
            <li><NuxtLink to="/privacy-policy" class="hover:text-primary-600 transition-colors">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/terms-of-service" class="hover:text-primary-600 transition-colors">Terms of Service</NuxtLink></li>
            <li><a href="mailto:contact@quicktools.web.id" class="hover:text-primary-600 transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-400">
          &copy; {{ currentYear }} QuickTools. Made By Myber.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>
