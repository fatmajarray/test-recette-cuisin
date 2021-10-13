import React, { Component } from 'react';

class AffichageRecette extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      id: props.match.params.id,
      data: {
        _id: '',
        titre: '',
        sous_titre: '',
        listes: []
      }
    };
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
  render() {
    return (
        <div>
          <h2>Affichage de la recette {this.state.data.titre}</h2>
          <h3>ID: </h3>{this.state.data._id}
            <h3>Titre: </h3>{this.state.data.titre}
            <h3>Sous titre: </h3>{this.state.data.sous_titre}
            <h3>Liste: </h3> 
            {this.state.data.listes.map((el) => (
              <span> - {el} <br></br></span>
            ))}
        </div>
    );
  }
}

export default AffichageRecette;