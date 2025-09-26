<?php

namespace App\Http\Controllers;

use App\Models\Dashboard;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::count();
        $totalTodos = Todo::count();
        $pendingTodos = Todo::where('completed', false)->count();
        $completedTodos = Todo::where('completed', true)->count();

        return Inertia::render('dashboard',[
            'stats' =>[
                'users' =>$users,
                'totalTodos' => $totalTodos,
                'pendingTodos' => $pendingTodos,
                'completedTodos' => $completedTodos
            ]
        ]);
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Dashboard $dashboard)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dashboard $dashboard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dashboard $dashboard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dashboard $dashboard)
    {
        //
    }
}
