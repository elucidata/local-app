# Local App

A simple starter project for building apps meant to be run locally. (Possibly using [Hotel](https://github.com/typicode/hotel)).

- [Svelte](https://svelte.dev/)
  - [Svelte SPA Router](https://github.com/ItalyPaleAle/svelte-spa-router)
- [JSON Server](https://github.com/typicode/json-server)
- [Rollup](https://rollupjs.org)

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit elucidata/local-app my-app
cd my-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd my-app
npm install
```

...then start the server:

```bash
npm run dev
```

Navigate to [localhost:3000](http://localhost:3000). You should see your app running. Edit a component file in `src/client`, save it, and reload the page to see your changes.

## JSON Server

All [json-server](https://github.com/typicode/json-server) endpoints are mounted under `/api/*`.

For example:

```javascript
let events = await fetch(`/api/events?date=${date}&_sort=timestamp&_order=asc`)
```
