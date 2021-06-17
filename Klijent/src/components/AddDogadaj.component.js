import React, { Component } from "react";
import DogadajDataService from "../services/DogadajService";

export default class AddDogadaj extends Component {
  constructor(props) {
    super(props);
    this.onChangeNaziv = this.onChangeNaziv.bind(this);
    this.onChangeOpis = this.onChangeOpis.bind(this);
    this.saveDogadaj = this.saveDogadaj.bind(this);
    this.newDogadaj = this.newDogadaj.bind(this);

    this.state = {
      id: null,
      naziv: "",
      opis: "", 
      favorit: false,

      submitted: false
    };
  }

  onChangeNaziv(e) {
    this.setState({
      naziv: e.target.value
    });
  }

  onChangeOpis(e) {
    this.setState({
      opis: e.target.value
    });
  }

  saveDogadaj() {
    var data = {
      naziv: this.state.naziv,
      opis: this.state.opis
    };

    DogadajDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          naziv: response.data.naziv,
          opis: response.data.opis,
          favorit: response.data.favorit,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newDogadaj() {
    this.setState({
      id: null,
      naziv: "",
      opis: "",
      favorit: false,

      submitted: false
    });
  }
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Uspješno potvrđeno!</h4>
            <button className="btn btn-success" onClick={this.newDogadaj}>
              Dodaj
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="naziv">Naziv</label>
              <input
                type="text"
                className="form-control"
                id="naziv"
                required
                value={this.state.naziv}
                onChange={this.onChangeNaziv}
                name="naziv"
              />
            </div>

            <div className="form-group">
              <label htmlFor="opis">Opis</label>
              <input
                type="text"
                className="form-control"
                id="opis"
                required
                value={this.state.opis}
                onChange={this.onChangeOpis}
                name="opis"
              />
            </div>

            <button onClick={this.saveDogadaj} className="btn btn-success">
              Potvrdi
            </button>
          </div>
        )}
      </div>
    );
  }
}