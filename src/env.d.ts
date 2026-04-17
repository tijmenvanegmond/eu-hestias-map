/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.yaml' {
  const data: any;
  export default data;
}

declare module '*.md?raw' {
  const content: string;
  export default content;
}
