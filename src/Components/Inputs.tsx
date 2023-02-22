import { Button, Label, TextInput, Select } from "flowbite-react";

const Inputs : React.FC<any> = ({onFileUpload, task}) => {

	const onChange = () => {
		let textinput = (document.getElementById("textinput") as HTMLInputElement).value;
		let task = (document.getElementById("task") as HTMLInputElement).value;
	}

	return (
		<form action="inputs" className="flex flex-col gap-4 font-medium text-3xl">
			<div id="select">
			<div className="mb-1 block">
				<Label
				htmlFor="task"
				value="Please Select Task"
				/>
			</div>
			<Select id="task" onChange={onChange} required={true}>
				<option>
				Image Captioning
				</option>
				<option>
				Image Question Answering
				</option>
				<option>
				Image Text Matching
				</option>
			</Select >
			</div>
			<div>
				<div className="mb-2 block">
				<Label
					htmlFor="textinput"
					value="Input"
				/>
				</div>
				<TextInput id="textinput" onChange={onChange} />
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