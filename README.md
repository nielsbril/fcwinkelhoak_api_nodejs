# FC Winkelhoak: API #

## Specifications
This project has been set up with using [Nest.js](https://nestjs.com/), it has the following dependencies:
- `Docker`
- `nodejs`: erbium

## Project setup

### Docker
You can just run `docker-compose up` to start the project for local development. Without the need for nvm and npm scripts.

Once your setup is up and running with Docker, you can use the following command with all the npm scripts that are provided below: `docker-compose exec server npm run test`.

### npm scripts

Alternatively you can run the project without Docker using the following npm scripts. *Please refrain from doing so to avoid unexpected behaviour during local development.*

| Command          | Description
| ---------------- | -----------

All commands are executable by running `yarn run [COMMAND-NAME]`.

**To get started**, don't forget a `nvm use` to activate the node version specified in the `.nvmrc` file of this project.

## Code Contribution ##

### Guidelines ###

### Branches ###

We follow these naming conventions:

* **master**: Production-ready code, tagged for a production release, latest commit for development release.
* **release/***: Snapshot of a release.
* **feature/***: For developing new features.
* **bugfix/***: For bugs that are logged during testing.
* **hotfix/***: Only for hotfixing critical bugs from the `master`-branch.

### Details ###

* **Client**: FC Winkelhoak
* **Start**: 07/2020

### Team ###

List the team that has worked on this project, including the duration e.g.:

* [Niels Bril - Studio Hyperdrive](niels.bril@studiohyperdrive.be)
    * **Function**: Lead developer
    * **Period**: July 2020 -> ...
