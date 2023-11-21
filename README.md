# Twitter Backend
This is a backend file for Twitter.
---

## Requirements

For development, you will only need Node.js and a node global package,NPM/Yarn, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.13.2

    $ npm --version
    8.19.2

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

### Yarn installation

    This is optional you can use npm

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/AnkitNayan83/twitter_backend
    $ cd Job-Portal-Backend
    $ npm install

## Configure app

create a .env file and add your

- DATABASE Url;
- JWT key;

## Running the project

    $ npm start
    or
    $ npm run server
    or
    $ yarn start

## Simple build for production

    $ npm run build
    or
    $ yarn build

