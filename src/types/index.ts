export type Brag = {
  id: string;
  publication: number;
  published: boolean;
  body: string;
};

export type Config = {
  connectionString: string;
  apiEnabled: boolean;
  port: number;
  title: string;
  introduction?: string;
  sessionSecret: string;
  accessPassword: string;
  avatar?: string;
};
