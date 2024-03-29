import { Button, Label, TextInput, Select } from "flowbite-react";
import React, {useState} from 'react';

/**
 * Component for the input fields for task/input as well as the submit button.
 * @param onFileUpload - used to upload the file to the parent component.
 * @param setTask - used to set the task in the parent component.
 * @param setInput - used to set the input state in the parent component.
 * @returns the component tree for the input fields
 */
const Inputs : React.FC<any> = ({onFileUpload, setTask, setInput}) => {

	const [isHidden, setIsHidden] = useState(true); // state for hiding/showing the inputs

	// setting the input state
	const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
	}

	// setting the task state and resetting the input state if necessary
	const onChangeTask = (event: React.ChangeEvent<HTMLSelectElement>) => {
		
		const taskInput: string = event.target.value;
		
		if (taskInput == "image_captioning") {
			setInput("");
			setIsHidden(true);
		} else  {
			setInput(taskInput);
			setIsHidden(false);
		}
		
		setTask(taskInput);
	}	


	return (
		<form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-2 font-medium">
			<div id="select" className="">
				<div className="block">
					<Label
					htmlFor="task"
					value="Please Select Task"
					className="text-base"
					/>
				</div>
				<select id="task" onChange={onChangeTask} className="bg-cgrey border-cnight border-2 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option className="border-2 border-black text-inherit" defaultValue={"true"} value="image_captioning">Image Captioning</option>
					<option value="visual_question_answering">Image Question Answering</option>
					<option value="image_text_matching">Image Text Matching</option>
				</select>
			</div>
			<div hidden={isHidden}>
				<div className=" block">
				<Label
					htmlFor="textinput"
					value="Input"
				/>
				</div>
				<input id="textinput" onChange={onChangeText} className="bg-cgrey border-cnight border-2 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
			</div>
			<div className="flex items-center gap-2">
			</div>
			<Button className="w-1/3 mx-auto text-cblack transition-all bg-cyellow hover:text-white border-cnight border-2  hover:border-choney hover:bg-cnight" type="submit" onClick={onFileUpload}>
				<p className="text-inherit ">Submit</p>
			</Button>
		</form>
	);
}

export default Inputs;