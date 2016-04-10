// JavaScript Document

$(document).ready(function(){
	"use strict";

	//to keep track of pets they have seen already,
	var petArray = [];
	var counter = 0;

	//submitting zipcode
	$("#pets").submit(function(event){

		$("#loading").css("visibility","visible");
		//var zipcode = $("#zip").val();
		//var zipcodeRE = /\d{5}/;

		//zipcode regex check
		//if(zipcode.match(zipcodeRE)){
		event.preventDefault();

		//when selecting both, randomly choose either cat or dog
		var animal = $("#animal").val();

		if (animal === "both"){

			//deciding cat or dog
			var randNumAnimal = getRandomIntInclusive(0,1);
			console.log(randNumAnimal);				

			if (randNumAnimal === 1){
				animal = "cat";
			}

			else{
				animal = "dog";	
			}

		}

		var randNumShelter;
		console.log(randNumShelter);
		var shelter;

		if (animal === "cat"){
			//shelters w cats	
			randNumShelter = getRandomIntInclusive(0, 6);
			console.log(randNumShelter);
		}

		else {
			//shelters w dogs
			randNumShelter = getRandomIntInclusive(2, 8);
			console.log(randNumShelter);	
		}

		//setting shelterID
		switch (randNumShelter) {
			case 0:
				//It's All About Cats Inc.
				shelter = "FL512";
				break;
			case 1:
				//Aristocats Inc.
				shelter = "FL912";
				break;
			case 2:
				//Ruff World Animal Rescue
				shelter = "FL887";
				break;
			case 3:
				//Seminole County Animal Services
				shelter = "FL306";
				break;
			case 4:
				//Orange County Animal Services
				shelter = "FL275";
				break;
			case 5:
				//Pet Alliance of Greater Orlando
				shelter = "FL1397";
				break;
			case 6:
				//Pet Rescue By Judy
				shelter = "FL189";
				break;
			case 7:
				//LovevLoaves Sanctuary
				shelter = "FL1171";
				break;
			case 8:
				//Sniffing Snouts Pit Bull Rescue
				shelter = "FL1067";
				break;	
			default:
				shelter = "FL275";
		}



		var formData = {
			'zipcode'	: $("#zip").val(),
			'shelter'	: shelter,
			'animal'	: animal,
			'size'		: $("#size").val(),
			'sex'		: $("#sex").val(),
		};

		console.log(formData);

		//sends and sets pet data
		
		$.ajax({
			type: "POST",
			url: "includes/petget.php",
			data: formData,
			success: function(){
				console.log("first ajax call success");

				//get the pet data
				$.ajax({
					type: "GET",
					url: "data/petdata.xml",
					dataType: "xml",
					success: function(xml){
						$("#loading").css("visibility","hidden");
						var error;

						var petId;

						var name;
						var animal;
						var breed = [];
						var age;
						var sex;
						var size;
						var option = [];
						var description;
						var photo;

						//checking if xml had any errors
						error = $(xml).find("code").first().text();
						if(error !== "100"){
							$("#error").html("There appears to be an error, sorry!");
						}

						//if not, then this
						else{
							console.log("2nd ajax success!");

							//petIds for the session are put into an array, this will be accessed later when users wish to see which pets they have liked
							petId = $(xml).find("id").first().text();
							petArray[counter] = petId;
							counter++;
							console.log(petArray);


							//displaying info
							name = $(xml).find("name").first().text();
							animal = $(xml).find("animal").first().text();
							//breed
							age = $(xml).find("age").first().text();
							sex = $(xml).find("sex").first().text();
							if(sex === "M"){
								sex = "Male";	
							}
							
							if(sex === "F"){
								sex = "Female";	
							}
							
							else{ sex = "no data"; }

							size = $(xml).find("size").first().text();
							if(size === "S"){
								size = "Small";	
							}

							else if(size === "M"){
								size = "Medium";	
							}

							else if(size === "L"){
								size = "Large";	
							}

							else if(size==="XL"){
								size = "Extra Large";	
							}
							
							else { size = "no data"; }

							//option

							//need to check if this is empty	
							description = $(xml).find("description").first().text();

							//photo
  
							$("#nameD").html(name);
							$("#animalD").html(animal);
							//breed
							$("#ageD").html(age);
							$("#sexD").html(sex);
							$("#sizeD").html(size);
							$("#descriptionD").html(description);
  
						}
					}

				});
			}

		});
	});
});

function getRandomIntInclusive(min, max) {
	"use strict";
	return Math.floor(Math.random() * (max - min + 1)) + min;
}