// Cuando el contenido de la página esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Mostrar la pantalla de splash durante 1 segundo
  setTimeout(function() {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
  }, 1000); // Muestra la pantalla de inicio después de 1 segundo
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(function (registration) {
      console.log(
        'Service Worker registration successful with scope: ',
        registration.scope
      );
    })
    .catch(function (err) {
      console.log('Service Worker registration failed: ', err);
    });

  document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario para validaciones

    const username = document.getElementById('username').value;
    const lastname = document.getElementById('lastname').value;

    // Validación básica del formulario
    if (username === '' || lastname === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Pedir permiso para la geolocalización
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          alert(`Su ubicación actual es:  Latitud: ${latitude}, Longitud: ${longitude}`);
          // Aquí podrías enviar esta información a tu servidor si fuera necesario
        },
        function (error) {
          alert('Error al obtener la ubicación: ' + error.message);
        }
      );
    } else {
      alert('Geolocalización no es soportada en este navegador.');
    }

  });

  document.addEventListener('DOMContentLoaded', function () {
    const userListContainer = document.getElementById('user-list');

    fetch('https://randomuser.me/api/?results=6')
      .then(response => response.json())
      .then(data => {
        const users = data.results;

        users.forEach(user => {
          const userCard = document.createElement('div');
          userCard.className = 'col mb-4';

          const userImage = user.picture.large;

          userCard.innerHTML = `
            <div class="card h-100">
              <img src="${userImage}" class="card-img-top" alt="Avatar de ${user.name.first} ${user.name.last}">
              <div class="card-body">
                <h5 class="card-title">${user.name.first} ${user.name.last}</h5>
                <p class="card-text">${user.email}</p>
                <p class="card-text">${user.location.street.number} ${user.location.street.name}</p>
              </div>
            </div>
          `;

          userListContainer.appendChild(userCard);
        });
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  });
 

  document.addEventListener('DOMContentLoaded', function () {
    const bitcoinInfoElement = document.getElementById('bitcoin-info');

    fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
      .then(response => response.json())
      .then(data => {
        const bitcoinPriceUSD = data.bpi.USD.rate;
        const time = data.time.updated;

        // Crear elementos para la información
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('mt-3');

        const timeElement = document.createElement('p');
        timeElement.innerHTML = `<strong>Fecha y hora:</strong> ${time}`;

        const priceElement = document.createElement('p');
        priceElement.innerHTML = `<strong>Precio actual del Bitcoin en USD:</strong> <span class="bitcoin-info">${bitcoinPriceUSD}</span>`;

        // Agregar elementos al contenedor
        infoContainer.appendChild(timeElement);
        infoContainer.appendChild(priceElement);

        // Agregar contenedor al elemento principal
        bitcoinInfoElement.appendChild(infoContainer);
      })
      .catch(error => {
        console.error('Error al obtener el precio del Bitcoin:', error);
        bitcoinInfoElement.innerHTML = '<p class="error-message">No se pudo obtener el precio del Bitcoin.</p>';
      });
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    const city = 'Puebla'; // Ciudad
    const country = 'Mexico'; // País

    const sunInfo = document.getElementById('sun-info');

    fetch(`https://api.sunrise-sunset.org/json?formatted=0&lat=19.0414&lng=-98.2063&date=today`)
      .then(response => response.json())
      .then(data => {
        const sunrise = new Date(data.results.sunrise).toLocaleTimeString();
        const sunset = new Date(data.results.sunset).toLocaleTimeString();
        const dayLength = new Date(data.results.day_length * 1000).toISOString().substr(11, 8);

        const sunDetails = `
          <tr>
            <td><strong>Salida del sol:</strong></td>
            <td>${sunrise}</td>
          </tr>
          <tr>
            <td><strong>Puesta del sol:</strong></td>
            <td>${sunset}</td>
          </tr>
          <tr>
            <td><strong>Duración del día:</strong></td>
            <td>${dayLength}</td>
          </tr>
        `;
        sunInfo.innerHTML = sunDetails;
      })
      .catch(error => {
        console.error('Error al obtener datos de salida y puesta del sol:', error);
        sunInfo.innerHTML = '<tr><td colspan="2">No se pudo obtener los datos de salida y puesta del sol.</td></tr>';
      });
  });

}


