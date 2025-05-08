import { mount } from 'auth/AuthApp';
import React, {useRef, useEffect} from 'react';
import { useHistory } from "react-router-dom";

export default () => {
    // This ref will be used to mount the marketing app
    const ref = useRef(null);
    // browser history object from the container app
    const containerHistory = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: containerHistory.location.pathname,
            /**
             * This is a call back that is called when the marketing app navigates
             * to update the path in the container app
             * @param nextPathname - the path that the marketing app is navigating to
             */
            onNavigate: ({pathname: nextPathname}) => {
                if(containerHistory.location.pathname !== nextPathname) {
                    // We are not on the same path, so we need to update the browser history
                    containerHistory.push(nextPathname);
                }
            },
        });

        // Listen to the history object from the container app
        containerHistory.listen(onParentNavigate);
    }, []);

    // This is the div that will be used to mount the marketing app
    return <div ref={ref} />;
};