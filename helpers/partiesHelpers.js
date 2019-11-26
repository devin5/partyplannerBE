const db = require("../data/dbConfig");

const addParties = project => {
  return db("parties").insert(project, "id");
};

const getParties = () => {
  return db("parties");
};

const getUserParties = id => {
  return db("parties")
    .where("planner_id", "=", id)
    .select(
      "parties.id",
      "parties.planner_id",
      "parties.title",
      "parties.guestNumber",
      "parties.budget",
      "parties.date",
      "parties.entertainment",
      "parties.shoppingList"
    );
};
function findBy(filter) {
  return db("parties").where(filter);
}
async function update(changes, id) {
  const partyid = await db("parties")
    .where({ id })
    .update(changes);
  return findBy({ id }).first();
}

const remove = id => {
  return db("parties")
    .where({ id })
    .delete();
};

module.exports = {
  getParties,
  getUserParties,
  addParties,
  update,
  remove
};
