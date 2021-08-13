const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
	formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
	e.preventDefault();

	//Validar

	const ciudad = document.querySelector('#ciudad').value;
	const pais = document.querySelector('#pais').value;

	if (ciudad === '' || pais === '') {
		mostrarError('Ambos Campos son Obligatorios');
		return;
	}
	//Consultar API
	consultarApi(ciudad, pais);
}

function mostrarError(mensaje) {
	const alerta = document.querySelector('.bg-red-100');
	if (!alerta) {
		// Crear una Alerta
		const alerta = document.createElement('div');
		alerta.classList.add(
			'bg-red-100',
			'border-red-400',
			'text-red-700',
			'px-4',
			'py-3',
			'rounded',
			'max-w-md',
			'mx-auto',
			'mt-6',
			'text-center'
		);
		alerta.innerHTML = `
        <strong class="font-bold"> Error!!</strong>
        <span class="block">${mensaje}</span>
    `;
		container.appendChild(alerta);
		setTimeout(() => {
			alerta.remove();
		}, 3000);
	}
}

function consultarApi(ciudad, pais) {
	const appId = '0b5c7601a405ca02227bfec8d68981ef';
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

	spinner(); // Muestra un spiner de carga
	fetch(url)
		.then((respuesta) => respuesta.json())
		.then((datos) => {
			console.log(datos);

			limpiarHtml(); //Limpiar Html Previo

			if (datos.cod == '404') {
				mostrarError('Ciudad no Encontrada');
				return;
			}
			//Imprime la respuesta en el HTML
			mostraClima(datos);
		});
}

function mostraClima(datos) {
	const {
		name,
		main: { temp, temp_max, temp_min, humidity, feels_like },
	} = datos;

	const ceentigrados = kelvinACentigrados(temp);
	const max = kelvinACentigrados(temp_max);
	const min = kelvinACentigrados(temp_min);
	const humedad = humidity;
	const sensacion = kelvinACentigrados(feels_like);

	const nombreCiudad = document.createElement('p');
	nombreCiudad.textContent = `Clima en: ${name}`;
	nombreCiudad.classList.add('text-bold', 'text-2xl');

	const actual = document.createElement('p');
	actual.innerHTML = `${ceentigrados} &#8451;`;
	actual.classList.add('text-bold', 'text-6xl');

	const tempMax = document.createElement('p');
	tempMax.innerHTML = `Temperatura Maxima: ${max} &#8451`;
	tempMax.classList.add('text-xl');

	const tempMin = document.createElement('p');
	tempMin.innerHTML = `Temperatura Minima: ${min} &#8451`;
	tempMin.classList.add('text-xl');

	const humedadActual = document.createElement('p');
	humedadActual.innerHTML = `Humedad: ${humedad} %`;
	humedadActual.classList.add('text-xl');

	const termica = document.createElement('p');
	termica.innerHTML = `Sensacion Termica: ${sensacion} &#8451`;
	termica.classList.add('text-xl');

	const resultadoDiv = document.createElement('div');
	resultadoDiv.classList.add('text-center', 'text-white');
	resultadoDiv.appendChild(nombreCiudad);
	resultadoDiv.appendChild(actual);
	resultadoDiv.appendChild(tempMax);
	resultadoDiv.appendChild(tempMin);
	resultadoDiv.appendChild(humedadActual);
	resultadoDiv.appendChild(termica);

	resultado.appendChild(resultadoDiv);
}

function kelvinACentigrados(grados) {
	return parseInt(grados - 273.15);
}

function limpiarHtml() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
}

function spinner() {
	limpiarHtml();
	const divSpiner = document.createElement('div');
	divSpiner.classList.add('sk-fading-circle');
	divSpiner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;
	resultado.appendChild(divSpiner);
}
