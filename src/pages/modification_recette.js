import React, { Component } from 'react';


class ModificationRecette extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      id: props.match.params.id,
        _id: '',
        titre: '',
        sous_titre: '',
        listes: [],
      
    };
    this.deleteFromList = this.deleteFromList.bind(this);
    this.UpdateRecette = this.UpdateRecette.bind(this);
    this.handleChangeTitre = this.handleChangeTitre.bind(this);
    this.handleChangeSousTitre = this.handleChangeSousTitre.bind(this);
    this.handleChangeListes = this.handleChangeListes.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({  
        _id: res._id,
        titre: res.titre,
        sous_titre: res.sous_titre,
        listes: res.listes, 
      }))
      .catch(err => console.log(err));
  }
  callBackendAPI = async () => {
    const response = await fetch(`http://localhost:8080/recette/${this.state.id}`, { method: 'GET' });
    const data = await response.json();
    if (response.status !== 200) {
      throw Error(data.error) 
    }
    return data.result;
  };
  UpdateRecette = async (event) => {
    event.preventDefault();
    console.log({
      titre: this.state.titre,
        sous_titre: this.state.sous_titre,
        listes: this.state.listes 
    })
    const response = await fetch(`http://localhost:8080/recette/${this.state.id}`, { 
      method: 'PUT',
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
    this.setState( {
      titre: data.result.titre,             
      sous_titre: data.result.sous_titre,              
      listes: data.result.listes       
    })
  }
  deleteFromList = async (e) => {
    this.setState( {
      listes: this.state.listes.filter(function(val) { 
        return val !== e.target.value 
        })});
    }
    handleChangeTitre(event) {
      console.log(event.target.value)
      this.setState({titre: event.target.value});
    }
    handleChangeSousTitre(event) {
      console.log(event.target.value)
      this.setState({sous_titre: event.target.value});
    }
    handleChangeListes(event) {
      this.setState({listes: event.target.value.split(',')});
    }

  render() {
    return (
        <div>
          <h2>Modification recette</h2>

          <form onSubmit={this.UpdateRecette}>
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
            
            <button type="submit" className="btn btn-primary">Modifier</button>
          </form>
            
        </div>
    );
  }
}

export default ModificationRecette;