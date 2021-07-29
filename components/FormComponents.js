import styled from "styled-components";

// wrap Form with FormContainer
// <FOrmContainer>
// <Form></Form>
// </FormContainer>
export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
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
	border: ${(props) => (props.type ? "1px solid #9A9A9A" : "none")};
	border-radius: ${(props) => (props.type ? "8px" : "4px")};
	flex-direction: column;
	align-items: center;
	transition: 0.4s all ease-in;

	@media (max-width: 620px) {
		width: 344px;
		margin-right: 16px;
		margin-left: 16px;
		border: none;
		border-radius: 4px;
	}

	@media (max-width: 375px) {
		width: 90vw;
	}
`;
