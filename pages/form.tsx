// less code (c)
// Better validation
// Better Erros set / clear / display
// Have Control over Inputs
// Dont deal with events (c)
// Easier Inputs (c)

import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
	username: string;
	password: string;
	email: string;
}

export default function Forms() {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		mode: "onChange",
	});

	const onValid = (data: LoginForm) => {
		console.log(data);
	};

	const inValid = (error: FieldErrors) => {
		console.log(error);
	};

	return (
		<form onSubmit={handleSubmit(onValid, inValid)}>
			<input
				{...register("username", {
					required: "Username is required",
					minLength: {
						message: "The Username should be longer than 5 chars",
						value: 5,
					},
				})}
				type='text'
				placeholder='Username'
			/>
			<input
				{...register("email", {
					required: "email is required",
					validate: {
						notGmail: (value) =>
							!value.includes("@gmail.com") || "gmail is not allowed",
					},
				})}
				type='email'
				placeholder='email'
			/>
			{errors.email?.message}
			<input
				{...register("password", {
					required: "password is required",
				})}
				type='password'
				placeholder='password'
			/>
			<input type='submit' value='create Account' />
		</form>
	);
}
