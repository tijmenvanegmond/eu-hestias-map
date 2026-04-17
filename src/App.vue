<script setup lang="ts">
import SiteNav from './components/SiteNav.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <header>
    <h1>Hearthwork EU</h1>
    <p class="subtitle">Charter standings and the fires that burn</p>
    <p v-if="route.path === '/'" class="epigraph">From many, one. From one, many.</p>
    <SiteNav />
  </header>

  <router-view />

  <footer>
    <template v-if="route.path === '/'">
      <div>Hearthwork EU Charter — Twelfth Draft</div>
      <div style="margin-top: 6px;">Indicative mapping. Real assignments would be made by the Independent Review Commission.</div>
    </template>
    <template v-else>
      <div class="quote">From many nations, one Union.<br>From one Union, many fires.</div>
      <div>Hearthwork EU Charter — Twelfth Draft</div>
    </template>
  </footer>
</template>
