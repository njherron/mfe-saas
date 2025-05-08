import React, {lazy, Suspense}from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {StylesProvider, createGenerateClassName} from "@material-ui/core";
import Header from './components/Header';
import Progress from "./components/Progress";

// Lazy load the Marketing and Auth apps
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

export default () => {
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header />
                    {/*show loading for slow connection speeds*/}
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path="/auth" component={AuthLazy} />
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
};