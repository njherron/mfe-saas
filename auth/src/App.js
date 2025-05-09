import React from "react";
import {Switch, Route, Router} from "react-router-dom";
import {StylesProvider, createGenerateClassName} from "@material-ui/core/styles";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";

/**
 * This function generates a unique class names for the Auth app.
 * @type {GenerateId}
 */
const generateClassName = createGenerateClassName({
    productionPrefix: 'au'
})

/**
 * This is the main entry point for the Auth app.
 * @param history - This is the history object that will be used to navigate to different routes, provided by the container app
 * @param onSignIn - This is a callback function that is called when the user signs in
 * @returns {Element}
 */
export default ({history, onSignIn}) => {
    return (
        <div>
            <StylesProvider generateClassName={generateClassName}>
                {/*Link the history object to the Router*/}
                <Router history={history}>
                    <Switch>
                        <Route path="/auth/signin" >
                            {/*Pass the onSignIn function to the SignIn component*/}
                            <SignIn onSignIn={onSignIn} />
                        </Route>
                        <Route path="/auth/signup">
                            {/*Pass the onSignIn function to the SignUp component*/}
                            <SignUp onSignIn={onSignIn} />
                        </Route>
                    </Switch>
                </Router>
            </StylesProvider>
        </div>
    );
}