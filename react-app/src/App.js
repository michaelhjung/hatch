import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/Auth/LoginForm';
import SignUpForm from './components/Auth/SignUpForm';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import Splash from './components/Splash';
import Footer from './components/Footer';
import Game from './components/Game';

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    // // testing purposes only:
    // const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Splash />
                </Route>
                <Route exact path='/play'>
                    <Game />
                </Route>
            </Switch>
            <Footer />

            {/* <Navbar />
            <Switch>
                <Route path='/login' exact={true}>
                    <LoginForm />
                </Route>
                <Route path='/sign-up' exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path='/users/:userId' exact={true} >
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path='/' exact={true} >
                    <div>
                        <h1>My Home Page</h1>
                    </div>
                </ProtectedRoute>
            </Switch> */}
        </BrowserRouter>
    );
}
