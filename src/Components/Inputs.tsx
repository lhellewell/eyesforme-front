import { Button, Label, TextInput, Select } from "flowbite-react";

const Inputs : React.FC<any> = ({onFileUpload, setTask, setInput}) => {
	

	const onChangeText = () => {
		setInput((document.getElementById("textinput") as HTMLInputElement).value);
	}

	const onChangeTask = () => {
		let taskValue = (document.getElementById("task") as HTMLInputElement).value;
		taskValue = taskValue.toLowerCase().replaceAll(" ", "_")

		// Appropriate splicing for the correct task value for API
		if (taskValue == "image_question_answering") {
			taskValue = taskValue.replace("image", "visual");
		} else if (taskValue == "image_captioning") {
			setInput("");
		}
		
		setTask(taskValue);
	}	

	return (
		<form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-4 font-medium">
			<div id="select" className="">
				<div className="mb-1 block">
					<Label
					htmlFor="task"
					value="Please Select Task"
					className="text-base"
					/>
				</div>
				<select id="task" onChange={onChangeTask} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option defaultValue={"true"} value="Image Captioning">Image Captioning</option>
					<option value="Image Question Answering">Image Question Answering</option>
					<option value="Image Text Matching">Image Text Matching</option>
				</select>
			</div>
			<div>
				<div className="mb-2 block">
				<Label
					htmlFor="textinput"
					value="Input"
				/>
				</div>
				<TextInput id="textinput" onChange={onChangeText} />
			</div>
			<div className="flex items-center gap-2">
			</div>
			<Button className="text-black" type="submit" onClick={onFileUpload}>
				Submit
			</Button>
		</form>
	);
}

export default Inputs;