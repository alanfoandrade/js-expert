class User {
  constructor({ name, id, profession, age }) {
    this.id = parseInt(id);
    this.name = name;
    this.profession = profession;
    this.birthYear = new Date().getFullYear() - age;
  }

}

module.exports = User;