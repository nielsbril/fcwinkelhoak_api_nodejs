import { Test, TestingModule } from '@nestjs/testing';

import { name, version } from '~pkg';

import { Status } from '../classes/status';
import { StatusController } from './status.controller';
import { StatusService } from '../services/status.service';

describe('[UNIT - CORE] StatusController', () => {
	let statusController: StatusController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [StatusController],
			providers: [StatusService],
		}).compile();

		statusController = app.get<StatusController>(StatusController);
	});

	describe('GetStatus', () => {
		it('Should return the server status information', (done: jest.DoneCallback) => {
			const result: Status = statusController.getStatus();
			expect(result).toBeObject();
			expect(result).toContainAllKeys([
				'success',
				'name',
				'version',
			]);
			expect(result.success).toBeTrue();
			expect(result.name).toEqual(name);
			expect(result.version).toEqual(version);
			done();
		});
	});
});
