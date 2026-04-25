// Lightweight per-route <head> updater.
//
// Updates document.title and the OG/Twitter meta tags injected in index.html
// when a view mounts; restores the site defaults on unmount.
//
// IMPORTANT — crawler caveat: this is a JS-side update. Reddit, Facebook,
// Twitter, Discord, etc. fetch the static index.html and read its meta tags
// without executing JavaScript. Per-route OG previews would require either
// switching to history mode + a build-time prerender (e.g. vite-ssg), or
// publishing distinct static HTML files per route. Until then, all link
// previews use the defaults baked into index.html. This composable still
// helps: in-app browser tabs get the right title, and any social-sharing
// flow that reads the live DOM (some "Share this page" buttons) gets the
// right values.

import { onBeforeUnmount, onMounted, watch } from 'vue';

export interface HeadConfig {
  title?: string;
  description?: string;
  /** Absolute URL */
  image?: string;
  /** Absolute URL */
  url?: string;
}

const DEFAULTS: Required<HeadConfig> = {
  title: 'Hearthwork EU — A Constitutional Charter for a Living European Union',
  description:
    'An interactive reimagining of EU integration: four standings (Member, Companion, Accord State, Strategic Partner), voluntary Hestias, paid-for votes, and a Union built on choice. Map, Charter, and lifecycle simulator.',
  image: 'https://udomkop.github.io/hearthwork-eu/screenshot.png',
  url: 'https://udomkop.github.io/hearthwork-eu/',
};

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
}

function apply(c: Required<HeadConfig>) {
  document.title = c.title;
  setMeta('meta[name="description"]', 'content', c.description);
  setMeta('meta[property="og:title"]', 'content', c.title);
  setMeta('meta[property="og:description"]', 'content', c.description);
  setMeta('meta[property="og:image"]', 'content', c.image);
  setMeta('meta[property="og:url"]', 'content', c.url);
  setMeta('meta[name="twitter:title"]', 'content', c.title);
  setMeta('meta[name="twitter:description"]', 'content', c.description);
  setMeta('meta[name="twitter:image"]', 'content', c.image);
}

/**
 * Apply per-view <head> overrides. Call from a `<script setup>` block.
 *
 * Accepts either a static config or a getter for reactive sources
 * (e.g. when a single view component is reused across props/routes).
 */
export function useHead(config: HeadConfig | (() => HeadConfig)) {
  const resolve = (): Required<HeadConfig> =>
    typeof config === 'function' ? { ...DEFAULTS, ...config() } : { ...DEFAULTS, ...config };

  onMounted(() => apply(resolve()));
  if (typeof config === 'function') {
    watch(config, () => apply(resolve()), { deep: true });
  }
  onBeforeUnmount(() => apply(DEFAULTS));
}
