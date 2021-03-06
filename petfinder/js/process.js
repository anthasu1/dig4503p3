// JavaScript Document
	var counter = 0;
	var offset = 0;
	
$(document).ready(function(){
	"use strict";
	
	$("#hideNseek").click(function(){
		$("#animalData").toggle();
		$("#liked").toggle();
		$("#pets").toggle();
		
		if($("#yes").css("visibility") === "hidden"){
			$("#yes").css("visibility", "visible");
			$("#no").css("visibility", "visible");
			$("#hideNseek").html("Click here to view your liked pets");
		}
		
		else{ 
			$("#yes").css("visibility", "hidden");
			$("#no").css("visibility", "hidden");
			$("#hideNseek").html("Click here to view more pets");
		}
	});

	$("#pets").submit(function(event){
		event.preventDefault();
		var submitvalue;
		submitvalue = $(document.activeElement).val();

		$("body").css("background-image", "url('img/pawseam2.png')");
		$("body").css("background-repeat", "repeat");
		$("body").css("background-size", "auto");
		$("body").css("background-color", "rgba(255, 255, 255, 0.5)");
		
		if($("#liked").css("display") === "block"){
			$("#liked").css("display", "none");	
		}
		
		if($("#animalData").css("display") === "none"){
			$("#animalData").css("display", "block");	
		}
		
		$("#errordiv").empty();
		
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
		
		
		//if form is resubmitted, reset counter
		if (submitvalue === "Submit"){
			counter = 0;	
		}
		
		$("#loading").css("visibility","visible");
		$("#animalData").css("visibility", "hidden");
		event.preventDefault();

		var formData = {
			'location'	: $("#location").val(),
			'animal'	: $("#animal").val(),
			'age'		: $("#age").val(),
			'size'		: $("#size").val(),
			'sex'		: $("#sex").val(),
			'counter'	: counter,
			'offset'	: offset
		};

		console.log(formData);
		
		ajaxCalls(formData);
		
	});
	
});

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
  	});
}

function ajaxCalls(formData){
	"use strict";
	$.ajax({
			type: "POST",
			url: "includes/petget.php",
			data: formData,
			dataType: "text",
			success: function(result){
				console.log(result);
				if(result === "error"){
					$("#loading").css("visibility", "hidden");
					$("#errordiv").html("<p>Sorry! It appears something went wrong, try again!</p>");
					console.log("bleh");
				}
				
				else{
				console.log("first ajax call success");
				$("#errordiv").empty();
	
				//get the pet data
				$.ajax({
					type: "GET",
					url: "data/petdata.xml",
					dataType: "xml",
					success: function(xml){
						console.log("second ajax code");
						$("#loading").css("visibility","hidden");
						$("#animalData").css("visibility", "visible");
						
						$("#yes").css("visibility", "visible");
						$("#no").css("visibility", "visible");
						
						$("#breedD").empty();
						$("#optionD").empty();
						var error;
						
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
							console.log("counter="+counter);
							counter++;
							
							if(counter === 24){
								counter = 0;
								offset = offset + 25;
							}

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
									case "housetrained":
										holder = "Housetrained";
										option[optCount] = holder;
										break;	
								}	
							}							
							
							//need to check if this is empty	
							description = $(xml).find("description").first().text();
							photo = $(xml).find("photo[size=pn]").first().text();
							var photosrc;
							
							if (photo !== " ") {
								photosrc = photo;
							}
							
							$("#photoD").attr("src", photosrc);
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
									var shelteraddress;
									var sheltercity;
									var shelterstate;
									
									shelter = $(xml).find("name").first().text();
									shelteraddress = $(xml).find("address1").first().text();
									sheltercity = $(xml).find("city").first().text();
									shelterstate = $(xml).find("state").first().text();
									shelteremail = $(xml).find("email").first().text();
									shelterphone = $(xml).find("phone").first().text();
									
									$("#shelterD").html(shelter);
									
									if (shelteraddress !== ""){
										$("#addressD").html(shelteraddress+", ");
									}
									$("#citystateD").html(sheltercity+", "+shelterstate);
									$("#emailD").html(shelteremail);
									$("#phoneD").html(shelterphone);
									
									lat = $(xml).find("latitude").first().text();
									long = $(xml).find("longitude").first().text();
									
									lat = parseFloat(lat);
									long = parseFloat(long);
									
									//lat long isn't v accurate, imo, but it's what is provided, and more often than not, addresses are PO Boxes, so eh
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
		}
	});					
}	

function likedPet(){
	"use strict";
	
	//takes info from page, throws it into liked div and tada
	
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
	var likedaddress = $("#addressD").text();
	var likedcitystate = $("#citystateD").text();
	var likedemail = $("#emailD").text();
	var likedphone = $("#phoneD").text();
	
	var newWrapperDiv = document.createElement("div");
	newWrapperDiv.className = "accordwrap";
	
	var newAccordionDiv = document.createElement("div");
	newAccordionDiv.className = "accordion";
	newAccordionDiv.innerHTML = likedname;
	var newAccordionContent = document.createElement("div");
	newAccordionContent.className = "panel";
	
	var newAccordionPetInfo = document.createElement("div");
	newAccordionPetInfo.className = "likedInfo";
	
	var newAccordionShelterInfo = document.createElement("div");
	newAccordionShelterInfo.className = "likedShelter";
	
	var closebtn = document.createElement("button");
	closebtn.className = "close";
	closebtn.innerHTML = "Remove from likes";
	closebtn.setAttribute("onclick", "this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);");
	
	var PetInfoHTML = document.createElement("div");
	PetInfoHTML.innerHTML = "<div class='col1'><img class = 'accordionimage' src='"+likedphoto+"'><br><h4>Contact Information</h4><p>"+likedshelter+"</p><p>"+likedaddress+likedcitystate+"</p><p>"+likedemail+"</p><p>"+likedphone+"</p></div>";
	var PetInfoHTML2 = document.createElement("div");
	PetInfoHTML2.innerHTML = "<br><br><div class='col2'><p><h4>Animal:</h4> "+likedanimal+"</p><ul><h4>Breed:</h4> "+likedbreed+"</ul><p><h4>Age:</h4> "+likedage+"</p><p><h4>Sex:</h4> "+likedsex+"</p><p><h4>Size:</h4> "+likedsize+"</p><ul><h4>More Info:</h4> "+likedoption+"</ul><p><h4>Description:</h4> "+likeddescription+"</p></div>";
	
	newAccordionPetInfo.appendChild(PetInfoHTML);
	newAccordionPetInfo.appendChild(closebtn);
	newAccordionPetInfo.appendChild(PetInfoHTML2);
	newAccordionContent.appendChild(newAccordionPetInfo);
	newAccordionContent.appendChild(newAccordionShelterInfo);
					
	newWrapperDiv.appendChild(newAccordionDiv);
	newWrapperDiv.appendChild(newAccordionContent);
					
	$("#liked").append(newWrapperDiv);
}