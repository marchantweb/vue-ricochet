import {defineClientConfig} from '@vuepress/client'

export default defineClientConfig({
    async enhance({app, router, siteData}) {
        if (!__VUEPRESS_SSR__) {
            const ricochet = await import('vue-ricochet')
            app.use(ricochet.default);
        }
    },
    setup() {
    },
    rootComponents: [],
})
