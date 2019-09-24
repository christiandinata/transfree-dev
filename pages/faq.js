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
          <h1>FAQs</h1>

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
                          Transfree is a remittance service where our customer send money abroad.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          Why would I use Transfree service
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                          It is simple, with a fast response customer service. You can reach us casually through whatsapp too!
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          I just know Transfree. How I use Transfree?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                          For new user, please sign up and fill required information. Then login, go into account information and verify your account. Then fill transaction information form in Transfer page.
                      </p>
                  </AccordionItemPanel>
              </AccordionItem>
          </Accordion>

          <h3>Receiving Money	</h3>
          <Accordion allowMultipleExpanded={true}>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                          How I receive my money?
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                      <p>
                          For now, we only send your money to your recipient's bank account (bank transfer).
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
                          You money will be processed in 24 hours at working day and in the weekend or public holiday you will receive the money in the next working day. However please bear in mind that in certain condition it will need more than 24 hours to processed your transfer if there is security or due diligence compliance issue happen. If it happens to you, we will notify you through email or whatsapp.
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
                            <li>What time you pay for your transfer</li>
                            <li>Security checks</li>
                            <li>Transfer amount</li>
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
                        We made this service not only to get you a faster money transfer, but safe for your transfer. We are doing it by sistem and through bank system with human verificator in between when needed.
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
                          Depend on your circumstances, we may be able to help you. Contact our customer support for more info. Please keep in mind that some circumstances are not in our control.
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
                          We may give you discount from time to time by sending promotional email to you. Enter the code when you write information about your transfer.
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
                          No, we don’t have any physical outlet. We only do transactions by bank transfer. We need to know from where your money come from.
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
                          We will ask you to present your official identity depending on your location and your transfer destination. Official ID or driver license and your passport (if your current country is not youtr home country). Also a photo of you holding your ID to know that you are the real person who sign up.
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
                          Verifications are needed to protect your money and also for us to comply with regulations such as Anti Money Laundering etc.
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
                          We will send your transfers status via email when it is being processed and after your money is arrives at its destination. If you need to know more about your transfer status, feel free to contact our customer support
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
                          Please contact our Customer Service by email or WhatsApp
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
                          We can't transfer money to some country that we see as high-risk country.
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
                          Yes, We operate 24/7.
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
                          Read about how Transfree works here.
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
                          Please contact our Customer Service by email or WhatsApp
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
                          We will contact you if you want to refund your cancelled transactions. Or you can get in touch with our Customer Service. Please save your transaction information so we can verify your refund.
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
