import React, { Component } from "react";
import DogadajDataService from "../services/DogadajService";
import { Link } from "react-router-dom";

export default class DogadajiList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNaziv = this.onChangeSearchNaziv.bind(this);
    this.retrieveDogadaji = this.retrieveDogadaji.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDogadaj = this.setActiveDogadaj.bind(this);
    this.removeAllDogadaji = this.removeAllDogadaji.bind(this);
    this.searchNaziv = this.searchNaziv.bind(this);

    this.state = {
      dogadaji: [],
      currentDogadaj: null,
      currentIndex: -1,
      searchNaziv: ""
    };
  }

  componentDidMount() {
    this.retrieveDogadaji();
  }

  onChangeSearchNaziv(e) {
    const searchNaziv = e.target.value;

    this.setState({
      searchNaziv: searchNaziv
    });
  }

  retrieveDogadaji() {
    DogadajDataService.getAll()
      .then(response => {
        this.setState({
          dogadaji: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDogadaji();
    this.setState({
      currentDogadaj: null,
      currentIndex: -1
    });
  }

  setActiveDogadaj(dogadaj, index) {
    this.setState({
      currentDogadaj: dogadaj,
      currentIndex: index
    });
  }

  removeAllDogadaji() {
    DogadajDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNaziv() {
    DogadajDataService.findByNaziv(this.state.searchNaziv)
      .then(response => {
        this.setState({
          dogadaji: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { searchNaziv, dogadaji, currentDogadaj, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by naziv"
              value={searchNaziv}
              onChange={this.onChangeSearchNaziv}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNaziv}
              >
                Pretraži
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista događaja</h4>

          <ul className="list-group">
            {dogadaji &&
              dogadaji.map((dogadaj, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDogadaj(dogadaj, index)}
                  key={index}
                >
                  {dogadaj.naziv}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllDogadaji}
          >
            Ukloni sve
          </button>
        </div>
        <div className="col-md-6">
          {currentDogadaj ? (
            <div>
              <h4>Događaj</h4>
              <div>
                <label>
                  <strong>Naziv:</strong>
                </label>{" "}
                {currentDogadaj.naziv}
              </div>
              <div>
                <label>
                  <strong>Opis:</strong>
                </label>{" "}
                {currentDogadaj.opis}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentDogadaj.favorit ? "Favorit" : "Pending"}
              </div>

              <Link
                to={"/dogadaji/" + currentDogadaj.id}
                className="badge badge-warning"
              >
                Uredi
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Odaberite željeni događaj...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}