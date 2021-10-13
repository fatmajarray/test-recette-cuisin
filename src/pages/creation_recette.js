import React, { Component } from 'react';


class CreationRecette extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        _id: '',
        titre: '',
        sous_titre: '',
        listes: [],
      
    };
    this.creationRecette = this.creationRecette.bind(this);
    this.handleChangeTitre = this.handleChangeTitre.bind(this);
    this.handleChangeSousTitre = this.handleChangeSousTitre.bind(this);
    this.handleChangeListes = this.handleChangeListes.bind(this);
  }


  creationRecette = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:8080/recette`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        titre: this.state.titre,
        sous_titre: this.state.sous_titre,
        listes: this.state.listes 
      })
     });
    const data = await response.json();
    if (response.status !== 200) {
      throw Error(data.error) 
    }
    this.setState(prevState => {
      let res = Object.assign({}, prevState.data);
      res.titre = data.result.titre;               
      res.sous_titre = data.result.sous_titre;               
      res.listes = data.result.listes;               
      return { res };
    })
  }

    handleChangeTitre(event) {
      this.setState({titre: event.target.value});
    }
    handleChangeSousTitre(event) {
      this.setState({sous_titre: event.target.value});
    }
    handleChangeListes(event) {
        this.setState({listes: event.target.value.split(',')});
    }

  render() {
    return (
        <div>
          <h2>Ajouter une recette</h2>

          <form onSubmit={this.creationRecette}>
            <div className="form-group">
              <label htmlFor="titre">Titre</label>
              <input type="text" className="form-control" id="titre" value={this.state.titre} onChange={this.handleChangeTitre}/>
            </div>
            <div className="form-group">
              <label htmlFor="sous_titre">Sous Titre</label>
              <input type="text" className="form-control" id="sous_titre" value={this.state.sous_titre} onChange={this.handleChangeSousTitre}/>
            </div>
            <div className="form-group">
              <label htmlFor="listes">List</label>
              <input type="text" className="form-control" id="listes" value={this.state.listes} onChange={this.handleChangeListes}/>
            </div>
            
            <button type="submit" className="btn btn-primary">Ajouter</button>
          </form>
            
        </div>
    );
  }
}

export default CreationRecette;