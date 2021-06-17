import React, { Component } from "react";
import DogadajDataService from "../services/DogadajService";

export default class Dogadaj extends Component {
  constructor(props) {
    super(props);
    this.onChangeNaziv = this.onChangeNaziv.bind(this);
    this.onChangeOpis = this.onChangeOpis.bind(this);
    this.getDogadaj = this.getDogadaj.bind(this);
    this.updateFavorit = this.updateFavorit.bind(this);
    this.updateDogadaj = this.updateDogadaj.bind(this);
    this.deleteDogadaj = this.deleteDogadaj.bind(this);

    this.state = {
      currentDogadaj: {
        id: null,
        naziv: "",
        opis: "",
        favorit: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getDogadaj(this.props.match.params.id);
  }

  onChangeNaziv(e) {
    const naziv = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDogadaj: {
          ...prevState.currentDogadaj,
          naziv: naziv
        }
      };
    });
  }

  onChangeOpis(e) {
    const opis = e.target.value;
    
    this.setState(prevState => ({
      currentDogadaj: {
        ...prevState.currentDogadaj,
        opis: opis
      }
    }));
  }

  getDogadaj(id) {
    DogadajDataService.get(id)
      .then(response => {
        this.setState({
          currentDogadaj: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateFavorit(status) {
    var data = {
      id: this.state.currentDogadaj.id,
      naziv: this.state.currentDogadaj.naziv,
      opis: this.state.currentDogadaj.opis,
      favorit: status
    };

    DogadajDataService.update(this.state.currentDogadaj.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentDogadaj: {
            ...prevState.currentDogadaj,
            favorit: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateDogadaj() {
    DogadajDataService.update(
      this.state.currentDogadaj.id,
      this.state.currentDogadaj
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Događaj je uspješno ažuriran!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDogadaj() {    
    DogadajDataService.delete(this.state.currentDogadaj.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/dogadaji')
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentDogadaj } = this.state;

    return (
      <div>
        {currentDogadaj ? (
          <div className="edit-form">
            <h4>Događaj</h4>
            <form>
              <div className="form-group">
                <label htmlFor="naziv">Naziv</label>
                <input
                  type="text"
                  className="form-control"
                  id="naziv"
                  value={currentDogadaj.naziv}
                  onChange={this.onChangeNaziv}
                />
              </div>
              <div className="form-group">
                <label htmlFor="opis">Opis</label>
                <input
                  type="text"
                  className="form-control"
                  id="opis"
                  value={currentDogadaj.opis}
                  onChange={this.onChangeOpis}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentDogadaj.favorit ? "Favorit" : "Pending"}
              </div>
            </form>

            {currentDogadaj.favorit ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateFavorit(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateFavorit(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteDogadaj}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateDogadaj}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Odaberite željeni događaj...</p>
          </div>
        )}
      </div>
    );
  }
}