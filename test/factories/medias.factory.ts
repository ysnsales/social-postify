import { faker } from '@faker-js/faker';

export function createMedia() {
    return {
        id: faker.number.int({ max: 10 }),
        title: faker.internet.domainName(),
        username: faker.person.firstName(),
    };
}

