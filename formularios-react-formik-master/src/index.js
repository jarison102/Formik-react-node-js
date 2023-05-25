import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Formulario from './Formulario';


ReactDOM.render(
	<React.StrictMode>
		<div className="contenedor">
			<Formulario />
		</div>
	</React.StrictMode>,
	document.getElementById('root')
);