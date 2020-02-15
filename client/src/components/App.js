import React, { Component } from "react";
import "../stylesheets/App.css";
import List from "./List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      items: []
    };
  }
  render() {
    return (
      <div className="container">
        <header>
          <h1 className="text-center">Notes</h1>
        </header>
        <List />
      </div>
    );
  }
}

export default App;
