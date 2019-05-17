import Router from 'next/router';
import authActions from '../redux/actions';
import { setCookie, getCookie } from '../utils/cookie';

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default function(ctx) {

  if(ctx.isServer) {
    if(ctx.req.headers.cookie) {
      ctx.store.dispatch(authActions.reauthenticate(getCookie('token', ctx.req)));
    }
  } else {
    const token = ctx.store.getState().authentication.token;

    if(token && ctx.pathname === '/login') {
      setTimeout(function() {
        Router.push('/signup');
      }, 0);
    }

    if(!token &&ctx.pathname === '/order') {
      Router.push('/login');
    }
  }


}
