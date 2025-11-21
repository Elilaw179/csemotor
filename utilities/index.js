

const utilities = {};

utilities.getNav = async function () {
  return `
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/inventory/classification/Custom">Custom</a></li>
        <li><a href="/inventory/classification/Sedan">Sedan</a></li>
        <li><a href="/inventory/classification/Sport">Sport</a></li>
        <li><a href="/inventory/classification/SUV">SUV</a></li>
        <li><a href="/inventory/classification/Truck">Truck</a></li>
      </ul>
    </nav>`;
};




utilities.buildClassificationGrid = (vehicles) => {
  let html = `<div class="vehicle-grid">`;

  vehicles.forEach(vehicle => {
    html += `
      <div class="vehicle-item">
        <a href="/inventory/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
          <h3>${vehicle.inv_make} ${vehicle.inv_model}</h3>
        </a>
        <p>$${new Intl.NumberFormat().format(vehicle.inv_price)}</p>
      </div>
    `;
  });

  html += `</div>`;
  return html;
};


utilities.buildVehicleDetailHTML = (vehicle) => {
  return `
    <div class="detail-container">
      <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">

      <div class="detail-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>

        <p class="price-tag">Price: $${new Intl.NumberFormat().format(vehicle.inv_price)}</p>

        <p><strong>Miles:</strong> ${new Intl.NumberFormat().format(vehicle.inv_miles)}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>

        <p><strong>Description:</strong></p>
        <p>${vehicle.inv_description}</p>
      </div>
    </div>
  `;
};


utilities.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default utilities;
