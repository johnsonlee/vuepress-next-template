import chokidar = require('chokidar')
import { logger, path } from '@vuepress/utils';
import type { DefaultThemeOptions } from 'vuepress';
import { defineUserConfig } from 'vuepress';
import { navbar, sidebar } from './configuration';

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',
  lang: 'en-US',
  dest: './dist',
  title: 'Title',
  description: 'Description',
  locales: {
    '/en/': {
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Title',
      description: 'Description',
    },
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['script', { src: 'https://hm.baidu.com/hm.js?7c44326578f78c601cc7e5fa06017333' }]
  ],
  bundler: process.env.DOCS_BUNDLER ?? '@vuepress/vite',
  themeConfig: {
    repo: 'johnsonlee/vuepress-next-template',
    docsRepo: 'johnsonlee/vuepress-next-template',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkPattern: ':repo/edit/:branch/:path',
    logo: '/logo.png',
    locales: {
      '/': {
        navbar: navbar.en,
        sidebar: sidebar.en,

        editLinkText: 'Edit this page on GitHub',
        lastUpdatedText: 'Last Updated',
      },
      '/en/': {
        navbar: navbar.en,
        selectLanguageName: 'English',
        selectLanguageText: 'Languages',
        selectLanguageAriaLabel: 'Languages',

        sidebar: sidebar.en,

        editLinkText: 'Edit this page on GitHub',
        lastUpdatedText: 'Last Updated',
      },
      '/zh/': {
        navbar: navbar.zh,
        selectLanguageName: '????????????',
        selectLanguageText: '????????????',
        selectLanguageAriaLabel: '????????????',

        sidebar: sidebar.zh,

        editLinkText: '??? GitHub ????????????',
        lastUpdatedText: '????????????',
        contributorsText: '?????????',

        tip: '??????',
        warning: '??????',
        danger: '??????',

        notFound: [
          '?????????????????????',
          '???????????????????????????',
          '???????????? 404 ??????',
          '???????????????????????????????????????',
        ],
        backToHome: '????????????',

        openInNewWindow: '??????????????????',
        toggleDarkMode: '??????????????????',
        toggleSidebar: '???????????????',
      },
    },
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      skipWaiting: true,
    }],
    ['@vuepress/plugin-google-analytics', {
      id: 'UA-166011311-1'
    }],
    ['@vuepress/container', {
      type: 'right',
      defaultTitle: '',
    }],
    ['@vuepress/container', {
      type: 'theorem',
      before: (info) => `<div class="theorem"><p class="title">${info}</p>`,
      after: '</div>'
    }],
    ['@vuepress/git'],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/toc'],
    ['@vuepress/plugin-docsearch', {
      locales: {
        '/zh/': {
          placeholder: '????????????'
        },
      },
    }],
    ['@vuepress/plugin-register-components', {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
  ],

  onWatched: (_, watchers, restart) => {
    const confWatcher = chokidar.watch([
      './configuration/**/*.ts',
      '../en/**/*.md',
      '../zh/**/*.md',
    ], {
      cwd: __dirname,
      ignoreInitial: true,
    });

    confWatcher.on('change', async (file) => {
      logger.info(`file ${file} is modified`);
      await restart();
    });

    watchers.push(confWatcher);
  },
})
