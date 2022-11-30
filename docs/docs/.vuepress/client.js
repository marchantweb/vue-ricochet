import {defineClientConfig} from '@vuepress/client'
import ricochet from '../../../index'

export default defineClientConfig({
    enhance({app, router, siteData}) {
        if (!__VUEPRESS_SSR__) {
            app.use(ricochet);
        }
    },
    setup() {
    },
    rootComponents: [],
})
