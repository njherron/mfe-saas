import { mount } from 'dashboard/DashboardApp';
import React, {useRef, useEffect} from 'react';


export default () => {
    // This ref will be used to mount the Auth app
    const ref = useRef(null);
    // browser history object from the container app

    useEffect(() => {
        mount(ref.current);
    }, []);

    // This is the div that will be used to mount the Auth app
    return <div ref={ref} />;
};