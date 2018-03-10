# Express Insert Middleware

Call express middlewares just before calling next or sending response

## Installation

```sh
$ npm i express-insert-mw
```

## Usage

Use this module to manually call middleware inside your express

For example,

```js
var insertMiddleware = require('express-insert-mw');

/* Init your express app */

/* Create a basic middleware */
function loadProfileInfo(req, res, next) {
    /* Load informations from BDD { */
        req.user = {
            name: nameFromBDD
        };
        next();
    /* } */
}
app.use(loadProfileInfo);

/* Basic profile page */
app.get('/profile',
    function(req, res) {
        res.send('Hello ' + req.user.name);
    }
);

/* Edit profile request */
app.post('/profile',
    function(req, res) {

        /* Set new profile information in BDD { */

            /* Then reload profile informations with the middleware */
            insertMiddleware(req, res, [loadProfileInfo], function(req, res) {
                res.send('Hello ' + req.user.name);
            });

        /* } */

    }
);
```

You can pass an array of multiple middlewares

## License

This project is licensed under the [MIT license](LICENSE).
