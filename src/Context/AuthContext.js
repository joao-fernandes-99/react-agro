import React, {createContext, useState, useEffect} from 'react';
import api from '../pages/Login/apiLogin';
import history from '../history';

const Context = createContext();

function AuthProvider({ children }){
    const [ autenticated, setAutenticated ] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
          api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
          setAutenticated(true);
        }else{
            console.log("Não pegou o Token!!!");
        }
    
      });

    function onSend(){
        var login = document.getElementById('login');
        var senha = document.getElementById('senha');
        const response = api.post('/login',{user_login: login.value, user_senha:senha.value});
        response.then(response => {
            localStorage.setItem('token', JSON.stringify(response.data.acess_token));
            api.defaults.headers.Authorization = `Bearer ${response.data.acess_token}`;
            setAutenticated(true);
            history.push('/home');
        });
        
}

    function handleLogout(){
        setAutenticated(false);
        localStorage.removeItem('token');
        api.defaults.Authorization = undefined;
        history.push('/login');
    }



return(
    <Context.Provider value={{autenticated, onSend, handleLogout }}>
        { children}
    </Context.Provider>
);    

}

export {Context, AuthProvider};