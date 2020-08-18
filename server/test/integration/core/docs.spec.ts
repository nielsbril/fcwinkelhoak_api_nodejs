import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';

import { bootstrap } from '~src/app';

describe('[INTEGRATION - CORE] DocsController', () => {
	let app: INestApplication;

	beforeAll(async (done: jest.DoneCallback) => {
		app = await bootstrap();
		done();
	});

	afterAll(async (done: jest.DoneCallback) => {
		await app.close();
		done();
	});

	describe('GET /docs', () => {
		it('Should return the swagger documentation', (done: jest.DoneCallback) => {
			supertest(app.getHttpServer())
				.get('/docs')
				.redirects(1)
				.expect(200)
				.then((res: supertest.Response) => {
					expect(res.text).toBeString();
					expect(res.text).toContain('<!DOCTYPE html>');

					return done();
				})
				.catch(done);
		});
	});

	describe('GET /docs-json', () => {
		it('Should return the swagger documentation in JSON format', (done: jest.DoneCallback) => {
			supertest(app.getHttpServer())
				.get('/docs-json')
				.expect(200)
				.then((res: supertest.Response) => {
					expect(res.body).toBeObject();
					expect(res.body).toContainKeys([
						'openapi',
						'info',
						'tags',
						'servers',
						'components',
						'paths',
					]);

					return done();
				})
				.catch(done);
		});
	});
});
