import React, { Component } from "react";
import { getList, addToList, deleteItem, updateItem } from "./ListFunctions";
import "../stylesheets/List.css";

class List extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      term: "",
      items: [],
      activeChange: []
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  onChange = event => {
    this.setState({ term: event.target.value });
    console.log(this.state.editDisabled);
  };

  activeChange = () => {
    this.setState({
      activeChange: [false]
    });
  };

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
      this.activeChange();
    });
  };

  onAdd = e => {
    e.preventDefault();
    addToList(`(Click and write)`).then(() => {
      this.getAll();
    });
  };

  onUpdate = e => {
    e.preventDefault();
    updateItem(this.state.term, this.state.id).then(() => {
      this.getAll();
    });
  };

  onEdit = (item, itemid, index, e) => {
    e.preventDefault();
    if (this.state.activeChange[index] !== true) {
      let activeChange = [false];
      activeChange[index] = true;
      this.setState({
        id: itemid,
        term: item,
        activeChange: activeChange
      });
      setTimeout(() => {
        document.querySelector(".textEdit").focus();
      }, 100);
    }
  };

  onDelete = (val, e) => {
    e.preventDefault();
    deleteItem(val);

    var data = [...this.state.items];
    data.filter(function(item, index) {
      if (item[1] === val) {
        data.splice(index, 1);
      }
      return true;
    });
    let activeChange = [false];
    this.setState({ items: [...data], activeChange: activeChange });
  };

  boldText = () => {
    document.querySelector(".textEdit").value += " <b>Bold Text</b>";
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
                <div onClick={this.onEdit.bind(this, item[0], item[1], index)}>
                  {this.state.activeChange[index] ? (
                    <>
                      <button className="boldText" onClick={this.boldText}>
                        Bold text
                      </button>
                      <textarea
                        className="textEdit"
                        id="taskName"
                        rows="20"
                        maxLength="300"
                        value={this.state.term || ""}
                        onChange={this.onChange.bind(this)}
                      />
                      <button className="save" onClick={this.onUpdate.bind(this)}>
                        Save
                      </button>
                    </>
                  ) : (
                    <p dangerouslySetInnerHTML={{ __html: item[0] }}></p>
                  )}
                </div>
                <button className="deleteButton" onClick={this.onDelete.bind(this, item[1])}>
                  X
                </button>
              </div>
            ))}
        </section>
      </>
    );
  }
}

export default List;
