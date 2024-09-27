let chemicals = [];
const tableBody = document.getElementById('chemicalBody');
let selectedRowIndex = -1; 

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        chemicals = data;
        renderTable();
    });

function renderTable() {
    tableBody.innerHTML = '';
    chemicals.forEach((chemical, index) => {
        const row = `<tr onclick="selectRow(${index})">
            <td>${chemical.id}</td>
            <td>${chemical.name}</td>
            <td>${chemical.vendor}</td>
            <td>${chemical.density}</td>
            <td>${chemical.viscosity}</td>
            <td>${chemical.packaging}</td>
            <td>${chemical.packSize}</td>
            <td>${chemical.unit}</td>
            <td>${chemical.quantity}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}


function selectRow(index) {
    const rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.backgroundColor = (i === index) ? '#e9ecef' : ''; 
    }
    selectedRowIndex = index; 
}


document.getElementById('addRow').addEventListener('click', () => {
    const newId = chemicals.length + 1; 
    const newChemical = {
        id: newId,
        name: prompt("Enter Chemical Name:"),
        vendor: prompt("Enter Vendor:"),
        density: parseFloat(prompt("Enter Density:")),
        viscosity: parseFloat(prompt("Enter Viscosity:")),
        packaging: prompt("Enter Packaging:"),
        packSize: prompt("Enter Pack Size:"),
        unit: prompt("Enter Unit:"),
        quantity: parseInt(prompt("Enter Quantity:")),
    };
    chemicals.push(newChemical);
    renderTable();
});


document.getElementById('moveUp').addEventListener('click', () => {
    if (selectedRowIndex > 0) {
        [chemicals[selectedRowIndex], chemicals[selectedRowIndex - 1]] = [chemicals[selectedRowIndex - 1], chemicals[selectedRowIndex]];
        selectedRowIndex--;
        renderTable();
    }
});


document.getElementById('moveDown').addEventListener('click', () => {
    if (selectedRowIndex < chemicals.length - 1 && selectedRowIndex !== -1) {
        [chemicals[selectedRowIndex], chemicals[selectedRowIndex + 1]] = [chemicals[selectedRowIndex + 1], chemicals[selectedRowIndex]];
        selectedRowIndex++;
        renderTable();
    }
});


document.getElementById('deleteRow').addEventListener('click', () => {
    if (selectedRowIndex !== -1) {
        chemicals.splice(selectedRowIndex, 1); 
        selectedRowIndex = -1; 
        renderTable();
    }
});


document.getElementById('refresh').addEventListener('click', () => {
    renderTable(); 
});


document.getElementById('save').addEventListener('click', () => {
    const dataStr = JSON.stringify(chemicals, null, 2); 
    console.log("Saved Data:", dataStr); 
    alert('Data saved to console. Check the console for details.');
});
