$.ajax({
    url: "https://data.cityofnewyork.us/api/views/jb7j-dtam/rows.json?accessType=DOWNLOAD",
    data: {
        format: "json"
    },
    success: function (response) {
        console.log('jQuery $.ajax():');
        console.log(response);
        console.log(response.data);
    }
});

$.get("https://data.cityofnewyork.us/api/views/jb7j-dtam/rows.json?accessType=DOWNLOAD", function(response) {
    console.log('jQuery $.get():');
    console.log(response);
    console.log(response.data);
});

fetch("https://data.cityofnewyork.us/api/views/jb7j-dtam/rows.json?accessType=DOWNLOAD")
.then(function(response) {
    console.log('Fetch response object: \n');
    console.log(response);
    return(response.json());
})
.then(function(json) {
    console.log('Fetch: \n');
    console.log(json);
    console.log(json.data);
});