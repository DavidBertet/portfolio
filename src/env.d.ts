/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RECAPTCHA_SECRET_KEY: string;
  readonly RECAPTCHA_CLIENT_KEY: string;

  readonly MJ_APIKEY_PUBLIC: string;
  readonly MJ_APIKEY_PRIVATE: string;

  readonly EMAIL: string;
  readonly PHONE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
