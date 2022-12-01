import {defaultTheme, defineUserConfig} from 'vuepress'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
    lang: 'en-US',
    title: 'Vue Ricochet',
    description: 'A lightweight, modern and flexible Vue 3 plugin for creative, responsive object layouts.',
    head: [
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}]
    ],
    theme: defaultTheme({
        navbar: [
            {
                text: 'Guide',
                link: '/guide/',
            },
            {
                text: 'Config',
                link: '/config/'
            }
        ],
        logo: 'https://github.com/marchantweb/vue-ricochet/blob/main/hero.png?raw=true',
        repo: 'https://github.com/marchantweb/vue-ricochet',
        docsDir: 'docs/docs',
        editLink: true,
        editLinkText: "Suggest an edit on GitHub",
        sidebar: [
            {
                text: 'Guide',
                link: '/guide/',
                children: [
                    '/guide/getting-started.md',
                ],
            },
            {
                text: 'Demo',
                link: '/guide/demo.md'
            },
        ],
    }),
    plugins: [
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
    ],
    markdown: {
        importCode: {
            handleImportPath: (str) =>
                str.replace(/^@demo/, path.resolve(__dirname, './components')),
        },
    },
})
