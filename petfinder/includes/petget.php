<?php


//Petfinder key: c7452e442de15b804ecd198b0d96d57f

//http://api.petfinder.com/pet.find?key=c7452e442de15b804ecd198b0d96d57f&location=32407

//http://api.petfinder.com/shelter.get?key=c7452e442de15b804ecd198b0d96d57f&id=FL668


	$animal = $_POST['animal'];
	$size = $_POST['size'];
	$sex = $_POST['sex'];
//	$shelterid = $_POST['shelter'];
	$location = $_POST['location'];
	$age = $_POST['age'];
	
	
	$data = json_decode($_POST['counter']);

	$url = "http://api.petfinder.com/pet.find?key=c7452e442de15b804ecd198b0d96d57f&output=full&location=".$location."&animal=".$animal;

	
//	$url = "http://api.petfinder.com/pet.getRandom?key=c7452e442de15b804ecd198b0d96d57f&output=full&shelterid=".$shelterid."&animal=".$animal;
	
	if($age != "none"){
		$url .= "&age=".$age;	
	}
	
	if ($size != "none"){
		$url .= "&size=".$size;
	}
	
	if($sex != "none"){
		$url .= "&sex=".$sex;	
	}
	
	//$url = "http://api.petfinder.com/pet.getRandom?key=c7452e442de15b804ecd198b0d96d57f&output=full&location=". $zipcode."&animal=".$animal."&size=".$size."&sex=".$sex;
	
	//$url = "http://api.petfinder.com/pet.getRandom?key=c7452e442de15b804ecd198b0d96d57f&output=full&shelterid=".$shelterid."&animal=".$animal."&size=".$size."&sex=".$sex;
	
	$resultsXMLFile = $url;
	$resultsData = simplexml_load_file($resultsXMLFile);
	
	$resultsData->asXML("../data/results.xml");
	$xmlFile = "../data/results.xml";
	
	$xml = simplexml_load_file($xmlFile);
	
	$petid = $xml->pets[0]->pet[$data]->id;
	
	$peturl = "http://api.petfinder.com/pet.get?key=c7452e442de15b804ecd198b0d96d57f&id=".$petid;
	
	$petXMLFile = $peturl; 
   	$petData = simplexml_load_file($petXMLFile);
	
	
	
    //store them locally as xml
    $petData->asXML("../data/petdata.xml");
	$xmlFile = "../data/petdata.xml";

	$xml = simplexml_load_file($xmlFile);
	
	$shelterid = $xml->pet[0]->shelterId;

	$result = "good";
	
	
		
		//if failed to grab pet, do it again, 
		//if(!isset($xml->pet[0])){
			/*			
			$petXMLFile = $url; 
   			$petData = simplexml_load_file($petXMLFile);
	
    		//store them locally as xml
    		$petData->asXML("../data/petdata.xml");
			$xmlFile = "../data/petdata.xml";
			$xml = simplexml_load_file($xmlFile);
			*/
		/*	
			$result = "error";

		} */

$result = "good";
	
	$shelterURL = "http://api.petfinder.com/shelter.get?key=c7452e442de15b804ecd198b0d96d57f&id=".$shelterid;
	$shelterXMLFile = $shelterURL;
	$shelterData = simplexml_load_file($shelterXMLFile);
	
	$shelterData->asXML("../data/shelterdata.xml");
	$shelterxmlFile = "../data/shelterdata.xml";
	
	$shelterxml = simplexml_load_file($shelterXMLFile);
	
	
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