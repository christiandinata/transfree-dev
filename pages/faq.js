import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Footer from '../components/footer.js';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const FAQ = () => {
  return (
    <div>
      <Header />
      <Menu/>
      <div className="row">
        <div className="container">
          <h1>FAQss</h1>

          <h3>About Transfree</h3>
          <Accordion allowMultipleExpanded={true}>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          What is Transfree
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      Transfree is a remittance service where our customer send money abroad and get paid in other currencies into their account or beneficiary account.     
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          How do I use Transfree?
                      </AccordionItemButton>
                  </AccordionItemHeading>   
                  <AccordionItemPanel>
                        <p>
                            You can check our short video <a href="https://www.youtube.com/watch?v=8RzCs_sQ8Ak&t=32s">here</a>
                        </p>
                        <p>Or follow the steps below
                        <ol>
                        <li>For new user, please sign up and fill required information.  </li>
                        <li>Login, go into account information and verify your account. </li>
                        <li>Fill the transaction information form in transfer page and choose the amount you want to send.</li> 
                        <li>Review your transaction detail before submitting and make sure that your data is right. Then submit your transaction detail to us.</li>
                        <li>Receive notification email about the transaction detail and payment instruction. Please contact us as soon as possible if there is something wrong with your transaction data.</li> 
                        <li>You can track the transaction status in your dashboard.</li>
                        <li>Upon completion, we will send you notification email together with the receipt.</li>
                        </ol>                       
                        </p>
                  </AccordionItemPanel>
              </AccordionItem>
          </Accordion>

          <h3>Managing your account	</h3>
          <Accordion allowMultipleExpanded={true}>
              
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                      How do I add or delete recipients?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      For every new transfer you do, you can save the recipient detail by ticking the box 'save account' in the form transaction section. If you want to delete your recipient, open Recipient List tab, choose your recipient that you want to delete, and click on Delete button.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                         What if I've forgotten my password ?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      You can click on forget password in our website or apps. We will send you an email to reset your password.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                      What if I didn't get the email to reset my password?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      Contact our customer support (email to admin@transfree.id or WhatsApp +44 7490 090659) to let us know and resolve this issue. We will contact you in maximum 48 hours.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
          </Accordion>

          <h3>Receiving Money	</h3>
          <Accordion allowMultipleExpanded={true}>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          How do I receive my money?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      We will send the money to your account or recipient's bank account (account to account) as listed in your transaction detail.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          How long does it takes?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      Your money will arrive in about 1 working day, however it is possible that it will take longer due to time differences or other issues.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          What do you mean by other issues?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                          <ol>
                            <li>What time you pay for your transfer (Our Cut-Off Time is 13:00 UTC+7)</li>
                            <li>Security checks</li>
                            <li>Transfer amount</li>
                          </ol>
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          Why my money arrive late?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                          <ol>
                            <li>Please be aware that our cut-off time is 13:00 UTC+7 (WIB). Kindly check when you pay for your transfer</li>
                            <li>We can't process your transfer at weekend or bank holiday</li>
                            <li>Make sure you provide the documents needed by us to process your transfer before the cut-off time</li>
                            <li>Please review your transaction detail before submitting to us since we use that to process your transfer</li>
                            <li>Other factors (in this case, we will contact you directly by our official email (admin@transfree.id) or WhatsApp (+44 7490 090659). Never trust anyone contacting you outside those contacts on our behalf.</li>
                          </ol>
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
          </Accordion>

          <h3>Safe and Secure	</h3>
          <Accordion allowMultipleExpanded={true}>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                        I received email from someone to send money through Transfree, what should I do?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      We suggest not receiving and send money to people you don't know. Transfree is not responsible for any losses due to money transfer to people you do not know. Transfree will always tell your booking number in our email (given via email when you do money transfer through us). If you think you may be the victim of an online scam, contact your local police service.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          Is it safe to use Transfree service?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      Yes. We made this service not only to get you a faster money transfer, but safer for your money transfer. We are doing it by sistem and through bank system with human verificator in between when needed.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          What if there are some problems about my transfer?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      Depend on your circumstances, we may be able to help you. Contact our customer support for more info (email to admin@transfree.id or WhatsApp +44 7490 090659). Please keep in mind that some circumstances are not in our control.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
          </Accordion>

          <h3>Pay for my transfer</h3>
          <Accordion allowMultipleExpanded={true}>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          How do I pay?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      You can pay to us by bank transfer (total amount will be specified in our email to you). We do not receive payment in cash since we need to know from where your money come from before we continue your transfer.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          Can I have discount for my transfer?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      We may give you discount from time to time by sending promotional email to you.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          Do you have physical outlet where I can visit to send money?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      No, we don’t have any physical outlet. We only do transactions by bank transfer for now. We might be able to do cash deposit in the future time, and we will notify about it in our platform.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
          </Accordion>

          <h3>ID Verification</h3>
          <Accordion allowMultipleExpanded={true}>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          What information do you need to verify my account?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      We will ask you to present your official identity depending on your location and your transfer destination. Official ID or driver license and your passport (if your current country is not your home country). Also a photo of you holding your ID to know that you are the real person who sign up.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          Why do I need verification?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      Verifications are needed to protect your money and also for us to comply with regulations such as Anti Money Laundering, Counter Funding Terrorism etc.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              </Accordion>

          <h3>Sending money	</h3>
          <Accordion allowMultipleExpanded={true}>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          What is Sort code?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      The sort code, which is a six-digit number, is usually formatted as three pairs of numbers, for example 12-34-56. It identifies both the bank and the branch where the account is held. Please refer to your destination bank in UK.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          What is SWIFT code
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                         Bank Identifier Code (sometimes called SWIFT) is used in many countries around the world. It contains information about the receiving country, bank and branch. The BIC/SWIFT is either 8 or 11 digits long and includes numbers and letters. Please refer to your destination bank.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          What is my transfer limit?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      Your transfer limit depends on regulations in your current location and your transfer destination. We will contact you if your amount exceeding limit allowed in your destination country. Sometimes we will ask the nature of your transfer to comply with anti money laundry regulations especially for transfer amount exceeding regulations.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          What are your supported currencies?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      For now we have GBP, EUR, and IDR. We are in the process of expanding our currencies list.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          How to check my transfer status?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      We will send your transfers status via email when it is being processed and after your money is arrives at its destination. Or you can check your order detail via our web and apps. If you need to know more about your transfer status, feel free to contact our customer support by email admin@transfree.id or WhatsApp +44 7490 090659
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          Why do you reject my transfer request?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      We could reject your transfer request when we decide your transfer is high-risk transaction according to regulations and our AML-CFT procedures.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          I think I entered wrong account number, what happens now?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      Please contact our Customer Service by email (admin@transfree.id) or WhatsApp (+44 7490 090659) as soon as possible
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          Why I can't send money to particular country?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      We can't transfer money to some country that we see as high-risk country. Until we get a safe channel to high-risk country, we will not process any transfer to some countries.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
          </Accordion>

          <h3>Operational Hours</h3>
          <Accordion allowMultipleExpanded={true}>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                      Does Transfree operate 24/7?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      No. Our operational hour is Monday - Friday : 10.00 - 18.00 UTC+7
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                      Does The Customer Service Officer standby 24/7?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      No at the moment. But we will do a reasonable effort to response for every inquirie out of operational hour subject to the urgency and importance of the issue
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
          </Accordion>

          <h3>Cut Off Time</h3>
          <Accordion allowMultipleExpanded={true}>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                      What is cut off time?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      Cut off time is the time at which we stop sending the money in that particular day. It means that transaction made before cut off time will be processed in the same day and most likely will arrive in the same day also. Transaction made after the cut off time will arrive in the next working day.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                      Is there any specific cut off time for transfree?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      Yes, our cut off time is 12.30 UTC+7
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
          </Accordion>

          <h3>Complaint and Other Inquiries</h3>
          <Accordion allowMultipleExpanded={true}>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                      I have a problem with my transaction and would like to raise a complaint. How can I do that?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      You can directly contact us by email (admin@transfree.id) or WhatsApp (+44 7490 090659) for any complaint or other issue that happen during your transaction. We will get back to you in maximum 1 working days, and for some urgent issue that need immediate action we will do reasonable effort to solve the issue.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                      Can I pay for my transaction order on behalf of other's bank account?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      No. Each time a customer want to make a transaction order, it is a mandatory for the customer (sender) to send the money from their own bank account. If in any condition we receive the money from a different name or different person, Transfree will do a refund and ask for the customer to re-transfer the money again from their account.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
          </Accordion>

          <h3>Others</h3>
          <Accordion allowMultipleExpanded={true}>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          Do you operate in weekend or holiday?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      Our website is operate everyday, 24/7 include bank holiday or weekend. But our system is offline during this time and we can't process your transfer in weekend or bank holiday. Each transaction made during this period will be processed in the next working day.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          How Transfree works?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      Read about how Transfree works <a href="#top">here</a>
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          How to contact you if I have questions?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      Please contact our Customer Service by email (admin@transfree.id) or WhatsApp (+44 7490 090659)
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          How is the refund process?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                      We will contact you if you want to refund your cancelled transactions. Or you can get in touch with our Customer Service (email admin@transfree.id or WhatsApp +44 7490 090659). Please save your transaction information so we can verify your refund. When refund verification is done, we will refund your money back to your bank account in maximum 48 hours. Notes : Please be aware that you can't refund a transaction if its already processed.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
          </Accordion>
        </div>
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
          text-align:Justify;
        }

        h1 {
          font-size: 3rem;
        }

        h3 {
          margin-top: 50px;
        }

        p {
          font-size: 1rem;
          line-height: 1.6;
        }
        `}</style>
      <Footer />
    </div>
  )
}
export default FAQ;
