import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Link from 'next/link';

const AccountLayout = ({children, isApproved}) => (
  <div>
    <Header />
    <Menu isApproved={isApproved}/>
    <div className="container-fluid">
      {children}
    </div>
  </div>
);

export default AccountLayout;
