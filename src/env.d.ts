/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RECAPTCHA_CLIENT_KEY: string;

  readonly EMAIL: string;
  readonly PHONE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
