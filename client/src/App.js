import React, { Component } from "react";
import "./App.css";

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
      <>
        <header>
          <h1 className="text-center">Notes</h1>
        </header>
      </>
    );
  }
}

export default App;
