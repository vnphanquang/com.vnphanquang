import type { GetSession, Handle } from '@sveltejs/kit';
import jwtDecode from 'jwt-decode';
import { parse } from 'cookie';

import type { JwtPayload } from '$lib/dtos';
import { AppConfig } from '$config';

export const handle: Handle = ({ event, resolve }) => {
  const cookie = event.request.headers.get('cookie');
  const rawMap = parse(cookie || '');
  const token = rawMap[AppConfig.cookies.session];
  if (token) {
    const payload = jwtDecode<JwtPayload>(token);
    if (payload) {
      event.locals.session = payload;
    }
  }
  return resolve(event);
}

export const getSession: GetSession = (event) => {
  return event.locals.session ?? {};
}
