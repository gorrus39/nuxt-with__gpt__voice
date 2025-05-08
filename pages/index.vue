<script setup lang="ts">
const inputValue = ref("");
</script>

<template>
  <div class="p-8">
    <UButtonGroup>
      <UInput
        v-model="inputValue"
        icon="i-lucide-search"
        placeholder=""
        :ui="{ base: 'peer', trailing: 'pe-0', base: 'pe-9' }"
      >
        <label
          class="pointer-events-none absolute left-6 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal"
        >
          <span class="inline-flex bg-default px-1">Ask whatever you want</span>
        </label>

        <template v-if="inputValue?.length" #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="xl"
            icon="i-lucide-circle-x"
            aria-label="Clear input"
            @click="inputValue = ''"
          />
        </template>
      </UInput>

      <UButton color="neutral" variant="subtle" icon="i-lucide-clipboard" />
      <UButton color="neutral" variant="subtle" icon="i-lucide-clipboard" />
      <UButton color="neutral" variant="subtle" icon="i-lucide-clipboard" />
    </UButtonGroup>
  </div>
</template>
