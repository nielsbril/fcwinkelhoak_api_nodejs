import { name, version } from '~pkg';

import { Status } from '../classes/status';
import { StatusService } from './status.service';

describe('[UNIT - CORE] StatusService', () => {
	const statusService: StatusService = new StatusService();

	describe('GetStatus', () => {
		it('Should return the server status information', (done: jest.DoneCallback) => {
			const result: Status = statusService.getStatus();
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
