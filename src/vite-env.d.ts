/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SUPABASE_RESET_PASSWORD_URL: string;
  readonly VITE_SUPABASE_SIGNUP_EMAIL_REDIRECT_TO_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
