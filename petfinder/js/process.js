// JavaScript Document

	var petArray = [];
	var counter = 0;

$(document).ready(function(){
	"use strict";

	$("#hideNseek").click(function(){
		
		$("#animalData").toggle();
		$("#liked").toggle();
		
		if($("#yes").css("visibility") === "hidden"){
			$("#yes").css("visibility", "visible");
			$("#no").css("visibility", "visible");
		}
		
		else{ 
			$("#yes").css("visibility", "hidden");
			$("#no").css("visibility", "hidden");
		}
	});

	$("#pets").submit(function(event){
		event.preventDefault();
		var submitvalue;
		submitvalue = $(document.activeElement).val();
		console.log(submitvalue);
		
		if($("#liked").css("display") === "block"){
			$("#liked").css("display", "none");	
		}
		
		if($("#animalData").css("display") === "none"){
			$("#animalData").css("display", "block");	
		}
		
		if (submitvalue === "YES"){
			likedPet();
			var acc = document.getElementsByClassName("accordion");
			var i;

			for (i = 0; i < acc.length; i++) {
    			acc[i].onclick = function(){
        			this.classList.toggle("active");
        			this.nextElementSibling.classList.toggle("show");
  				};
			}
			
			$("#hideNseek").css("visibility", "visible");
		}
		
		$("#loading").css("visibility","visible");
		$("#animalData").css("visibility", "hidden");
		event.preventDefault();

		//when selecting both, randomly choose either cat or dog
		var animal = $("#animal").val();
		if (animal === "both"){

			//deciding cat or dog
			var randNumAnimal = getRandomIntInclusive(0,1);			

			if (randNumAnimal === 1){
				animal = "cat";
			}

			else{
				animal = "dog";	
			}
		}

		var randNumShelter;
		var shelter;

		if (animal === "cat"){
			//shelters w cats	
			randNumShelter = getRandomIntInclusive(0, 6);
		}

		else {
			//shelters w dogs
			randNumShelter = getRandomIntInclusive(2, 8);	
		}

		//setting shelterID
		switch (randNumShelter) {
			//0 - 1 cat shelters
			case 0:
				//It's All About Cats Inc.
				shelter = "FL512";
				break;
			case 1:
				//Aristocats Inc.
				shelter = "FL912";
				break;
			//2 - 6 shelters w cats and dogs	
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
			//7 - 8 dogs only
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
			'shelter'	: shelter,
			'animal'	: animal,
			'size'		: $("#size").val(),
			'sex'		: $("#sex").val(),
		};

		console.log(formData);
		
		ajaxCalls(formData);


		$("#yes").css("visibility", "visible");
		$("#no").css("visibility", "visible");
		
		
		console.log(petArray);
		
	});
	
});

function getRandomIntInclusive(min, max) {
	"use strict";
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initMap(lat, long) {
	"use strict";	
	var map;									
     map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: lat, lng: long},
       	zoom: 15
});

	 var marker = new google.maps.Marker({
   		position: {lat: lat, lng: long},
    	map: map,
    	title: 'Hello World!'
  	});
}


function ajaxCalls(formData){
	"use strict";
	//var petId;
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
						console.log("second ajax code");
						$("#loading").css("visibility","hidden");
						$("#animalData").css("visibility", "visible");
						$("#breedD").empty();
						$("#optionD").empty();
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
							//console.log(petArray);


							//displaying info
							name = $(xml).find("name").first().text();
							animal = $(xml).find("animal").first().text();
							
							var breedholder;
							breedholder = $(xml).find("breed").each(function(index){
								breed[index] = $(this).text();
								index++;
							});
							
							age = $(xml).find("age").first().text();
							sex = $(xml).find("sex").first().text();
							if(sex === "M"){
								sex = "Male";	
							}
						
							else if(sex === "F"){
								sex = "Female";	
							}
							
							else{ 
								sex = "";
							}

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

							else if(size ==="XL"){
								size = "Extra Large";	
							}
							
							else {
								size = " ";
							}
							
							var optionholder;
							optionholder = $(xml).find("option").each(function(index){
								option[index] = $(this).text();
								index++;
							});
							
							var holder;
							for( var optCount=0; optCount < option.length; optCount++){
								
								holder = option[optCount];
								
								switch (holder) {
									
									case "altered":
										holder = "Spayed / Neutered";
										option[optCount] = holder;
										break;
									case "noClaws":
										holder = "No Claws";
										option[optCount] = holder;
										break;
									case "hasShots":
										holder = "Has Current Shots";
										option[optCount] = holder;
										break;
									case "housebroken":
										holder = "Housebroken";
										option[optCount] = holder;
										break;
									case "noCats":
										holder = "Not Good With Cats";
										option[optCount] = holder;
										break;
									case "noDogs":
										holder = "Not Good With Dogs";
										option[optCount] = holder;
										break;
									case "noKids":
										holder = "Not Good With Kids";
										option[optCount] = holder;
										break;
									case "specialNeeds":
										holder = "Has Special Needs";
										option[optCount] = holder;
										break;
									default:
										holder = " ";
										option[optCount] = holder;

								}
								
							}
							
							
							//need to check if this is empty	
							description = $(xml).find("description").first().text();

							photo = $(xml).find("photo[size=pn]").first().text();
							var photosrc;
							
							if (photo !== " ") {
								photosrc = photo;
							}
							
							//console.log(photosrc);
							
							$("#photoD").attr("src", photosrc);
  
							$("#nameD").html(name);
							$("#animalD").html(animal);
  
							$("#nameD").html(name);
							$("#animalD").html(animal);
							
							
							var counttemp = $(breed).length;
							for ( var i=0; i < counttemp; i++){
									$("#breedD").append("<li>"+breed[i]+"</li>");
							}
						
							$("#ageD").html(age);
							$("#sexD").html(sex);
							$("#sizeD").html(size);
							
							var optiontemp = $(option).length;
							for ( var o=0; o < optiontemp; o++){
									$("#optionD").append("<li>"+option[o]+"</li>");
							}
							
							
							$("#descriptionD").html(description);
							

						}
  					
							//shelter data
							$.ajax({
								type: "GET",
								url: "data/shelterdata.xml",
								dataType: "xml",
								success: function(xml){
									var lat;
									var long;
									
									var shelter;
									var shelteremail;
									var shelterphone;
									
									shelter = $(xml).find("name").first().text();
									shelteremail = $(xml).find("email").first().text();
									shelterphone = $(xml).find("phone").first().text();
									
									$("#shelterName").html(shelter);
									$("#shelterEmail").html(shelteremail);
									$("#shelterPhone").html(shelterphone);
									
									lat = $(xml).find("latitude").first().text();
									long = $(xml).find("longitude").first().text();
									
									lat = parseFloat(lat);
									long = parseFloat(long);
									
									//geocode the addresses, don't use lat long, they're bullshit
									
									initMap(lat,long);
								}
							});
							
							
							//distance data
							$.ajax({
								type: "GET",
								url: "data/distancedata.xml",
								dataType: "xml",
								success: function(xml){
									var distance;
									
									distance = $(xml).find("text").eq(1).text();
						
									$("#distanceD").html("This animal is "+distance+" away!");

								}
							});
					}
				});
				
			}
	});					
}	

function likedPet(){
	"use strict";
	
	var likedname = $("#nameD").text();
		
	var likedanimal = $("#animalD").text();	
	var likedbreed = $("#breedD").html();
	var likedage = $("#ageD").text();
	var likedsex = $("#sexD").text();
	var likedsize = $("#sizeD").text();
	var likedoption = $("#optionD").html();
	var likeddescription = $("#descriptionD").text();
	var likedphoto = $("#photoD").attr("src");
	
	var likedshelter = $("#shelterName").text();
	var likedemail = $("#shelterEmail").text();
	var likedphone = $("#shelterPhone").text();
	
	var newAccordionDiv = document.createElement("div");
	newAccordionDiv.className = "accordion";
	newAccordionDiv.innerHTML = likedname;
	var newAccordionContent = document.createElement("div");
	newAccordionContent.className = "panel";
	
	var newAccordionPetInfo = document.createElement("div");
	newAccordionPetInfo.className = "likedInfo";
	
	var newAccordionShelterInfo = document.createElement("div");
	newAccordionShelterInfo.className = "likedShelter";
	
	newAccordionPetInfo.innerHTML = "<p>Animal: "+likedanimal+"</p><ul>Breed: "+likedbreed+"</ul><p>Age: "+likedage+"</p><p>Sex: "+likedsex+"</p><p>Size: "+likedsize+"</p><ul>More Info: "+likedoption+"</ul><p>Description: "+likeddescription+"</p><img class = 'accordionimage' src='"+likedphoto+"'>";
	
	newAccordionShelterInfo.innerHTML = "<p>Organization: "+likedshelter+"</p><p>Email: "+likedemail+"</p><p>Phone: "+likedphone+"</p>";
	
	newAccordionContent.appendChild(newAccordionPetInfo);
	newAccordionContent.appendChild(newAccordionShelterInfo);
					
	$("#liked").append(newAccordionDiv, newAccordionContent);
}