import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../../src/prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { cleanDb } from "../helpers";
import * as request from 'supertest';
import { createPost } from "../factories/posts.factory";

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

  describe('POST /posts', () => {
    it('Should return status 201 with created post', async() => {
      const post = createPost();
      const response = await request(app.getHttpServer()).post('/posts').send(post).expect(HttpStatus.CREATED);

      expect(response.status).toBe(HttpStatus.CREATED);
    });

    it('Should return status 400 when body is invalid', async() =>{ 
      const post = createPost();
      const response = await request(app.getHttpServer()).post('/posts').send({username: "Teste"});

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);

    });

  })

  describe('GET /posts', () => {
    it('Should return all posts', async() => {
      const post1 = createPost();
      const post2 = createPost();

      await request(app.getHttpServer()).post('/posts').send(post1);
      await request(app.getHttpServer()).post('/posts').send(post2);

      const response = await request(app.getHttpServer()).get('/posts');
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual([post1, post2])
    })

    it('Should return an empty array when there is no post', async() => {
      const response = await request(app.getHttpServer()).get('/posts');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual([]);
    })
  })

  describe('GET /posts/:id', () => {
    it('Should return post with selectd id', async() => {
      const post = createPost();
      await request(app.getHttpServer()).post('/posts').send(post);
      const response = await request(app.getHttpServer()).get(`/posts/${post.id}`);
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual(post);
    })

    it('Should return status 404 when there is no post with selected id', async() => {
      const post = createPost();
      await request(app.getHttpServer()).post('/posts').send(post);
      const response = await request(app.getHttpServer()).get(`/posts/11`);
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    })
  })

  describe('PUT /posts/:id', () => {
    it('Should update post with selected id', async() => {
      const post = createPost();
      await request(app.getHttpServer()).post('/posts').send(post);
      const response = await request(app.getHttpServer()).put(`/posts/${post.id}`).send({id: post.id, image: null, title: 'new title', text: post.text});

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual({id: post.id, image: null, title: 'new title', text: post.text});
    })

    it('Should return status 404 when there is no post with selected id', async() => {
      const post = createPost();
      await request(app.getHttpServer()).post('/posts').send(post);
      const response = await request(app.getHttpServer()).put(`/posts/11`).send({id: post.id, image: null, title: 'new title', text: post.text});      
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    })
  })

  describe('DELETE /posts/:id', () => {
    it('Should delete post with selected id', async() => {
      const post = createPost();
      await request(app.getHttpServer()).post('/posts').send(post);
      const response = await request(app.getHttpServer()).delete(`/posts/${post.id}`).send({id: post.id, title: 'new title', text: post.text});

      const checkPost = await request(app.getHttpServer()).get(`/posts`);
      expect(response.status).toBe(HttpStatus.OK);
      expect(checkPost.body).toEqual([]);
    })

  })

})