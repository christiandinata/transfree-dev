import Link from 'next/link';
const IndexLayout = () => {
  return (
    <div className="content">
      <h1>Admin dashboard</h1>
      <p>Admin dashboard menu goes here</p>
      <style jsx>{`
        .logo {
          width: 100%;
          text-align: center;
        }
        .big-icon img {
          height: 300px;
          margin: -80px auto 50px;
        }

        p {
          max-width: 600px;
          text-align: center;
          margin-bottom: 50px;
        }

        h1 {
          margin: 0;
        }

        .content {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  )

}

export default IndexLayout;
