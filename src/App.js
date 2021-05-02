import React, { Component } from 'react';
import Books from './containers/Books';
import CreateBook from './containers/CreateBook';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="App">
        <Books/>
        <CreateBook/>
      </div>
    );
  }
}

export default App;
