/*!
 * Ricochet Core
 *
 * @license MIT
 * @author: Simon Le Marchant, simon@marchantweb.com
*/

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
        console.log('Ricochet Instantiated');
    }

    /**
     * The installation hook that VueJS uses to install the plugin
     * @param app
     * @param options
     */
    install(app, options) {
        console.log("Installing Ricochet as VueJS Plugin", app, options);
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
