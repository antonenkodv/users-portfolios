### What you need to launch project


---
#### 1. create .env file and add there envorinment variables
* all variables connect db locate in file `config` in the root of the project
* values `SECRET1 and SECRET2` could be any


#### 2. simply run `npm run start`

### or with add some data
#### 2. run `npm install --save-dev sequelize-cli`

#### 3.  run migrations with command `npx sequelize-cli db:migrate`

#### 4.  run seeders  with command`npx sequelize-cli db:seed:undo`

#### run `npm run start`


## Tables

### Users
|Name|Email|Pasword|Status|Id|
|----|-----|-------|----|---|
|Ivan|ivanov@example.com|address1|password|1234|

### Portfolio
|Name|Owner|Description|
|---------|---------|-------|
|portfolio name|id owner|description|

### Images
|Filename|Description|Comments|Owner ID|Portfolio ID|
|---------|---------|-------|----|------|
|unknow name|decription|comments array|owner id|portfolio id|

![imagename](https://drive.google.com/uc?authuser=0&id=1GyFvSrHSQ-UgnEiYYu61ZPz1ZWMpH-ZA&export=download)