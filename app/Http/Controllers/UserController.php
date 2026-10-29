<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\Point;
use App\Song;

class UserController extends Controller{
	public function __construct(){
        $this->middleware('auth');
    }

    public function index(){
    	$songs = Point::select(
        DB::raw('(SELECT SUM(p.points) FROM points AS p WHERE p.song_id = songs.id
            ) AS Puntos'),
        'songs.*'
        )
        ->join('songs', 'points.song_id', '=', 'songs.id')
        ->where('songs.user_id' , Auth::user()->id)
        ->groupBy('songs.id')
        ->orderBy('Puntos', 'Desc')
        ->get();

    	return view('web.user.index')->with(compact('songs'));
    }	
}
