import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import { COLORS } from "../values/colors"

const getColor = (props: any) => {
	if (props.isDragAccept || props.isFocused) {
		return COLORS.yellow;
	}
	if (props.isDragReject) {
		return '#ff1744';
	}
	return COLORS.night;
}

// Styled container div for drag and drop
const Container = styled.div`
	flex: 1;
	display: flex;
	flex-shrink: 1;
	width: 40rem;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-width: 2px;
	border-radius: 2px;
	border-color: ${props => getColor(props)};
	border-style: dashed;
	background-color: ${COLORS.grey};
	color: ${COLORS.night};
	outline: none;
	transition: border .24s ease-in-out;
	&:hover {
		border-color: ${COLORS.yellow};
	}
	`;

/**
 * Filedrop component for drag and drop feature
 * @param setFileStr : set state from parent component that 
 * @returns 
 */
const Filedrop : React.FC<any> = ({setFileStr, setFile}) => {
	const [currFile, setCurrFile] = useState<any>();

	// Callback for when the file is dropped into the upload box
	const onDrop = useCallback((files: any) => {
		
		if (files.length == 1) {
			setFile(files[0]);
			setCurrFile(files[0]);
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
		isDragReject,
	  } = useDropzone({onDrop, accept: {'image/*': []}, multiple : false,});

	

	return (
		<div className="container cursor-pointer">
      		<Container {...getRootProps({isFocused, isDragAccept, isDragReject})}>
        		<input {...getInputProps()} />
        		<p>Drag 'n' drop some files here, or click to select files</p>
				{currFile ? <p>{currFile.path} - {currFile.size} bytes</p> : <></>}
      		</Container>
    	</div>
	);
};

export default Filedrop;