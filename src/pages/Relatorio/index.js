import React from 'react';
import Menu from 'C:/Users/NOTEBOOK/Desktop/curso react/tutorial/src/Menu.js';
import { AuthProvider } from '../../Context/AuthContext';
import BodyRelatorio from './corpoRelatorio';


class Relatorio extends React.Component{
    render(){
        return(
            <div>
                <AuthProvider>
                    <Menu/>
                    <BodyRelatorio/>
                </AuthProvider>
                
            </div>
        );
    }
}

export default Relatorio;