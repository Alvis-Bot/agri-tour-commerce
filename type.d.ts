declare namespace NodeJS{
  export interface ProcessEnv{
    NODE_ENV: string;
    PORT: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    UPLOAD_LOCATION: string;
    MAX_FILE_COUNTS: string;
    MAX_FILE_SIZE: string;


  }
}