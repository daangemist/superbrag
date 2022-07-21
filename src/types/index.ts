export type Brag = {
  id: string;
  publication: number;
  published: boolean;
  body: string;
};

export type Config = {
  connectionString: string;
  apiEnabled: boolean;
  apiCreateEnabled: boolean;
  port: number;
  title: string;
  introduction?: string;
  sessionSecret: string;
  accessPassword: string;
  avatar?: string;
  secureSite: boolean;
  domain?: string;
  ipsAllowed?: string;
  snippet?: string;
};
