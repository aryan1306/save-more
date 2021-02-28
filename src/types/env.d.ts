declare namespace NodeJS {
  export interface ProcessEnv {
    SECRET: string;
    COOKIE_NAME: string;
    PORT: string;
    accountSid: string;
    CORS_ORIGIN: string;
    authToken: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    SENDGRID: string;
  }
}
