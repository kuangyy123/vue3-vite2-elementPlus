import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
import {resolve} from 'path'
import PluginImportToCDN from 'vite-plugin-cdn-import'
import viteCompression from 'vite-plugin-compression'
// import viteImagemin from 'vite-plugin-imagemin'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), 
    viteCompression(),   //gzip代码压缩配置
    // viteImagemin({
    //   gifsicle: {
    //     optimizationLevel: 7,
    //     interlaced: false,
    //   },
    //   optipng: {
    //     optimizationLevel: 7,
    //   },
    //   mozjpeg: {
    //     quality: 20,
    //   },
    //   pngquant: {
    //     quality: [0.8, 0.9],
    //     speed: 4,
    //   },
    //   svgo: {
    //     plugins: [
    //       {
    //         name: 'removeViewBox',
    //       },
    //       {
    //         name: 'removeEmptyAttrs',
    //         active: false,
    //       },
    //     ],
    //   },
    // }),  //打包图片配置
    PluginImportToCDN({
      //cdn配置
      modules:[
        {
          name:'vue',
          var:'vue',
          path:'https://unpkg.com/vue@next',
        },
        {
          name:'element-plus',
          var:'ElementPlus',
          path:'https://unpkg.com/element-plus"',
          css:'https://unpkg.com/element-plus/dist/index.css'
        }
      ]
    })
  ],
  resolve:{
    alias:{
      '@':resolve(__dirname,'.','src')
    }
  },
  build:{
    minify:'terser',
    terserOptions:{
      compress:{
        //生产环境时移除console.log
      drop_console:true,
      drop_debugger:true,
      }
      
    },
    rollupOptions:{
      //打包输出文件夹配置
      output:{
        chunkFileNames:'static/js/[name]-[hash].js',
        entryFileNames:'static/js/[name]-[hash].js',
        assetFileNames:'static/[ext]/[name]-[hash].[ext]',
      }
    }
  },
  server: {
    // port: 8080,
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false,
    hmr:true, //开启热更新
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },


})
