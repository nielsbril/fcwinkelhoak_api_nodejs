import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import supertest from 'supertest';

import { AppModule } from '~src/app.module';
import { name, version } from '~pkg';

describe('[INTEGRATION - CORE] StatusController', () => {
	let app: INestApplication;

	beforeEach(async (done: jest.DoneCallback) => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
		done();
	});

	describe('GET /status', () => {
		it('Should return the server status information', (done: jest.DoneCallback) => {
			supertest(app.getHttpServer())
				.get('/status')
				.expect(200)
				.then((res: supertest.Response) => {
					expect(res.body).toBeObject();
					expect(res.body).toContainAllKeys([
						'success',
						'name',
						'version',
					]);
					expect(res.body.success).toBeTrue();
					expect(res.body.name).toEqual(name);
					expect(res.body.version).toEqual(version);

					return done();
				})
				.catch(done);
		});
	});
});
