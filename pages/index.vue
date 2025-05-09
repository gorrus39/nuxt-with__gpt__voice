<script setup lang="ts">
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
  <div
    class="flex flex-col xl:flex-row gap-8 bg-primary-900 xl:h-96 h-[100vh] w-full md:w-4/5 md:px-16 px-4 py-8 rounded"
  >
    <div class="flex flex-col flex-1 gap-18">
      <div class="flex w-max flex-col gap-6 text-white me-8">
        <b> <p class="word-break text-lg md:text-3xl">Hi there!</p></b>
        <b>
          <p class="word-break text-lg md:text-4xl">
            What whould you like to know?
          </p></b
        >
        <p class="text-sm md:text-2xl text-primary-300">
          Use one of the most common prompts bolow
          <br />
          or ask your own question
        </p>
      </div>

      <u-button-group class="self-start" size="xl">
        <u-input
          :disabled="loading"
          v-model="input"
          :loading="voiceLintening"
          leading
          :ui="{
            base: 'w-64 lg:w-124 pe-8 bg-inherit text-primary-300',
            trailing: 'pe-1',
            leading: 'cursor-pointer',
          }"
          placeholder="Ask whatever you want"
        >
          <template v-if="input?.length > 0" #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="xl"
              icon="i-lucide-circle-x"
              @click="input = ''"
              :disabled="loading"
              class="cursor-pointer"
            />
          </template>
          <template #leading>
            <UButton
              color="neutral"
              variant="link"
              size="xl"
              :disabled="loading"
              :icon="voiceLintening ? 'i-lucide-repeat-2' : 'i-ri:mic-line'"
              :class="{ 'animate-spin': voiceLintening }"
              @click="voicer.start()"
              class="cursor-pointer"
            />
          </template>
        </u-input>

        <u-button
          :loading="loading"
          :disabled="input.length === 0"
          class="cursor-pointer bg-primary-400"
          color="neutral"
          variant="subtle"
          icon="i-mdi:arrow-right-bold-outline"
          @click="handlePost"
        />
      </u-button-group>
    </div>

    <u-alert
      v-if="response"
      class="break-words"
      title="Answer"
      :description="response"
      close
    >
      <template #close>
        <u-icon
          class="cursor-pointer hover:opacity-50"
          name="i-lucide-circle-x"
          @click="response = null"
        >
        </u-icon>
      </template>
    </u-alert>
  </div>
</template>
