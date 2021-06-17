import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddDogadaj from "./components/AddDogadaj.component";
import Dogadaj from "./components/Dogadaj.component";
import DogadajiList from "./components/DogadajiList.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/dogadaji" className="navbar-brand">
            GOREvent
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/dogadaji"} className="nav-link">
                Događaji
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Dodaj
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/Dogadaji"]} component={DogadajiList} />
            <Route exact path="/add" component={AddDogadaj} />
            <Route path="/Dogadaji/:id" component={Dogadaj} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;