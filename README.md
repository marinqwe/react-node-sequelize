
add a config.json into server/config with database credentials
{
    "development": {
        "username": "",
        "password": "",
        "database": "",
        "host": "",
        "dialect": ""
    }
}

Install server and client dependencies

```
cd server
yarn/npm install
cd ../client
yarn/npm install
```

To start the server and client at the same time, navigate into /server

```
yarn dev / npm run dev
```