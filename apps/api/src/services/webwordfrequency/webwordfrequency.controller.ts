import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query, HttpException } from '@nestjs/common';
import { catchError, map, of } from 'rxjs';

import { AppRoutes } from '$config/config.service';

const WEB_WORD_FREQUENCY_SERVICE_URL = `http://localhost:5000/`;

@Controller(AppRoutes.webwordfrequency.$key())
export class WebWordFrequencyController {
  constructor(private readonly httpService: HttpService) {}

  @Get(AppRoutes.webwordfrequency.recent.$key())
  recent() {
    return this.httpService
      .get(`${WEB_WORD_FREQUENCY_SERVICE_URL}${AppRoutes.webwordfrequency.recent.$path()}`)
      .pipe(
        map((response) => response.data),
        catchError((response) => {
          const { data, status } = response;
          return of(new HttpException(data, status));
        }),
      );
  }

  @Get(AppRoutes.webwordfrequency.search.$key())
  search(
    @Query('query') query: string,
    @Query('per_page') per_page: string,
    @Query('page') page: string,
  ) {
    return this.httpService
      .get(`${WEB_WORD_FREQUENCY_SERVICE_URL}${AppRoutes.webwordfrequency.search.$path()}`, {
        params: { query, per_page, page },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          const { data, status } = error.response;
          throw new HttpException(data, status);
        }),
      );
  }

  @Get(AppRoutes.webwordfrequency.scrape.$key())
  scrape(
    @Query('url') url: string,
    @Query('per_page') per_page: string,
    @Query('page') page: string,
  ) {
    return this.httpService
      .get(`${WEB_WORD_FREQUENCY_SERVICE_URL}${AppRoutes.webwordfrequency.scrape.$path()}`, {
        params: { url, per_page, page },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          const { data, status } = error.response;
          throw new HttpException(data, status);
        }),
      );
  }
}
