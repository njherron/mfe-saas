import React, {lazy, Suspense, useState }from 'react';
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
    // capture the signed in state
    const [isSignedIn, setIsSignedIn] = useState(false)
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    {/*Header is shown all the time and is provided the signed in state*/}
                    <Header isSignedIn={isSignedIn} onSignOut={() => {setIsSignedIn(false)}}/>
                    {/*show loading for slow connection speeds*/}
                    {/*lazy load other components when we need them*/}
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path="/auth">
                                {/*pass in signed in setter to be invoked within AuthApp*/}
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
};