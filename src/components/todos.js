import React from "react";
import { Link } from "react-router-dom";
import AddTodo from "./addTodo";
import uuid from "react-uuid";
import axios from "axios";
import "./todos.css";

// Todos is a class component with todos, addTodo, and Completed in state. Uses jsonplaceholder as the back-end to make GET, POST, and Delete requests with.
class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      addTodo: "",
      completed: "line-Through",
    };
  }
  // When component mounts, it will make the GET request to show the initial list.
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        } else {
          this.setState({
            todos: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // The onChange event is for the AddTodo component. The component is an input and the onChange event updates the state of 'addTodo' as the user is entering the new todo.
  onChange = (e) => {
    this.setState({
      addTodo: e.target.value,
    });
  };
  // The onClick event is for the button in the AddTodo component. When the button is clicked, it will check to make sure that the user entered a new todo. Then if the user did enter a new todo then a POST request will be made using axios, and the new todo will be added to the list and the addTodo in state will be set back to "".
  onClick = () => {
    if (
      this.state.addTodo === null ||
      this.state.addTodo === undefined ||
      this.state.addTodo === ""
    ) {
      return;
    } else {
      const newTodo = {
        completed: false,
        title: this.state.addTodo,
        userId: 1,
      };
      axios
        .post("https://jsonplaceholder.typicode.com/todos", { newTodo })
        .then((response) => {
          if (response.status !== 201) {
            throw new Error(response.statusText);
          } else {
            const newTodo = {
              id: uuid(), // axios only responses with a 201 id. Doesn't work for multiple todos. Had to use uuid to make unique id for multiple todos.
              title: response.data.newTodo.title,
              completed: response.data.newTodo.completed,
            };
            this.setState({
              todos: [...this.state.todos, newTodo],
              addTodo: "",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // delTodo will take the id of the todo, and convert it into a string to compair like value types. Used the filter method to push all todos that don't match the id of the todo that was selected for deletion to the newTodos array. Then set the todos object in state with the value of the newTodos array. The delete request was sent to jsonplaceholder, no data is returned just a conformation of the delete.
  delTodo = (e) => {
    const eValue = e.toString();
    const newTodos = [];
    this.state.todos.filter((ele) => {
      let eleValue = ele.id.toString();
      if (eValue !== eleValue) {
        newTodos.push(ele);
      }
      return this.setState({
        todos: newTodos,
      });
    });
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${eValue}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Completed method is used when user selects the green checkmark. The method take the id of the todo that was check and compairs it to the id's in the array of todos in state. When the id is matched then completed in that todo will be set to the opposite of what it was.
  Completed = (e) => {
    const idToString = e.toString();
    this.setState({
      todos: this.state.todos.map((ele) => {
        const eleToString = ele.id.toString();
        if (eleToString === idToString) {
          ele.completed = !ele.completed;
        }
        return ele;
      }),
    });
  };
  // getStyle is used to set the style of the todo to line-through or none based on if the completed object in the todo is true or false.
  getStyle = (e) => {
    if (e === true) {
      return { textDecoration: "line-through" };
    } else {
      return { textDecoration: "none" };
    }
  };
  // When user presses 'Enter' after typing in the new todo that they want to add. This event will trigger and do the same thing as the clicking the Add Todo button.
  onKeyPress = (e) => {
    if (e.key === "Enter") {
      const newTodo = {
        completed: false,
        title: this.state.addTodo,
        userId: 1,
      };
      axios
        .post("https://jsonplaceholder.typicode.com/todos", { newTodo })
        .then((response) => {
          if (response.status !== 201) {
            throw new Error(response.statusText);
          } else {
            const newTodo = {
              id: uuid(), // axios only responses with a 201 id. Doesn't work for multiple todos. Had to use uuid to make unique id for multiple todos.
              title: response.data.newTodo.title,
              completed: response.data.newTodo.completed,
            };
            this.setState({
              todos: [...this.state.todos, newTodo],
              addTodo: "",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  render() {
    return (
      <div id="TodosMain">
        {/* Header for title and Link to homepage */}
        <header id="todosHeader">
          <h1 id="todosTitle">Todos App</h1>
          <div id="todosHomeCont">
            <img src={require("../images/home.png")} alt="Home"></img>
            <Link id="todosLink" to="/">
              Home
            </Link>
          </div>
        </header>
        {/* AddTodo component with the input and button to add the Todo and make the POST request from. */}
        <AddTodo
          id="AddTodo"
          onChange={(e) => this.onChange(e)}
          onClick={() => this.onClick()}
          onKeyPress={(e) => this.onKeyPress(e)}
          value={this.state.addTodo}
        ></AddTodo>
        {/* List of the todos with the delete and completed buttons. */}
        <ol>
          {this.state.todos.map((ele) => {
            return (
              <section id="todoCont" key={ele.id}>
                <li id="todosList" style={this.getStyle(ele.completed)}>
                  {ele.title}
                </li>
                <div id="buttonCont">
                  <button
                    className="Delete"
                    id={ele.id}
                    onClick={(e) => this.delTodo(e.target.id)}
                  ></button>
                  <button
                    className="completed"
                    id={ele.id}
                    onClick={(e) => this.Completed(e.target.id)}
                  ></button>
                </div>
              </section>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default Todos;
