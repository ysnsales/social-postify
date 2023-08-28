import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../../src/prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { cleanDb } from "../helpers";
import { createMedia } from "../factories/medias.factory";
import * as request from 'supertest';

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

  describe('POST /medias', () => {
    it('Should return status 201 with created media', async() => {
      const media = createMedia();
      const response = await request(app.getHttpServer()).post('/medias').send(media).expect(HttpStatus.CREATED);

      expect(response.status).toBe(HttpStatus.CREATED);
    });

    it('Should return status 400 when body is invalid', async() =>{ 
      const media = createMedia();
      const response = await request(app.getHttpServer()).post('/medias').send({username: "Teste"});

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);

    });

    it('Should return status 409 when media already exists', async() => {
      const media = createMedia();
      await request(app.getHttpServer()).post('/medias').send(media);
      const response = await request(app.getHttpServer()).post('/medias').send(media);

      expect(response.status).toBe(HttpStatus.CONFLICT);
     })

  })

  describe('GET /medias', () => {
    it('Should return all medias', async() => {
      const media1 = createMedia();
      const media2 = createMedia();

      await request(app.getHttpServer()).post('/medias').send(media1);
      await request(app.getHttpServer()).post('/medias').send(media2);

      const response = await request(app.getHttpServer()).get('/medias');
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual([media1, media2])
    })

    it('Should return an empty array when there is no media', async() => {
      const response = await request(app.getHttpServer()).get('/medias');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual([]);
    })
  })

  describe('GET /medias/:id', () => {
    it('Should return media with selectd id', async() => {
      const media = createMedia();
      await request(app.getHttpServer()).post('/medias').send(media);
      const response = await request(app.getHttpServer()).get(`/medias/${media.id}`);
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual(media);
    })

    it('Should return status 404 when there is no media with selected id', async() => {
      const media = createMedia();
      await request(app.getHttpServer()).post('/medias').send(media);
      const response = await request(app.getHttpServer()).get(`/medias/11`);
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    })
  })

  describe('PUT /medias/:id', () => {
    it('Should update media with selected id', async() => {
      const media = createMedia();
      await request(app.getHttpServer()).post('/medias').send(media);
      const response = await request(app.getHttpServer()).put(`/medias/${media.id}`).send({id: media.id, title: 'new title', username: media.username});

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual({id: media.id, title: 'new title', username: media.username});
    })

    it('Should return status 404 when there is no media with selected id', async() => {
      const media = createMedia();
      await request(app.getHttpServer()).post('/medias').send(media);
      const response = await request(app.getHttpServer()).put(`/medias/11`).send({id: media.id, title: 'new title', username: media.username});      
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    })

    it('Should return status 409 when media already exists', async() => {
      const media1 = createMedia();
      const media2 = createMedia();
      await request(app.getHttpServer()).post('/medias').send(media1);
      await request(app.getHttpServer()).post('/medias').send(media2);

      const response = await request(app.getHttpServer()).put(`/medias/${media1.id}`).send({id: media1.id, title: media2.title, username: media2.username});
      expect(response.status).toBe(HttpStatus.CONFLICT);
    })
  })

  describe('DELETE /medias/:id', () => {
    it('Should delete media with selected id', async() => {
      const media = createMedia();
      await request(app.getHttpServer()).post('/medias').send(media);
      const response = await request(app.getHttpServer()).delete(`/medias/${media.id}`).send({id: media.id, title: 'new title', username: media.username});

      const checkMedia = await request(app.getHttpServer()).get(`/medias`);
      expect(response.status).toBe(HttpStatus.OK);
      expect(checkMedia.body).toEqual([]);
    })

  })

})