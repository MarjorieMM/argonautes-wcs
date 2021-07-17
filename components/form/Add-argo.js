import classes from "./Add-argo.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

function AddArgo(props) {
	const [invalid, setInvalid] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const capitalizeFirstLetter = (string) =>
		string.charAt(0).toUpperCase() + string.slice(1);

	const onSubmit = (data) => {
		props.handleAddArgo(data);
		// reset();
	};

	return (
		<div className="container px-5">
			<h2 className="text-center py-5">Ajouter un(e) Argonaute</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row g-3">
					<div className="col-12">
						<div className="text-center">
							<label htmlFor="name">Nom de l&apos;Argonaute</label>
						</div>
					</div>
					<div className="col-12 col-md-8">
						<input
							{...register(
								"name",
								{
									setValueAs: (v) => capitalizeFirstLetter(v),
								},
								{
									pattern: /[A-Za-z]/,
								},
								{
									required: "Veuillez entrer un nom pour votre Argonaute.",
									maxLength: {
										value: 20,
										message:
											"Veuillez entrer un nom entre 3 et 20 charactères.",
									},
									minLength: {
										value: 3,
										message:
											"Veuillez entrer un nom entre 2 et 20 charactères.",
									},
								}
							)}
							type="text"
							className={`form-control ${
								props.error.error || errors.name ? "is-invalid" : ""
							}`}
							id="name"
							placeholder="Charalampos"
							aria-label="name"
						/>
					</div>
					<div className="col-12 col-md-4 d-grid gap-2">
						{props.argos.length < 300 ? (
							<button className={`btn ${classes.button}`}>Envoyer</button>
						) : (
							<button className={`text-nowrap btn ${classes.button}`} disabled>
								Votre équipage est complet !
							</button>
						)}
					</div>
				</div>
				<div className="row">
					{errors.name && (
						<div className={classes.errors}>{errors.name.message}</div>
					)}
					{props.error && (
						<div className={classes.errors}>{props.error.error}</div>
					)}
				</div>
			</form>
		</div>
	);
}

export default AddArgo;
