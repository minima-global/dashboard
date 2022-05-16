# Dashboard

Dashboard Minidapp built for Minima to get a visual representation of Minima's network.


### Prerequisites

With this current version of our mds-api pkg you will need to generate a personal access token that sits in your root directory *e.g*

`~/.npmrc`

which holds something like:

`//npm.pkg.github.com/:_authToken=ghp_D8tXIVpi...4eWX7sV4ExnLV`

(Learn how [to](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry))

and have another  `.npmrc` file in the root of this project holding this link:

`@minima-global:registry=https://npm.pkg.github.com`

## Installation

Once you have registered your ***personal access token*** you now have the rights to use **mds-api** 😎.

- Run `npm i` in the root of this project, this should install all the dependencies including **mds-api**.
- Run `npm run build-zip` that should build you a `dashboard.zip` minidapp in the root of this project.

Finally,

- Make sure you have a [Minima](https://github.com/minima-global/Minima) node and [mds](https://github.com/minima-global/mds-core) running.
- Now open your browser and go to `127.0.0.1:8090/` which should take you to the **minihub**.
- Click the install btn, and find your `dashboard.zip`.

All done, enjoy.