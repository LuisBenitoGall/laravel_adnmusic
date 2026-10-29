<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

use App\Point;
use App\Song;

class SongController extends Controller{
	public function __construct(){
        $this->middleware('auth');
    }	

    //0. Validator:
    protected function validator(array $data){
        //Validación save:
        if(isset($data['submit_save'])){
            return Validator::make($data, [
                'link' => 'required|string|max:255|unique:songs,link,NULL,id,deleted_at,NULL'
            ],[
                'link.unique' => 'Este video ya existe'
            ]);

        //Validación update:
        }elseif(isset($data['submit_update'])){
            return Validator::make($data, [
                'link' => "required|string|max:255|unique:songs,link,".$data['id'].",id,deleted_at,NULL"
            ],[
                'link.unique' => 'Este video ya existe'
            ]);
        }
    } 

    public function create(){
    	//Comprobamos si el usuario ha subido ya una canción en el día:
    	$exist = Song::where('user_id', Auth::user()->id)
    	->whereDate('created_At', Carbon::today())
    	->first();

        return view('web.songs.create')->with(compact('exist'));
    }

    public function store(Request $request){
    	//dd($request->all());
		$validator = $this->validator($request->all());
        if($validator->fails()){
            //Redirección según el entorno:
            if($request->environment){
                return redirect('admin/companies/create')
                ->withErrors($validator)
                ->withInput();

            }else{
                return redirect('company-register')
                ->withErrors($validator)
                ->withInput();
            }
        }

        $p = explode('/', $request->link);
        $end = end($p);
        $p1 = explode('&', $end);
        $p2 = explode('=', $p1[0]);

        $song = new Song();
        $song->link = $p2[1];
        $song->user_id = Auth::user()->id;
        $song->save();

        return redirect()->route('home');

    }

    public function topList(){
        $songs = Point::select(
        DB::raw('(SELECT SUM(p.points) FROM points AS p WHERE p.song_id = songs.id
            ) AS Puntos'),
        'songs.*', 'users.name AS User'
        )
        ->join('songs', 'points.song_id', '=', 'songs.id')
        ->join('users', 'songs.user_id', '=', 'users.id')
        ->groupBy('songs.id')
        ->orderBy('Puntos', 'Desc')
        ->take(50)
        ->get();

        return view('web.songs.top_list')->with(compact('songs'));    
    }
}
