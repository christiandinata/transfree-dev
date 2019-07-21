import Link from 'next/link';
import DashboardLayout from '../../components/DashboardLayout';
import IndexLayout from '../../components/dashboard/IndexLayout';
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

  renderContent() {
    return <IndexLayout />
  }

  render() {
    return (
      <DashboardLayout>
        {this.renderContent()}
      </DashboardLayout>
    );
  }
}

const mapStateToProps = (state) => {return {}}

export default connect(mapStateToProps, actions)(Home);
