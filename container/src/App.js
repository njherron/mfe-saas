import React, {lazy, Suspense, useState, useEffect }from 'react';
import {Router, Redirect, Route, Switch} from "react-router-dom";
import {StylesProvider, createGenerateClassName} from "@material-ui/core";
import { createBrowserHistory } from 'history';
import Header from './components/Header';
import Progress from "./components/Progress";

// Lazy load the Marketing and Auth apps
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory();

export default () => {
    // capture the signed in state
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if(isSignedIn){
            history.push('/dashboard');
        }
    }, [isSignedIn])

    return (
        <Router history={history}>
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
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to='/' />}
                                <DashboardLazy/>
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};