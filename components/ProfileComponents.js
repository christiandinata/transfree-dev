import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    // height: 952px;
`;

export const ActionSect = styled.section`
    width: 25%;
    background: #1687e5;
    padding-top: 38px;
`;

export const ActionChoice = styled.button`
    display: block;
    margin: 0 24px;
    margin-top: 42px;
    background: transparent;
    text-decoration: none;
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 16px 23.3px 16px 16px;
    vertical-align: middle;
    width: 260px;
`;

export const ActionChoiceActive = styled(ActionChoice)`
    background: #fff;
    border: 1px solid #fff;
`;

export const ChoiceImg = styled.img`
    width: 24px;
    height: 24px;
    object-fit: scale-down;
    // margin: 16px 24px 16px 16px;
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
    width: 75%;
`;

export const ProfileAction = styled.div`
    background-color: #F39200;
    overflow: hidden;
`;

export const ProfilDetails = styled.div`
    // margin: 48px 24px;
`;

export const Data = styled.section`
    display: flex;
    padding-bottom: 32px;
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
`;

export const Table = styled.table`
    margin: 56px 0 0 40px;
    border-spacing: 0 12px;
`;

export const TableRow = styled.tr`
    font-style: normal;
    font-size: 16px;
    line-height: 24px;
    text-align: left;
    word-wrap: break-word;
`;

export const TableHeading = styled.th`
    padding-right: 48px;
    color: #232933;  
    font-weight: 500;
    letter-spacing: 0.2px;
`;

export const TableDetail = styled.td`
    font-weight: normal;
    color: #626B79;
`;

export const TableDetailPersonal = styled(TableDetail)`
    padding-left: 15px;
`;

export const AccountLink = styled.p`
    // margin-left: 24px;
    display: inline;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    line-height: 26px;
    color: #ffffff;
`;

export const AccountLinkActive = styled(AccountLink)`
    color: #009FE3;
`;

export const AccountText = styled.h3`
    display: inline-block;
    color: #ffffff;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    margin: 24px;
`;

export const LogOutButton = styled.a`
    float: right;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
    letter-spacing: 0.2px;
    color: #F39200;
    background: #FFFFFF;
    padding: 8px 24px;
    margin: 20px 108px 20px 0px;
    text-decoration: none;
    border: 1px solid #F39200;
    border-radius: 4px;
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
    font-style: normal:
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #626B79;
`;

export const DataSubPersonal = styled.div`
    margin: 48px 24px;
    width: 25%;
`;

export const DataSubAccount = styled.div`
    margin: 43px 24px;
    width: 25%;
`;
