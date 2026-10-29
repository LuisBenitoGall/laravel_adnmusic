<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('home');
});*/

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');

// LOGOUT:
Route::get('logout', 'Auth\LoginController@logout', function () {
    return abort(404);
});

Route::get('ranking', 'HomeController@ranking')->name('ranking');

Route::get('upload', 'SongController@create')->name('upload');
Route::post('upload', 'SongController@store')->name('upload');

Route::get('top-list', 'SongController@topList')->name('top-list');

Route::get('add-points/{song_id}/{points}', 'PointController@store')->name('add-points');

Route::get('mi-area', 'UserController@index')->name('mi-area');