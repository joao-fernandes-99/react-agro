import React, {useContext} from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom'; 
import Home from './pages/Home';
import Relatorio from './pages/Relatorio';
import Login from './pages/Login/login';
import history from './history';
import {Context} from './Context/AuthContext';

function CustomRoute({ isPrivate, ...rest}){
    const { autenticated } = useContext(Context);

    if(isPrivate && !autenticated){
        console.log(autenticated);
    }
    return <Route {...rest}/>
}

function Routes(){
    return(
        <Router history={history}>
            <Switch>
                <CustomRoute isPrivate path="/home" component={Home} />
                <CustomRoute isPrivate path="/relatorio" component={Relatorio}/>
                <CustomRoute path="/login" component={Login} />
            </Switch>
        </Router>
    );
};

export default Routes;