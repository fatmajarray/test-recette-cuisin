import React, { Component } from 'react';

class SuppressionRecette extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          id: props.match.params.id,
          data: {
            _id: '',
            titre: '',
            sous_titre: '',
            listes: []
          },
          message: ''
        };
        this.deleteRecette = this.deleteRecette.bind(this);
      }
    
      componentDidMount() {
        this.callBackendAPI()
          .then(res => this.setState({ data: res }))
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
      deleteRecette = async () => {
        const response = await fetch(`http://localhost:8080/recette/${this.state.id}`, { method: 'DELETE' });
        const data = await response.json();
        if (response.status !== 200) {
          throw Error(data.error) 
        }
        this.setState({ message: data.result });
      }
  render() {
      if(this.state.message === ''){
        return (
            <div>
              <h2>Suppression de la recette</h2>
              <h3>ID: </h3>{this.state.data._id}
                <h3>Titre: </h3>{this.state.data.titre}
                <h3>Sous titre: </h3>{this.state.data.sous_titre}
                <h3>Liste: </h3> 
                {this.state.data.listes.map((el) => (
                  <span key={el}> - {el} <br></br></span>
                ))}
                <button type="button" className="btn btn-danger" onClick={this.deleteRecette}>Supprimer</button>
            </div>
        );
      } else {
        return (
            <div>
              <h2>Suppression de la recette</h2>
                <div className="alert alert-danger" role="alert">
                    {this.state.message}
                </div>
            </div>
        );
      }
    
  }
}

export default SuppressionRecette;