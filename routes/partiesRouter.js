const server = require("express").Router();
const helpers = require("../helpers/partiesHelpers");

server.post("/:id", (req, res) => {
  const party = {
    planner_id: req.params.id,
    title: req.body.title,
    guestNumber: req.body.guestNumber,
    budget: req.body.budget,
    date: req.body.date,
    entertainment: req.body.entertainment,
    shoppingList: req.body.shoppingList
  };

if(party.planner_id && party.title && party.guestNumber && party.budget && party.entertainment && party.shoppingList){
    helpers
    .addParties(party)
    .then(partymade => {
      res.status(201).json(partymade);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to create new party" });
    });

}else{
    res.status(500).json({ message: "Missing required feild" });
}
 
});

server.delete("/:id", (req, res) => {
  const {id}= req.params;

  helpers
    .remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: `deleted party with id ${id}` });
      } else {
        res.status(404).json({ message: "Could not find party with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete scheme" });
    });
});

server.get("/", (req, res) => {
  helpers
    .getParties()
    .then(parties => {
      res.status(200).json(parties);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching parties", error: err });
    });
});

server.get("/:id", (req, res) => {
  const { id } = req.params;
  helpers
    .getUserParties(id)
    .then(parties => {
      res.status(200).json(parties);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching parties", error: err });
      console.log(err);
    });
});

server.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  helpers
    .update(changes, id)
    .then(updated => {
      res.status(200).json(updated);
    })

    .catch(err => {
      res.status(500).json({ message: "Failed to update scheme" });
      console.log(err);
    });
});

module.exports = server;
