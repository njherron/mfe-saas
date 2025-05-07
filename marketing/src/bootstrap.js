import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Mount function to start the app
const mount = (el) => {
    ReactDOM.render(
        <App />,
        el
    );
};

// If in development and not in container, mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');

    // Mount the app if it is in development and not in a container
    if (devRoot) {
        mount(devRoot);
    }
}

// We are running through container and should export mount function
export { mount };