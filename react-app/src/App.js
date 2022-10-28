import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import ProtectedRoute from './components/Auth/ProtectedRoute';
import { authenticate } from './store/session';
import Splash from './components/Splash';
import Footer from './components/Footer';
import Game from './components/Game';

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

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
                <Route path='/play'>
                    <Game />
                </Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}
