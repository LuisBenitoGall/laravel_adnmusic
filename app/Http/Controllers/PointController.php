<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Point;

class PointController extends Controller{
	public function __construct(){
        $this->middleware('auth');
    }

    public function store(Request $request, $song_id, $points){
    	if($request->ajax()){ 
    		//Comprobamos si existe la puntuación:
    		$points_saved = Point::select('id', 'points')
    		->where('song_id', $song_id)
    		->where('user_id', Auth::user()->id)
    		->first();

    		if($points_saved){
    			$points_saved->points = $points;
    			$points_saved->save();

    		}else{
    			$p = new Point();
    			$p->song_id = $song_id;
    			$p->user_id = Auth::user()->id;
    			$p->points = $points;
    			$p->save();
    		}
    	}	
    }
}

