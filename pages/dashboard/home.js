import Link from 'next/link';
import Header from '../../components/header.js';
import MenuAdmin from '../../components/menuAdmin.js';
import { connect } from 'react-redux';
import initialize from '../../utils/initialize';
import actions from '../../redux/actions';
import { getCookie } from '../../utils/cookie';

class Home extends React.Component {
  constructor({props}) {
    super(props);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
  };

  render() {
    return (
      <div>
        <Header />
        <MenuAdmin/>
        <div className="container-fluid">
          <h1>Dashboard admin</h1>
        </div>
        <style jsx>{`
          .container-fluid {
            align-items: flex-start;
            height; auto;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {return {}}

export default connect(mapStateToProps, actions)(Home);
