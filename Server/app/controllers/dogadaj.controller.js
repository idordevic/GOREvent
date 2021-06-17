const db = require("../models");
const dogadaj = db.dogadajs;
const Op = db.Sequelize.Op;

// Kreiranje i spremanje nobog događaja
exports.create = (req, res) => {
    // Validate request
    if (!req.body.naziv) {
      res.status(400).send({
        message: "Sadržaj mora biti popunjen!"
      });
      return;
    }
  
    // Create a dogadaj
    const dogadaj = {
      naziv: req.body.naziv,
      opis: req.body.opis,
      favorit: req.body.favorit ? req.body.favorit : false
    };
  
    // Save dogadaj in the database
    dogadaj.create(dogadaj)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Greška prilikom kreiranja događaja!"
        });
      });
  };

// Vračanje događaja iz baze
exports.findAll = (req, res) => {
    const naziv = req.query.naziv;
    var condition = naziv ? { naziv: { [Op.like]: `%${naziv}%` } } : null;
  
    dogadaj.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Greška prilikom dohvačanja događaja!"
        });
      });
  };

// Pretraga događaja po id-u
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    dogadaj.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Greška događaja id=" + id
        });
      });
  };

// Ažuriranje događaja
exports.update = (req, res) => {
    const id = req.params.id;
  
    dogadaj.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Događaj je uspješno ažuriran!"
          });
        } else {
          res.send({
            message: `Neuspješno ažuriranje događaja id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greška ažuriranja događaja id=" + id
        });
      });
  };

// Brisanje događaja
exports.delete = (req, res) => {
    const id = req.params.id;
  
    dogadaj.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Događaj je uspješno obrisan!"
          });
        } else {
          res.send({
            message: `Neuspješno brisanje događaja id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ne može se izbrisati događaj id=" + id
        });
      });
  };

// Brisanje svih događaja
exports.deleteAll = (req, res) => {
    dogadaj.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Dagađaja je uspješno obrisano!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Greška prilikom brisanja događaja."
        });
      });
  };

// Prikaz svih događaja favorita
exports.findAllfavorit = (req, res) => {
    dogadaj.findAll({ where: { favorit: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Greška prilikom dohvaćanja događaja"
        });
      });
  };