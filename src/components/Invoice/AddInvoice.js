import { useState, Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import invoiceService from '../../services/InvoiceService';
import productService from '../../services/ProductService';
import clientService from '../../services/ClientService';
import * as FaIcons from 'react-icons/fa';
import './AddInvoice.css';
import PdfGenerate from './PDF';
import axios from 'axios'; // Import axios to send HTTP requests
 
const AddInvoice = () => {
    const [date, setDate] = useState('');
    const [dateTime, setDateTime] = useState(''); // Add a new state variable to hold the date and time value
    const [idClient, setIdClient] = useState('');
    const [total, setTotal] = useState(0);
    const [area, setArea] = useState(0);
    const [tilesize, setTilesize] = useState(1);
    const [idSize, setIdSize] = useState('');
    const [idProduct, setIdProduct] = useState('');
    const [clientName, setClientName] = useState('');    
    const [addedProduct, setAddedProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [clients, setClients] = useState([]);
    const [filteredClient, setFilteredClient] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const navigate = useNavigate();
    const numRegex = new RegExp("^[0-9]+$");
    const { id } = useParams();
 
    // Get all products
    const initProducts = () => {
        productService.getAll().then(res => {
            res.data.map(product => product.subTotal = product.price);
            res.data.map(product => {
                product.available = [];
                for (let i = 1; i <= product.stock; i++) product.available.push(i); return (product.available)
            });
            setProducts(res.data);
            setFilteredProduct(res.data);
        }).catch(err => {
            console.log('Se produjo el siguiente error: ', err);
        });
    }
    // Get all clients
    const initClients = () => {
        clientService.getAll().then(res => {
            setClients(res.data);
            setFilteredClient(res.data);
        }).catch(err => { console.log('Se produjo el siguiente error: ', err); })
    }
 
    // Get all Categories
    const initCategories = () => {
        fetch('http://localhost:5000/category/all')
          .then(response => response.json())
          .then(data => setCategories(data));
      };
 
 
    // Call init when the component is mounted
    useEffect(() => {
        initCategories();
        if (!id) { initProducts(); initClients(); }
    }, [id]);
 
    // define a function that updates the total
    const updateTotal = (newTotal) => {
        setTotal(newTotal);
      }
 
    // Get all Products
    useEffect(() => {
        fetch('http://localhost:5000/product/all')
          .then(response => response.json())
          .then(data => setProducts(data));
 
      }, []);
 
    // Find product by id
    const searchProduct = (event) => {
        const filter = products.filter((product) => product.id.toString() === event.target.value);
        setFilteredProduct(filter);
 
    }
 
    // Find client by id
    const searchClient = (event) => {
        const filter = clients.filter((client) => client.idClient.toString() === event.target.value);
        setFilteredClient(filter);
    }
 
	const addProduct = (product) => {
		// calculate the new total
		let newTotal = total + product.price;
		// update the state of the total
		updateTotal(newTotal);
	}
 
	const deleteProduct = (index) => { 
		setAddedProduct(addedProduct.filter((product, i) => i !== index)) 
	} // Delete product from invoice
 
	const onSubmit = (event) => {
		event.preventDefault();
 
		const getTotal = addedProduct.reduce((total, product) => { return total + product.subTotal }, 0);
		addedProduct.map((product) => { delete product.stock; delete product.available; return product });
		addedProduct.map((product) => { if (product.quantity === undefined) product.quantity = 1; return product });
 
		const invoiceData = {
			date: date ? new Date(date) : new Date(), // Create date
			idClient: parseInt(idClient), // Get client id
			clientName: `${filteredClient[0].name} ${filteredClient[0].lastName}`, // Get client name
            
			total: getTotal, // Get total
			products: JSON.stringify(addedProduct), // Convert products to string
			dateTime: dateTime // Add the selected date and time value to the invoice object
		};
		axios.post('http://localhost:5000/invoice', invoiceData)
			.then(response => {
				console.log('Invoice added correctly', response.data);
				navigate('/invoices');
			}).catch(error => {
				console.log('The following error occurred:', error);
			});
	}
  
 
	const totalProduct = (event, index) => {
		event.preventDefault();
		setAddedProduct(addedProduct.map((product, i) => {
			console.log('totalProduct called with event:', event, 'and index:', index);
			if (i === index) {
				product.subTotal = product.price * event.target.value;
				product.quantity = event.target.value;
			};
			return product
		}));
		console.log('addedProduct after update:', addedProduct);
	}
 
 
	const savePDF = (event) => {
		event.preventDefault();
		PdfGenerate(id, date.substring(0, 10), idClient, clientName, addedProduct);
	}
 
	const textValid = (event, key) => {
		const { value } = event.target;
		switch (key) {
			case 'idClient':
				if (numRegex.test(value)) setIdClient(value);
				break;
			case 'idProduct':
				if (numRegex.test(value)) setIdProduct(value);
				break;
			default:
				break;
		}
	}
 
    // Get invoice by id when show
    useEffect(() => {
        if (id) {
            invoiceService.get(id)
                .then((invoice) => {
                    const { date, idClient, clientName, products } = invoice.data;
                    setDate(date);
                    setIdClient(idClient);
                    setClientName(clientName);
                    setAddedProduct(JSON.parse(products));
                }).catch((error) => {
                    console.log('Se produjo el siguiente error:', error);
                });
        }
    }, [id]);
    console.log(`Tilesize: ${tilesize}`); 
    console.log('typeeeee: ', typeof(tilesize)); 
    console.log('type', typeof(area)); 
    console.log(`Area: ${area}`);               
    return (
        <Fragment>
            <div className="container">
                <h3 className="text-center mt-3">Create Invoice</h3>
                <h4>Details: {date.substring(0, 10)} </h4>
                <table className="table">
                    <thead className="thead-dark">
                        <tr><th>Client Name</th><th>Category</th><th>Product</th><th>Tile Size</th><th>Area</th><th>Date And Time</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Escriba la ID del cliente"
                                    value={idClient}
                                    onChange={(event) => { searchClient(event); setIdClient(event.target.value) }} // Remove the textValid function from the onChange event handler
                                    disabled={id}
                                />
                            </td>
                            <td>
                                <input
                                    list="categories"
                                    className="form-control mb-3"
                                    placeholder="Select Category"
                                    value={categoryInput}
                                    onChange={(event) => setCategoryInput(event.target.value)}
                                />
                                <datalist id="categories">
                                    {categories.map(category => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                </datalist>
                            </td>
                            <td>
                                <select
                                    className="form-control mb-3"
                                    value={idProduct}
                                    onChange={(event) => { 
                                        searchProduct(event); 
                                        setIdProduct(event.target.value);
                                        const selectedProduct = products.find(product => product.id.toString() === event.target.value);
                                        if (selectedProduct) {
                                            setAddedProduct([...addedProduct, selectedProduct]);
                                            addProduct(selectedProduct);
                                        }
                                    }}
                                >
                                    <option value="">Select Product</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select
                                    className="form-control mb-3"
                                    placeholder="Size"
                                    value={idSize} // Use the idSize state variable as the value prop
                                    onChange={(event) => { 
                                        setIdSize(event.target.value);
                                        // Update the idSize state variable when a new size is selected
                                        const selectedProduct = products.find(product => product.id.toString() === event.target.value);
                                        if (selectedProduct) {
                                            setTilesize(selectedProduct.size);
                                        }
                                    }}
                                >
                                    <option value="">Select Tile Size</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>{product.length}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                            <input
                                type="number"
                                className="form-control mb-3"
                                placeholder="Area"
                                value={area}
                                onChange={(event) => setArea(parseInt(event.target.value))}
                                disabled={id}
                            />
                            </td>   
                            <td>
                                <input
                                    type="datetime-local"
                                    className="form-control" // Add the form-control class to the input element
                                    value={dateTime}
                                    onChange={event => setDateTime(event.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
 
                <table className="table table-bordered table-striped fixed_header">
                    <thead className="thead-dark">
                        <tr>
                            <th>Client Name</th><th>Category</th><th>Product</th><th>Area</th><th>Tot Tile</th><th>Tot Box</th><th>Box Price.</th><th>Sub Total</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    {Array.isArray(addedProduct) && addedProduct.length > 0 ? (
        addedProduct.map((product, index) => (
            <tr key={index} >
                <td>{clientName}</td>
                <td>{product.category}</td>
                <td>{product.name}</td>
                <td>{area}</td>
                <td>{23 * 23}</td>
                <td>12</td>
                <td>12</td>
                <td>{45.00 * 12.00}</td>


                <td className="text-center">
                    {!id ? <Link to={`/add-invoice`} className="text-danger m-2" onClick={(event) => { deleteProduct(index) }}>
                        <FaIcons.FaTrashAlt /></Link> : 'No disponible'}
                </td>
            </tr>
        ))
    ) : null}
    
</tbody>
                </table>
                <div>
                    <div className="row">
                        <div className="col-md-12 text-right">
                            <h2>Total: {total + '.00'}</h2>
                        </div>
                    </div>
                </div>
                <div>
                    {!id &&
                        <button
                            onClick={onSubmit}
                            className="btn btn-primary"
                            disabled={!categoryInput || !idProduct || !dateTime || !idClient}
                        >Guardar</button>}
                    {id && <button onClick={(event) => savePDF(event)} className="btn btn-secondary ml-2">Descargar PDF</button>}
                </div>
                <hr />
                <Link to="/invoices">Volver a la lista</Link>
            </div>
        </Fragment>
    );
}
 
export default AddInvoice;