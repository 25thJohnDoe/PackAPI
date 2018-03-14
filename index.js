const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const productos = 
[
	{id: 1, name: 'Cocacola', precio: 8},
	{id: 2, name: 'Corona', precio: 14},
	{id: 3, name: 'Marlboro', precio: 47}
];

app.get('/', (req, res)=>
{
	res.send('Test 0.02');

});


app.get('/api/productos', (req, res)=>
{
	res.send(productos);
});

app.post('/api/productos', (req, res) =>
{
	const {error} = validacionDeProducto(req.body);
	if(error)
	{
		res.status(400).send(result.error.details[0].message)
		return;
	}

	const producto =
	{
		id: productos.lenght + 1,
		name: req.body.name
	};
	productos.push(producto);
	res.send(producto);
});

app.put('api/productos:id', (req, res) =>
{
	const producto = productos.find(c => c.id === parseInt(req.params.id));
	if (!producto) res.status(404).send('Id del producto no existe.')
	
	const {error} = validacionDeProducto(req.body);
	if(error)
	{
		res.status(400).send(result.error.details[0].message)
		return;
	}

	producto.name = req.body.name;
	res.send(producto);

});

app.get('/api/productos/:id', (req, res)=>
{
	const producto = productos.find(c => c.id === parseInt(req.params.id));
	if (!producto) res.status(404).send('Id del producto no existe.')
	res.send(producto);
});
//port selecction
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))


function validacionDeProducto(producto)
{
	const schema = 
	{
		name: Joi.scheme().min(3).required()
	};

	return Joi.validate(producto)
}