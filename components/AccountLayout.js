import Header from '../components/header.js';
import Menu from '../components/menu.js';

//Untuk layout account.js
const AccountLayout = ({children, isApproved}) => (
  <div>
    <Header />
    <Menu isApproved={isApproved}/>
    <div className="container-fluid">
      {children}
    </div>
    <style jsx>{`
      .container-fluid {
        flex-direction: column;
      }
      `}</style>
  </div>
);

export default AccountLayout;
