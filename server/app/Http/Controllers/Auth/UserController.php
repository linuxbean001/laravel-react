<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
//use JWTAuth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;

class UserController extends Controller
{   

    public function register(Request $request)
    {
        $validator = Validator::make($request->json()->all() , [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6', 
            'contact' => 'required|string|max:255',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'name' => $request->json()->get('name'),
            'username' => $request->json()->get('username'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
            'contact' => $request->json()->get('contact'),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user','token'),201);
    }
    
    public function login(Request $request)
    {
        $credentials = $request->json()->all();

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json( compact('token') );
    }

    public function update(Request $request, $id)
{
$user = User::findOrFail($id);
$user->update($request->all());

$token = JWTAuth::fromUser($user);

return response()->json(compact('user','token'),200);
}


public function user_profile(Request $request, $id)
{
$user = User::findOrFail($id);
$token = JWTAuth::fromUser($user);

return response()->json(compact('user','token'),200);
}

public function user_list(Request $request)
{
$users = User::all();
return $users;
}

public function delete(Request $request, $id)
{
$user = User::findOrFail($id);
$user->delete();

return response()->json(['status' => 'Deleted Successfully']);
}


public function register_many(Request $requests)
{
$requestArray = array();
for($i=0; $i<10; $i++){ 
if($requests[$i]['email']==''){
break;
} 
$validator = Validator::make($requests[$i] , [
'name' => 'required|string|max:255',
'username' => 'required|string|max:255',
'email' => 'required|string|email|max:255|unique:users',
'password' => 'required|string|min:6', 
'contact' => 'required|string|max:255',
]);
if($validator->fails()){
$requestArray[$requests[$i]['email']] = response()->json($validator->errors()->toJson(), 400);
continue;
}

$user = User::create([
'name' => $requests[$i]['name'],
'username' => $requests[$i]['username'],
'email' => $requests[$i]['email'],
'password' => Hash::make($requests[$i]['password']),
'contact' => $requests[$i]['contact'],
]);
$token = JWTAuth::fromUser($user);
} 
return $requestArray;
}
    

    public function getAuthenticatedUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }

}
