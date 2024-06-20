<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class FreePlayController extends Controller
{
    public function index() {

        $quizzes = Quiz::inRandomOrder()->limit(10)->get();

        return response()->json([
            'quizzes' => $quizzes,
        ]);

    }
}
