//Component untuk menampilkan saat order diproses



export function PendingLayout(){
    return (
      <div className="content">
        <div className="big-icon">
          <img src="../static/images/document.svg"/>
        </div>
        <h1>Awaiting confirmation</h1>
        <p>We are now reviewing your account details. We will send you an email & WhatsApp message once the verification process is completed.</p>
        <p>Please contact us by email (admin@transfree.id) or WhatsApp (+44 7490 090659) for faster process.</p>
        <style jsx>{`
          .logo {
            width: 100%;
            text-align: center;
          }
          .big-icon img {
            margin: 50px auto;
          }
          p {
            max-width: 600px;
            text-align: justify;
            margin-bottom: 20px;
          }
          h1 {
            margin: 0;
          }
          .content {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            align-items: center;
            justify-content: justify;
            margin-top:30px;
            padding:15px;
          }
        `}</style>
      </div>
    )
  
  }