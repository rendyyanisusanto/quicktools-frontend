<template>
  <div class="mb-5">
    <label class="block text-sm font-semibold text-gray-700 mb-2">
      Nomor WhatsApp Tujuan <span class="text-red-500">*</span>
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      <input
        type="tel"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
        placeholder="Contoh: 08123456789 atau 62812..."
        required
      />
    </div>
    <p class="text-xs text-gray-400 mt-2">
      Format bebas (boleh pakai 08 otomatis akan diubah menjadi standar 628).
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});
defineEmits(['update:modelValue']);
</script>
