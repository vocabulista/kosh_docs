# Deploying Kosh's Frontend

The Kosh Client is a React app which helps you query and display lexical data served by [Kosh](https://kosh.uni-koeln.de).

This tool is in active development and will need some adjustments if you want to use it to host your own data in production.
If you're considering using Kosh and this client and have any questions, feel free to reach out to us via email at [info-kosh@uni-koeln.de](mailto:info-kosh@uni-koeln.de).

A demo instance is available at: <https://dicts.uni-koeln.de>  
The default data is served from: <https://kosh.uni-koeln.de/api>

## Deployment

Clone the repository with git: `git clone https://github.com/cceh/kosh_client.git`
Change your working directory to the root of your cloned repo, then run either of the following commands to deploy the Kosh client.

### Using NPM
```sh
npm install
npm run build
```

### Using Docker
You can build and run the client with Docker using the provided [Dockerfile](./Dockerfile).
```sh
docker build -t kosh/client .
docker run -d -p 3000:80 --name kosh.client kosh/client
```

## Configuration
The configuration of the Kosh client is mainly handled from the context file, found in `<path>/<to>/<kosh_client>/src/data/Context.js`. Below you will find a list of values you could or should change to your liking. This step is not necessary if you want to serve the sample data on your local device with Kosh running at `localhost:5000`.

If you plan on using this tool in production, you also need to update the list of collections in the `CollectionSwitcher` component at `<path>/<to>/<kosh_client>/src/components/CollectionSwitcher.js`.

> **Note**
> Changing any values other than those listed here may currently lead to a broken build.

```js
const stateStore = {
  /* API base URL (without trailing slash) */
  kosh_api: "https://kosh.uni-koeln.de",

  /* List of available collections */
  collection_ids: [
    "First collection",
    "Second collection",
  ],

  /* Search parameters */
  search: {
    // Default dictionaries
    dicts: ["de_alcedo"],
    // Default field to be searched
    field: "lemma",
    // Default query type
    query_type: "prefix",
    // Default query size
    query_size: 20,
    // Available query sizes
    query_sizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },

  /* Collection metadata */
  collection: {
    // Default collection to search
    id: "Kosh Data",
    // Default endpoint (e.g. https://kosh.uni-koeln.de/api)
    base_path: "api",
    // Dictionary IDs to exclude, these will not show up in the client
    exclude: ["cpd", "mmp"],
  },
};
```

