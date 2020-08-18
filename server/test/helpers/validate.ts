export const validateError = <T>(err: Record<string, any>, type: T, status: number, error: string, message: string): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
	expect(err).toBeDefined();
	// expect(err).toBeInstanceOf(type);
	expect(err).toContainAllKeys([
		'message',
		'response',
		'status',
	]);
	expect(err.message).toEqual(message);
	expect(err.status).toEqual(status);
	expect(err.response).toContainAllKeys([
		'error',
		'message',
		'statusCode',
	]);
	expect(err.response.error).toEqual(error);
	expect(err.response.message).toEqual(message);
	expect(err.response.statusCode).toEqual(status);
};

export const validateErrorBody = (err: Record<string, any>, status: number, error: string, message: string | Record<string, any>): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
	expect(err).toContainAllKeys([
		'error',
		'message',
		'statusCode',
	]);
	expect(err.error).toEqual(error);
	expect(err.message).toEqual(message);
	expect(err.statusCode).toEqual(status);
};
