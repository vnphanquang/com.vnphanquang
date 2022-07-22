import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import jwtDecode from 'jwt-decode';

import type { JwtPayload } from '$lib/dtos';
import { Locale } from '$lib/services/i18n';

import { AppConfig } from '$config';

export const handle: Handle = async ({ event, resolve }) => {
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
    const response = await resolve(event);
    const body = await response.text();
    return new Response(body.replace('%html.lang%', locale), response);
  }

  return resolve(event);
};

export const getSession: GetSession = (event) => {
  return {
    jwt: event.locals.jwt,
  };
};
