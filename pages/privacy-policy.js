import Header from '../components/header.js';
import { Component } from 'react';
import Footer from '../components/footer.js';
import { NavBarWhite } from '../components/MenuComponents.js';

import * as Info from '../components/Info.js';
import initialize from '../utils/initialize.js';
import actions from '../redux/actions/index.js';
import { getCookie } from '../utils/cookie';
import { connect } from 'react-redux';

//Menampilkan tulisan dibawah
class Privacy extends Component {

  constructor(props) {
    super(props)
  }

  static async getInitialProps(ctx) {
    initialize(ctx)
    if(getCookie('_id', ctx.req)) {
      await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
    }
    return {}
  }

  render() {
    return (
      <div>
        <Header />
        <NavBarWhite isAuthenticated={this.props.isAuthenticated} username={this.props.username} id={this.props.id} />
        <Info.BlueHeader>
          <Info.Batik>
            <h1>Privacy Policy</h1>
          </Info.Batik>
        </Info.BlueHeader>
        <Info.Container>
          <Info.Paper style={Info.paperShadow}>
            <p>If you require any more information or have any questions about our privacy policy, 
              please feel free to contact us by email at <a href="mailto:admin@transfree.id"> Admin </a></p>
    
            <p>At <a href="https://www.transfree.id">www.transfree.id</a> we consider the privacy of our visitors to be extremely important. 
              This privacy policy document describes in detail the types of personal information is collected and recorded 
              by <a href="https://www.transfree.id">www.transfree.id</a> and how we use it.</p>
              
            <h2>Log Files</h2>
    
            <p>Like many other Web sites, <a href="https://www.transfree.id">www.transfree.id</a> makes use of log files. These files merely logs visitors 
              to the site - usually a standard procedure for hosting companies and a part of hosting services's analytics. The information inside 
              the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, 
              referring/exit pages, and possibly the number of clicks. This information is used to analyze trends, administer the site, 
              track user's movement around the site, and gather demographic information. IP addresses, and other such information are not 
              linked to any information that is personally identifiable.</p>
    
            <h2> Cookies and Web Beacons </h2>
    
            <p> <a href="https://www.transfree.id">www.transfree.id</a> uses cookies to store information about visitors' preferences, to record user-specific information 
                on which pages the site visitor accesses or visits, and to personalize or customize our web page content based upon 
                visitors' browser type or other information that the visitor sends via their browser.</p>
    
            <h2> DoubleClick DART Cookie </h2>
    
            <p> Google, as a third party vendor, uses cookies to serve ads on <a href="https://www.transfree.id">www.transfree.id</a>.
                Google's use of the DART cookie enables it to serve ads to our site's visitors based upon their visit to  
                <a href="https://www.transfree.id"> www.transfree.id</a> and other sites on the Internet. </p>     
    
            <p>Users may opt out of the use of the DART cookie by visiting the Google ad and content network 
                privacy policy at the following URL <a href=" https://policies.google.com/technologies/ads">  http://www.google.com/privacy_ads.html </a></p>
    
            <h2> Third Party Privacy Policies </h2>
    
            <p> You should consult the respective privacy policies of these third-party ad servers for more 
                detailed information on their practices as well as for instructions about how to opt-out of certain practices. 
                <a href="https://www.transfree.id"> www.transfree.id</a>'s privacy policy does not apply to, and we cannot control the activities of, such other advertisers
                or web sites. You may find a comprehensive listing of these privacy policies and their links here : 
                <a href="http://www.privacypolicyonline.com/privacy-policies/"> Privacy Policy Links</a>.</p> 
    
            <p> If you wish to disable cookies, you may do so through your individual browser options. 
                More detailed information about cookie management with specific web browsers can be found at the browsers' respective 
                websites. 
                <a href="http://www.privacypolicyonline.com/what-are-cookies/"> What Are Cookies ?</a></p>
    
            <h2> Children's Information </h2>
    
            <p> We believe it is important to provide added protection for children online. We encourage parents and 
                guardians to spend time online with their children to observe, participate in and/or monitor and guide their online activity. 
                <a href="https://www.transfree.id"> www.transfree.id</a> does not knowingly collect any personally identifiable information from children under the age of 13. If a 
                parent or guardian believes that <a href="https://www.transfree.id">www.transfree.id</a> has in its database the personally-identifiable information of a child under 
                the age of 13, please contact us immediately (using the contact in the first paragraph) and we will use our best efforts to 
                promptly remove such information from our records.</p>
    
            <h2> Online Privacy Policy Only </h2>
    
            <p>This privacy policy applies only to our online activities and is valid for visitors to our 
                website and regarding information shared and/or collected there. This policy does not apply to any information collected 
                offline or via channels other than this website.</p> 
    
            <h2> Consent </h2>
    
            <p>By using our website, you hereby consent to our privacy policy and agree to its terms</p> 
                
            <h2> Update </h2>
    
            <p>This Privacy Policy was last updated on: Monday, August 5th, 2019.
                Should we update, amend or make any changes to our privacy policy, those changes will be posted here.</p>
    
          </Info.Paper>
        </Info.Container>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.user.user_data != null) {
    return {
      isAuthenticated: true,
      username: state.user.user_data.fullname,
      id: state.user.user_data.idNumber
    }
  } else {
    return {
      isAuthenticated: false
    }
  }
}

export default connect(mapStateToProps, actions)(Privacy);
