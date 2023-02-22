import { Button, Label, TextInput, Select } from "flowbite-react";

const Inputs : React.FC = () => {

	return (
		<form className="flex flex-col gap-4 font-medium text-3xl">
			<div id="select">
			<div className="mb-1 block">
				<Label
				htmlFor="task"
				value="Please Select Task"
				/>
			</div>
			<Select id="task" required={true}>
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
				<TextInput id="textinput" required={true}/>
			</div>
			<div className="flex items-center gap-2">
			</div>
			<Button className="text-black" type="submit">
				Submit
			</Button>
		</form>
	);
}

export default Inputs;