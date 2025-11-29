document.addEventListener("DOMContentLoaded", () => {
  // classification form
  const clsForm = document.getElementById("addClassificationForm");
  if (clsForm) {
    clsForm.addEventListener("submit", (e) => {
      const input = document.getElementById("classification_name");
      const pattern = /^[A-Za-z0-9_]+$/;
      if (!pattern.test(input.value.trim())) {
        e.preventDefault();
        alert("Classification must not contain spaces or special characters.");
        input.focus();
      }
    });
  }

  // inventory form - basic checks
  const invForm = document.getElementById("addInventoryForm");
  if (invForm) {
    invForm.addEventListener("submit", (e) => {
      const required = ["inv_make","inv_model","inv_year","inv_price","inv_miles","inv_color","inv_image","inv_thumbnail","inv_description"];
      for (let id of required) {
        const el = document.getElementById(id);
        if (!el || el.value.trim() === "") {
          e.preventDefault();
          alert("Please fill out the required fields.");
          el && el.focus();
          return;
        }
      }
      // year sanity
      const year = Number(document.getElementById("inv_year").value);
      if (isNaN(year) || year < 1900 || year > (new Date()).getFullYear()+1) {
        e.preventDefault();
        alert("Please provide a valid year.");
        document.getElementById("inv_year").focus();
      }
    });
  }
});
