import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Link from 'next/link';
//Untuk layout account.js
const AccountLayout = ({children, isApproved}) => (
  <div>
    <Header />
    <Menu isApproved={isApproved} homepage = "true"/>
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
