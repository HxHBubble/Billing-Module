import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCategory = () => {
	const [name, setName] = useState('');
	const [isValid, setIsValid] = useState(false);
	const navigate = useNavigate();
	const vsExprReg = /[A-Za-z0-9_]/;

	const onSubmit = (event) => {
		event.preventDefault();

		const data = { name };
		if (vsExprReg.test(data.name)) { // validator for name
			axios.post('http://localhost:5000/category', data)
				.then((response) => {
					console.log('Category added correctly', response.data);
					setIsValid(false);
					navigate('/categories');
				}).catch((error) => {
					console.log('The following error occurred:', error);
				});
		} else {
			setIsValid(true);
		}
	}

	return (
		<Fragment>
			<div className="container">
				<h3 className="text-center mt-3">Add Category</h3>
				<hr />
				<form className="col-sm-12 col-lg-12 offset-sm-4 offset-lg-4">
					<div className="form-group">
						<label>Name</label>
						<input
							type="text"
							className="form-control col-4"
							id="name"
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder="Category Name"
							required
						/>
					</div>
					{isValid
						? <div className="alert alert-danger col-4" role="alert">You must fill this field with alphanumeric characters</div>
						: null
					}
					<div>
						<button onClick={onSubmit} className="btn btn-primary">
						Add
						</button>
					</div>
				</form>
				<hr />
				<Link to="/categories">Back to list</Link>
			</div>
		</Fragment>
    );
}

export default AddCategory;
