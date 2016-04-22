<?php
//Petfinder key: c7452e442de15b804ecd198b0d96d57f

	//form data
	$animal = $_POST['animal'];
	$size = $_POST['size'];
	$sex = $_POST['sex'];
	$location = $_POST['location'];
	$age = $_POST['age'];
	$offset = $_POST['offset'];
	
	$count = json_decode($_POST['counter']);
	
	//if counter is 24, set an offset for results and reset counter
	$countcheck = $count % 24;

	if ($countcheck === 0){
			$offset = $offset + 25;
			$count = 0;
	}

	//if count is 0, ask for search results
	if ($count === 0){

		$url = "http://api.petfinder.com/pet.find?key=c7452e442de15b804ecd198b0d96d57f&output=full&location=".$location."&animal=".$animal;
	
		if($age != "none"){
			$url .= "&age=".$age;	
		}
	
		if ($size != "none"){
			$url .= "&size=".$size;
		}
	
		if($sex != "none"){
			$url .= "&sex=".$sex;	
		}
	
		$url .= "&offset=".$offset;
	
		$resultsXMLFile = $url;
		$resultsData = simplexml_load_file($resultsXMLFile);
		$resultsData->asXML("../data/results.xml");
	}
		
	$xmlFile = "../data/results.xml";
	$xml = simplexml_load_file($xmlFile);
	
	//check for error on results
	$result = $xml->header[0]->status[0]->code;
	if($result != 100){
		$result = "error";	
	}
	
	else{
		$result = "good";	
	}
	
	//find specific pet from results
	$petid = $xml->pets[0]->pet[$count]->id;
	$peturl = "http://api.petfinder.com/pet.get?key=c7452e442de15b804ecd198b0d96d57f&id=".$petid;
	$petXMLFile = $peturl; 
   	$petData = simplexml_load_file($petXMLFile);
    $petData->asXML("../data/petdata.xml");
	$xmlFile = "../data/petdata.xml";
	$xml = simplexml_load_file($xmlFile);
	
	//get shelter info
	$shelterid = $xml->pet[0]->shelterId;
	$shelterURL = "http://api.petfinder.com/shelter.get?key=c7452e442de15b804ecd198b0d96d57f&id=".$shelterid;
	$shelterXMLFile = $shelterURL;
	$shelterData = simplexml_load_file($shelterXMLFile);
	$shelterData->asXML("../data/shelterdata.xml");
	$shelterxmlFile = "../data/shelterdata.xml";
	$shelterxml = simplexml_load_file($shelterXMLFile);
	
	//get shelter address info to send to Google Maps and Distance Matrix APIs
	$address = $shelterxml->shelter[0]->address1;
	$city = $shelterxml->shelter[0]->city;
	$state = $shelterxml->shelter[0]->state;
	
	if((bool) $address){
		$distanceURL = "https://maps.googleapis.com/maps/api/distancematrix/xml?origins=".$location."&destinations=".$address.$city.$state."&language=en&units=imperial&key=AIzaSyCPvRG3VJQQg8CAaWzodc1Zv7lTuo0CJdQ";
	}
	
	else{
		$lat = 	$shelterxml->shelter[0]->latitude;
		$long = $shelterxml->shelter[0]->longitude;
		$distanceURL = "https://maps.googleapis.com/maps/api/distancematrix/xml?origins=".$location."&destinations=".$lat.",".$long."&language=en&units=imperial&key=AIzaSyCPvRG3VJQQg8CAaWzodc1Zv7lTuo0CJdQ";
	}

	$distanceXMLFile = $distanceURL;
	$distanceData = simplexml_load_file($distanceXMLFile);
	$distanceData->asXML("../data/distancedata.xml");
	
	print_r($result);

?>