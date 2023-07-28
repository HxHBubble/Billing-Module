import { useState, Fragment, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const charRegex = new RegExp("^[a-zA-Z ]+$");
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const [length, setLength] = useState(0);
    const [breadth, setBreadth] = useState(0);


    const { id } = useParams();

    // Get all categories
    const init = () => {
        fetch('http://localhost:5000/category/all').then(
            res => res.json()
        ).then(
            categories => {
                setCategories(categories)
                console.log(categories)
            }
        )
    }

    // Call init when the component is mounted
    useEffect(() => {
        init();
    }, []);

	const saveProduct = (event) => {
		event.preventDefault();
	
		const product = { name, price, category, length, breadth, id };
		if (id) {
			// update product
			fetch(`http://localhost:5000/product/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(product)
			})
				.then(response => response.json())
				.then(data => {
					console.log('The Product was successfully updated', data);
					navigate('/products');
				}).catch((error) => {
					console.log('The following error occurred: ', error);
				});
		} else {
			// create product
			// Contional to save product
			if (name.length > 0 && category.length > 0) {
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
	
	
    const textValid = (event, key) => {
        const { value } = event.target;
        switch (key) {
            case 'name':
                if (charRegex.test(value) || value === '') setName(value);
                break;
            case 'price':
                if (value >= 0) setPrice(value);
                break;
            case 'category':
                if (value !== '') setCategory(value);
                break;
            case 'length':
                if (value >= 0) setLength(value);
                break;
            case 'breadth':
                if (value >= 0) setBreadth(value);
                break;
            default:
                break;
        }
    }
       

    return (
        <Fragment>
            <div className="container">
                <h3 className="text-center mt-3">Add Product</h3>
                <hr />
                <form className="col-sm-12 col-lg-12 offset-sm-4 offset-lg-4">
                    {isValid
                        ? <div className="alert alert-danger col-4" role="alert">You must fill in all the fields</div>
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
                            placeholder="Product Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            className="form-control col-4"
                            id="price"
                            value={price}
                            onChange={(event) => textValid(event, 'price')}
                            placeholder="Product price"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="length">Length (in feet)</label>
                        <input
                            type="text"
                            className="form-control col-4"
                            id="length"
                            value={length}
                            onChange={(event) => textValid(event, 'length')}
                            placeholder="Enter Length"
                        />
                        <label htmlFor="breadth">Breadth (in feet)</label>
                        <input
                            type="text"
                            className="form-control col-4"
                            id="breadth"
                            value={breadth}
                            onChange={(event) => textValid(event, 'breadth')}
                            placeholder="Enter Breadth"
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            className="form-control col-4"
                            id="category"
                            defaultValue={category}
                            onChange={(event) => { textValid(event, 'category') }}>
                            {category
                                ? <option value={category}>{category}</option>
                                : <option value="">Select a category</option>}
                            {categories.map((item) => {
                                return (
                                    category !== item.name
                                        ? <option key={item.id} value={item.name}>{item.name}</option>
                                        : null
                                )
                            })}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={saveProduct}>Save</button>
                    <Link to="/products" className="btn btn-danger ml-2">Cancel</Link>
                </form>
            </div>
        </Fragment>
    );
}

export default AddProduct;
