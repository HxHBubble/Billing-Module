import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import clientService from '../../services/ClientService';

const AddClient = () => {
	const [idClient, setIdClient] = useState('');
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [isExist, setIsExist] = useState(false);
	const navigate = useNavigate();
	const charRegex = new RegExp("^[a-zA-Z ]+$");
	const numRegex = new RegExp("^[0-9]+$");
	const { id } = useParams();

	const saveClient = (event) => {
		event.preventDefault();

		const client = { idClient, name, lastName, id };
		if (id) {
			// update client
			clientService.update(client)
				.then((response) => {
					console.log('The Client was successfully updated', response.data);
					navigate('/clients');
				}).catch((error) => {
					console.log('The following error occurred: ', error);
				});
		} else {
			// create client
			if (client.name.length > 0 && client.lastName.length > 0 && client.idClient > 0) {
				fetch('http://localhost:5000/product', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(product)
				})
					.then(response => response.json())
					.then(data => {
						console.log('Product added successfully', data);
						setIsValid(false);
						navigate('/products');
					}).catch((error) => {
						console.log('The following error occurred: ', error);
					});
			} else {
				setIsValid(true);
			}
		}
	}

	// Validate if the name, lastname is only letters and idClient is only numbers
	const textValid = (event, key) => {
		const { value } = event.target;
		switch (key) {
			case 'name':
				if (charRegex.test(value) || value === '') setName(value);
				break;
			case 'lastName':
				if (charRegex.test(value) || value === '') setLastName(value);
				break;
			case 'idClient':
				if (numRegex.test(value) || value === '') setIdClient(value);
				break;
			default:
				break;
		}
	}

	// Get all clients when id is defined
	useEffect(() => {
		if (id) {
			clientService.get(id)
				.then((client) => {
					const { idClient, name, lastName } = client.data;
					setIdClient(idClient);
					setName(name);
					setLastName(lastName);
				}).catch((error) => {
					console.log('The following error occurred: ', error);
				});
		}
	}, [id]);

	return (
		<Fragment>
			<div className="container">
				<h3 className="text-center mt-3">Add Client</h3>
				<hr />

				<form className="col-sm-12 col-lg-12 offset-sm-4 offset-lg-4">
					{isValid
						? <div className="alert alert-danger col-4" role="alert">You must fill in all the fields</div>
						: null
					}
					{isExist
						? <div className="alert alert-danger col-4" role="alert">This identification number already exists</div>
						: null
					}
					<div className="form-group">
						<label>Name</label>
						<input
							type="text"
							className="form-control col-4"
							id="name"
							value={name}
							onChange={(event) => { textValid(event, 'name') }}
							placeholder="Customer Name"
							required
						/>
					</div>
					<div className="form-group">
						<label>Surname</label>
						<input
							type="text"
							className="form-control col-4"
							id="lastName"
							value={lastName}
							onChange={(event) => textValid(event, 'lastName')}
							placeholder="Customer's last name"
							required
						/>
					</div>
					<div className="form-group">
						<label>Identification</label>
						<input
							type="text"
							className="form-control col-4"
							id="idClient"
							value={idClient}
							onChange={(event) => textValid(event, 'idClient')}
							placeholder="Customer identification"
							required
						/>
					</div>
					<div>
						<button onClick={(event) => saveClient(event)} className="btn btn-primary">
						Add
						</button>
					</div>
				</form>
				<hr />
				<Link to="/clients">Back to list</Link>
			</div>
		</Fragment>
    );
}

export default AddClient;
