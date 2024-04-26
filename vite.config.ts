import { fileURLToPath, URL } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers';
import { defineConfig, loadEnv } from 'vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import vue from '@vitejs/plugin-vue';
import csp from 'vite-plugin-csp';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver({ importStyle: 'sass' }), VueHooksPlusResolver()],
        dts: true,
        eslintrc: {
          enabled: true,
        },
      }),
      Components({
        resolvers: [
          ElementPlusResolver({ importStyle: 'sass' }),
          IconsResolver({
            prefix: 'icon',
            // 自定义图标
            customCollections: [],
          }),
        ],
        directoryAsNamespace: true,
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3',
      }),
      csp({
        enabled: true,
        policy: {
          'script-src': 'self',
          'script-src-attr': ['self', 'unsafe-inline', 'unsafe-eval'],
          'style-src': ['self', 'unsafe-inline', 'unsafe-eval'],
          'style-src-attr': ['self', 'unsafe-inline', 'unsafe-eval'],
          'img-src': ['data:', 'self', '*'],
          'media-src': ['blob:', 'self', '*'],
          'connect-src': [process.env.NODE_ENV === 'development' ? '*' : '*'], // https://liveassistant.voiceads.cn 上线后地址
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/css/element/index.scss" as *;`,
        },
      },
    },
    server: {
      host: true,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
