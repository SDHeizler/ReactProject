import React from "react";
import "./addTodo.css";

// AddTodo component where the input and add todo button will pass the values up through props back to the Todos component and make the POST request and update the list of todos in state.
class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="inputCont">
        <input
          id="addTodo"
          onChange={(e) => this.props.onChange(e)}
          onKeyPress={(e) => this.props.onKeyPress(e)}
          type="text"
          placeholder="Enter Todo"
          value={this.props.value}
        ></input>
        <button id="addTodoButton" onClick={() => this.props.onClick()}>
          Add Todo
        </button>
      </div>
    );
  }
}

export default AddTodo;
