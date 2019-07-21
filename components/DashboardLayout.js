import Header from '../components/header.js';
import MenuAdmin from '../components/menuAdmin.js';
import Link from 'next/link';

const DashboardLayout = ({children}) => (
  <div>
    <Header />
    <MenuAdmin/>
    <div className="container-fluid">
      {children}
    </div>
  </div>
);

export default DashboardLayout;
