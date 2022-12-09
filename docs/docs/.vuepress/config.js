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
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/images/favicon.png"}],
        ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/images/favicon.png"}],
        ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/images/favicon.png"}],
        ['link', { rel: "shortcut icon", href: "/images/favicon.png"}],
        ['meta', { name: "msapplication-TileColor", content: '#3eaf7c'}],
        ['meta', { name: "theme-color", content: '#3eaf7c'}],
    ],
    theme: defaultTheme({
        navbar: [
            {
                text: 'Guide',
                link: '/guide/',
            },
            {
                text: 'Demo',
                link: '/guide/demo.md'
            }
        ],
        logo: '/images/favicon.png',
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
                    '/guide/custom-callbacks.md'
                ],
            },
            {
                text: 'Configuration Reference',
                children: [
                    {
                        text: 'Shape Functions',
                        children: [
                            '/config/shapes/line.md'
                        ],
                    },
                    '/config/vueContainer.md'
                ],
            },
            {
                text: 'Demo',
                link: '/guide/demo.md'
            },
        ],
        sidebarDepth: 1
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
