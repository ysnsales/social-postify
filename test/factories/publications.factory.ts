import { faker } from '@faker-js/faker';

export function createPublication(mediaId, postId, date) {
    return {
        id: 1,
        mediaId,
        postId,
        date
    };
}