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

  onAdd = e => {
    e.preventDefault();
    addToList("(empty)").then(() => {
      this.getAll();
    });
  };

  render() {
    return (
      <>
        <button className="addNote" onClick={this.onAdd}>
          <h2>+</h2>
        </button>
        <section className="listNotes">
          {this.state.items
            .slice(0)
            .reverse()
            .map((item, index) => (
              <div key={index}>
                <div>
                  <p>{item[0]}</p>
                </div>
              </div>
            ))}
        </section>
      </>
    );
  }
}

export default List;
