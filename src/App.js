import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
      <Router>
        <div className="App">
          <Switch>
            <Route path="/"
                   exact
                   component={()=><Books/>}
            />
            <Route path="/create"
                   exact
                   component={()=><CreateBook/>}
            />
            <Route path="/edit/:id"
                   exact
                   component={()=><CreateBook/>}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
