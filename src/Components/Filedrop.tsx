import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

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


	const {getRootProps, getInputProps, acceptedFiles, fileRejections} = useDropzone({onDrop, accept: {
		'image/png' : ['.png'],
		'image/jpeg' : ['.jpeg', '.jpg'],
	}, maxFiles : 1, 
	
	});
	console.log(getRootProps());

	console.log(getInputProps());


	return (
		<div className=" w-44 h-44 bg-slate-400" {...getRootProps()}>
			<input {...getInputProps()} />
			Drop and drop or click to select files
		</div>
	);
};

export default Filedrop;