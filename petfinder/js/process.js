// JavaScript Document

$(document).ready(function(){
	"use strict";

	//submitting zipcode
	$("#location").submit(function(event){
		var zipcode = $("#zip").val();
		var zipcodeRE = /\d{5}/;
		
		
		//var animal = $("#animal").val();
		//var size = $("#size").val();
		//var sex = $("#sex").val();
		
		//console.log(animal);
		//console.log(size);
		//console.log(sex);
		
		//zipcode regex check
		if(zipcode.match(zipcodeRE)){
			event.preventDefault();
			
			var formData = {
				'zipcode'	: $("#zip").val(),
				'animal'	: $("#animal").val(),
				'size'		: $("#size").val(),
				'sex'		: $("#sex").val(),
			};
			
			console.log(formData);
			
			//calls the pet data
			$.ajax({
				type: "POST",
				url: "includes/petget.php",
				data: formData,
				success: function(){
					alert("meow");
				}
			});
				
		console.log(zipcode);
		event.preventDefault();

		}

	});

});