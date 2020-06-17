import React, { Component } from 'react'
import Header from '../components/header'
import Menu from '../components/menu'
export class EditProfile extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className = "container-fluid">
                    <div className = "form-container">
                        <div class="grid">
                        <div className="logo">
                            <img className="img" src="../static/images/transfree-logo.png"/>
                        </div>
                        <h3>Edit Profile</h3>
                        <div class="row">
                            <form>
                            <label>Name</label>
                            <input type="text" name="name" placeholder="naem" />
                            <label>Email</label>
                            <input type="text" name="email" placeholder="email" />
                            <label>Address</label>
                            <input type="text" name="address" placeholder="address"/>
                            <label>Gender</label>
                            <br></br>
                            <select className="gender">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <label>Place of Birth</label>
                            <input type="text" name="pob" placeholder="place of birth" />
                            <label>Date of Birth</label>
                            <input type="date" name="dob" placeholder="Date of birth" />
                            <label><br></br></label>

                            <a href="/profile" type="button" className="btn btn-secondary">Back</a>
                            <button type="submit" className="btn-primary btnSubmit ">Save</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
                    <style jsx>{`
                  
                  .form-container .label{
                    opacity: 0.8;
                    font-size: 15px;
                  }

                  .form-container .field {
                      opacity: 1;
                      margin-bottom:16px;
                      font-size: 20px;
                      
                  }
                    p {
                        text-align: left;
                        margin-top:20px;
                    }
                    .container-fluid {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        align-items: center;
                    }

                    .form-container {
                        width: 630px;
                        height: auto;
                        padding: 30px;
                        margin: 30px auto;
                        background: #FFFFFF;
                        box-shadow: 0 10px 30px 0 rgba(0,0,0,0.10);
                        border-radius: 8px;
                        display:grid;
                        grid-template-columns: 46% auto;
                        
                    }
                    input, select{
                        width: 580px;
                        padding: 6px 25px;
                    }
                    .gender{
                        width:620px;
                        border:none;    
                    }
                    .img{
                        display:block;
                        margin-left: 240px;
                    }
                    .btnSubmit{
                        width: 40%;
                        color: white;
                        padding: 12px 2px;
                        border: none;
                        border-radius: 3px;
                        cursor: pointer;
                        margin-right:5px;
                    }
                 `}</style>
            </div>  
        )
    }

}

export default EditProfile