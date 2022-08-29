<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiIncidentsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//GET Routes
Route::get('all', 'ApiIncidentsController@getAllIncidents');
Route::get('find/{id}','ApiIncidentsController@getIncident');

//POST Routes
Route::post('create','ApiIncidentsController@createIncident');
Route::post('update/{id}','ApiIncidentsController@updateIncident');
Route::post('delete/{id}','ApiIncidentsController@deleteIncident');


