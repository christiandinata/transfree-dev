import Header from '../components/header.js';
import Menu from '../components/menu.js';

const About = () => (
  <div>
    <Header />
    <Menu/>
    <div className="container-fluid">
      <h1>Hello</h1>
    </div>
    <style jsx>{`
      .container-fluid {
        display: flex;
        min-height: 100vh;
      }
    `}</style>
  </div>
);

export default About;
