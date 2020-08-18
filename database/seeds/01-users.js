
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Jonathan1', password: "pass", department: "Dev"},
        {username: 'Jonathan2', password: "pass", department: "Dev"},
        {username: 'Jonathan3', password: "pass", department: "Dev"}
      ]);
    });
};
