function processAndDownloadCSV() {
    const inputArea = document.getElementById('inputArea');
    const maxRowInput = document.getElementById('maxRowsInput');
    
    const inputContent = inputArea.value.trim();
    if (inputContent) {
        const maxRows = maxRowInput.value; // Maximum number of rows per column
        const rows = createCSVRows(inputContent, maxRows);
        const csvContent = rows.join('\n');
        downloadCSV(csvContent);
    } else {
        alert('Please enter CSV data in the textarea.');
    }
}

function createCSVRows(inputContent, maxRows) {
    const items = inputContent.split(/\r?\n/);
    const rows = Array(maxRows).fill('');
    items.forEach((item, index) => {
        rows[index % maxRows] += (rows[index % maxRows] ? ',' : '') + item;

        // if text starts with undefined remote it
        if (rows[index % maxRows].startsWith('undefined')) {
            rows[index % maxRows] = rows[index % maxRows].replace('undefined', '');
        }
    });

    console.log(rows)

    return rows;
}

function downloadCSV(csvContent) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'processed_data.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
