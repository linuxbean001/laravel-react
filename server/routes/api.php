<?php

use Illuminate\Http\Request;

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

// Route::post('register', 'UserController@register');
// Route::post('login', 'UserController@login');
// Route::get('profile', 'UserController@getAuthenticatedUser');
Route::post('register', 'UserController@register');
Route::post('register_many', 'UserController@register_many');
Route::post('login', 'UserController@login');
Route::put('update/{id}', 'UserController@update');
Route::delete('delete/{id}', 'UserController@delete');
// Route::get('profile', 'UserController@getAuthenticatedUser');
Route::get('user_profile/{id}', 'UserController@user_profile');
Route::get('user_list', 'UserController@user_list');
Route::post('register_many', 'UserController@register_many');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});