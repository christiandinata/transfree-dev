import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

// wrap Form with FormContainer
// <FOrmContainer>
// <Form></Form>
// </FormContainer>
export const FormContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 500px;
	background: #f3f5f7;
`;

export const Form = styled.form`
	margin: 40px 0;
	width: 550px;
	min-height: 448px;
	background: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
`;