import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import jwtDecode from 'jwt-decode';

import type { JwtPayload } from '$lib/dtos';
import { Locale } from '$lib/services/i18n';

import { AppConfig } from '$config';

export const handle: Handle = ({ event, resolve }) => {
  const cookie = event.request.headers.get('cookie');
  const rawMap = parse(cookie || '');
  const token = rawMap[AppConfig.cookies.session];
  if (token) {
    const payload = jwtDecode<JwtPayload>(token);
    if (payload) {
      event.locals.jwt = payload;
    }
  }

  // language slug
  const locale = event.url.pathname.substring(1, 3);
  if (Object.values(Locale).some((le) => le === locale)) {
    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%html.lang%', locale),
    });
  }

  return resolve(event);
};

export const getSession: GetSession = (event) => {
  return {
    jwt: event.locals.jwt,
  };
};
