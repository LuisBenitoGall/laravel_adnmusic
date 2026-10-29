<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Song;
use App\Point;

class HomeController extends Controller{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(){
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(){
        $songs = Song::select('songs.*', 'users.name AS User')
        ->join('users', 'songs.user_id', '=', 'users.id')
        ->whereDate('songs.created_at', Carbon::today())
        ->get();

        //dd($songs);

        return view('home')->with(compact('songs'));
    }

    /**
     * Ranking:
     */
    public function ranking(){
        $today = date('Y-m-d');

        $prevDate = Point::select('created_at')
        ->whereDate('created_at', '<', $today)
        ->orderBy('created_at', 'DESC')
        ->first();
        $p = explode(' ', $prevDate->created_at);
        $yesterday = $p[0];

        $partes = explode('-', $yesterday);
        $ayer = is_array($partes)? $partes[2].'/'.$partes[1].'/'.$partes[0]:'';

        $prevRanking = Point::select(
            DB::raw('(SELECT SUM(P.points) FROM points AS P
                JOIN songs AS S
                ON P.song_id = S.id
                WHERE S.user_id = users.id 
                AND S.created_at LIKE "'.$yesterday.' %") AS Points'),
            'users.name AS User'
        )
        ->join('songs', 'points.song_id', '=', 'songs.id')
        ->join('users', 'songs.user_id', '=', 'users.id')
        ->whereDate('songs.created_at', $yesterday)
        ->orderBy('Points', 'DESC')
        ->groupBy('users.id')
        ->get();

        $dailyRanking = Point::select(
            DB::raw('(SELECT SUM(P.points) FROM points AS P
                JOIN songs AS S
                ON P.song_id = S.id
                WHERE S.user_id = users.id 
                AND S.created_at LIKE "'.$today.' %") AS Points'),
            'users.name AS User'
        )
        ->join('songs', 'points.song_id', '=', 'songs.id')
        ->join('users', 'songs.user_id', '=', 'users.id')
        ->whereDate('songs.created_at', $today)
        ->orderBy('Points', 'DESC')
        ->groupBy('users.id')
        ->get();

        $absoluteRanking = Point::select(
            DB::raw('(SELECT SUM(P.points) FROM points AS P
                JOIN songs AS S
                ON P.song_id = S.id
                WHERE S.user_id = users.id ) AS Points'),
            'users.name AS User'
        )
        ->join('songs', 'points.song_id', '=', 'songs.id')
        ->join('users', 'songs.user_id', '=', 'users.id')
        ->orderBy('Points', 'DESC')
        ->groupBy('users.id')
        ->get();

        return view('ranking')->with(compact('ayer', 'prevRanking', 'dailyRanking', 'absoluteRanking'));    
    }
}
