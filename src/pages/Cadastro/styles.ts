import styled from 'styled-components'
import * as Form from '@radix-ui/react-form';
import { blackA, violet, mauve } from '@radix-ui/colors';




export const FormRoot = styled(Form.Root)`width: 260;`
  
export const FormField = styled(Form.Field)`
  	display: 'grid';
	margin-bottom: 10;
  `
  
export const FormLabel = styled(Form.Label)`
  	font-size: 15;
	font-weight: 500;
	line-height: '35px';
	color: 'white';
` 
  
export const FormMessage = styled(Form.Message)`
  	font-size: 13;
	color: 'white';
	opacity: 0.8;
  ` 
export const Flex = styled.div`	

	align-items: baseline;
	display: 'flex';
	justify-content: space-between;
` 

  
export const Input = styled.input`
  	all: 'unset';
	box-sizing: 'border-box';
	width: '100%';
	display: 'inline-flex';
	align-items: 'center';
	justify-content: 'center';
	border-radius: 4;
  
	font-size: 15;
	color: 'white';
	background-color: ${blackA.blackA5} ;
	box-shadow: ${blackA.blackA9} 0 0 0 1px;
		&:hover { 
			box-shadow: black 0 0 0 1px; 
		};


	&:focus { box-shadow: black 0 0 0 2px };
	&::selection { 
		background-color: ${blackA.blackA9};
		color: 'white';
	};
	height: 35;
	line-height: 1;
	padding: '0 10px'; 
  ` 
  
export const Textarea = styled.textarea`
  	all: 'unset';
	box-sizing: 'border-box';
	width: '100%';
	display: 'inline-flex';
	align-items: 'center';
	justify-content: 'center';
	border-radius: 4;
  
	font-size: 15;
	color: 'white';
	background-color: ${blackA.blackA5} ;
	box-shadow: ${blackA.blackA9} 0 0 0 1px;
		&:hover { 
			box-shadow: black 0 0 0 1px; 
		};


	&:focus { box-shadow: black 0 0 0 2px };
	&::selection { 
		background-color: ${blackA.blackA9};
		color: 'white';
	};

	resize: 'none';
	padding: 10;
  `
export  const Button = styled.button`
	all: 'unset';
	box-sizing: 'border-box';
	display: 'inline-flex';
	align-items: 'center';
	justify-content: 'center';
	border-radius: 4;
	padding: '0 15px';
	font-size: 15;
	line-height: 1;
	font-weight: 500;
	height: 35;
	width: '100%';
  
	background-color: 'white';
	color: ${violet.violet11};
	box-shadow: ${blackA.blackA7} 0 2px 10px;
	&:hover { background-color: ${mauve.mauve3} };
	&:focus { box-shadow: black 0 0 0 2px}; 

	margin-top: 10;
`
	
  