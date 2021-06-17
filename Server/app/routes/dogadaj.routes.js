module.exports = app => {
    const dogadaji = require("../controllers/dogadaj.controller.js");
  
    var router = require("express").Router();
  
    // Kreiranje novog događaja
    router.post("/", dogadaji.create);
  
    // Vračanje svih događaja
    router.get("/", dogadaji.findAll);
  
    // Vračanje događaja favorita
    router.get("/favorit", dogadaji.findAllfavorit);
  
    // Vračanje odabranog događaja
    router.get("/:id", dogadaji.findOne);
  
    // Ažuriranje odabranog događaja
    router.put("/:id", dogadaji.update);
  
    // Brisanje odabranog događaja
    router.delete("/:id", dogadaji.delete);
  
    // Brisanje svih događaja
    router.delete("/", dogadaji.deleteAll);
  
    app.use('/api/dogadaji', router);
  };