## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Install node_modules

```bash
$ npm install
```

## Install nodejs

```bash
sudo apt install --yes curl
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install --yes nodejs
```

## Auth curl

```bash
curl -X POST http://localhost:4200/auth/login -d '{"username": "admin", "password": "<password here>"}' -H "Content-Type: application/json"
{"token":"<jwt-token-here>","user":{"id":0,"group":0,"name":"admin","role":"admin"}}
curl http://localhost:4200/users -H "Authorization: Bearer <jwt-token-here>"
```

## Postgresql

```bash
sudo -u postgres psql -c 'CREATE DATABASE hachathon'
sudo -u postgres psql -d hachathon <<QUERIES
    SELECT now();
QUERIES
```
