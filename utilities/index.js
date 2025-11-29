

import invModel from "../models/inventory-model.js";

/* NAVIGATION BUILDER */
async function getNav() {
  let data = await invModel.getClassifications();
  let list = '<ul>';
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += `<li><a href="/inventory/classification/${row.classification_name}" 
        title="See our inventory of ${row.classification_name} vehicles">
        ${row.classification_name}</a></li>`;
  });
  list += '</ul>';
  return list;
}

/* CLASSIFICATION GRID */
function buildClassificationGrid(data) {
  let grid = '<div class="vehicle-grid">';
  data.forEach((vehicle) => {
    grid += `
      <div class="vehicle-item">
        <a href="/inventory/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <h3>
          <a href="/inventory/detail/${vehicle.inv_id}">
            ${vehicle.inv_make} ${vehicle.inv_model}
          </a>
        </h3>
        <span>$${new Intl.NumberFormat().format(vehicle.inv_price)}</span>
      </div>
    `;
  });
  grid += '</div>';
  return grid;
}

/* VEHICLE DETAIL PAGE BUILDER */
function buildVehicleDetailHTML(vehicle) {
  return `
    <div class="detail-container">
      <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
      <div class="detail-info">
        <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p class="price-tag">$${new Intl.NumberFormat().format(vehicle.inv_price)}</p>
        <p>Mileage: ${vehicle.inv_miles.toLocaleString()} miles</p>
        <p>Color: ${vehicle.inv_color}</p>
        <p>${vehicle.inv_description}</p>
      </div>
    </div>
  `;
}

/* CLASSIFICATION SELECT LIST (for add-inventory form) */
async function buildClassificationList(classification_id = null) {
  let data = await invModel.getClassifications();
  let select = `<select name="classification_id" id="classificationList" required>`;
  select += `<option value="">Choose a Classification</option>`;

  data.rows.forEach((row) => {
    select += `<option value="${row.classification_id}" 
      ${classification_id == row.classification_id ? "selected" : ""}>
      ${row.classification_name}
    </option>`;
  });

  select += "</select>";
  return select;
}

/* ERROR HANDLER WRAPPER */
function handleErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

export default {
  getNav,
  buildClassificationGrid,
  buildVehicleDetailHTML,
  buildClassificationList,
  handleErrors
};


