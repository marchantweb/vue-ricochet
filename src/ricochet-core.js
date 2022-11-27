/*!
 * Ricochet Core
 *
 * @license MIT
 * @author: Simon Le Marchant, simon@marchantweb.com
*/

import RicochetContainer from './components/RicochetContainer.vue';

class Ricochet {

    // Default Configuration
    _config = {

        /**
         * The frame rate at which to update elements positioned with ricochet (x per second)
         */
        fps: 60
    }

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
     * The installation hook that Vue 3 uses to install the plugin
     * @param app
     * @param options
     */
    install(app, options) {

        // Merge options into _config
        if (options) {
            this._config = Object.assign(this._config, options);
        }

        // Expose ricochet to the rest of the application
        app.config.globalProperties.$ricochet = this;
        app.provide('ricochet', this);

        // Declare the components
        app.component("ricochetContainer", RicochetContainer);
    }
}

/**
 * Ricochet is a lightweight JS library that integrates with Vue 3 and provides creative options for object positioning.
 * @type {Ricochet}
 */
const ricochetInstance = new Ricochet();

export {
    ricochetInstance as ricochet
}
