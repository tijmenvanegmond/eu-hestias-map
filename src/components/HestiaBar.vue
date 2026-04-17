<script setup lang="ts">
import { computed } from 'vue';
import { useAppState } from '../composables/useAppState';
import type { Hestia } from '../types';
import hestias from '../../data/hestias.yaml';

const { state, setView } = useAppState();

const typedHestias = hestias as Hestia[];

const currentHestia = computed<Hestia | null>(() => {
  if (state.currentView === 'standings') return null;
  return typedHestias.find(h => h.key === state.currentView) ?? null;
});
</script>

<template>
  <div class="hestia-bar">
    <div class="hestia-bar-label">Tap a fire to see who tends it</div>
    <div class="hestia-buttons">
      <button
        class="hestia-btn standings"
        :class="{ active: state.currentView === 'standings' }"
        @click="setView('standings')"
      >Show Standings</button>
      <button
        v-for="h in typedHestias"
        :key="h.key"
        class="hestia-btn"
        :class="{ active: state.currentView === h.key }"
        @click="setView(h.key)"
      >
        <span class="btn-name">{{ h.label }}</span>
        <span class="btn-sub">{{ h.sub }}</span>
      </button>
    </div>
  </div>

  <div v-if="currentHestia" class="hestia-description">
    <div class="hestia-description-content">
      <div v-if="currentHestia.description" class="hestia-description-title">{{ currentHestia.description }}</div>
      <div v-if="currentHestia.explanation" class="hestia-description-text">{{ currentHestia.explanation }}</div>
    </div>
  </div>
</template>
