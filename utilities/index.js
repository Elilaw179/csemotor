const utilities = {};


utilities.getNav = async function () {
  // returning minimal nav to inject in views if desired
  return `
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/inventory/classification/Custom">Custom</a></li>
        <li><a href="/inventory/classification/Sedan">Sedan</a></li>
        <li><a href="/inventory/classification/SUV">SUV</a></li>
        <li><a href="/inventory/classification/Truck">Truck</a></li>
      </ul>
    </nav>`;
};


utilities.buildVehicleDetailHTML = function (vehicle) {
  const price = Number(vehicle.inv_price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const miles = Number(vehicle.inv_miles).toLocaleString("en-US");

  // Use full-size image URL in inv_image
  return `
    <section id="vehicle-detail" class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${vehicle.inv_image}" alt="${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}">
      </div>

      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p class="price">${price}</p>

        <ul class="vehicle-meta">
          <li><strong>Mileage:</strong> ${miles} miles</li>
          <li><strong>Color:</strong> ${vehicle.inv_color || "Unknown"}</li>
        </ul>

        <div class="vehicle-description">
          <h3>Description</h3>
          <p>${vehicle.inv_description || "No description provided."}</p>
        </div>
      </div>
    </section>
  `;
};

/**
 * Error handling wrapper for async route handlers
 */
utilities.handleErrors = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default utilities;
