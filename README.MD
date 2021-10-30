Superbrag
=============================

> "It's the small things that make a difference in life."

When you are working on something it is easy to lose sight of the tasks that
you completed. These 'forgotten' tasks are also called "invisible work".

Sometimes you'd like to recall those tasks, and find you are unable to. A
possible solution, proposed by [Julia Evans](https://jvns.ca/) in an
[article](https://jvns.ca/blog/brag-documents/) is to keep a *brag document*.
You can write anything you'd like in a brag document, as long as it helps you
to remember tasks otherwise forgotten.

**Superbrag** is a web application, written in Node.js, that allows you to easily
create an online brag document. You can decide to use it in private, or share
it publicy, allowing others to follow the progress.

For data persistency an sqlite database is used.

# Installation

Superbrag is a small application, which can easily run on a raspberry pi.

## Local installation

Download the latest release from the [releases page](https://github.com/daangemist/superbrag/releases).
Extract the archive to a folder on disk.

Run the following command via the cli in the folder where you just
extracted Superbrag:

    npm ci --production

This will install all required dependencies. To start Superbrag, simply run:

    npm start

Check out the [Configuration](#Configuration) section for more information on configuration
parameters.

## Docker

This sample command will start a docker container, called `superbrag`,
with a Docker volume mounted at `/data`. The application will be accessible at
[localhost:3000](http://localhost:3000).

    docker run -v superbrag_data:/data -e SESSION_SECRET=<secret> -e ACCESS_PASSWORD=<another secret> -p 3000:3000 --name superbrag ghcr.io/daangemist/superbrag:latest

See the [Configuration](#Configuration) section for more information on
which environment variables are available to configure the application.

# Configuration

Configuration parameters can be provided in two different ways: *environment
variables*, or an entry in a `config.json` file in the root of the superbrag
installation folder. Values in the `config.json` take precedence over
environment variables.

`sessionSecret` and `accessPassword` are required to be
set, else the application will not start.

| config.json | Environment | Required | Type | Default | Description |
| ----------- |------------ | -------- | ---- | ------- |----------- |
| sessionSecret | SESSION_SECRET | x | string || The secret used to sign the session cookie. Run `openssl rand -hex 32` to generate a random string to use for this field. |
| accessPassword | ACCESS_PASSWORD | x | string || The password with which can be logged in to post new brags.|
| port | PORT || number | 3000 | The port on which the application will be available. |
| secureSite | SECURE_SITE || boolean | false | Indicates whether the site is using TLS. Is used for the auth cookie `secureSite` setting. |
| domain | DOMAIN || string | `undefined` | An optional configuration of the domain. Is used to set the domain on the auth cookie, if available. |
| connectionString | DB || string | sqlite://db.sqlite | A [supersave](https://www.npmjs.com/package/supersave) connection string. Currently only `sqlite` is supported. On docker, the default is `sqlite:///data/db.sqlite`.
| apiEnabled | API_ENABLED || boolean | false | Enable an api, use `/api/brags` to retrieve a list of brags.
| title | TITLE || string | Superbrag | The title for the application. Is shown in the title bar, and at the top of the page. |
| introduction | INTRODUCTION || string || Optionally, an introduction text that is shown on the page.
| avatar | AVATAR || string || Optionally, the URL for an avatar to display. It is rendered with *with/height=80* on the page.
| ipsAllowed | IPS_ALLOWED || string || A comma-separated list of IP addresses which are allowed to access `/login`. 

If you want to invalidate all logins, change the `sessionSecret` value.

## Mysql support

It is possible to change the `sqlite` storage to `mysql`. Follow these steps:

1. Run `npm i mysql` to install the mysql library
2. Change the `connectionString` attribute or `DB` environment variable to a mysql connection string. For example `mysql://examplename:somepassword@examplehost:3306/dbname`

# Building

Run the two scripts `docker-build` and `package` in `.build` to generate a zip file and a 
docker image. They must be run from the root of the project.

    ./.build/docker-build <version>
    ./.build/package <version>

# Contributing

Contributions are welcome. This does not necessarily have to be code, it can also be updated documentation, tutorials, bug reports or pull requests.

Use the [Issues](https://github.com/daangemist/superbrag/issues) tab to
report any problems you encounter during installation or usage of Superbrag.

Please create an Issue to propose a feature you want to implement, so that the details can be discussed in advance.

# Thanks

Many thanks to:

- [Julia Evans](https://jvns.ca/) for introduction the concept of
a brag document.
- [Emily Leung](https://css-tricks.com/author/emilyleung/) at [css-tricks.com](https://css-tricks.com/) for creating the [article](https://css-tricks.com/creating-your-own-bragdoc-with-eleventy/)
that served as an inspiration to this application.
- [@andrybrewer](https://github.com/andybrewer) for creating the [mvp.css](https://andybrewer.github.io/mvp/) CSS framework
- The [twemoji](https://github.com/twitter/twemoji) project, for the favicon.
