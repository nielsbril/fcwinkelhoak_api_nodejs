/* eslint-disable @typescript-eslint/no-explicit-any */
export const promiseAllSync = async (promises: any[]): Promise<any[]> => {
	const results: any[] = [];

	for (const promise of promises) { // eslint-disable-line no-restricted-syntax
		/* istanbul ignore next */
		await (typeof promise === 'function' ? promise(results) : promise).then((result: any) => results.push(result)); // eslint-disable-line no-await-in-loop
	}

	return results;
};
/* eslint-enable @typescript-eslint/no-explicit-any */
