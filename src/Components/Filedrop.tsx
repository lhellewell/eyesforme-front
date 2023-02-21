import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

const getColor = (props: any) => {
	if (props.isDragAccept) {
		return '#00e676';
	}
	if (props.isDragReject) {
		return '#ff1744';
	}
	if (props.isFocused) {
		return '#2196f3';
	}
	return '#eeeeee';
}

const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-width: 2px;
	border-radius: 2px;
	border-color: ${props => getColor(props)};
	border-style: dashed;
	background-color: #fafafa;
	color: #bdbdbd;
	outline: none;
	transition: border .24s ease-in-out;
	`;

const Filedrop : React.FC<any> = ({setFileStr, setFile}) => {

	
	// Callback for when the file is dropped into the upload box
	const onDrop = useCallback((files: any) => {
		
		if (files.length == 1) {
			setFile(files[0]);

			const reader = new FileReader();
	  
			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.onload = () => {
			  const binaryStr = reader.result;
			  setFileStr(binaryStr);
			  
			}
			reader.readAsDataURL(files[0]);
			console.log("Inputted : ", files[0]);
			
		} else {
			console.log("Only Upload 1 File at a Time");
		}
	}, [])

	// Use Dropzone hook
	const {
		getRootProps,
		getInputProps,
		isFocused,
		isDragAccept,
		isDragReject
	  } = useDropzone({onDrop, accept: {'image/*': []}, multiple : false,});


	return (
		<div className="container">
      		<Container {...getRootProps({isFocused, isDragAccept, isDragReject})}>
        		<input {...getInputProps()} />
        		<p>Drag 'n' drop some files here, or click to select files</p>
      		</Container>
    	</div>
	);
};

export default Filedrop;