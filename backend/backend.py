import json
import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/category/all', methods=['GET'])
def get_all_categories():
    # Load categories from category.json file
    with open('C:/Users/VISHNU/Desktop/important/python/varshan agency billing module/billing/billing/backend/category.json', 'r') as f:
        categories = json.load(f)
    return jsonify(categories)

@app.route('/category/delete/<int:id>', methods=['DELETE'])
def delete_category(id):
    # Load categories from category.json file
    with open('C:/Users/VISHNU/Desktop/important/python/varshan agency billing module/billing/billing/backend/category.json', 'r') as f:
        categories = json.load(f)

    # Find the category to delete
    category = next((c for c in categories if c['id'] == id), None)
    if not category:
        return jsonify({'message': 'Category not found'}), 404

    # Delete the category
    categories.remove(category)

    # Save the updated categories to the category.json file
    with open('C:/Users/VISHNU/Desktop/important/python/varshan agency billing module/billing/billing/backend/category.json', 'w') as f:
        json.dump(categories, f)

    return jsonify({'message': 'Category deleted successfully'})


@app.route('/category', methods=['POST'])
def add_category():
    data = request.get_json()
    name = data['name']

    # Save to category.json file
    with open('C:/Users/VISHNU/Desktop/important/python/varshan agency billing module/billing/billing/backend/category.json', 'r') as f:
        categories = json.load(f)

    # Generate a unique id for the new category
    id = max([c['id'] for c in categories], default=0) + 1

    # Add the new category
    categories.append({'id': id, 'name': name})

    # Save the updated categories to the category.json file
    with open('C:/Users/VISHNU/Desktop/important/python/varshan agency billing module/billing/billing/backend/category.json', 'w') as f:
        json.dump(categories, f)

    return jsonify({'message': 'Category added successfully'})


################ PRODUCTS ###################

@app.route('/product', methods=['POST'])
def add_product():
    data = request.get_json()
    name = data['name']
    price = data['price']
    length = data['length']
    breadth = data['breadth']
    category = data['category']

    print(length)
    print(breadth)

    # Load products from product.json file
    with open('C:/Users/VISHNU/Desktop/important/python/varshan agency billing module/billing/billing/backend/product.json', 'r') as f:
        products = json.load(f)

    # Generate a unique id for the new product
    id = max([p['id'] for p in products], default=0) + 1

    # Add the new product
    products.append({'id': id, 'name': name, 'price': price, 'length': length, 'breadth' : breadth, 'category': category})

    # Save the updated products to the product.json file
    with open('C:/Users/VISHNU/Desktop/important/python/varshan agency billing module/billing/billing/backend/product.json', 'w') as f:
        json.dump(products, f)

    return jsonify({'message': 'Product added successfully'})

@app.route('/product/all', methods=['GET'])
def get_all_product():
    # Load categories from product.json file
    with open('C:/Users/VISHNU/Desktop/important/python/varshan agency billing module/billing/billing/backend/product.json', 'r') as f:
        product = json.load(f)
    return jsonify(product)

@app.route('/product/<int:id>', methods=['DELETE'])
def delete_product(id):
    # Load products from product.json file
    with open('C:/Users/VISHNU/Desktop/important/python/varshan agency billing module/billing/billing/backend/product.json', 'r') as f:
        products = json.load(f)

    # Find the product to delete
    product = next((p for p in products if p['id'] == id), None)
    if not product:
        return jsonify({'message': 'Product not found'}), 404

    # Delete the product
    products.remove(product)

    # Save the updated products to the product.json file
    with open('C:/Users/VISHNU/Desktop/important/python/varshan agency billing module/billing/billing/backend/product.json', 'w') as f:
        json.dump(products, f)

    return jsonify({'message': 'Product deleted successfully'})


################ PRODUCTS ###################

################ CLIENTS ###################

@app.route('/invoice', methods=['POST'])
def invoice():
    data = request.get_json()
    name = data['name']
    price = data['price']
    stock = data['stock']
    category = data['category']

    # Load products from product.json file
    with open('C:/Users/VISHNU/Desktop/important/python/varshan agency billing module/billing/billing/backend/product.json', 'r') as f:
        products = json.load(f)

    # Generate a unique id for the new product
    id = max([p['id'] for p in products], default=0) + 1

    # Add the new product
    products.append({'id': id, 'name': name, 'price': price, 'stock': stock, 'category': category})

    # Save the updated products to the product.json file
    with open('C:/Users/VISHNU/Desktop/important/python/varshan agency billing module/billing/billing/backend/product.json', 'w') as f:
        json.dump(products, f)

    return jsonify({'message': 'Product added successfully'})

################ CLIENTS ###################




    # Save to MySQL database
    # conn = mysql.connector.connect(
    #     user='i4nrctklzwdm27apna73',
    #     password='pscale_pw_q0rdZGw4mQVKhTCDOGeNzEzAMvSIX40r344KV9sxftV',
    #     host='aws.connect.psdb.cloud',
    #     database='varshanagency',
    #     ssl_ca='C:/Users/VISHNU/Downloads/cacert.pem'
    # )




    # if conn.is_connected():
    #     print('Connected to MySQL database')
    # cursor = conn.cursor()
    # cursor.execute('INSERT INTO categories (name) VALUES (%s)', (name,))
    # category_id = cursor.lastrowid
    # conn.commit()
    # cursor.close()
    # conn.close()

    # Save to category.json file


if __name__ == '__main__':
    app.run()
