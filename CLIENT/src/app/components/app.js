import React from 'react';

import Navbar from './navbar';


require('../public/css/style.css');

class App extends React.Component{

    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
            <Navbar/>
            
            </div>
        );
    }
}

export default App;