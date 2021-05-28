import { config } from 'dotenv';

class EnvParams {
  public readonly PG_PORT: number;
  public readonly TYPEORM_SYNCHRONIZE: boolean;
  public readonly TYPEORM_LOGGING: boolean;
  public readonly SERVER_PORT: number;
  public readonly SERVER_CORS: boolean;
  constructor(
    public readonly PG_HOST: string,
    PG_PORT: number,
    public readonly PG_USERNAME: string,
    public readonly PG_PASSWORD: string | null,
    public readonly PG_DATABASE: string,
    TYPEORM_SYNCHRONIZE: boolean,
    TYPEORM_LOGGING: boolean,
    SERVER_PORT: number,
    SERVER_CORS: boolean,
    public readonly JWT_SECRET: string,
    public readonly JWT_EXPIRES_IN: string,
    public readonly ADMIN_NAME: string,
    public readonly ADMIN_PASSWORD: string,
  ) {
    this.PG_PORT = Number(PG_PORT);
    this.TYPEORM_SYNCHRONIZE = Boolean(TYPEORM_SYNCHRONIZE);
    this.TYPEORM_LOGGING = Boolean(TYPEORM_LOGGING);
    this.SERVER_PORT = Number(SERVER_PORT);
    this.SERVER_CORS = Boolean(SERVER_CORS);
  }
}

const dotEnv = (config().parsed as any) as EnvParams;
export const env = new EnvParams(
  dotEnv.PG_HOST,
  dotEnv.PG_PORT,
  dotEnv.PG_USERNAME,
  dotEnv.PG_PASSWORD,
  dotEnv.PG_DATABASE,
  dotEnv.TYPEORM_SYNCHRONIZE,
  dotEnv.TYPEORM_LOGGING,
  dotEnv.SERVER_PORT,
  dotEnv.SERVER_CORS,
  dotEnv.JWT_SECRET,
  dotEnv.JWT_EXPIRES_IN,
  dotEnv.ADMIN_NAME,
  dotEnv.ADMIN_PASSWORD,
);
