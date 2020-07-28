const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());

    server.get('/', (req, res) => {
      if(req.cookies.token) {
        res.redirect('/home');
      } else {
        return app.render(req, res, '/index', req.query);
      }
    });

    server.get('/account', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/');
      } else {
        return app.render(req, res, '/home', req.query);
      }
    });

    server.get('/home', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/login');
      } else {
        return app.render(req, res, '/home', req.query);
      }
    });

    server.get('/login', (req, res) => {
      if(req.cookies.token) {
        res.redirect('/account');
      } else {
        return app.render(req, res, '/login', req.query);
      }
    });

    // server.get('/dashboard', (req, res) => {
    //   if(req.cookies.token) {
    //     res.redirect('/dashboard');
    //   } else {
    //     return app.render(req, res, '/login', req.query);
    //   }
    // });


    server.get('/signup', (req, res) => {
      if(req.cookies.token) {
        res.redirect('/account');
      } else {
        return app.render(req, res, '/signup', req.query);
      }
    });

    server.get('/phone', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/login');
      } else {
        return app.render(req, res, '/phone', req.query);
      }
    });

    server.get('/phone-verification', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/login');
      } else {
        return app.render(req, res, '/phone-verification', req.query);
      }
    });

    server.get('/id-verification', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/login');
      } else {
        return app.render(req, res, '/id-verification', req.query);
      }
    });

    server.get('/photo-verification', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/login');
      } else {
        return app.render(req, res, '/photo-verification', req.query);
      }
    });

    server.get('/logout', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/login');
      } else {
        return app.render(req, res, '/', req.query);
      }
    });

    server.get('/order', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/login');
      } else {
        return app.render(req, res, '/order', req.query);
      }
    });

    server.get('/dashboard/home', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/dashboard/login');
      } else {
        return app.render(req, res, '/dashboard/home', req.query);
      }
    });

    server.get('/dashboard/users', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/dashboard/login');
      } else {
        return app.render(req, res, '/dashboard/users', req.query);
      }
    });

    server.get('/dashboard/orders', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/dashboard/login');
      } else {
        return app.render(req, res, '/dashboard/orders', req.query);
      }
    });

    server.get('/dashboard/rates', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/dashboard/login');
      } else {
        return app.render(req, res, '/dashboard/rates', req.query);
      }
    });
    server.get('/dashboard/check', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/dashboard/login');
      } else {
        return app.render(req, res, '/dashboard/check', req.query);
      }
    });

    server.get('/reset_password', (req, res) => {
      return app.render(req, res, '/reset_password', req.query.token);
    });

    server.get('/receipt', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/login');
      } else {
        return app.render(req, res, '/receipt', req.query.oid);
      }
    });

    server.get('/profile', (req, res) => {
      if(!req.cookies.token) {
        res.redirect('/login');
      } else {
        return app.render(req, res, '/account', req.query.oid);
      }
    });


    // server.get('/editprofile', (req, res) => {
    //   if(!req.cookies.token) {
    //     res.redirect('/login');
    //   } else {
    //     return app.render(req, res, '/editprofile', req.query.oid);
    //   }

    // server.get('/donasiqurban', (req, res) => {
    //     return app.render(req, res, '/donasiqurban', req.query.oid);
      

    // });


    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
