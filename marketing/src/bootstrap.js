import React from 'react';
import ReactDOM from 'react-dom';
import {createMemoryHistory, createBrowserHistory} from 'history';
import App from './App';

// Mount function to start the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    // If defaultHistory is not provided, create a new memory history object
    const marketingHistory = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if(onNavigate){
        // Listen to the history object from the marketing app
        // and call the onNavigate function when the path changes
        marketingHistory.listen(onNavigate);
    }

    ReactDOM.render(
        // Pass the history object to the App component
        <App history={marketingHistory} />,
        el
    );

    return {
        /**
         * This is a call back that is called when the container app history changes
         * @param nextPathname - the path that the container app is navigating to
         */
        onParentNavigate({pathname: nextPathname}) {
            if(marketingHistory.location.pathname !== nextPathname) {
                // We are not on the same path, so we need to update the browser history
                marketingHistory.push(nextPathname);
            }
        }
    }
};

// If in development and not in container, mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');

    // Mount the app if it is in development and not in a container
    if (devRoot) {
        // Use browser history in development mode
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

// We are running through container and should export mount function
export { mount };