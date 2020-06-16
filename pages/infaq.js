
import Header from '../components/header.js';
import Menu from '../components/menu.js';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
import e from 'express';

export default class Infaq extends React.Component{
    constructor(){
        super()
        this.state={
            harga_sapiA:0
        }
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
                                     <span className = "span-ket">Domba Tipe A</span>
                                </div>
                                <div>
                                     <span className = "span-harga">23.000.000</span>
                                </div>
                                <div className = "paket_list_text_input">
                                    <input onChange={
                                        this.setState({
                                            harga_sapiA:90
                                        })
                                    } ></input>
                                     <span className = "span-harga">{this.state.harga_sapiA}</span>
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
                                     <span >Domba Tipe A</span>
                                </div>
                                <div>
                                     <span className = "span-ket">Domba Tipe A</span>
                                </div>
                                <div>
                                     <span className = "span-harga">23.000.000</span>
                                </div>
                                <div className = "paket_list_text_input">
                                    <input ></input>
                                    <span className = "span-harga">0</span>
                                </div>
                            </div>
                        </div>
                        <div className = "paket_list">
                        <div className = "paket_list-img">
                            <img style = {{width:100,height:100,marginRight:20,marginTop:10}} src = "https://img2.pngdownload.id/20180426/luq/kisspng-johnson-crating-services-animation-computer-icons-green-title-box-5ae1951d634bc7.1177542515247332134067.jpg"></img>
                            </div>
                            <div className = "paket_list_text">
                                <div>
                                     <span >Domba Tipe A</span>
                                </div>
                                <div>
                                     <span className = "span-ket">Domba Tipe B</span>
                                </div>
                                <div>
                                     <span className = "span-harga">23.000.000</span>
                                </div>
                                <div className = "paket_list_text_input">
                                    <input ></input>
                                    <span className = "span-harga">0</span>
                                </div>
                            </div>
                        </div>
                        <div className = "paket_list">
                        <div className = "paket_list-img">
                            <img style = {{width:100,height:100,marginRight:20,marginTop:10}} src = "https://img2.pngdownload.id/20180426/luq/kisspng-johnson-crating-services-animation-computer-icons-green-title-box-5ae1951d634bc7.1177542515247332134067.jpg"></img>
                            </div>
                            <div className = "paket_list_text">
                                <div>
                                     <span >Domba Tipe A</span>
                                </div>
                                <div>
                                     <span className = "span-ket">Domba Tipe C</span>
                                </div>
                                <div>
                                     <span className = "span-harga">23.000.000</span>
                                </div>
                                <div className = "paket_list_text_input">
                                    <input ></input>
                                    <span className = "span-harga">0</span>
                                </div>
                            </div>
                        </div>
                        <div className = "paket_list">
                        <div className = "paket_list-img">
                            <img style = {{width:100,height:100,marginRight:20,marginTop:10}} src = "https://img2.pngdownload.id/20180426/luq/kisspng-johnson-crating-services-animation-computer-icons-green-title-box-5ae1951d634bc7.1177542515247332134067.jpg"></img>
                            </div>
                            <div className = "paket_list_text">
                                <div>
                                     <span >Domba Tipe A</span>
                                </div>
                                <div>
                                     <span className = "span-ket">Sapi 1/7 Tipe A</span>
                                </div>
                                <div>
                                     <span className = "span-harga">23.000.000</span>
                                </div>
                                <div className = "paket_list_text_input">
                                    <input ></input>
                                    <span className = "span-harga">0</span>
                                </div>
                            </div>
                        </div>
                        <div className = "paket_list">
                        <div className = "paket_list-img">
                            <img style = {{width:100,height:100,marginRight:20,marginTop:10}} src = "https://img2.pngdownload.id/20180426/luq/kisspng-johnson-crating-services-animation-computer-icons-green-title-box-5ae1951d634bc7.1177542515247332134067.jpg"></img>
                            </div>
                            <div className = "paket_list_text">
                                <div>
                                     <span >Domba Tipe A</span>
                                </div>
                                <div>
                                     <span className = "span-ket">Sapi 1/7 Tipe B</span>
                                </div>
                                <div>
                                     <span className = "span-harga">23.000.000</span>
                                </div>
                                <div className = "paket_list_text_input">
                                    <input ></input>
                                    <span className = "span-harga">0</span>
                                </div>
                            </div>
                        </div>    
                     </div>
                
                </div>
                    <input type = "detail"></input>
                    <input type = "detail" placeholder = "Email Anda"></input>
                    <input type = "detail" placeholder = "Nama Donatur"></input>
                    <p>Tambahkan Pesanan</p>
                    <button className="button button1">4px</button>
                </div>
           </div>
           <style jsx>{` 

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
                    color: #414042;font-size: 14px;font-weight: bold;letter-spacing:-0.23px;
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

                 `}</style>
           </div>
        )
    }

}