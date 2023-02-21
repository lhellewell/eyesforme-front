import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

const Filedrop : React.FC<any> = ({setFileStr, setFile}) => {
	

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

	const {getRootProps, getInputProps, acceptedFiles, fileRejections} = useDropzone({onDrop, accept: {'image/*':[]}, multiple : false, 
	
	});



	return (
		<div className="mt-6 w-44 h-44 bg-slate-200 border-black border-2 border-dashed border-opacity-10" {...getRootProps()}>
			<input {...getInputProps()} />
			Drop and drop or click to select files
		</div>
	);
};

export default Filedrop;