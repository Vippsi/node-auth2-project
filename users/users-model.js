const db = require("../database/db-config")

module.exports = {
    add,
    find,
    findBy,
    findById,
    findByDepartment
}

function find() {
    return db("users").select("id", "username").orderBy("id");
  }
  
  function findBy(filter) {
    return db("users as u")
    .where(filter)
    .select("u.id", "u.username", "u.password", "u.department")
    .orderBy("u.id")
  
  }

  function findByDepartment(filter) {
    return db("users as u")
    .where(filter)
    .select("u.id", "u.username", "u.department")
    .orderBy("u.id")
  
  }

  
  
  async function add(user) {
    try {
      const [id] = await db("users").insert(user, "id");
  
      return findById(id);
    } catch (error) {
      throw error;
    }
  }
  
  function findById(id) {
    return db("users").where({ id }).first();
  }
  