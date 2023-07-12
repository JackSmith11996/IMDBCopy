

//function to get the information from the URL and store it in a variable
function getFilm(allFilms){
	
	ajaxResult("http://localhost:8080/FilmAPI/FilmAPIController", allFilms);
}

document.addEventListener("DOMContentLoaded", function(){
    getFilm('films');
});
//function to get the datatype and send it to the format function to send to the API to get the correct format
function changeFilm(allFilms){
	var format = document.getElementById('data-type').value;
	
	if (format == "application/json"){
		
		ajaxResultFormats("http://localhost:8080/FilmAPI/FilmAPIController", allFilms);
		
	}
	else if(format == "application/xml"){
		
		ajaxResultFormats("http://localhost:8080/FilmAPI/FilmAPIController", allFilms);
	}
	else if (format == "text/plain"){
		
		ajaxResultFormats("http://localhost:8080/FilmAPI/FilmAPIController", allFilms);
	}
	
}
document.addEventListener("DOMContentLoaded", function(){
    changeFilm('films')
    });
//function to send the data in the correct format to the post function
function addFilm(output) {


	var format = document.getElementById('data-type').value;

	var title = document.getElementById("Title").value;
	var year = document.getElementById("Year").value;
	var star = document.getElementById("Mstar").value;
	var review = document.getElementById("Rev").value;
	var director = document.getElementById("Dir").value;
	var output

	if (format == "applicaton/json") {
		out = {
		title: title,
		year: year,
		star: star,
		review: review,
		director: director
		};
		
		var output = JSON.stringify(out);
		ajaxResultPost("http://localhost:8080/FilmAPI/FilmAPIController",output);
		
	}
	else if (format == "application/xml") {
		
		var output = "<film><title>"+title+"</title><year>" +year+"</year><stars>"+star+"</stars><review>"
				+review+"</review><director>"+director+"</director></film>";
		
		ajaxResultPost("http://localhost:8080/FilmAPI/FilmAPIController",output);
		
	}
	else if(format == "text/plain"){
		
		var output = "title=" + title + "; year=" + year + "; director=" + director + "; review=" + review + "; stars=" + star;
		ajaxResultPost("http://localhost:8080/FilmAPI/FilmAPIController",output);
	}
	else {
		var out =
				{
				"title": title,
				"year": year,
				"stars": star,
				"review": review,
				"director": director
		};

	output = JSON.stringify(out);
	ajaxResultPost("http://localhost:8080/FilmAPI/FilmAPIController", output);
	}
	
}
//function to store the data in correct object to send to the API
	function updateFilm(event) {
	var format = document.getElementById("data-type").value;
	var filmID = event.target.dataset.id;
	var title = document.getElementById("Titles").value;
	var year = document.getElementById("Years").value;
	var star = document.getElementById("Mstars").value;
	var review = document.getElementById("Revs").value;
	var director = document.getElementById("Dirs").value;

	if (format =="application/json"){ 
	var input =
			{
				"id": filmID,
				"title": title,
				"year": year,
				"stars": star,
				"review": review,
				"director": director
				
		};
		var allInputs = JSON.stringify(input);
		ajaxResultPut("http://localhost:8080/FilmAPI/FilmAPIController", allInputs);
	}
	else if(format == "application/xml"){
	
	var input = "<film><id>"+filmID+"</id><title>"+ title+"</title><year>" +year+"</year><stars>"+star+"</stars><review>"
				+review+"</review><director>"+director+"</director></film>";
		
		ajaxResultPut("http://localhost:8080/FilmAPI/FilmAPIController", input);
	}
	else if(format == "text/plain"){
		
		var input = "id="+filmID+"; title=" + title + "; year=" + year + "; director=" + director + "; review=" + review + "; stars=" + star;
		ajaxResultPut("http://localhost:8080/FilmAPI/FilmAPIController",input);
	}
	else {
		var input =
			{
				"id": filmID,
				"title": title,
				"year": year,
				"stars": star,
				"review": review,
				"director": director
				
		};
		var allInputs = JSON.stringify(input);
	
	ajaxResultPut("http://localhost:8080/FilmAPI/FilmAPIController", allInputs);
}}
//function to get the ID in the correct object and send it to the API 
	function deleteFilm(event) {
	var filmID = event.target.dataset.id;
	var format = document.getElementById("data-type").value;
	if(format == "applcation/json"){
		var DeleteFilm = {"id": filmID }
		var Del = JSON.stringify(DeleteFilm)
		ajaxResultDelete("http://localhost:8080/FilmAPI/FilmAPIController", Del);
	}
	else if(format == "application/xml"){
		
		var deleted = "<film><id>"+filmID+"</id></film>";
		ajaxResultDelete("http://localhost:8080/FilmAPI/FilmAPIController", deleted);		
	}
	else if (format == "text/plain"){
	
		var deleted = "id="+filmID;
		ajaxResultDelete("http://localhost:8080/FilmAPI/FilmAPIController", deleted);
	
	}
	else{
		
		var DeleteFilm = {"id": filmID }
		var Del = JSON.stringify(DeleteFilm)
		ajaxResultDelete("http://localhost:8080/FilmAPI/FilmAPIController", Del);
		
	}
	
	
}
