// Get the browser-specific request object, either for
// Firefox, Safari, Opera, Mozilla, Netscape, or IE 7 (top entry);
// or for Internet Explorer 5 and 6 (bottom entry). 

function getRequestObject() {
	if (window.XMLHttpRequest) {
		return (new XMLHttpRequest());
	} else if (window.ActiveXObject) {
		return (new ActiveXObject("Microsoft.XMLHTTP"));
	} else {
		return (null);
	}
}

//Make an HTTP request to the given address. 
//Display result in an alert box.

function ajaxAlert(address) {
	var request = getRequestObject();
	request.onreadystatechange =
		function() { showResponseAlert(request); };
	request.open("GET", address, true);
	request.send(null);
}

//Put response text in alert box.

function showResponseAlert(request) {
	if ((request.readyState == 4) &&
		(request.status == 200)) {
		alert(request.responseText);
	}
}


// Make an HTTP request to the given address. 
// Display result in the HTML element that has given ID.

function ajaxResult(address, resultRegion) {
	var request = getRequestObject();
	request.onreadystatechange
		= function() { getMovies(request, resultRegion); }
	request.open("GET", address, true);
	request.send(null);
}

//Put response text in the HTML element that has given ID.

function showResponseText(request, resultRegion) {
	if ((request.readyState == 4) &&
		(request.status == 200)) {
		htmlInsert(resultRegion, request.responseText);
	}
}


//get function to get all data in JSON format and seperate the data by the right format
function getMovies(request, resultRegion) {
	if ((request.readyState == 4) && (request.status == 200)) {

		
		var allFilms = JSON.parse(request.responseText);
		$('#films').DataTable().destroy();
		var table = $('#films').DataTable();
		table.clear();
		
		
		

		for (let i = 0; i < allFilms.length; i++) {
			var id = allFilms[i].id;
			var title = allFilms[i].title;
			var year = allFilms[i].year;
			var star = allFilms[i].stars;
			var review = allFilms[i].review;
			var director = allFilms[i].director;
			var deleteB = '<button type="button" class = "delete" data-id="' + allFilms[i].id + '" onClick="deleteFilm(event)">X</button>';
			var updateF = 	'<form>'+
							'<label>Title:</label> <input type="text" value="' + allFilms[i].title + '" id="Titles">' +
							'<label>Year of Release:</label> <input type="number" value="' + allFilms[i].year + '" id="Years">' +
							'<label>Main Cast Member:</label> <input type="text" value="' + allFilms[i].stars + '" id="Mstars"> <br>' +
							'<label>Director of film:</label> <input type="text" value="' + allFilms[i].director + '" id="Dirs"> <br>'+
							'<label>Review:</label> <input type="text" value="' + allFilms[i].review + '" id="Revs"> <br>'+
							'<button type="button" data-id="' + allFilms[i].id + '" onClick="updateFilm(event)" id = "Edit">Edit</button>'
							+'</form>'
							table.row.add([
    title,
    year,
    director,
    star,
    review,
    updateF,
    deleteB,
    "<p hidden>" + id + "</p>",
]).draw();
		}
		
	}
}
//Function to get data in all formats and parse them in the correct format
function ajaxResultFormats(address, resultRegion) {
	var request = getRequestObject();
	request.onreadystatechange
		= function() { getAllMovies(request, resultRegion); }
	request.open("GET", address, true);
	var format = document.getElementById("data-type").value;
	request.setRequestHeader("Accept",format);
	request.send();
}
function getAllMovies(request) {
	if ((request.readyState == 4) && (request.status == 200)) {

		var format = document.getElementById("data-type").value;
		
		if (format == "application/json"){
		console.log(request.responseText);
		var allFilms = JSON.parse(request.responseText);
		$('#films').DataTable().destroy();
		var table = $('#films').DataTable();
		table.clear();
		for (let i = 0; i < allFilms.length; i++) {
			var id = allFilms[i].id;
			var title = allFilms[i].title;
			var year = allFilms[i].year;
			var star = allFilms[i].stars;
			var review = allFilms[i].review;
			var director = allFilms[i].director;
			var deleteB = '<button type="button" class = "delete" data-id="' + allFilms[i].id + '" onClick="deleteFilm(event)">X</button>';
			var updateF = 	'<form>'+
							'<label>Title:</label> <input type="text" value="' + allFilms[i].title + '" id="Titles">' +
							'<label>Year of Release:</label> <input type="number" value="' + allFilms[i].year + '" id="Years">' +
							'<label>Main Cast Member:</label> <input type="text" value="' + allFilms[i].stars + '" id="Mstars"> <br>' +
							'<label>Director of film:</label> <input type="text" value="' + allFilms[i].director + '" id="Dirs"> <br>'+
							'<label>Review:</label> <input type="text" value="' + allFilms[i].review + '" id="Revs"> <br>'+
							'<button type="button" data-id="' + allFilms[i].id + '" onClick="updateFilm(event)" id = "Edit">Edit</button>'
							+'</form>'
							table.row.add([
    title,
    year,
    director,
    star,
    review,
    updateF,
    deleteB,
    "<p hidden>" + id + "</p>",
]).draw();
				}
			
				}
		else if(format=="application/xml"){
			console.log(request.responseText);
			$('#films').DataTable().destroy();
			var table = $('#films').DataTable();
			table.clear();
			
			var parser = new DOMParser();
      		var allMovies = parser.parseFromString(request.responseText,"application/xml");
			var movies = allMovies.getElementsByTagName("film");
			
			for (var i = 0; i < movies.length; i++) {
  			var id = movies[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
  			var title = movies[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
  			var year = movies[i].getElementsByTagName("year")[0].childNodes[0].nodeValue;
  			var director = movies[i].getElementsByTagName("director")[0].childNodes[0].nodeValue;
  			var cast = movies[i].getElementsByTagName("stars")[0].childNodes[0].nodeValue;
  			var review = movies[i].getElementsByTagName("review")[0].childNodes[0].nodeValue;
  			var deleteB = '<button type="button" class = "delete" data-id="' + id + '" onClick="deleteFilm(event)">X</button>';
			var updateF = 	'<form>'+
							'<label>Title:</label> <input type="text" value="' + title + '" id="Titles">' +
							'<label>Year of Release:</label> <input type="number" value="' + year + '" id="Years">' +
							'<label>Main Cast Member:</label> <input type="text" value="' + cast + '" id="Mstars"> <br>' +
							'<label>Director of film:</label> <input type="text" value="' + director + '" id="Dirs"> <br>'+
							'<label>Review:</label> <input type="text" value="' + review + '" id="Revs"> <br>'+
							'<button type="button" data-id="' + id + '" onClick="updateFilm(event)" id = "Edit">Edit</button>'
							+'</form>'
								table.row.add([
    title,
    year,
    director,
    cast,
    review,
    updateF,
    deleteB,
    "<p hidden>" + id + "</p>",
]).draw();		
							
  				}
			
			
		}
		else if(format == "text/plain"){
			
			var rawData = request.responseText;
			$('#films').DataTable().destroy();
			var table = $('#films').DataTable();
			table.clear();
			console.log(rawData);
			var rowStrings = rawData.split(/[\n\r]+/);
			console.log(rowStrings);
			var splits = rowStrings[0].split("],");
			console.log(splits);
			var rows = new Array(splits.length-1);
			for (var i = 0; i < splits.length; i++) {
			rows[i] = splits[i].split("#");
			}
			for (var i = 0; i < rows.length; i++){
				for(var j = 0; j < rows[i].length; j++){
					var row = rows[i][j];
					var id = row.match(/id=([^,]+)/);
				if(id){
						id = id[1];
					}
				var review = row.match(/review=([^,]+)/);
				if(review){
					review = review[1];
				}
				var director = row.match(/director=([^,]+)/);
				if(director){
						director = director[1];
					}
				var year = row.match(/year=([^,]+)/);
				if(year){
						year = year[1];
					}
				var title = row.match(/title=([^,]+)/);
				if(title){
						title = title[1];
					}
				var stars = row.match(/stars=([^,]+)/);
				if(stars){
						stars = stars[1];
					}
					
				var deleteB = '<button type="button" class = "delete" data-id="' + id + '" onClick="deleteFilm(event)">X</button>';
				var updateF = 	'<form>'+
							'<label>Title:</label> <input type="text" value="' + title + '" id="Titles">' +
							'<label>Year of Release:</label> <input type="number" value="' + year + '" id="Years">' +
							'<label>Main Cast Member:</label> <input type="text" value="' + stars + '" id="Mstars"> <br>' +
							'<label>Director of film:</label> <input type="text" value="' + director + '" id="Dirs"> <br>'+
							'<label>Review:</label> <input type="text" value="' + review + '" id="Revs"> <br>'+
							'<button type="button" data-id="' + id + '" onClick="updateFilm(event)" id = "Edit">Edit</button>'
							+'</form>'
				
				table.row.add([
    
    title,
    year,
    director,
    stars,
    review,
    updateF,
    deleteB,
    "<p hidden>" + id + "</p>",
]).draw();

			}     		
		  }
		}
	}

}
//post function to send the data to the API with the correct header
	function ajaxResultPost(address, data, resultRegion) {
	var request = getRequestObject();
	request.onreadystatechange =
		function() {
			showResponseText(request,
			resultRegion);
		};
	request.open("POST", address, true);
	var format = document.getElementById("data-type").value;
	request.setRequestHeader("Content-Type",format);
	request.send(data);
	window.location.reload();
}

//delete function to send the ID to the API in different formats with correct headers
	function ajaxResultDelete(address, data, resultRegion) {
	var request = getRequestObject();
	request.onreadystatechange =
	function() {
	showResponseText(request,
	resultRegion);
		};
	request.open("DELETE", address, true);
	var format = document.getElementById("data-type").value;
	request.setRequestHeader("Content-Type",format);
	request.send(data);
	window.location.reload();
}

//put function to send the data to the API with the correct headers attached
	function ajaxResultPut(address, data, resultRegion) {
	var request = getRequestObject();
	request.onreadystatechange =
	function() {
	showResponseText(request,
	resultRegion);
		};
	request.open("PUT", address, true);
	var format = document.getElementById("data-type").value;
	request.setRequestHeader("Content-Type",format);
	request.send(data);
	window.location.reload();
}

// Insert the html data into the element that has the specified id.
	function htmlInsert(id, htmlData) {
	document.getElementById(id).innerHTML += htmlData;
}

	function getValue(id) {
	return (escape(document.getElementById(id).value));
}
//function to create the table to display the data from the get method
$(document).ready(function() {
  $('#films').DataTable({
    "paging": true,
    "pageLength": 5,
    columns: [
            { title: "Title" },
            { title: "Year" },
            { title: "Director" },
            { title: "Cast" },
            { title: "Review" },
            { title: "Update" },
            { title: "Delete" },
        ]
    
    
  });
});