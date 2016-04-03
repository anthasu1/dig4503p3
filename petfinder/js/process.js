// JavaScript Document

$(document).ready(function(){
	"use strict";

	//submitting zipcode
	$("#location").submit(function(event){
		var zipcode = $("#zip").val();
		var zipcodeRE = /\d{5}/;

		
		//zipcode regex check
		if(zipcode.match(zipcodeRE)){
			event.preventDefault();
			
			//calls the weather data
			$.ajax({
				type: "POST",
				url: "includes/petget.php",
				data: "zipcode="+zipcode,
				success: function(){
					alert("meow");
				}
			});
				
		console.log(zipcode);
		event.preventDefault();

		}

	});

});