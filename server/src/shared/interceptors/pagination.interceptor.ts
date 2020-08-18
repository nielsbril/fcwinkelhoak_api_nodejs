import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { pathOr, omit } from 'ramda';
import { stringify } from 'qs';

import { config } from '~config/config.const';

import { IQuery, IPagination } from '../shared.types';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
	public intercept(context: ExecutionContext, next: CallHandler): Observable<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
		const page = Number(pathOr(1, ['query', 'page'], context.switchToHttp().getRequest()));
		const size = Number(pathOr(config().pagination.size, ['query', 'size'], context.switchToHttp().getRequest()));

		context.switchToHttp().getRequest().query.page = page; // eslint-disable-line no-param-reassign
		context.switchToHttp().getRequest().query.size = size; // eslint-disable-line no-param-reassign

		return next.handle()
			.pipe(
				map((data) => this.paginate(
					data.items,
					data.total,
					context.switchToHttp().getRequest().path,
					context.switchToHttp().getRequest().query,
				)),
			);
	}

	private paginate(items: any[], total: number, path: string, query: any): IPagination<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
		const pages: number = Math.ceil(total / query.size);

		const result: IPagination<any> = { // eslint-disable-line @typescript-eslint/no-explicit-any
			items,
			total,
			pages,
			page: query.page,
			size: query.size,
			self: `${this.url(path)}${this.querystring(query.page, query.size, query)}`,
			first: `${this.url(path)}${this.querystring(1, query.size, query)}`,
			last: `${this.url(path)}${this.querystring(pages, query.size, query)}`,
		};

		if ((query.page + 1 <= pages)) {
			result.next = `${this.url(path)}${this.querystring(query.page + 1, query.size, query)}`;
		}

		if ((query.page - 1 > 0)) {
			result.prev = `${this.url(path)}${this.querystring(query.page - 1, query.size, query)}`;
		}

		return result;
	}

	private url(path: string): string {
		return `${config().server.host}${path}`;
	}

	private querystring(page: number, size: number, query: IQuery): string {
		return `?${stringify({
			...omit(['page', 'size'], query),
			page,
			size,
		})}`;
	}
}
