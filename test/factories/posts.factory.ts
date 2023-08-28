import { faker } from '@faker-js/faker';

export function createPost() {
    return {
        id: faker.number.int({ max: 10 }),
        image: null,
        title: faker.internet.domainName(),
        text: faker.internet.emoji(),
    };
}

