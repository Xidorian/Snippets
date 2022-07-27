const urlParams = new URLSearchParams(window.location.search);
const fund = urlParams.get('fund');

/******* OR *******/

const getUrlVars = () => {
  let vars = {};
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
};

// Sets a select to url param value
// get all url parameters
const urlParams = new URLSearchParams(window.location.search);
// checks if fund exists before running code change fund to whatever the correct parameter is
if (urlParams.has('fund')) {
  // Get url fund parameter value
  const fund = urlParams.get('fund');
  const fundSelect = document.getElementById('single_designee');
  
  if (fundSelect.querySelector(`option[value='${fund}']`)) {
  // Check SELECT GIFT DESIGNATION checkbox change
  document.getElementById('single_designee_designated').click();
  // Select fund
    fundSelect.value = fund;
  }
}
