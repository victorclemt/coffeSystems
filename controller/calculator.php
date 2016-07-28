<?php

/**
*
* Coffee Systems Prueba.
*
* @auth Victor Clemente
* @description  Calculadora con jquery de Prueba para ingresar al un buen 
*               trabajo.
* 
**/


$opr1 = $_REQUEST["opr1"];
$opr = $_REQUEST["opr"];
$opr2 = $_REQUEST["opr2"];

if($opr == "+"){
	$evaluate=$opr1 + $opr2;
} else if($opr == "-"){
	$evaluate=$opr1 - $opr2;

} else if($opr == "*"){
	$evaluate=$opr1 * $opr2;
} else if($opr == "/"){
	$evaluate=$opr1 / $opr2;
}
echo json_encode($evaluate);
