<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

class Song extends Model{

    //Puntos de la canción por usuario:
    public function getUserPoints($id){
    	$points = Point::where('song_id', $id)
    	->where('user_id', Auth::user()->id)
    	->sum('points');

    	return $points;
    }
}
