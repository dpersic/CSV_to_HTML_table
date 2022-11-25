$(document).ready(function(){
    $('#load_data').click(function(){
     $.ajax({
      url:"my.csv",
      dataType:"text",
      success:function(data)
      {
        //delete all " before use
       var csv_data = data.replace(/"/g, "");
       var data_csv = csv_data.split(/\r\n|\n/);
       var table_data = '<table class="table table-bordered table-striped">';
       for(var count = 0; count<data_csv.length; count++)
       {
        //separator
        var cell_data = data_csv[count].split(",");
        table_data += '<tr>';
        for(var cell_count=0; cell_count<cell_data.length; cell_count++)
        {
         if(count === 0)
         {
          table_data += '<th>'+cell_data[cell_count]+'</th>';
         }
         else
         {
          table_data += '<td>'+cell_data[cell_count]+'</td>';
         }
        }
        table_data += '</tr>';
       }
       table_data += '</table>';
       $('#html_table').html(table_data);    
      }
     });
    });
   });

function tableFilter() {
     var input, filter, table, tr, td, cell, i, j;
     input = document.getElementById("myInput");
     filter = input.value.toUpperCase();
     table = document.getElementById("html_table");
     tr = table.getElementsByTagName("tr");
     for (i = 1; i < tr.length; i++) {
       tr[i].style.display = "none";
       td = tr[i].getElementsByTagName("td");
       for (var j = 0; j < td.length; j++) {
         cell = tr[i].getElementsByTagName("td")[j];
         if (cell) {
           if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
             tr[i].style.display = "";
             break;
           } 
         }
       }
     }
   }
   
function tableToCSV() {
    // Variable to store the final csv data
    var csv_data = [];
    // Get each row data
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        // Get each column data
        var cols = rows[i].querySelectorAll('td,th');
        // Stores each csv row data
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {
            // Get the text data of each cell
            // of a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }
        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }
    // Combine each row data with new line character
    csv_data = csv_data.join('\n');
    // Call this function to download csv file 
    downloadCSVFile(csv_data);
   }
   
function downloadCSVFile(csv_data) {
    CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });
    var temp_link = document.createElement('a');
    temp_link.download = "GfG.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
   
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
}
function CSVtoArray(text) {
    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
    // Return NULL if input string is not well formed CSV string.
    if (!re_valid.test(text)) return null;
    var a = [];                     // Initialize array to receive values.
    text.replace(re_value, // "Walk" the string using replace with callback.
        function(m0, m1, m2, m3) {
            // Remove backslash from \' in single quoted values.
            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return ''; // Return empty string.
        });
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push('');
    return a;
};