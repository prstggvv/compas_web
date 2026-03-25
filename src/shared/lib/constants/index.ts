export const YANDEX_MAP_SRC =
  'https://yandex.ru/map-widget/v1/?from=api-maps&ll=34.124298%2C44.965854&mode=routes&origin=jsapi_2_1_79&rtext=~44.965758%2C34.127123&rtt=auto&ruri=~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DIgoNLYIIQhXw3DNC&utm_source=jsapi&z=14';

export const CONTACT_FORM_WEBHOOK_URL =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_CONTACT_FORM_WEBHOOK) ||
  'https://n8botpars.ru/webhook/form-lead';

export const CONTACT_FORM_EMAIL = 'vany4golos@yandex.ru';
