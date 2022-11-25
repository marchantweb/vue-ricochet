/*!
 * Ricochet Core
 *
 * @license MIT
 * @author: Simon Le Marchant, simon@marchantweb.com
*/

import RicochetContainer from './components/RicochetContainer.vue';

class Ricochet {

    /**
     * Constructor implements a singleton pattern, returns existing instance if one exists
     * @returns {Ricochet}
     */
    constructor() {
        if (Ricochet._instance) {
            return Ricochet._instance
        }
        Ricochet._instance = this;
    }

    /**
     * The installation hook that VueJS uses to install the plugin
     * @param app
     * @param options
     */
    install(app, options) {

        // Expose ricochet to the rest of the application
        app.config.globalProperties.$ricochet = this;
        app.provide('ricochet', this);

        // Declare the components
        app.component("ricochet-container", RicochetContainer);
    }
}

/**
 * Ricochet is a lightweight JS library that integrates with VueJS and provides creative options for object positioning.
 * @type {Ricochet}
 */
const ricochetInstance = new Ricochet();

export {
    ricochetInstance as ricochet
}
