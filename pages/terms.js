import Header from '../components/header.js';
import Footer from '../components/footer.js';
import styled from 'styled-components';
import { Component } from 'react';
import * as Info from '../components/Info.js';
import Menu from '../components/menu';
import initialize from '../utils/initialize.js';
import actions from '../redux/actions/index.js';
import { getCookie } from '../utils/cookie';
import { connect } from 'react-redux';

const OrangeSq = styled.div`
  position: absolute;
  background: #F39200;
  width: 30%;
  height: 10%;
  @media only screen and (max-width: 800px) {
    height: 2%;
  }
`

const WithImage = styled.div`
  display: flex;
  flex-direction: row; 
  column-gap: 2rem;
  margin-bottom: 2rem;
  img {
    object-fit: cover;
    filter: drop-shadow(12px 20px 40px rgba(12, 12, 12, 0.1));
    padding-bottom: 2rem;
  }

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    img { width: 100%; }
  }
`
const imagePath = "../static/images/new-ui/"
const noMargin = { marginBottom: "0.25rem" }

//Menampilkan tulisan dibawah
class Terms extends Component {

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
        {/* <NavBarWhite isAuthenticated={this.props.isAuthenticated} username={this.props.username} /> */}
        <Menu isAuthenticated = {this.props.isAuthenticated} username = {this.props.username} id = {this.props.idNumber} scrolled_props = "true" is_homepage = "false"/>
        <Info.BlueHeader>
          <Info.Batik>
            <h1>Terms & Conditions</h1>
          </Info.Batik>
        </Info.BlueHeader>
          <Info.Container>
              <div style={Info.paperShadow}>
                <Info.Paper>
                  <p>Fund Transfer Conditions ("<b>Agreement</b>") this set up the transfer service ("<b>Transfer</b>") between the Customers 
                  mentioned above ("<b>Customer</b>") and PT Pelita Transfer Nusantara ("<b>Transfree</b>") who conducts business as Transfree. 
                  This agreement is governed by Indonesian law and any State law that regulates the agreement of Customer accounts for registered 
                  in the country ("<b>Country</b>"). If the statutory agreement are changed, this agreement will change necessarily to comply with it.
                  If any part of these Terms is <b>invalid</b>, illegal or can not be applied, its other agreement will remain in force. 
                  </p>
    
                  <p>This agreement replaces all previous Agreement between Transfree and Customer regarding the following matters, 
                    and binds the heirs, representatives, and successors of the Customer.</p>
                
                  <p> Every claim between Transfree and Customer is related to these Terms , or for any official or illegal transfer from that 
                    account identified in these Agreement, must be determined in accordance with the terms and conditions and procedures for 
                    resolving disputes specified in Terms of Transfer between Customer and Transfree , as amended from time to time. (If the Customer did 
                    <b> not have an account</b> in Transfree, then Customer (a) hereby waives any rights for the jury trial and agrees that the claim will be 
                    decided in a trial in an area where Transfree is headquartered, and (b) hereby waives any right to file a lawsuit or controversy in 
                    general legal process , whether carried out in any court or arbitration.)</p>
    
                  <p>IF CUSTOMER FUNDS TRANSFER INTO FOREIGN DESTINATIONS FOR THE PURPOSE OF PERSONAL, FAMILY OR HOUSEHOLD, 
                    THEN IT MAY NEED ADDITIONAL DISCLOSURE AND MUST BE PROVIDED AT THE TIME OF TRANSFER</p>
    
                  <p style={noMargin}><b>1. CUSTOMER OBLIGATION</b></p>
                  <p>Customers must be responsible to Transfree for and will compensate to ensure Transfree , affiliates, officials, 
                    directors, employees and the agent is free from any and all claims, causes of action, damage, expenses 
                    (including reasonable attorney fees and legal fees), obligations and other damages resulting from any act, 
                    omission, or the agreement of data that are invalid or inaccurate by the Customer or any other person acting 
                    on behalf of Customer, included but not limited to infringement of any agreement of this agreement. Customer 
                    must use active email or any contact to sign up for security and service reasons.</p>
    
                  <p style={noMargin}><b>2. TRANSFREE’S OBLIGATION</b></p>
                  <p>Transfree only responsible for conducting transfer services provided in these Terms and will only liable for negligence 
                    or deliberate error in performing this service. Transfree will not be responsible for actions or omissions by Customers or 
                    any other person including, without limitation, other funds transfer systems , any country's central bank , any recipient bank , 
                    or any beneficiary, none of whom will Transfree considered an agent. Without restrictions, Transfree will be released from delays 
                    or failure to act if caused by legal constraints, disruption transmission or communication facilities, equipment failure, war, 
                    emergency conditions, strikes, or other conditions beyond commercially reasonable Transfree control . In addition, Transfree will 
                    be released from delays or failure to make a transfer if it will make Transfree passes the limitation position of its daily net 
                    funds determined through Bank Indonesia guidelines or other government regulatory authorities. In any case Transfree will not 
                    liable for any consequential, special, punitive or indirect damages that occur in connection with these Terms or transfers 
                    including, without restrictions due to Transfree's actions or omissions.</p>
    
                  <p style={noMargin}><b>3. RECONCILIATION</b></p>
                  <p>Duty Reporting Invalid or Wrong Payment. Each transfer will appear in the report via email to Customer. 
                    Customers should be careful to check every statement for any differences regarding the transfer of anything 
                    (including but not limited to differences in authorization, or errors in numbers or beneficiaries) and immediately 
                    notify Transfree about the difference. The amount of time the Customer must find and report the difference will depend on the 
                    circumstances, but it will not exceed seven (7) working days from the date Transfree sends a notification of Transfree receipt 
                    of the transfer request, or from other information provided to the Customer (including information that is available through the Transfree database ) 
                    is enough to be detected by the Customer . If the Customer fails to immediately report the difference, 
                    Transfree will not be responsible and the Customer will compensate and ensure Transfree free from losses in connection 
                    with the transfer and any other losses that can be avoided when its information have been given to Customer . If the Customer 
                    is a consumer who transfers funds internationally for personal, family or household purposes, various reporting rights and 
                    requirements will be specified in Transfree provided disclosures when the transfer is made.</p>
    
                  <p style={noMargin}><b>4. SECURITY PROCEDURE</b></p>
                  <p>For this Agreement , "Security Procedure" means the steps specified in paragraphs (A) and (B) below, and is intended to be a 
                    "security procedure" to verify the authenticity of a transfer request . Customers agree that, as long as Transfree acts in 
                    good faith and comply with the Security Procedure, the transfer request will bind the Customer , and the Customer will be 
                    responsible for payment the amount transferred as specified in email to the Customer, even if the transfer request is not 
                    actually initiated or authorized by the Customer . If Transfree does not follow the agreed Security Procedure, but can prove 
                    that the transfer request originated or made by or for the benefit of Customer, Customer will remain responsible for the amount 
                    of the transfer. Customers hereby agree on behalf of themselves, their employees, and their agents that Transfree can do (but 
                    has no obligation to) record, electronically or otherwise and without further notice, telephone calls related to any transfer request. 
                    Transfree can hold or close Customer accounts if things are found that violate these agreement or the agreement of the authorities in 
                    Indonesia and other countries which constitute the origin or destination of the transfer of funds .</p>
                </Info.Paper>
                <Info.Paper bg="#F3F5F7" style={{ position: "relative", padding: 0 }}>
                <OrangeSq/>
                <div style={{ padding: "2rem" }}>
    
                <WithImage>
                  <img src={imagePath + "phone.png"} alt="phone"/>
                  <div>
                    <p><b>A. Every transfer request must be made through the website Transfree.</b> The customer must state the details of the transfer of funds 
                    required by Transfree to execute the request (including customer account number, the amount, and the beneficiary account number). 
                    The authenticity of the transfer request will be confirmed by the Customer dive:</p>
                    <p>(1) Declare a valid sender's account number;</p>
                    <p>(2) Identifying himself with the person's name in accordance with the sender's account and account;</p>
                    <p>(3) Declare the Customer name listed at the top of these Conditions; and</p>
                    <p>(4) Stipulates that transfers are made from a Customer account (identified with an account number).</p>
                  </div>
                </WithImage>
    
                <p><b>B. Other than that:</b></p>
                <p><b>(1) Amount money from transfer requests will not exceed "Standard Initiation Limit" or equivalent to other currencies</b>; and</p>
                <p><b>(2) Unless Customer chooses in these Terms to authorize Transfree</b> to approve its own transfer request, the transfer must also be 
                approved in " Approval Call "which meets A (1) to (4) and B (1) above . Customer must be under "Approval Limits" which specified 
                in these Conditions which are equal to or exceed the number of pending transfers . Approval Call can Transfree done by 
                contacting (i) if sender's bank account identity is identical to an account which request a transfer, or (ii) through 
                a telephone connection separately. At its sole discretion, Transfree is never needed to start approval Call to obtain 
                the approval of the transfer of the person providing the information required in A (1) to (4) and B (1) above. 
                Transfree highly recommends to customers to not share any personal data listed in Transfree account. Customer is 
                fully responsible for ensuring that when conducting an Approval Call, the call must not be heard by a third person 
                (including being heard by someone else at the time of request and approval) if made by using the same telephone connection.). 
                </p>
                <p>
                Customer bears sole responsibility for maintaining the confidentiality of all data issued to the Customer. 
                The customer must immediately notify Transfree of any theft or suspected theft in the form anything related to customer account data. 
                The customer has determined and agreed that the agreement of this Security Procedure are commercially reasonable for the Customer , 
                taking into account the needs and circumstances disclosed by the Customer , including the size, type, and frequency of requests for 
                transfers normally issued. With this, the Customer acknowledges that additional security measures can be requested and agreed upon with 
                Transfree. 
                </p>
                <p>
                In some cases, Transfree may at its sole discretion take action outside of the Security Procedure above to 
                identify or determine further identification Customer, or to detect potential errors in contents of transfer requests. 
                Such additional measures are considered as part of the agreed Security Procedure for any transfer requests. Agreed Security 
                Procedures are not designed or intended to detect errors in transmission, or content, Customer transfer requests ( eg, duplicate 
                payments, or errors in recipients or amounts). Transfree is not obliged to detect errors by the Customer or others, even if Transfree 
                takes certain actions from time to time to do so.
                </p>
                
                <p><b>(3) Processing Transfer Requests:</b> Transfree will process the transfer request based solely on information received from the 
                Customer. Transfree may, at its sole discretion, process transfer requests through other alternatives. Before or when Transfree 
                requests a transfer, Customer must pay Transfree with funds available on the deposit for the amount of transfer as disclosed to 
                the Customer . If sufficient funds are not available or the Customer fails to pay according to these Conditions , the Customer 
                agrees that Transfree can cancel the transfer . If transfer request received after the specified time and it can be executed on the 
                following business day of fund transfer. Time can vary according to Transfree policy . Transfree is not responsible if there is a nominal 
                writing error or the recipient's recount number. 
                </p>
                
                <p>Foreign Currency Conversion: For each transfer of funds to the recipient in a foreign country, 
                  Customer agreed for conversion of funds into foreign currency with conversion rates applied by Transfree.</p>
                
                <p><b>(4) Error and Rejection by Transfree:</b> If a transfer request is identified by Transfree that the recipient is not consenting with the name and identification of the account 
                number , the implementation of the request will be rejected , even if the number identifies a different name than the name stated . If the transfer request 
                identifies the recipient as inconsistent with the account name and number, payment can be returned. Transfree may at its sole discretion reject transfer requests that are 
                not in accordance with the limits, procedures and / or other requirements set out in these Conditions, such as the availability of funds on deposit. Unless prohibited by law, Transfree at its sole discretion can reject the transfer request received from the Customer on the grounds anything or not at all (including but not limited to suspicion that the request might be illegal or violate the law or the rights of others). Transfree will notify the refusal of Customer transfer request by telephone, electronic messages or otherwise that are commercially reasonable. Transfree will comply with regulations issued by Bank Indonesia and not be responsible for Customer accounts and beneficiary accounts outside of the funds transfer process.
                </p>
                
                <p>If there is a transfer request to the entity listed in the OFAC list, the Sanctions Watchlist and blocked entries are specifically 
                  determined, therefore Transfree will not complete the transfer and will "block" the funds until the relevant authority issues a 
                  written release to Transfree . Transfree will not have liability to the Customer as a result of Transfree refusal to any transfer 
                  request or internal transfer if it meets the requirements of these Terms.</p>
    
                <p><b>(5) Disclaimer of Transfree Transfer Requests:</b> If Transfree receives a notification that the transfer sent by the Customer 
                has been rejected by the system , Transfree must notify the Customer about the refusal including the reason for the refusal 
                to be given by telephone, electronic message, letter , or other method that is commercially reasonable. Transfree has no 
                obligation to the Customer or further obligation to make the transfer, which is refused.</p>
    
                <p><b>(6) Cancellation and Amendment by Customer:</b> The customer has no right to cancel or change any transfer request after being 
                received by Transfree; however, Transfree will use reasonable efforts to act on requests for cancellations or changes as long as they 
                are accepted in accordance with the Security Procedure terms and with reasonable time to act on them . Every cancellation or request 
                for change received and followed up by Transfree is in accordance with the Agreement of the Security Procedure will bind the 
                Customer even if the request is not made by the Customer. Transfree has no obligation if cancellations or changes are not made.</p>
    
                <p><b>(7) Amendments, Assignments and Terminations Conditions:</b> Transfree has the right to change these Terms at any time, and 
                conditions will take effect immediately after sending notification of changes to the Customer , or at a later date as stated in 
                the notification or required by the applicable law . If the Customer rejects the amended agreement, the Customer must immediately 
                notify Transfree in writing that he has terminated this agreement . The Customer cannot change any part of these Terms without 
                the prior written approval of Transfree ; provided that, however, that the customer can change the "contents” of this terms by 
                completing a new agreement Wire Transfer and send it to Transfree in the range of commercially reasonable time to act upon it. 
                Customer may not assign these Terms to any other person or entity without the approval of Transfree in the form of a written agreement. 
                Customers can terminate these Terms at any time by sending written notification to Transfree . Termination by Customer is effective 
                on the second business day after receiving written notice, but Transfree may act on such notice in advance. Termination by Transfree 
                will valid immediately after written or oral notification sent or given to the Customer. Termination by either party shall not affect 
                the obligations happen before termination.</p>
    
                <p><b>(8) Official Account:</b> Customer represents and warrants that each account listed in this Section is and must remain fully 
                owned by the Customer (or that the account is jointly owned entirely by the Customer and others, both of them entitled as the joint 
                owner of the world database Transfree ).
                </p>
                </div>
              </Info.Paper>
              </div>
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
      idNumber: state.user.user_data.idNumber
    }
  } else {
    return {
      isAuthenticated: false
    }
  }
}

export default connect(mapStateToProps, actions)(Terms);
