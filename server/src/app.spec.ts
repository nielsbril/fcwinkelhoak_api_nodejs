import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CoreModule } from '~modules/core/core.module';

import { bootstrap } from './app';

describe('[UNIT - APP] App', () => {
	describe('Bootstrap', () => {
		let nestFactoryCreateSpy: jest.SpyInstance;
		let initGlobalMiddlewareSpy: jest.SpyInstance;
		let initSwaggerSpy: jest.SpyInstance;

		beforeEach((done: jest.DoneCallback) => {
			nestFactoryCreateSpy = jest.spyOn(NestFactory, 'create');
			initGlobalMiddlewareSpy = jest.spyOn(CoreModule, 'initGlobalMiddleware');
			initSwaggerSpy = jest.spyOn(CoreModule, 'initSwagger');
			done();
		});

		afterEach((done: jest.DoneCallback) => {
			nestFactoryCreateSpy.mockRestore();
			initGlobalMiddlewareSpy.mockRestore();
			initSwaggerSpy.mockRestore();
			done();
		});

		it('Should start the application', async (done: jest.DoneCallback) => {
			const app: INestApplication = await bootstrap();

			expect(nestFactoryCreateSpy).toHaveBeenCalled();
			expect(initGlobalMiddlewareSpy).toHaveBeenCalled();
			expect(initSwaggerSpy).toHaveBeenCalled();

			await app.close();
			done();
		});

		it('Should start the application without swagger documentation', async (done: jest.DoneCallback) => {
			process.env.STATE_DOCS = 'false';

			const app: INestApplication = await bootstrap();

			expect(nestFactoryCreateSpy).toHaveBeenCalled();
			expect(initGlobalMiddlewareSpy).toHaveBeenCalled();
			expect(initSwaggerSpy).not.toHaveBeenCalled();

			await app.close();
			done();
		});
	});
});
