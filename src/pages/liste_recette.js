import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListeRecette extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: []
        };
      }
      componentDidMount() {
        this.callBackendAPI()
          .then(res => this.setState({ data: res }))
          .catch(err => console.log(err));
      }
      callBackendAPI = async () => {
        const response = await fetch(`http://localhost:8080/`, { method: 'GET' });
        const data = await response.json();
        if (response.status !== 200) {
          throw Error(data.error) 
        }
        return data.result;
      };
  render() {
    return (
        <div>
          <h2>Liste de Recette</h2>
          <Link to={`/recette/creation`} className="nav-link">
            <button type="button" className="btn btn-secondary">Ajouter une recette</button>
          </Link>
          <table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Lien</th>
      <th scope="col">ID</th>
      <th scope="col">Titre</th>
      <th scope="col">Sous titre</th>
      <th scope="col">Listes</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {this.state.data.map((el) => (
      <tr key={el._id}>
      <td>
          <Link to={`/recette/affichage/${el._id}`} className="nav-link">
          <button type="button" className="btn btn-primary">Afficher</button>
          </Link>
      </td>
      <td>{el._id}</td>
      <td>{el.titre}</td>
      <td>{el.sous_titre}</td>
      <td>
        {el.listes.map((e) => ( 
            <span key={e}> - {e} <br></br></span>
        ))}
      </td>
      <td>
      <Link to={`/recette/modification/${el._id}`} className="nav-link"><button type="button" className="btn btn-success">Modifier</button></Link>
      <Link to={`/recette/suppression/${el._id}`}  className="nav-link"><button type="button" className="btn btn-danger">Supprimer</button></Link>

      </td>
    </tr>
      ))}
    
  </tbody>
</table>
          
        </div>
    );
  }
}

export default ListeRecette;