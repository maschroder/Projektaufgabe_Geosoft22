async function main(){
  const mountains = await getMountain();
  fillTable(mountains);
}

/**
* @desc get Mountains
* @desc fetches all Mountains from server
*/
async function getMountain(){
  const response = await fetch('/gebirge').then(
    response => response.json()
  ).then(data => {
    return data
  }).catch((error) => {
    console.error('Error:', error);
  });;
  return response;
}

/**
* @desc fill table
* @param data Featurecollection fetched from server
*/
function fillTable(data){
  const tableBody = document.getElementById("tableBody");
  let tableHTML = ""

  for(gebirge of data.features){
    tableHTML += `
    <tr>
    <td>${gebirge.properties.name}</td>
    <td>${gebirge.geometry.coordinates[1]}, ${gebirge.geometry.coordinates[0]}</td>
    <td>${gebirge.properties.hoehe}</td>
    <td>${gebirge.properties.url}</td>
    <td>${gebirge.properties.beschreibung}</td>
    <td>${gebirge._id}</td>
    <td><input type="checkbox" name="deleteID" value="${gebirge._id}"></td>
    </tr>
    `
  }

  tableBody.innerHTML = tableHTML;
}

/**
* @desc look at table and submit the delete request
*/
async function submitData(){
  const tableRows = document.getElementsByName("deleteID");

  let toDelete = [];

  for(row of tableRows){
    if(row.checked){
      toDelete.push(row.value);
    }
  }

  const formData = new FormData();
  formData.append('ids', toDelete);

  let redirect = await fetch('/gebirge', {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ids: toDelete})
  })
  //reload to update
  location.reload(true);
}
