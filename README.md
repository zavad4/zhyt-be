# zhyt-be

It is api for ZHYT application. You can find more information about our system in [this repository.](https://github.com/dirayser/zhyt-ios)

# Tech stack
* Node.js
* MySQL
* [Knex.js](http://knexjs.org/)
* [Fastify](https://www.fastify.io/)

# Installation
You can configure your database options in [etc/db](https://github.com/zavad4/zhyt-be/blob/master/etc/db.js). 

To run migration:
```
npm run migration
```
After that you can run project by:
```
npm start 
```
or
```
npm run dev
```

You also can set superAdmin's credentials fr login in file [fixtures/superAdmins.js](https://github.com/zavad4/zhyt-be/blob/master/fixtures/superAdmins.js)

# Help
Ask questions at [telegram](https://t.me/zavad4) and post issues at [github](https://github.com/zavad4/zhyt-be/issues).

# License
ISC © [Elizavieta Zavodovska](https://github.com/zavad4)
