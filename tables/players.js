var faker = require('faker');
module.exports = {
  findById: (id) => {
    return {
      id,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      nickName: faker.internet.userName(),
      playtimeMod: faker.random.number(500),
      playtimeSource: faker.random.number(1000),
      playtimeSandstorm: faker.random.number(100)
    }
  }
};
