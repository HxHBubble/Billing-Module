import jsPDF from 'jspdf';

const currencyFormat = (num) => {
	return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

var cont = 0
var aux = ((cont * 16) + 156)
export const PdfGenerate = (id, date, idClient, clientName, addedProduct) => {
	//encabezado
	const total = addedProduct.reduce((total, item) => total + item.subTotal, 0)
	var doc = new jsPDF()
	doc.setFontSize(22)
	doc.setFont('Helvetica', 'bold');
	doc.text(60, 20, '*** Panadería LUKANG ***')
	doc.setFont('Helvetica', 'normal');
	doc.setFontSize(16)
	doc.text(85, 30, 'NIT: 911017755-9')
	doc.text(84, 40, 'Carrera 42 86 – 32')
	doc.text(65, 50, 'Resolución DIAN 191816549/8156')
	doc.text(79, 60, 'Autorizada el 01/12/2021')
	doc.rect(5, 65, 200, 1, 'F')

	//Datos del cliente col 1
	doc.setFont('Helvetica', 'bold');
	doc.text(90, 80, 'Factura de venta : POS - ')
	doc.setFont('Helvetica', 'normal');
	doc.text(10, 90, 'Fecha')
	doc.text(10, 100, 'Cliente')
	doc.text(10, 110, 'C.C / NIT')
	//col 2
	doc.text(170, 80, `${id}`);
	doc.text(50, 90, `${date}`)
	doc.text(50, 100, `${clientName}`)
	doc.text(50, 110, `${idClient}`)
	doc.rect(5, 115, 200, 1, 'F')

	//cuerpo factura
	doc.setFontSize(19)
	doc.setFont('Helvetica', 'bold');
	doc.text(10, 130, 'Código');
	doc.text(40, 130, 'Producto');
	doc.text(100, 130, 'Precio');
	doc.text(130, 130, 'Unidades');
	doc.text(170, 130, 'Sub Total');
	doc.setFont('Helvetica', 'normal');
	doc.setFontSize(16)

	for (let i = 0; i < addedProduct.length; i++) {
		doc.text(10, 140 + i * 10, `${addedProduct[i].id}`);
		doc.text(40, 140 + i * 10, `${addedProduct[i].name.substring(0, 15)}`);
		doc.text(100, 140 + i * 10, `${currencyFormat(addedProduct[i].price)}`);
		doc.text(145, 140 + i * 10, `${addedProduct[i].quantity}`);
		doc.text(170, 140 + i * 10, `${currencyFormat(addedProduct[i].subTotal)}`);
		cont = i

		//console.log('cont'+cont+'aux'+aux);

	}
	aux = + ((cont * 10) + 156)

	doc.text(10, aux, '------------------------------------------------------------------------------------------------------');
	doc.setFont('Helvetica', 'bold');
	doc.text(130, (aux+10), 'Total:')
	doc.text(170, (aux+10), `${currencyFormat(total)}`)
	doc.setFont('Helvetica', 'normal');
	doc.text(10, aux + 16, '------------------------------------------------------------------------------------------------------');
	console.log('cont' + cont + 'aux' + aux);

	doc.save(`factura_${id}_${idClient}.pdf`);
}
console.log('cont' + cont + 'aux' + aux);

export default PdfGenerate;