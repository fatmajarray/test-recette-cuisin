import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css';
import ListeRecette from "./pages/liste_recette";
import AffichageRecette from "./pages/affichage_recette";
import ModificationRecette from "./pages/modification_recette";
import SuppressionRecette from "./pages/suppression_recette";
import CreationRecette from './pages/creation_recette';


class App extends Component {
  render() {
  return (
    <Router>
        <div>
          <h2>Bienvenue dans notre site de recette</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
             <li><Link to={'/'} className="nav-link"> Liste de recettes </Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={ListeRecette} />
              <Route path='/recette/creation' component={CreationRecette} />
              <Route path='/recette/modification/:id' component={ModificationRecette} />
              <Route path='/recette/affichage/:id' component={AffichageRecette} />
              <Route path='/recette/suppression/:id' component={SuppressionRecette} />
          </Switch>
        </div>
      </Router>
  );
  }
}

export default App;
