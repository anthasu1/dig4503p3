<?php


//Petfinder key: c7452e442de15b804ecd198b0d96d57f

//http://api.petfinder.com/pet.find?key=c7452e442de15b804ecd198b0d96d57f&location=32407

//http://api.petfinder.com/shelter.get?key=c7452e442de15b804ecd198b0d96d57f&id=FL668


	//$zipcode = $_POST['zipcode'];
	$animal = $_POST['animal'];
	$size = $_POST['size'];
	$sex = $_POST['sex'];
	$shelterid = $_POST['shelter'];
	
	$url = "http://api.petfinder.com/pet.getRandom?key=c7452e442de15b804ecd198b0d96d57f&output=full&shelterid=".$shelterid."&animal=".$animal;
	
	if ($size != "none"){
		$url .= "&size=".$size;
	}
	
	if($sex != "none"){
		$url .= "&sex=".$sex;	
	}
	
	//$url = "http://api.petfinder.com/pet.getRandom?key=c7452e442de15b804ecd198b0d96d57f&output=full&location=". $zipcode."&animal=".$animal."&size=".$size."&sex=".$sex;
	
	//$url = "http://api.petfinder.com/pet.getRandom?key=c7452e442de15b804ecd198b0d96d57f&output=full&shelterid=".$shelterid."&animal=".$animal."&size=".$size."&sex=".$sex;
	$petXMLFile = $url; 
   	$petData = simplexml_load_file($petXMLFile);
	
    //store them locally as xml
    $petData->asXML("../data/petdata.xml");
	$xmlFile = "../data/petdata.xml";

	$xml = simplexml_load_file($xmlFile);

		
			
		//if failed to grab pet, do it again, 
		if(!isset($xml->pet[0])){
			$petXMLFile = $url; 
   			$petData = simplexml_load_file($petXMLFile);
	
    		//store them locally as xml
    		$petData->asXML("../data/petdata.xml");
			$xmlFile = "../data/petdata.xml";
		}


?>