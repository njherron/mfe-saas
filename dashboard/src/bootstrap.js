import {createApp} from 'vue';
import Dashboard from './components/Dashboard.vue';

// Mount function to start the app
const mount = (el) => {
    // Create a new Vue app
    const app = createApp(Dashboard);
    // Mount the app to the element
    app.mount(el);
};

// If in development and not in container, mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_dashboard-dev-root');

    // Mount the app if it is in development and not in a container
    if (devRoot) {
        mount(devRoot);
    }
}

// We are running through container and should export mount function
export { mount };