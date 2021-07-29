import Phone from "react-phone-number-input";
import styled from "styled-components";

export const MainWrapper = styled.div`
    @media only screen and (max-width: 900px) {
        // width: 100%;
        overflow-x: hidden;
        box-sizing: border-box;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    background-color: #fff;
    margin-top: 72px;
    // height: 952px;

    @media only screen and (max-width: 900px) {
        display: block;
        width: 100%;
    }
`;

export const ActionSect = styled.section`
    // width: 25%;
    background: #1687e5;
    padding-top: 38px;

    @media only screen and (max-width: 900px) {
        padding-top: 16px;
        padding-bottom: 16px;
    }
`;

export const ActionChoice = styled.button`
    display: block;
    margin: 0 24px;
    margin-top: 24px;
    background: transparent;
    text-decoration: none;
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 16px 23.3px 16px 16px;
    vertical-align: middle;
    width: 260px;

    @media only screen and (max-width: 900px) {
        margin-top: 0;
        padding: 16px;
        width: 90%;
        text-align: left;
    }
`;

export const ActionChoiceActive = styled(ActionChoice)`
    background: #fff;
    border: 1px solid #fff;
`;

export const ChoiceImg = styled.img`
    width: 24px;
    height: 24px;
    object-fit: scale-down;
    display: inline;
    float: left;
    margin-right: 16px;
`;

export const ArrowRightImg = styled.img`
    display: inline;
    float: right;
    margin-left: 71.3px;
`;

export const ProfileSect = styled.section`
    // width: 75%;
    flex-grow: 1;
    background: #fff;

    @media only screen and (max-width: 900px) {
        width: 100%;
    }
`;

export const ProfileAction = styled.div`
    background-color: #F39200;
    // overflow: hidden;
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 900px) {
        width: 100%;
    }
`;

export const Data = styled.section`
    display: flex;
    padding-bottom: 32px;

    @media only screen and (max-width: 900px) {
        display: block;
        width: 100%;
        // overflow: auto;
    }
`;

export const Divider = styled.div`
    position: relative;
    margin: 0 24px;

    &:after {
        content: "";
        background: #B4B4B4;
        position: absolute;
        height: 1px;
        width: 100%;
    }

    @media only screen and (max-width: 900px) {
        margin: 0 16px;   
    }
`;

export const Table = styled.table`
    margin: 56px 0 0 40px;
    border-spacing: 0 12px;
    
    @media only screen and (max-width: 900px) {
        margin: 0;
        padding: 0 16px;
        width: 100%;
        table-layout: fixed;
    }
`;

export const TableRow = styled.tr`
    text-align: left;
    word-wrap: break-word;
`;

export const TableHeading = styled.th`
    padding-right: 48px;
    color: #232933;  
    letter-spacing: 0.2px;
    font-family: 'Avenir Next LT Pro';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
`;

export const TableDetail = styled.td`
    font-family: 'Avenir Next LT Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;  
    color: #626B79;
    word-wrap: break-word;

    @media only screen and (max-width: 900px) {
        text-align: right;
    }
`;

export const TableDetailPersonal = styled(TableDetail)`
    padding-left: 15px;

    @media only screen and (max-width: 900px) {
        padding-left: 0;
    }
`;

export const AccountLink = styled.p`
    display: inline;
    font-family: 'Avenir Next LT Pro';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    line-height: 26px;
    color: #ffffff;

    @media only screen and (max-width: 900px) {
        font-weight: 500;
        line-height: 20px;
    }
`;

export const AccountLinkActive = styled(AccountLink)`
    color: #009FE3 !important;
`;

export const AccountText = styled.h3`
    display: inline-block;
    color: #ffffff;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    margin: 24px;

    @media only screen and (max-width: 900px) {
        margin-left: 16px;
    }
`;

export const LogOutButton = styled.a`
    // float: right;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.2px;
    text-align: center;
    color: #F39200;
    background: #FFFFFF;
    padding: 8px 24px;
    margin: 20px 108px 20px 0px;
    text-decoration: none;
    border: 1px solid #F39200;
    border-radius: 4px;

    &:hover {
        background: #EAEAEA;
    }

    @media only screen and (max-width: 900px) {
        margin-right: 16px;
    }

    @media only screen and (max-width: 320px) {
        padding: 8px;
    }
`;

export const SectionName = styled.h4`
    margin-top: 0;
    margin-bottom: 4px;
    font-style: normal
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
    color: #232933;
`;

export const SectionExp = styled.p`
    margin: 0;
    font-style: normal:
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #626B79;
`;

export const DataSubPersonal = styled.div`
    margin: 48px 24px;
    width: 25%;

    @media only screen and (max-width: 900px) {
        margin-left: 0;
        padding-left: 15px;
        margin-bottom: 20px;
        margin-right: 0;
        width: 100%;
    }
`;

export const DataSubAccount = styled.div`
    margin: 43px 24px;
    width: 25%;

    @media only screen and (max-width: 900px) {
        margin-left: 15px;
        margin-bottom: 20px;
        width: 100%;
    }
`;

export const EditWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color #000;

    @media only screen and (max-width: 900px) {
        justify-content: flex-start;
        margin-left: 15px;
        margin-right: 15px;
        display: block;
        // width: 100%;
    }
`;

export const EditData = styled.section`
    margin-top: 40px;

    @media only screen and (max-width: 900px) {
        width: 100%;
    }
`;

export const SectionType = styled.div`
    margin-bottom: 32px;
`;

export const SectionTitle = styled(SectionName)`
    margin-bottom: 8px;
`;

export const FormRow = styled.div`
    margin-bottom: 16px;

    @media only screen and (max-width: 900px) {
        // margin-right: 31px;
        width: 100%;
    }
`;

export const FormRowPhone = styled(FormRow)`
    // width: 150px;
    // width: 100%;
    border: ${({ filled, error }) => {
        if (filled) {
            if (error) {
                return "2px solid #F80202";
            } else {
                return "2px solid #068EC8";
            }
        } else {
            return "null";
        }
    }};
    border-radius: 4px;
    margin-bottom: ${({ error }) => (
		error ? "2px" : "0px")}; 
`;

export const FormRowAccount = styled(FormRow)`
    border-radius: 4px;
    // width: 450px;
    // width: 100%;
    margin-bottom: ${({ error }) => (
        error ? "2px" : "16px")}; 
    border: ${({ filled, error }) => {
        if (filled) {
            if (error) {
                return "2px solid #F80202";
            } else {
                return "2px solid #068EC8";
            }
        } else {
            return "1px solid #E2E2E2";
        }
    }};
`;

export const ButtonSection = styled.section`
    margin-top: 40px;
    // width: 100%;
`;

export const EditProfileButton = styled.button`
    display: block;
    text-decoration: none;
    outline: none;
    border: 1px solid #009FE3;
    border-radius: 4px;
    padding: 8px 24px;
    margin-bottom: 29px;
    font-family: 'Avenir Next LT Pro';
    font-style: normal;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    // width: 450px;
    width: 100%;
`;

export const SaveEditButton = styled(EditProfileButton)`
    color: #fff;
    background-color: #009FE3;
    letter-spacing: 0.2px;
    font-weight: 500;
    margin-bottom: 16px;

    &:hover {
        background-color: #068EC8;
        border: 1px solid #068EC8;
    }
`;

export const CancelEditButton = styled(EditProfileButton)`
    color: #009FE3;
    background-color: #fff;
    font-weight: normal;

    &:hover {
        background-color: #EAEAEA;
        border: 1px solid #9A9A9A;
    }
`;

export const FormLabel = styled.label`
    display: block;
    margin-left: 8px;
    margin-bottom: 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    // color: #9A9A9A;
    color: ${({ filled }) => (
		filled ? "#068EC8" : "#9A9A9A")}; 
`;

export const InputText = styled.input`
    padding: 12px 16px;
    border: 1px solid #9A9A9A;
    border: ${({ dis }) => (
		dis ? "1px solid #9A9A9A" : "1px solid #E2E2E2")}; 
    border-radius: 4px;
    background: ${({ dis }) => (
		dis ? "#E9E9E9" : "#FFFFFF")}; 
    width: 418px;
    // width: 100%;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
    outline: none;
    color: #9A9A9A;

    &:focus {
        background: #fff;
        border: 2px solid #068EC8;
        color: #232933;
    }

    @media only screen and (max-width: 900px) {
        // width: 150%;
        width: 100%;
    }
`;

export const InputTextPassword = styled(InputText)`
    border: none !important;
    // width: 380px !important;
    width: 90%;
    &:focus {
        background: #fff;
        border: none;
        color: #232933;
    }
`;

export const PasswordText = styled(InputText)`
    border: none;
    padding: 0;
`;

export const RadioWrapper = styled.div`
    margin-bottom: 8px;
`;

export const InputRadio = styled.input`
    margin-right: 16px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-top: -1px;
`;

export const LabelRadio = styled.label`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #9A9A9A;
`;

export const PhoneInput = styled(Phone)`
    border: 1px solid #E2E2E2;
    border-radius: 4px;
    outline: none;
    font-family: 'Avenir Next LT Pro';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    height: 48px;
    // padding: 0 16px;
    background: #fff;
    width: 420px;

    &:focus {
        border: 2px solid #068EC8;
        color: #232933;
    }
`;

export const EyePic = styled.span`
    height: 24px;
    width: 24px;
    cursor: pointer;
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ pop }) => (
		pop ? "rgba(35, 41, 51, 0.8)" : "#fff")}; 
`;

export const ModalWrapper = styled.div`
    position: fixed;
    height: auto;
    top: 30%;
    left: 40%;
    border: 1px solid #E2E2E2;
    border-radius: 4px;
    background: #fff;
    width: 450px;
`;

export const ModalTitle = styled.section`
    border-bottom: 1px solid #E2E2E2;
    border-radius: 4px 4px 0px 0px;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 24px;
    font-family: 'Avenir Next LT Pro';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.2px;
    color: #232933;
`;

export const ModalText = styled.section`
    margin-top: 19px;
    margin-left: 24px;
    font-family: 'Avenir Next LT Pro';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #626B79;
`;

export const ModalExp = styled.p`
    padding-right: 24px;
`;

export const ModalButtonSect = styled.section`
    margin-top: 40px;
    margin-bottom: 24px;
    margin-right: 24px;
    float: right;   
`;

export const ActionButton = styled.button`
    border: none;
    outline: none;
    text-decoration: none;
    padding: 8px 24px;
    font-family: 'Avenir Next LT Pro';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;    
    text-align: right;
`;

export const CancelActionButton = styled(ActionButton)`
    color: #9A9A9A;
    background: transparent;
    margin-right: 8px;

    &:hover {
        border: 1px solid #9a9a9a;
        border-radius: 4px;
    }
`;

export const SaveActionButton = styled(ActionButton)`
    letter-spacing: 0.2px;
    color: #FFFFFF;
    background: #009FE3;
    border: 1px solid #009FE3;
    border-radius: 4px;

    &:hover {
        background: #068EC8;
        border: 1px solid #068EC8;
    }
`;

export const ModalSuccessContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
`;

export const ModalSuccessWrapper = styled.div`
    position: fixed;
    height: auto;
    top: 14%;
    left: 50%;
    background: #FFFFFF;
    border: 1px solid #00A000;
    box-shadow: 0px 4px 8px rgba(119, 119, 119, 0.1), 0px 12px 20px rgba(119, 119, 119, 0.2);
    border-radius: 4px;
`;

export const ModalSuccessText = styled.section`
    margin: 12px;
    vertical-align: middle;
`;

export const ModalSuccessImg = styled.img`
    width: 24px;
    height: 24px;
    object-fit: scale-down;
    float: left;
    margin-right: 8px;
`;

export const ModalSuccessTitle = styled.p`
    font-family: 'Avenir Next LT Pro';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #232933;
    margin: 0;
    display: inline-block;
`;

export const ErrorMessage = styled.div`
    color: #F80202;
    font-size: 12px;
    margin-bottom: 14px;
    margin-left: 8px;
`;