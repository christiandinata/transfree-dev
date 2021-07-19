import Head from "next/head";

//Menampilkan tulisan yang berada di component head
const Header = () => (
	<div>
		<Head>
			<title>Transfree - Transfer Free Overseas</title>
			<meta
				httpEquiv="Cache-Control"
				content="no-cache, no-store, must-revalidate, max-age=4"
			/>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<meta charSet="utf-8" />
			<link rel="icon" href="../static/images/tr2_1.png" />
			<link
				href="../static/misc/flag-icon-css/css/flag-icon.min.css"
				rel="stylesheet"
			/>
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
			/>
			<meta
				name="description"
				content="International money transfer service to various worlds with a very cheap, fast and reliable process. Currently Transfree serves transfers to several currencies, such as: MYR (Malaysian Ringgit), GBP (British Pound Sterling), USD (US Dollar), AUD (Australian Dollar), EUR (European Euro), and HKD (Hongkong Dollar)"
			/>
		</Head>

		<style jsx global>{`
			@font-face {
				font-family: "Avenir Next LT Pro";
				src: url("../static/fonts/AvenirNextLTPro-Regular.otf");
			}

			@font-face {
				font-family: "Avenir Next LT Pro Bold";
				src: url("../static/fonts/AvenirNextLTPro-Bold.otf");
			}

			@font-face {
				font-family: "Avenir Next LT Pro Medium";
				src: url("../static/fonts/AvenirNextLTPro-Medium.otf");
			}

      body {
        font-family: "Avenir Next LT Pro", sans-serif; 
        line-height: 1.6;
        letter-spacing: 0.2px;
        color: #3E495E;
        margin: 0px ;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      input, button{
        font-family: "Avenir Next LT Pro", sans-serif; 
      }

      h1, h2, h3, h4, b, .bold{
        font-family: "Avenir Next LT Pro Bold", sans-serif !important;
				font-weight: 100;
      }

			button:hover {
				cursor: pointer;
			}

			.container {
				width: auto;
				margin: 0px auto;
			}

			button:focus {
				outline: none;
			}

			.row:after {
				content: "";
				display: table;
				clear: both;
			}
		`}</style>
	</div>
);
//Mengirimkan header
export default Header;
