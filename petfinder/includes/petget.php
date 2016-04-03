<?php



// http://api.petfinder.com/petfinderPetRecordList?key=c7452e442de15b804ecd198b0d96d57f&location=32407

//Petfinder key: c7452e442de15b804ecd198b0d96d57f

//http://api.petfinder.com/pet.find?key=c7452e442de15b804ecd198b0d96d57f&location=32407

//http://api.petfinder.com/shelter.get?key=c7452e442de15b804ecd198b0d96d57f&id=FL668


	$zipcode = intval($_POST['zipcode']);
	
	//echo $zipcode;
	
	$url = "http://api.petfinder.com/pet.find?key=c7452e442de15b804ecd198b0d96d57f&location=". $zipcode;
	$petXMLFile = $url; 
   	$petData = simplexml_load_file($petXMLFile);
	
    //store them locally as xml
    $petData->asXML("../data/petdata.xml");
	$xmlFile = "../data/petdata.xml";

	$xml = simplexml_load_file($xmlFile);

?>