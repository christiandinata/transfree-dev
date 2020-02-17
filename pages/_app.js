import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../redux';
import '../utils/fontawesome';
import 'react-phone-number-input/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import {InitGA, logPageView} from '../utils/analytics';

export default withRedux(initStore, { debug: false })(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {})
        }
      };
    }

    componentDidMount(){
      InitGA()
      logPageView()
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      );
    }
  }
);
