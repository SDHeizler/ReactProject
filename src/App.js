import React from "react";
import { Route, Link } from "react-router-dom";
import Todos from "./components/todos";
import "./App.css";

function App() {
  return (
    // Used Route with the path to home ('/') and rendered the Links to the other Routes from here.
    <main className="App">
      <Route
        exact
        path="/ReactProject"
        render={() => {
          return (
            <section>
              <header>
                <h1>Reaction Project</h1>
                <div className="LinkCont">
                  <img
                    id="ProfileIcon"
                    src={require("./images/user.png")}
                    alt="Profile Icon"
                  ></img>
                  <a
                    id="ProfileLink"
                    href="https://sdheizler.github.io/MyPortfolio/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Profile
                  </a>
                  <img
                    id="GithubIcon"
                    src={require("./images/github.png")}
                    alt="GithubIcon"
                  ></img>
                  <a
                    id="GithubLink"
                    href="https://github.com/SDHeizler?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                </div>
              </header>
              <div id="Links">
                <div className="ProjectCont">
                  <img
                    id="TodosIcon"
                    src={require("./images/todos.png")}
                    alt="Todo Logo"
                  ></img>
                  <Link id="TodosLink" to="/Todos">
                    Todos Project
                  </Link>
                </div>
              </div>
            </section>
          );
        }}
      ></Route>
      <Route path="/Todos" component={Todos}></Route>
    </main>
  );
}

export default App;
