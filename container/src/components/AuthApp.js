import { mount } from 'auth/AuthApp';
import React, {useRef, useEffect} from 'react';
import { useHistory } from "react-router-dom";

/**
 * This component is used to mount the Auth app
 * @param onSignIn - This is a callback function that is called when the user signs in
 * @returns {Element}
 */
export default ({onSignIn}) => {
    // This ref will be used to mount the Auth app
    const ref = useRef(null);
    // browser history object from the container app
    const containerHistory = useHistory();

    useEffect(() => {
        /**
         * This is the mount function that will be used to mount the Auth app
         * @param ref - This is the ref that will be used to mount the Auth app in the container app
         * @returns {Object} - This is an object that contains the onParentNavigate function that will be used to update the path in the container app
         * @param onParentNavigate - This is a call back that is called when the container app navigates to update the path in the Auth app
         */
        const { onParentNavigate } = mount(ref.current, {
            /**
             * This is the initial path that will be used to mount the Auth app
             */
            initialPath: containerHistory.location.pathname,
            /**
             * This is a call back that is called when the Auth app navigates
             * to update the path in the container app
             * @param nextPathname - the path that the Auth app is navigating to
             */
            onNavigate: ({pathname: nextPathname}) => {
                if(containerHistory.location.pathname !== nextPathname) {
                    // We are not on the same path, so we need to update the browser history
                    containerHistory.push(nextPathname);
                }
            },
            /**
             * This is a call back that is called when the user signs in
             */
            onSignIn
        });

        // Listen to the history object from the container app
        containerHistory.listen(onParentNavigate);
    }, []);

    // This is the div that will be used to mount the Auth app
    return <div ref={ref} />;
};