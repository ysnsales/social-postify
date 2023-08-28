import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../../src/prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { cleanDb } from "../helpers";
import * as request from 'supertest';
import { createPost } from "../factories/posts.factory";
import { createMedia } from "../factories/medias.factory";
import { createPublication } from "../factories/publications.factory";

describe('MediasController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
    .overrideProvider(PrismaService)
    .useValue(prisma)
    .compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    await cleanDb(prisma); 
  });

  describe('POST /publications', () => {
    it('Should return status 201 with created publication', async() => {
        const media = createMedia();
        const post = createPost();
        await request(app.getHttpServer()).post('/medias').send(media);
        await request(app.getHttpServer()).post('/posts').send(post)
        const response = await request(app.getHttpServer()).post('/publications').send({ mediaId: media.id, postId: post.id, date: new Date() })
        expect(response.status).toBe(HttpStatus.CREATED);
    });

    it('Should return status 400 when body is invalid', async() =>{ 
        const media = createMedia();
        const post = createPost();
        await request(app.getHttpServer()).post('/medias').send(media);
        await request(app.getHttpServer()).post('/posts').send(post);

        const response = await request(app.getHttpServer()).post('/publications').send({ mediaId: media.id, date: new Date() })
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('Should return status 404 when media or post id is inexistent', async() => {
        const media = createMedia();
        const post = createPost();

        const response = await request(app.getHttpServer()).post('/publications').send({ mediaId: media.id, postId: post.id, date: new Date() })
        expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  })

  describe('GET/publications', () => { 
    it('Should return all publications', async() => {
        const media = createMedia();
        const post = createPost();
        await request(app.getHttpServer()).post('/medias').send(media);
        await request(app.getHttpServer()).post('/posts').send(post);
        await request(app.getHttpServer()).post('/publications').send({ mediaId: media.id, date: new Date() })
    
        const response = await request(app.getHttpServer()).get('/publications');
        expect(response.status).toBe(HttpStatus.OK);

    })

    it('Should return an empty array when there is no publication', async() => {
        const media = createMedia();
        const post = createPost();
        await request(app.getHttpServer()).post('/medias').send(media);
        await request(app.getHttpServer()).post('/posts').send(post);

        const response = await request(app.getHttpServer()).get('/publications');
        expect(response.status).toBe(HttpStatus.OK);
    })

    describe('GET /publications/:id', () => {
        it('Should return publication with selectd id', async() => {
            const media = createMedia();
            const post = createPost();
            await request(app.getHttpServer()).post('/medias').send(media);
            await request(app.getHttpServer()).post('/posts').send(post);
            const publication = createPublication(media.id, post.id, new Date());
            await request(app.getHttpServer()).post('/publications').send({mediaId: media.id, date: new Date() });
            const response = await request(app.getHttpServer()).get(`/publications/${publication.id}`);

          expect(response.status).toBe(HttpStatus.OK);
          expect(response.body).toEqual(publication);
        })
    
        it('Should return status 404 when there is no post with selected id', async() => {
          const post = createPost();
          await request(app.getHttpServer()).post('/posts').send(post);
          const response = await request(app.getHttpServer()).get(`/posts/11`);
          expect(response.status).toBe(HttpStatus.NOT_FOUND);
        })
      })

  })
})