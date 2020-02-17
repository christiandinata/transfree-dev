import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Footer from '../components/footer.js';

import Link from 'next/link';


const Terms = () => (
  <div>
    <Header />
    <Menu/>
    <div className="row">
      <div className="container">
        <h1>Transfree Privacy Policy</h1>
        <p className="paragraph">Dated: 5 August 2019</p>

        <p>If you require any more information or have any questions about our privacy policy, 
        please feel free to contact us by email at <Link href="mailto:admin@transfree.id"><a> Admin </a></Link></p>


        <p className="paragraph">At www.transfree.id we consider the privacy of our visitors to be extremely important. 
        This privacy policy document describes in detail the types of personal information is collected and recorded 
        by www.transfree.id and how we use it.</p>

        <h2> Log Files </h2>

        <p className="paragraph">Like many other Web sites, www.transfree.id makes use of log files. These files merely logs visitors to the site - 
        usually a standard procedure for hosting companies and a part of hosting services's analytics. The information inside 
        the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, 
        referring/exit pages, and possibly the number of clicks. This information is used to analyze trends, administer the site, 
        track user's movement around the site, and gather demographic information. IP addresses, and other such information are not 
        linked to any information that is personally identifiable.</p>

        <h2> Cookies and Web Beacons </h2>



        <p className="paragraph"> www.transfree.id uses cookies to store information about visitors' preferences, to record user-specific information 
        on which pages the site visitor accesses or visits, and to personalize or customize our web page content based upon 
        visitors' browser type or other information that the visitor sends via their browser.</p>


        <h2> DoubleClick DART Cookie </h2>

        <p className="paragraph"> Google, as a third party vendor, uses cookies to serve ads on www.transfree.id.
        Google's use of the DART cookie enables it to serve ads to our site's visitors based upon their visit to www.transfree.id 
        and other sites on the Internet. </p>     

        <p className="paragraph">Users may opt out of the use of the DART cookie by visiting the Google ad and content network 
        privacy policy at the following URL <Link href=" https://policies.google.com/technologies/ads"><a>  http://www.google.com/privacy_ads.html </a></Link></p>

        <h2> Third Party Privacy Policies </h2>

        <p className="paragraph"> You should consult the respective privacy policies of these third-party ad servers for more 
        detailed information on their practices as well as for instructions about how to opt-out of certain practices. 
        www.transfree.id's privacy policy does not apply to, and we cannot control the activities of, such other advertisers
         or web sites. You may find a comprehensive listing of these privacy policies and their links here : 
        <Link href="http://www.privacypolicyonline.com/privacy-policies/"><a> Privacy Policy Links</a></Link>.</p> 

         <p className="paragraph"> If you wish to disable cookies, you may do so through your individual browser options. 
         More detailed information about cookie management with specific web browsers can be found at the browsers' respective 
         websites. 
        <Link href="http://www.privacypolicyonline.com/what-are-cookies/"><a> What Are Cookies ?</a></Link> </p>

        <h2> Children's Information </h2>

        <p className="paragraph"> We believe it is important to provide added protection for children online. We encourage parents and 
        guardians to spend time online with their children to observe, participate in and/or monitor and guide their online activity. 
        www.transfree.id does not knowingly collect any personally identifiable information from children under the age of 13. If a 
        parent or guardian believes that www.transfree.id has in its database the personally-identifiable information of a child under 
        the age of 13, please contact us immediately (using the contact in the first paragraph) and we will use our best efforts to 
        promptly remove such information from our records.</p>

        <h2> Online Privacy Policy Only </h2>

        <p className="paragraph">This privacy policy applies only to our online activities and is valid for visitors to our 
        website and regarding information shared and/or collected there. This policy does not apply to any information collected 
        offline or via channels other than this website.</p> 

        <h2> Consent </h2>

        <p className="paragraph">By using our website, you hereby consent to our privacy policy and agree to its terms</p> 
        
        <h2> Update </h2>

        <p className="paragraph">This Privacy Policy was last updated on: Monday, August 5th, 2019.
        Should we update, amend or make any changes to our privacy policy, those changes will be posted here.</p>

      </div>>
    </div>
    <style jsx>{`
      .row {
        padding: 50px 0 100px;
        background: #F6F8FB;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #F6F8FB, #FFF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #F6F8FB, #FFF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }

      .container {
        max-width: 640px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
      }

      h1 {
        font-size: 3rem;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.6;
        text-align: justify;
      }

      .paragraph{
        margin-top:0px !important;
      }

      .container h1{
        margin-bottom: 0px !important;
      }

      .container h2{
        margin-bottom: 0px !important;
      }
    `}</style>
    <Footer />
  </div>
);

export default Terms;
