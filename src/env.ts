import { config } from 'dotenv';

class EnvParams {
  PG_HOST: string;
  PG_PORT: number;
  PG_USERNAME: string;
  PG_PASSWORD: string | null;
  PG_DATABASE: string;
  TYPEORM_SYNCHRONIZE: boolean;
  TYPEORM_LOGGING: boolean;
  SERVER_PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  ADMIN_NAME: string;
  ADMIN_PASSWORD: string;
}

export const env = (config().parsed as any) as EnvParams;
