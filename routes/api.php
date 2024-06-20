<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\FreePlayController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function() {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/admin', function (Request $request) {
        return $request->user();
    });


    Route::get('/admin/users', [UserController::class, 'index']);

    Route::get('/admin/quizzes', [QuizController::class, 'index']);

    Route::post('/admin/quizzes/create', [QuizController::class, 'store']);

    Route::delete('/admin/quizzes/{quiz}/delete', [QuizController::class, 'destroy']);


    Route::get('/adminlogout', [AdminAuthController::class, 'logout' ]);

    Route::get('/logout', [UserAuthController::class, 'logout' ]);

    Route::get('/admin', function (Request $request) {
        return $request->user();
    });
});


Route::post('/adminlogin', [AdminAuthController::class, 'login' ]);

Route::post('/userlogin', [UserAuthController::class, 'login' ]);

Route::get('/play', [FreePlayController::class, 'index']);

