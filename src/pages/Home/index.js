import React from 'react';

import Menu from 'C:/Users/NOTEBOOK/Desktop/curso react/tutorial/src/Menu.js';
import Corpo from 'C:/Users/NOTEBOOK/Desktop/curso react/tutorial/src/corpo';
import { AuthProvider } from '../../Context/AuthContext';

class Home extends React.Component{
    render(){
        return(
            <div>
                <AuthProvider>
                    <Menu/>
                    <Corpo/>
                </AuthProvider>
                
            </div>
        );
    }
}
export default Home;