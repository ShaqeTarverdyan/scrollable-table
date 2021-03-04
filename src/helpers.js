import faker from 'faker';

export const generateRandomItem = (idx) => ({
   id: idx,
   firstName: faker.name.findName(),
   lastName: faker.name.lastName()
});

export const widths = {
	firstName: 2,
	lastName: 2
};
