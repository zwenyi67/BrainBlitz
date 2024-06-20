<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function index() {
        $quizzes = Quiz::latest()->get();

        return response()->json([
            'quizzes' => $quizzes,
        ]);
    }

    public function store(Request $request) {
        
        $data = $request->validate([
            'title' => 'required',
            'option1' => 'required',
            'option2' => 'required',
            'option3' => 'required',
            'option4' => 'required',
            'answer' => 'required',
            'difficulty' => 'required',
        ]);

        $quiz = Quiz::create($data);
    
        return response()->json([
            'message' => 'Quiz created successfully',
            'quiz' => $quiz,
        ]); 
    }

    public function destroy(Quiz $quiz) {

        $quiz->delete();

        return response()->json([
            'message' => 'Quiz deleted successfully',
        ]); 

    }
}
