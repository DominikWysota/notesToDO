import React, { Component } from "react";
import { getList, addToList, deleteItem, updateItem } from "./ListFunctions";

class List extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      term: "",
      items: []
    };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
          term: "",
          items: [...data]
        },
        () => {
          console.log(this.state.items);
        }
      );
    });
  };

  render() {
    return <></>;
  }
}

export default List;
