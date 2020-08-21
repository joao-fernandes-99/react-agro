import React from 'react';
import Routes from './routes';
import { AuthProvider } from './Context/AuthContext';


class App extends React.Component{
  render(){
    return(
      <div>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
    </div>
    );
  }
}

export default App;
