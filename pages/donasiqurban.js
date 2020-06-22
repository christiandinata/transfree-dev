import Header from '../components/header.js';
import Menu from '../components/menu.js';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import GlobalFunction from '../utils/globalFunction'
import { getCookie } from '../utils/cookie';
 class DonasiQurban extends React.Component{
    constructor(props){
        super(props)
        this.state={
            jumlahTipeA:0,
            jumlahTipeB:0,
            jumlahTipeC:0,
            jumlahTipeA1:0,
            jumlahTipeB1:0,
            totalHargaA:0,
            totalHargaB:0,
            totalHargaC:0,
            totalHargaA1:0,
            totalHargaB1:0,
            totalHarga:0,
            emailUser: " ",
            namaDonatur:" ",
           
            
        }
       
      
    }


    handleTipeA = () => {
       if (event.target.value>= 0) {
        this.setState({
            jumlahTipeA : event.target.value
        },() => {
            this.setState({
                totalHargaA : this.state.jumlahTipeA * 1787500
            },() => {
                this.handleTotalHarga()
            })
        })
           
       }
    }

    handleTipeB = () => {
        if (event.target.value>= 0) {
         this.setState({
             jumlahTipeB : event.target.value
         },() => {
             if (this.state.totalHarga >= 0) {
                this.setState({
                    totalHargaB : this.state.jumlahTipeB * 2020000
                },() => {
                    this.handleTotalHarga()
                })
             }
            
         })
            
        }
     }

     handleTipeC = () => {
        if (event.target.value >= 0) {
         this.setState({
             jumlahTipeC : event.target.value
         },() => {
             this.setState({
                 totalHargaC : this.state.jumlahTipeC * 2220000
             },() => {
                 this.handleTotalHarga()
             })
         })
            
        }
     }

     handleTipeA1 = () => {
        if (event.target.value >= 0) {
         this.setState({
             jumlahTipeA1 : event.target.value
         },() => {
             this.setState({
                 totalHargaA1: this.state.jumlahTipeA1 * 2620000
             },() =>{
                 this.handleTotalHarga()
             })
         })
            
        }
     }

     handleTipeB1 = () => {
        if (event.target.value >= 0) {
         this.setState({
             jumlahTipeB1 : event.target.value
         },() => {
             this.setState({
                 totalHargaB1 : this.state.jumlahTipeB1 * 3220000
             },() => {
                 this.handleTotalHarga()
             })
         })
            
        }
     }

     handleTotalHarga = () =>{
            this.setState({
                totalHarga : this.state.totalHargaA+this.state.totalHargaB+this.state.totalHargaC+this.state.totalHargaA1+this.state.totalHargaB1
            })
     }

     validateData = () =>{
        if (!GlobalFunction.validateEmail(this.state.emailUser)) {
            return false
        }
        if(!this.state.namaDonatur){
             return false;
         }else if (this.state.totalHarga <= 0) {
             return false;
         }else{
             return true;
         }
     }

     handleSubmit = (event) => {
        event.preventDefault();
         if (this.validateData() === true) {
            this.props.submitDonation(
                {
                    email : this.state.emailUser,
                    donatur : this.state.namaDonatur,
                    price : this.state.totalHarga,
                },
                'order'
            );
         }else{
            alert("Periksa kembali transaksi anda")
         }
     }


     handleName = () => {
         this.setState({
             namaDonatur:event.target.value
         })
     }

     handleEmail = () => {
        this.setState({
            emailUser:event.target.value
        })
    }


    render(){
        return(
           <div>          
            <Header/>
            <Menu/>
           <div className ="container container-fill container-pad">
                <div className = "form">
                    <div  style  = {{margin:8}}>
                        <div className = "paket">
                        <div className = "paket_list">
                            <div className = "paket_list-img">
                            <img style = {{width:100,height:100,marginRight:20,marginTop:10}} src = "https://img2.pngdownload.id/20180426/luq/kisspng-johnson-crating-services-animation-computer-icons-green-title-box-5ae1951d634bc7.1177542515247332134067.jpg"></img>
                            </div>
                            <div className = "paket_list_text">
                                <div>
                                     <span >Domba Tipe A</span>
                                </div>
                                <div>
                                     <span className = "span-ket">(Tongsong Domba -+ 25 Paket (200gr/paket))</span>
                                </div>
                                <div>
                                     <span className = "span-harga">Rp1.787.500</span>
                                </div>
                                <div className = "right">
                                    <input style={{width:100}} type = "number"  
                                    onChange = {this.handleTipeA} placeholder ="0"  ></input>
                                </div>
                            </div>
                        </div>
                        <div className = "paket_list">
                        <div className = "paket_list-img">
                            <img style = {{width:100,height:100,marginRight:20,marginTop:10}} 
                            src = "https://img2.pngdownload.id/20180426/luq/kisspng-johnson-crating-services-animation-computer-icons-green-title-box-5ae1951d634bc7.1177542515247332134067.jpg"></img>
                            </div>
                            <div className = "paket_list_text">
                                <div>
                                     <span >Domba Tipe B</span>
                                </div>
                                <div>
                                     <span className = "span-ket">(Tongsong Domba -+ 30 Paket (200gr/paket))</span>
                                </div>
                                <div>
                                     <span className = "span-harga">Rp2.020.000</span>
                                </div>
                                
                                <div className = "right">
                                    <input style={{width:100}} type = "number"  onChange = {this.handleTipeB} placeholder ="0"></input>
                                </div>
                            </div>
                        </div>
                        <div className = "paket_list">
                        <div className = "paket_list-img">
                            <img style = {{width:100,height:100,marginRight:20,marginTop:10}} src = "https://img2.pngdownload.id/20180426/luq/kisspng-johnson-crating-services-animation-computer-icons-green-title-box-5ae1951d634bc7.1177542515247332134067.jpg"></img>
                            </div>
                            <div className = "paket_list_text">
                                <div>
                                     <span >Domba Tipe C</span>
                                </div>
                                <div>
                                     <span className = "span-ket">(Tongsong Domba -+ 35 Paket (200gr/paket))</span>
                                </div>
                                <div>
                                     <span className = "span-harga">Rp2.220.000</span>
                                </div>
                                <div className="right">
                                    <input style={{width:100}} type = "number"  onChange = {this.handleTipeC} placeholder ="0"></input>
                                </div>
                               
                            </div>
                        </div>
                        <div className = "paket_list">
                        <div className = "paket_list-img">
                            <img style = {{width:100,height:100,marginRight:20,marginTop:10}} src = "https://img2.pngdownload.id/20180426/luq/kisspng-johnson-crating-services-animation-computer-icons-green-title-box-5ae1951d634bc7.1177542515247332134067.jpg"></img>
                            </div>
                            <div className = "paket_list_text">
                                <div>
                                     <span >Sapi 1/7 Tipe A</span>
                                </div>
                                <div>
                                     <span className = "span-ket">(Rendang Kalengan 56 Paket (150gr/paket))</span>
                                </div>
                                <div>
                                     <span className = "span-harga">Rp2.620.000</span>
                                </div>
                                <div className="right">
                                    <input style={{width:100}} type = "number"  onChange = {this.handleTipeA1} placeholder ="0"></input>
                                </div>
                                
                            </div>
                        </div>
                        <div className = "paket_list">
                        <div className = "paket_list-img">
                            <img style = {{width:100,height:100,marginRight:20,marginTop:10}} src = "https://img2.pngdownload.id/20180426/luq/kisspng-johnson-crating-services-animation-computer-icons-green-title-box-5ae1951d634bc7.1177542515247332134067.jpg"></img>
                            </div>
                            <div className = "paket_list_text">
                                <div>
                                     <span >Sapi 1/7 Tipe B</span>
                                </div>
                                <div>
                                     <span className = "span-ket">(Rendang Kalengan 90 Paket (150gr/paket))</span>
                                </div>
                                <div>
                                     <span className = "span-harga">Rp3.220.000</span>
                                </div>
                                <div className="right">
                                    <input style={{  width:100}} type = "number"  onChange = {this.handleTipeB1} placeholder ="0"></input>
                                </div>
                            </div>
                        </div>
                     </div>
                
                </div>
                <p>Total Harga</p>
                    <input className = "span-harga" type = "detail" value={this.state.totalHarga}>
                    </input>
                    <p>Email Anda</p>
                    <input type = "detail" placeholder = "Email Anda" onChange = {this.handleEmail} className = "span-detail"></input>
                    <p>Nama Donatur</p>
                    <input type = "detail" placeholder = "Nama Donatur" onChange = {this.handleName} className = "span-detail"></input>
                    <p>Tambahkan Pesanan</p>
                    <button className="button button1" onClick = {this.handleSubmit}>Lanjutkan</button>
                </div>
           </div>
           <style jsx>{` 
                    input[type=number]::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                    }

                    .right{
                        text-align:right;
                        
                    }

                    @media only screen and (max-width: 414px) {
                        #menuToggle {
                          display: block;
                        }
                        .header-container {
                          display: none;
                        }
                        li {
                          display; block;
                        }
                        #menu {
                          height: 100vh;
                          width: 100%;
                          background-color: #F6F8FB;
                        }
                        .row {
                          border: none;
                        }
                        #menuToggle {
                          top: 5px;
                          left: 0;
                        }
                        .right{
                            text-align:left;
                        }
                    }

                    .button {
                        background-color: #4CAF50; /* Green */
                        border: none;
                        color: white;
                        padding: 20px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        margin: 4px 2px;
                        cursor: pointer;
                        width:100%
                    }

                    .button1 {border-radius: 4px;}

                    input[type = "detail"]{
                        width: 100%;
                        padding: 12px 20px;
                        margin: 8px 0;
                        box-sizing: border-box;
                        border: 2px solid grey;
                        border-radius: 4px;
                    }

                    input{
                        width: 10%;
                        padding: 12px 20px;
                        margin: 8px 0;
                        height:20%;
                        box-sizing: border-box;
                        border: 2px solid grey;
                        border-radius: 4px;
                    }
                  .container-fixed {
                    max-width: 768px;
                    margin: 50px auto;
                  }
                  .item{
                      height : auto;
                      width:708px;
                      left:300px;
                  }

                  .paket{
                    font-family: SF Pro,-apple-system,BlinkMacSystemFont,sans-serif;
                    font-size: 100%;
                    -webkit-font-smoothing: antialiased;
                    line-height: 1.5;
                    color: #2f302f;
                    -webkit-box-direction: normal;
                    box-sizing: inherit;
                  }

                  .paket_list{
                    font-family: SF Pro,-apple-system,BlinkMacSystemFont,sans-serif;
                    font-size: 100%;
                    -webkit-font-smoothing: antialiased;
                    line-height: 1.5;
                    color: #2f302f;
                    -webkit-box-direction: normal;
                    box-sizing: inherit;
                    display: flex;

                  }

                  .paket_list_img{
                    font-family: SF Pro,-apple-system,BlinkMacSystemFont,sans-serif;
                    font-size: 100%;
                    -webkit-font-smoothing: antialiased;
                    line-height: 1.5;
                    color: #2f302f;
                    -webkit-box-direction: normal;
                    box-sizing: inherit;
                    padding: 14.5px 20px 14.5px 0;

                  }

                  .paket_list_text{
                    font-family: SF Pro,-apple-system,BlinkMacSystemFont,sans-serif;
                    font-size: 100%;
                    -webkit-font-smoothing: antialiased;
                    line-height: 1.5;
                    color: #2f302f;
                    -webkit-box-direction: normal;
                    box-sizing: inherit;
                    padding: 14.5px 0;
                    border-bottom: 1px solid #f0f5f9;
                    width: 100%;

                  }

                  span{
                    color: #339963;
                    font-size: 18px;
                    line-height: 20px;
                    letter-spacing:-0.3px
                  }

                
                  .span-ket{
                    color: #919ba7;font-size: 12px;line-height: 14px;letter-spacing:-0.2px;
                  }
                  
                  .container-fill {
                    box-shadow: 0 0 0 1px #e5e5e5;
                    background: #fff;
                }
                .container-pad {
                    padding-top: 16px;
                    padding-bottom: 16px;
                }
                .span-harga{
                    color: #414042;
                    font-size: 14px
                    ;font-weight: bold;
                    letter-spacing:-0.23px;
                }
                .container {
                    width: 800px;
                    max-width: 100%;
                    padding: 0 20px;
                    margin: 0 auto;
                }

                .paket_list_text_input{
                    display: flex;
                    justify-content: space-between
                    
                }

                .input-area {
                    display: flex;
                    border: 2px solid rgb(229, 229, 229);
                    border-radius: 4px;
                    margin-top: 8px;
                    width: 40.33%;
                    max-width: 150px;
                }
                .paket__list__text__input .buttonL {
                    border-right: 0;
                    border-radius: 4px 0 0 4px;
                }
                .paket__list__text__input__button2 {
                    height: 26px;
                    width: 70%;
                    background-color: #fff;
                    color: #339963;
                    font-weight: 700;
                    padding-bottom: 4px;
                }
                .paket__list__text__input .inputField-row {
                    margin: 0;
                }
                .span-harga {
                    margin: auto 0 0 auto;
                    font-size: 18px;
                    font-weight: bold;
                    line-height: 30px;
                    letter-spacing: -0.3px;
                    color: #339963;
                }
                .span-detail {
                    margin: auto 0 0 auto;
                    font-size: 18px;
                    font-weight: bold;
                    line-height: 30px;
                    letter-spacing: -0.3px;
                    
                }
                 `}</style>
           </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
      successTransaction: state.donasi.successDonasi
    }
  };

export default connect(mapStateToProps,actions)(DonasiQurban);

  