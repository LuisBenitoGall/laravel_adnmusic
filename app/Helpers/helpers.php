<?php
namespace App\Helpers;

class Helpers{

	public static function convertFecha($fecha, $hora = false){
		$partes = explode(' ', $fecha);
		$p = explode('-', $partes[0]);

		$newfecha = $p[2].'-'.$p[1].'-'.$p[0];
		if($hora){
			$newfecha .= ' '.$partes[1];
		}
		return $newfecha;	
	}

}