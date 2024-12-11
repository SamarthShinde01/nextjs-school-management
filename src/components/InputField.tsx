import { FieldError } from "react-hook-form";

type InputFieldProps = {
	label: string;
	type?: string;
	name: string;
	register: any;
	defaultValue?: string;
	error: FieldError | any;
	hidden?: boolean;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function InputField({
	label,
	type = "text",
	name,
	register,
	defaultValue,
	error,
	hidden,
	inputProps,
}: InputFieldProps) {
	return (
		<div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
			<label className="text-xs text-gray-500">{label}</label>
			<input
				type={type}
				{...register(name)}
				className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
				defaultValue={defaultValue}
				{...inputProps}
			/>

			{error?.message && (
				<p className="text-xs text-red-500 ">{error?.message.toString()}</p>
			)}
		</div>
	);
}
