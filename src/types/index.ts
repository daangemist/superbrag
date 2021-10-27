
export type Brag = {
  id: string,
  publication: number,
  published: boolean,
  body: string,
}

export type Config = {
  port: number,
  title: string,
  introduction?: string,
  sessionSecret: string,
  accessPassword: string,
}
