<script setup lang="ts">
import { computed } from 'vue';
import { marked } from 'marked';
import charterMd from '../../docs/charter.md?raw';
import manifestoMd from '../../docs/manifesto.md?raw';
import commentaryMd from '../../docs/commentary.md?raw';

const props = defineProps<{
  source: 'charter' | 'manifesto' | 'commentary';
}>();

const sources: Record<string, string> = {
  charter: charterMd,
  manifesto: manifestoMd,
  commentary: commentaryMd,
};

const html = computed(() => {
  const md = sources[props.source];
  return md ? marked.parse(md) as string : '<p>Document not found.</p>';
});
</script>

<template>
  <article class="document" v-html="html"></article>
</template>
