import Head from 'next/head';

const StyleIndex = () => (
  <div>
    <Head>
      {/* <title>Transfree - International Transfer Made Fast and Free</title> */}
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=4" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href="../static/images/icon-logo.png"/>
      <link href="../static/misc/flag-icon-css/css/flag-icon.min.css" rel="stylesheet"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

    </Head>
    <style jsx global>{`
      .right-container .result-conversion{
        box-shadow: 0 2px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
        height:auto;
        font-size:11px;
        padding:1px 20px 1px 20px;
        margin-top:4px;
       
      }

    h2,h1,h3{
      color:#FFFFFF;
    }
    hr.line{
        border: 1px solid black;
        width:300px;
    }


     .features{
      background:url('../static/images/features/background-batik.png');
      background-repeat: no-repeat;
      background-position: top;
      background-size:100%;
      margin-top: -5.8vw;
      // height:1300px;
      // padding:100px 0px 0px 0px;
      z-index:-99;
      margin-bottom:140px;
      display:flex;
       flex-direction:column;
     }

     .features .container{
       display:flex;
       flex-direction: column;
     }

     .features .container-image{
      display:flex;
      flex-direction: row;
      flex-basis:100%;

    }

    .features .container-content{
      display:flex;
      flex-direction: column;
    }

     .features .container .benefit{
      width:85vw;
      margin:auto;
    }


   .fiture-mobile {
     display:none;
   }

    .features .container-image .images{ 
      margin-top:-4.18vw;
      display:flex;
      margin-left:-1vw;
      flex-basis:65%;
    }

    .features .images img{
      height:6vw;
      width:auto;
       margin:auto;
       max-width: 100%;
    }


    
   .features .message{
      background:url('../static/images/features/chat-box.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size:100% 100%;
      width:90%;
      margin-left:auto;
      margin-right:auto;
      opacity:0.8;
      padding:10px 10px 10px 10px;
      
     
   }

   .features .message {
     font-size:23px;
     margin-top:6%;
   }

    .testimonial .message{
      background-image:url('../static/images/testimoni/box-message.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size:100% 100%;
      width:80%;
      padding:50px 0px 50px 0px;
      text-align:center;
      margin-left:auto;
      margin-right:auto;
    }

    .testimonial .message p{
      color:#000000;
      font-size:20px;
      text-align:center;
      margin-top:-25px;
      
    }

    .testimonial div h1{
      font-size:25px;
    }


    .box-message{
      margin-top:500px;
      width:auto;
      height:auto;
    }

   

    .profile-testimonial .textTesti h1{
      // font-size:25px;
      // color:blue;
      // margin:200px;
    }

    .testimonial img{
      width:14%;
      margin-left:auto;
      margin-right:auto;
      display:block;
     
    }

    .text h1,h2{
      display:inline;
      font-size:35px;
    }

    .text{
      margin-top:0px;
    }

  


    .features .btn-primary-start {
      background-color: #5BB7DE;
      border: none;
      width:360px;
      height:330px;
      margin-bottom:20px;
      color: white;
      
      text-align: center;
      text-decoration: none;
      display: inline-block;
      border-radius: 21px;
      font-size:29px;
      margin-right:10px;
      transition: all 0.2s ease-in-out;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
    }

    .features .btn-primary-start:hover {
      background-color: #FAAF40;
      border: none;
      -ms-transform: scale(1);
      -webkit-transform:scale(1);
      transform:scale(1.5);
      margin-bottom:20px;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      border-radius: 21px;
      font-size:29px;
      margin-right:10px;
      transition: all 0.2s ease-in-out;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
    }

     .btn-primary-start:hover {
      background-color: #FAAF40;
      border: none;
      transform: translateY(2px);
      margin-bottom:20px;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      border-radius: 21px;
      font-size:29px;
      margin-right:10px;
     
      box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
    }

    // .column {
    //   flex :23.35%;
      
    // }

    .features .benefit{
     display:flex;
    }

     .features .background img{
      height:1000px;
      width:2000px;
      margin-left:-480px;
      margin-top:-100px;
     }


     .benefit img{
      width:7vw;
      height:auto;
     }

     .benefit h1{
       font-size:2.8vw;
      //  width:7vw;
       height:auto;
       text-align:center;
     }

    
  
     .benefit .btn-primary-start{
       padding:10px 10px 30px 10px;
       height:auto;
     }


     .left-container h1 {
      font-family: 70px 'Open Sans', sans-serif;
      font-weight: 700;
      color: #FFFFFF;
    }

    .left-container img {
      height:70px;
      width:200px;
    }

    .application .left-container img {
      height:auto;
      width:23vw;
      margin-left:auto;
      margin-right:auto;
      
      text-align:center;
      
      
      
    }

    .application .right-container img{
      width:17vw;
     
    }

    

      // container{
      //   background-color: #d2222f;
      //   width:20px;
      // }

      .application{
        display:flex;
        justify-content: center;
        align-items: center;
        margin-top:-100px;
        // height:auto;
      }

      .application .right-container{
        justify-content:center;
        text-align:center;
        // margin-top:15%;
        // background:blue;
        display:flex;
        flex-direction:column;
        padding: 0px;
       
      }

      .application .left-container{
        justify-content:center;
        text-align:center;
        // background:blue;
        flex-basis:50%;
        height:auto;
        padding:0px;
        display:flex;
        flex-direction:column;
      }

      

      .application h1{
      font-family: 800em ,'Open Sans', sans-serif;
      font-weight: 900;
      color: #000000;
      text-shadow: 1px 1px 1px #000000;
      }

      .achievement{
        background:url('../static/images/achievment/achievement.png') no-repeat ;
        background-position: center;
        background-size:100% 100%;
        height:600px;
        z-index:-1;
        margin-top:2vw;
      }

      .testimonial {
        background:url('../static/images/achievment/lingkaran setengah.png'),url('../static/images/testimoni/background.png');
        background-repeat: no-repeat;
        background-position:  0px -100px,center;
        background-size:100% 200px,100% 100%;
        height:auto;
        width:auto;
        z-index:-1;
        margin-top:-100px;
        padding:130px 0px 0px 0px;
      }



      .testimonial div{
        display:block;
      }


      .title{
        margin-top:20px;
      }

      .title h1{
        display: inline-block;
      }

     

      .achievement  h1{
        color:#000000;
        font-size:40px;
        text-shadow: 1px 1px 1px #000000;
       
      }


      .top-right {
        position:center;
        left:10px;
        float:center;
      }
      
      .btn-primary-3{
        background-color: #d2222f;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 4px;
        transition: all 0.2s ease-in-out;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
        width:140px;
      }

      

      .btn-primary-2 {
        background-color: #5BB7DE;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        border-radius: 12px;
        font-size:20px;
        transition: all 0.2s ease-in-out;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
        padding:10px 10px 10px 10px;
      }

      .btn-primary-2:hover {
        background-color: #5BB7DE;
        // border: none;
        // // transform: translateY(2px);
        // margin-bottom:20px;
        // color: white;
        // text-align: center;
        // text-decoration: none;
        // display: inline-block;
        // border-radius: 21px;
        // font-size:29px;
        // margin-right:10px;
       
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
      }


      .btn-primary-start {
        background-color: #FAAF40;
        border: none;
        width:150px;
        margin-bottom:20px;
        color: white;
        padding: 10px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        border-radius: 12px;
        font-size:20px;
        transition: all 0.2s ease-in-out;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
      }

      .testimoni{
        margin-left: 590px;
        margin-top: 0px;
        font-size: 15px;

      }
       .fixed-btn{
         position: fixed;
         background: #00a82d;

         width: 65px;
         height: 65px;
         line-height: 45px;

         bottom: 4%;
         right: 3%;
         border-radius: 50%;
         text-align: center;

         box-shadow: 0 10px 30px 0 rgba(0,0,0,0.30);
         cursor: pointer;

      }
      .fixed-btn:active{
        box-shadow: 0 0;
      }
      /** LIGHTBOX MARKUP **/
      .lightbox {
        /** Default lightbox to hidden */
        display: none;

        /** Position and style */
        position: fixed;
        z-index: 999;
        width: 100%;
        height: 100%;
        text-align: center;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.8);
      }

      .lightbox iframe {
        /** Pad the lightbox image */
        min-width: 55%;
        min-height: 60%;
        margin-top: 10%;
      }

      .lightbox:target {
        /** Remove default browser outline */
        outline: none;

        /** Unhide lightbox **/
        display: block;
      }

        .desktop {
          margin-top:40px;
          display: block;
        }
        .sell-buy {
          color: white;
          background-color: #d2222f; //none
          border-color: #d2222f
        }
        .external-link{
          display: flex;
          margin-top: 30px;
        }
        .external-link-right {
          lex-basis: 40%;
          margin-left : 20px;
          margin-top: 0px;
        }
        .mobile-sell-buy{
          background-color: none;
          border-color: #5a9cd8;
          display: block;
        }
        .h1-bawah{
          margin-top:0px !important;
        }
        .left-container h1{
          margin-bottom:0px !important;
        }

        .container {
          display: flex;
          max-width:1124px;
        }



        .hero {
          background-image:url('../static/images/Asset Web/content/Banner_Web.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size:100% 100%;
          margin-top:0px;
          
        }

       

        .left-container {
          flex-basis: 55%;
          margin-top:40px;
          margin-left:30px;
          margin-right:10px;
         
          
        }

        .left-container h1{

        }


        .left-container p {
          max-width: 80%;
          margin-bottom: 30px;
        }

        .right-container {
          flex-basis: 60%;
          margin-top: 55px;
         
        }

        .hero .right-container{
          flex-basis: 34%;
          margin-top: 25px;
          margin-right:0px;
          margin-left:30px;
        }

        .right-bottom-container{
          margin-top:20px !important;
          display: none;
        }
        .store{
          margin-top: 15px;
         
        }

        h1 {
          font-size: 2rem;
        }

        .benefits {
          display: flex;
          margin-top: 50px;
        }

        .benefit-item {
          flex-basis: 40%;
          text-align: center
        }

        .benefit-item p {
          margin: 0 auto;
        }

        .benefit-item img {
          margin-bottom: 20px;
        }

        .converter-container {
          padding: 15px 10px 23px 20px;
          background: #354E7A;
          box-shadow: 0 10px 30px 0 rgba(0,0,0,0.30);
          border-radius: 30px;
          color: #AAB2C0;
        }

        .exchange-container {
          display: flex;
          flex-direction: column;
          
          
        }

        .money-input-container {
          display: flex;
          background-color: #FFFFFF;
          border-radius: 15px;
        }

        .money-input {
          display: flex;
          flex-basis: 85%;
          flex-direction: column;
          padding:1px;
        }

        .money-input span {
          margin: 5px 0 0 20px;
          font-size:14px;
        }

        .currency-change {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-basis: 35%;
          width: 35%;
          background-color: #1F345A;
          border-radius: 0 10px 10px 0;
          transition: 1s auto;
          -webkit-transition: all .15s ease-in-out;
          -o-transition: all .15s ease-in-out;
          transition: all .15s ease-in-out;
         
        }

        .currency-change span{
          font-size:10px;
        }

        .currency-change:hover {
          border: 1px solid #eaeaea;
        }

        .source-container {
          margin-bottom: 30px;
        }

        .currency-from {
          display: flex;
          align-items: center;
          font-size: 20px;
          color: #FFF;
        }

        input {
          margin-top: 20px;
          width: 100%;
          font-size: 22px;
          color: #15233C;
          border: none;
          padding: 12px;
          box-sizing: border-box;
        }

        input:focus {
          outline: none;
        }


        .rate {
          display: flex;
          margin: 20px 0;
        }

        .live-rate {
          text-transform: uppercase;
        }

        .rate-desc {
          flex-basis: 50%;
          width: 50%;
          color:#FFFFFF;
        }

        .rate-value {
          flex-basis: 50%;
          width: 50%;
          text-align: right;
          font-weight: 700;
          color: #FFF;
        }

        .note {
          margin-bottom: 20px;
        }

        .received-on {
          color: #FFF;
        }

        .converter-cta {
          display: flex;
        }

        .cta-secondary,
        .cta-primary {
          flex-basis: 50%;
          padding: 5px;
        }

        .cta-secondary a,
        .cta-primary a {
          width: 100%;
        }

        .cta-secondary a {
          padding: 8px 0;
        }

        .cta-primary a {
          padding: 10px 0;
        }

        .promo {
          display: flex;
          align-items: center;
          padding: 20px;
          margin-top: 40px;
          background: #EBF6FB;
          color: #3E495E;
          border-radius: 8px;
        }

        .promo-desc {
          flex-basis: 60%;
        }

        .promo-cta {
          flex-basis: 40%;
          text-align: center;
        }

        .promo a {
          font-size: 14px;
        }

        .curve {
          display: flex;
          width: 100%;
          height: auto;
        }

        .partners-mobile{
          display: none;
        }

        .partners {
          margin-top: -7px;
          padding-top: 50px;
          background-color: #FFF;
          text-align: center;
        }

        .partners h1 {
          text-align: center;
          margin-bottom: 50px;
        }


        .partners-wrapper {
          flex-direction: column;
        }

        .partners-container {
          display: flex;
          justify-content: center;
        }

        .partner-item {
          flex-basis:20%;
          align-self: center;
        }

        .partner-item img {
          max-width: 60%;
        }

        .partner-item-small {
          flex-basis:20%;
          padding:0px 20px;

          align-self: center;
        }

        .partner-item-small img{
          max-width:90%;
        }

       

        

        .left-feature-container,
        .right-feature-container {
          flex-basis: 50%;
        }


    

        .logo-left{
          background:url('../static/images/Asset Web/content/Group 296.png'), url('../static/images/Asset Web/content/Rectangle 160.png');
          background-repeat: no-repeat;
          flex-basis:100%;
          background-size:100px 100px,auto;
          background-position:center,center;
          padding:100px;
          display:flex;
          
        }

        .logo-left h1{
          display:flex
          margin-top:300px;
        }


        // .features .container .row {
        //   display: flex;
        //   padding: 30px 0;
        // }

        .features-mobile{
          display: none;
        }

        .testimonials {
          background-size: contain;
          background-repeat: no-repeat;
          background-color: #FFF;
          width: 100%;
          min-height: 632px;
          margin-top: -180px;
          padding-top: 80px;
        }

        .testimonials .container {
          flex-direction: column;
        }

        .testimonials h1 {
          text-align: center;
          margin-bottom: 100px;
        }

        .features-container {
          display: flex;
          text-align: center;
        }

        .feature-item {
          flex-basis: 33.33%;
        }

        .testimonials {
          padding: 100px 0;
        }

        .testimonials-wrapper {
          padding-top: 100px;
          display: flex;
          flex-direction: column;
        }

        .testimonials-wrapper h1 {
          margin-bottom: 100px;
        }

        .testimonials-items {
          max-width: 550px;
          text-align: center;
          align-self: center;
        }

        .user {
          margin-top: 100px;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        .user img {
          width: 80px;
          height: 80px;
        }

        .user-details {
          padding-left: 20px;
          text-align: left;
          align-self: center;
        }

        .user-details h3 {
          margin: 5px 0;
        }

        .caret::after {
          display: inline-block;
          width: 16px;
          height: 9px;
          margin-left: 40px;
          vertical-align: 3px;
          content: "";
          border: none;
          background-image: url(../static/images/ic-caret.svg);
          background-size: 16px;
        }

        .dropdown-menu {
          position: absolute;
          min-width: 300px;
          transform: translate3d(0px, 0px, 0px);
          z-index: 1000;
          display: none;
          float: left;
          padding: .5rem 0;
          margin: .125rem 0 0;
          font-size: 1rem;
          color: #212529;
          text-align: left;
          list-style: none;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid rgba(0,0,0,.15);
          border-radius: .25rem;
        }

        .show {
          display: block;
        }

        .dropdown-menu ul {
          height: auto;
          max-height: 200px;
          overflow-y: auto;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 14px 20px 8px;
          color: #15233c;
        }

        .dropdown-item .flag-icon {
          border: 1px solid #eaeaea;
        }

        .dropdown-item:hover {
          background-color: #469DDD;
          cursor: pointer;
        }

        .dropdown-button {
          background: none;
          border: none;
          text-transform: uppercase;
        }

        .dropdown-button:active,
        .dropdown-button:focus {
          outline: none;
        }

        a.dropdown-item {
          transition: none;
        }

        .feature {
          display: flex;
          align-items: center;
          margin: 0;
          
        }

        hr {
          border-color: 1px solid #eaeaea;
        }

        .cta-primary {
          flex-basis: 100%;
        
          
        }

        .application-mobile{
          display:none;
        }

        .achievement-mobile{
          display:none;
        }

        .testimonial-mobile{
          display:none;
        }

        @media only screen and (max-width:780px){
          .features .container-image .images{ 
           display:none;
           }
        }

        @media only screen and (max-width:800px){
          // .hero .left-container{
          //   flex-basis:40%;
          // }

          .hero .right-container{
            flex-basis:60%;
          }

          .hero .images{
            display:none;
          }

          .btn-primary-start h1{
            font-size:20px;
          }

          // .btn-primary-start img{
          //   width:40%;
          //   height:30%;
          // }

          .features .message h3{
            font-size:20px;
          }

          .application h1{
            font-size:10vw;
          }

          .testimonial .message p{
            font-size:vw;
          }

        
          // .features{
          //   display:none;
          // }

          .features .container-image .images{ 
          //   margin-top:-60px;
          //  display:flex;
          //  // margin-left:-3vh;
          //  flex-basis:60%;
          flex-basis:50%;
         }



        }
        
        @media only screen and (max-width: 700px){
          // .hero .images img{
          //   display:none;
          // }

          // .hero .left-container{
          //   flex-basis:40%;
          // }

          // .hero .right-container{
          //   flex-basis:60%;
          // }

          // .features{
          //   display:none;
          // }

          .testimonial .message p{
            font-size:18px;
          }

          .achievement h1{
            font-size:25px;
          }

          .achievement{
            height:500px;
          }

          .
        }


        @media only screen and (max-width: 600px){
          .hero .left-container{
            display:none;
          }

           .hero .right-container{
             flex-basis:80%;
             margin-left:10%;
           }

          .achievement h1{
            text-align:center;
          }
          .application .left-container{
            flex-basis:40%;
          }

          .application .right-container{
            flex-basis:60%;
          }

          .features .container-image .images{
            display:none;
          }
            
        }

        @media only screen and (max-width: 500px){
        //  .features .benefit img{
        //    width:30px;
        //  }

        //  .features .benefit h1{
        //    font-size:18px;
        //  }
          .features .benefit{
            display:none;
          }

          .fiture-mobile-benefit{
            display:flex;
            flex-direction: column;
          }

          

        }
          @media only screen and (max-width: 414px) {
            #menuToggle .main-cta {
              position: absolute;
              right: 0;
            }

            .first-benefit .btn-primary-2{
              font-size:89%;
              padding:15px 15px 15px 15px;
              text-align:center;
              width:100%;
              margin-left:2%;
              margin-right:auto;
            }

            .hero .money-input span{ 
              font-size:12px;
            }

            .hero .money-input NumberFormat{
              font-size:11px;
            }

            .hero .right-container{
              margin-right:5%;
              margin-left:0%;
              margin-top:-20px;
            }

            .store img{
              display:none;
            }


            .testimonial-mobile{
              background:url('../static/images/achievment/lingkaran setengah.png'),url('../static/images/testimoni/background.png') no-repeat;
              display: flex;
              background-size:100% 50px,100% 100%;
              height:auto;
              width:auto;
              margin-top:0%;
              z-index:1;
              background-repeat: no-repeat;
              background-position:  0px -30px,center;
            }

            .achievement-mobile h1{
              color:#000000;
               font-size:15pt;
               width:auto;
              margin-top:30px;
              text-shadow: 1px 1px 1px #000000;
              // display:none;
              text-align:center;
            }

            .note{
              width:100px;
            }

            .testimonial-mobile img{
              width:30%;
              height:30%;
              
              text-align:center;
             
            }

            .testimonial-mobile .textTesti h1{
              font-size:20px;
            }


            .achievement-mobile{
                background:url('../static/images/achievment/Achievement-mobile.png') no-repeat;
                // // padding:10px 10px 50px 0px;
                display: block;
                background-size:100% 100%;
                height:600px;
                
                // -webkit-filter: drop-shadow( -5px 5px 5px #000 );
                // filter: drop-shadow( -5px 5px 5px #000 );
               
              }

             

              .testimonial-mobile .message{
                background-image:url('../static/images/testimoni/box-message.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size:100% 100%;
                width:auto;
                padding:0px 10px 10px 10px;
                text-align:center;

                font-size:13px;
              }

              .testimonial-mobile .message .p{
                // letter-spacing: 232px
                // text-align:center;
                // font-size:04px;
                
              }
        

           

            .application-mobile{
              display:block;
            }

            .main-container .left-container img{
              height:100%;
              width:120%;
            }

            
            .application-mobile h1{
              font-family: 10em ,'Open Sans', sans-serif;
              font-weight: 900;
              color: #000000;
              font-size:15px;
              // margin-top:90%;
              text-shadow: 1px 1px 1px #000000;
            
              
              }

              
            .main-container{
              display:flex;
              display: -moz-flex;
              display: -o-flex;
              display: -webkit-flex;
            
              justify-content: space-around;
              // padding:5px;
              // background:grey;
            }
      
            .main-container .left-container{
              // height: 350px;
              // margin: 10px;
              text-align:center:
             
              // backgroud:red;
            }
      

            .main-container .right-container img{
              width:70%;
              height:80%;
              // background:red;
            }

            .main-container .right-container{
              // background:blue;
              display:flex;
              justify-content:center;
              flex-direction:column;
              text-align:center;
              align-items:center;
              vertical-align: middle;
              margin-left:5%;
             
             
            }

          
            


            .application{
              display:none;
            }

            .first-benefit:hover .first-message {
              display: block;
              animation: fade-in 1s;
            }

            .first-benefit:hover .btn-primary-2 {
              display: none;
              animation: fade-in 1s;
            }

            .feature .images{
              display:none;
            }

            @keyframes fade-in {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            
            @keyframes fade-out {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }
            
            

            .achievement{
              display:none;
            }


            // .application .left-container,
            // .application .right-container{
            //   flex-basis:50%;
            //   background:blue;

            // }

            

            .testimonial{
              display:none;
            }

            .testimonial .message{
              display:none;
            }

            
            .external-link-right {
              lex-basis: 40%;
              margin-left : 20px;
              margin-top: 0px;
            }

            .features .benefit{
              display:none;
            }

               .fiture-mobile{
                  background:url('../static/images/features/Shadow indonesia.png'),url('../static/images/features/background-mobile.png');
                  padding:10px 10px 80px 10px;
                  display:flex;
                  background-size:600px 500px,650px 100%;
                  background-position:  -100px 10px,center;
                  height:auto;
                  width:auto;
                  margin-top:-109px;
                  margin-left:auto;
                  margin-right:auto;
                  // margin-left:-30px;
                  background-repeat:no-repeat;
                  // margin-top:80px;
                  
                 }

             
                 .fiture-mobile .images{
                  margin-top:-105px;
                  display:flex;
                  
                  position:absolute;
                }
          
                .fiture-mobile .message{
                  background:url('../static/images/features/chat-box.png');
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size:1200px 300px;
                  margin-top:760px;
                  margin-left:-160px;
                  height:300px;
                  width:1300px;
                  position:absolute;
                  opacity:0.8;
                  padding:70px 30px 0px 50px;
               }

              .fiture-mobile-benefit{
                display:flex;
                flex-direction: column;
              }

              .fiture-mobile-benefit .btn-primary-2{
                font-size:20px;
              }

              .first-message{
                display:none;
              }

              .first-message{
                background:url('../static/images/features/Why should we use Transfree_Pop up button.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size:100% 100%;
                padding:1.5px 10px 0px 10px;
                height:auto;
              }

              .application{
                width:100%;
              }

               .fiture-mobile .message {
                 font-size:23px;
               }

               .fiture-mobile-message h1{
                 font-size:30px;
                 color:#000000;
               }

               .fiture-mobile-message {
                display:block;
                margin-top:40px;

              }

            .features .message{
             
              display:none;
            }

          

            .fiture-mobile .btn-primary-start{
              width:30%;
            }

            

           .fiture-mobile{
            display: flex;
            flex-direction: column;

           }

            .features {
              display:none;
            }

            .achievement{
              background-size:100% 100%;
              height:500px;
              width:420px;
              margin-top:-120px;
              margin-left:-30px;
            
            }

            .fiture-mobile .images{
              margin-left:0px;
            }

            .fiture-mobile .images img{
              width:50px;
              // height:50px;
              margin-top:20px;
            }

            .fiture-mobile .images .monas  { 
              margin-top:28%;
              height:90px;
              // margin-left:2%;
              // transform: rotate(-9deg);
            }

            .fiture-mobile .images .monas img { 
              // margin-top:28%;
              width:30px;
              
              transform: rotate(2deg);
            }
            
            .fiture-mobile .images .bali{
              margin-top:2.5%;
              transform: rotate(2deg);
              margin-left:3%;
            }

            .fiture-mobile .images .bali img{
              width:30px;
            }

            .fiture-mobile .images .surabaya{
              margin-top:11%;
              margin-left:2%;
              // transform: rotate(10deg);
            }

            .fiture-mobile .images .surabaya img{
              height:60px;
              width:40px;
            }

            .fiture-mobile .images .rumah{
              margin-top:-9%;
              // transform: rotate(-5deg);
              
            }

            .fiture-mobile .images .borobudur{
              margin-top:7%;
              z-index:1;
             
            }

            .fiture-mobile .images .borobudur img{
              transform: rotate(5deg);

             
            }
            


            .hero {
              // display: flex;
              flex-wrap: wrap;
              flex-direction: row-reverse;
              padding:0px 0px 180px 0px;
            }

            .hero .left-container{
              display:none;
            }

            .hero .right-container{
              order:1;
            }

           

            .testimonial{
              width:10px;
            }

            .testimonial .message{
              width:10px;
            }

            .btn-secondary-2 {
              background: #32cd32d4;
              border: none;
              color: white;
              padding: 8px 18px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              border-radius: 4px;
              transition: all 0.2s ease-in-out;
              box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
              margin-left: 414px;
              
            }
          .reverse-img{
            padding-right : 23px !important;
            width : 6% !important
          }

          .fixed-btn{
           width: 70px !important;
           height: 70px !important;
           line-height: 45px !imoprant;

           bottom: 3%;
           right: 6.5%;
            }

          .store{
            display: block;
          }

          .store img{
            width: 50%;
            height: 50%;
          }

          .logo{
            text-align: left;
            padding-left: 10px;
            display: block;

          }

          .logo img {
            width :50%;
            height :50%;
            margin-top: 10px !important;
            margin-bottom: 10px !important;
          }
          .left-container {
            margin-top: 0;
            padding-bottom:0px !important;
          }
          .mobile-sell-buy{
            display: block;
          }
          h1 {
            font-size: 1.8rem;
            line-height: 1.5;
            text-align: center;
          }
          .dropdown-button .flag-icon {
            display: none;
          }
          .dropdown-menu {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 50vh;
            width: 100%;
          }

          .dropdown-menu ul {
            height: 50vh;
          }

          .partners{
            display:none;
          }

          .partners-mobile {
          margin-top: -7px;
          padding-top: 50px;
          background-color: #FFF;
          width:100%;
          text-align: center;
          display: block;
        }

        .partners-mobile h1 {
          text-align: center;
          margin-bottom: 30px;
        }


        .partners-wrapper-mobile {
          flex-direction: column;
        }

        .partners-container-mobile {
          display: flex;
          justify-content: center;
        }

        .partner-item-mobile {
          flex-basis:20%;
          align-self: center;
          padding:0px 20px;
        }

        .partner-item-mobile img {
          max-width: 80%;
          padding-bottom: 25px;
        }

        .partner-item-mobile-small {
          flex-basis:20%;
          align-self: center;
          padding:0px 20px;
        }

        .partner-item-mobile-small img{
          max-width:100%;
        }
        // .desktop{
        //   display:none;
        // }
        .left-container h1{
          display:none;
        }

        .right-container {
          margin-top: 0px ;
         
        }

        .right-bottom-container{
          display: inline-block;
        }


        .features{
          display: none;
        }

        .features-mobile {
          display: none;
          padding: 100px 0;
          background-color: #FFF;
          text-align: center;
          

        }

        .left-feature-container-mobile,
        .right-feature-container {
          flex-basis: 50%;
        }

        .features-mobile .container-mobile {
          display: flex;
          flex-direction: column;
        }

        .features-mobile .container-mobile .row {
          display: flex;
          margin: 100px 0;
        }

        .left-feature-container-mobile img{
          width: 80%;
        }
        .right-feature-container-mobile h2{
          margin-top:0px !important;

          padding: 0px 20px;
        }
        .right-feature-container-mobile p{
          padding: 0px 10px;
          margin-bottom: 40px !important;
        }
        .testimonials h1 {
          text-align: center;
          margin: 20px 0px !important;
          margin-bottom: 40px !important;
        }

        .feature-item p{
          margin-bottom: 40px !important;
        }

        .testimonials-wrapper{
          padding-top:50px !important;
        }

        .user {
          margin-top: 40px;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        }
    `}</style>
  </div>
)

export default StyleIndex;