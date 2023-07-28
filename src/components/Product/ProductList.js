import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

	const init = () => {
		fetch('http://localhost:5000/product/all').then(
			res => res.json()
		).then(
			products => {
				// Convert the price property to a number
				products = products.map(product => ({
					...product,
					price: Number(product.price)
				}));
				setProducts(products)
				setFilteredProducts(products)
				console.log(products)
			}
		)
	}
	

    const searchProduct = (event) => {
        const search = event.target.value;
        const filter = products.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase()) ||
            product.id.toString().includes(search));
        setFilteredProducts(filter);
    }

    const handleDelete = (id) => {
        console.log('Deleting Product with ID: ', id);
        fetch(`http://localhost:5000/product/${id}`, {
            method: 'DELETE'
        }).then((response) => {
            console.log("The product was successfully removed", response.data);
            init();
        }).catch((error) => {
            console.log("Error deleting product: ", error);
        })
    }

    const currencyFormat = (num) => {
        return '₹' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <Fragment>
            <div className="container">
                <div className="row text-center title">
                    <div className="col-md-12">
                        <h2>Product List</h2>
                    </div>
                </div>

                <div className="col-12 input-group input-group-lg mb-3 mt-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><FaIcons.FaSearch /></span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search product by name, category or code"
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={searchProduct} />
                    <div className="input-group-append">
                        <Link to="add-product" className="btn btn-success">Add Product</Link>
                    </div>
                </div>
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark text-center">
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Length</th>
                            <th>Breadth</th>
                            <th>Size</th>
                            <th>Category</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td className="text-center">{product.id}</td>
                                <td>{product.name}</td>
                                <td className="text-center">{currencyFormat(product.price)}</td>
                                <td className="text-center">{product.length + 'sq feet'}</td>
                                <td className="text-center">{product.breadth + 'sq feet'}</td>
                                <td className="text-center">{product.length * product.breadth + 'sq feet'}</td>
                                <td>{product.category}</td>
                                <td className="text-center">
                                    <Link to={`/product/edit/${product.id}`} className="text-info m-2">
                                        <FaIcons.FaEdit />
                                    </Link>
                                </td>
                                <td className="text-center">
                                    <Link to={`/products`} className="text-danger m-2" onClick={(event) => { handleDelete(product.id) }}>
                                        <FaIcons.FaTrashAlt />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default ProductList;
