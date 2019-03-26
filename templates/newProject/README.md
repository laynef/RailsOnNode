# Rails On Node

## Global CLI

```bash
npm i -g rails-on-node
```

## Install Setup

```bash
npm install
```

### Setup Serverside React

```bash
node-rails s react
```

### Setup Styling

#### SASS

```bash
node-rails s sass
```

#### LESS

```bash
node-rails s less
```

### Build development (HTTP)

```bash
npm run build:dev
npm run dev
```

### Build Production (HTTP)

```bash
npm run build:prod
npm run prod
```

## HTTPS for Testing Production Servers Locally

In the directory openssl there is a config file where you can update
your DNS name which is your host: www.example.com

The two files to update for your DNS are https.conf and genereateHttps.sh

Go ahead and delete the example-*.pem files

Then add the host in your local for Macs:

```bash
sudo vim /etc/hosts
```

Vim commands:
`Go`

```plain-text
127.0.0.1 www.example.com
```

Vim commands

```vim
<ESCAPE>
:wq
<ENTER>
```

This will add the DNS to your local host file and you can now run your server with HTTPS

### Run development in HTTPS (STAGING)

```bash
npm run build:dev
npm run https_dev
```

The server will run on https://www.example.com/

### Run production in HTTPS (PRODUCTION)

```bash
npm run build:prod
npm run https_prod
```

The server will run on https://www.example.com/

For more see the documentation: [Click here for the documentation](https://railsonnode.com)

Happy coding!
