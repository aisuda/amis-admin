import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import replace from '@rollup/plugin-replace';
import mockApi from './scripts/mockApiPlugin';


var I18N = process.env.I18N;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mockApi(),

    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy', 'classProperties']
        }
      }
    }),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        svgProps: {
          className: 'icon'
        },
        prettier: false,
        dimensions: false
      }
    }),
    monacoEditorPlugin({}),
    replace({
      __editor_i18n: !!I18N,
      preventAssignment: true
    })
  ].filter(n => n),
  // optimizeDeps: {
  //   include: ['amis-formula/lib/doc'],
  //   exclude: ['amis-core', 'amis-formula', 'amis', 'amis-ui'],
  //   esbuildOptions: {
  //     target: 'esnext'
  //   }
  // },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  resolve: {
    alias: [
      {
        find: 'moment/locale',
        replacement: 'moment/dist/locale'
      }
    ]
  }
});
