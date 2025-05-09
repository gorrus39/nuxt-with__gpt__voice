<script setup lang="ts">
import type { SpeechRecognition } from "dom-speech-recognition";

const toast = useToast();
const input = ref("");
const voiceLintening = ref(false);
const voicer = useVoicer(input, voiceLintening);
const response = ref<string | null>(null);
const loading = ref(false);

const handlePost = async () => {
  try {
    loading.value = true;
    const { answer, error } = await $fetch("/api/answers/item", {
      query: { question: input.value },
    });
    if (answer) {
      response.value = answer;
      toast.add({ title: "Successfully!" });
    } else if (error) throw new Error(error);
  } catch (error) {
    toast.add({ title: String(error), color: "error" });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex justify-center bg-green-200">
    <div class="p-8 flex h-[100vh] flex-col gap-2 w-96 bg-white items-center">
      <u-button-group class="self-start">
        <u-input
          :disabled="loading"
          v-model="input"
          placeholder=""
          :ui="{ base: 'peer pe-9', trailing: 'pe-0' }"
        >
          <label
            class="pointer-events-none absolute left-1 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal"
          >
            <span class="inline-flex bg-default px-1"
              >Ask whatever you want</span
            >
          </label>

          <template v-if="input?.length" #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="xl"
              icon="i-lucide-circle-x"
              aria-label="Clear input"
              @click="input = ''"
              :disabled="loading"
              class="cursor-pointer"
            />
          </template>
        </u-input>

        <UButton
          :loading="voiceLintening"
          :disabled="loading"
          class="cursor-pointer"
          color="neutral"
          variant="subtle"
          icon="i-ri:mic-line"
          @click="voicer.start()"
        />
      </u-button-group>

      <u-button
        icon="i-fa-solid:arrow-alt-circle-up"
        label="Post"
        :loading
        :disabled="input.length === 0"
        @click="handlePost"
        block
      />

      <hr class="w-full" />

      <UAlert
        v-if="response"
        title="Answer"
        :description="response"
        close
        @update:open="response = null"
      />
    </div>
  </div>
</template>
