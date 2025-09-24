<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Todo;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all todos (or filter by user_id if auth later)
        $todos = Todo::orderBy('created_at', 'desc')->get();

        // Send todos to Inertia page
        return Inertia::render('todos/index', [
            'todos' => $todos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'alert'       => 'boolean',
            'alert_at'    => 'nullable|date|required_if:alert,true',
            'completed'   => 'boolean',
        ], [
            'required_if' => 'Alert Date & Time is required when Alert is Enabled.'
        ]);

        Todo::create([
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? null,
            'alert'       => $validated['alert'] ?? false,
            // 🔑 Always parse and save as UTC
            'alert_at'    => $validated['alert_at']
                ? Carbon::parse($validated['alert_at'])->utc()
                : null,
            'completed'   => $validated['completed'] ?? false,
            'user_id'     => Auth::id(),
        ]);

        return redirect()->route('todos.index')
            ->with('success', 'Todo created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'alert'       => 'boolean',
            'alert_at'    => 'nullable|date|required_if:alert,true',
            'completed'   => 'boolean',
        ], [
            'required_if' => 'Alert Date & Time is required when Alert is Enabled.'
        ]);

        $alert_at = $validated['alert']
            ? (!empty($validated['alert_at'])
                ? Carbon::parse($validated['alert_at'])->utc()
                : null)
            : null;


        $todo->update([
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? null,
            'alert'       => $validated['alert'] ?? false,
            'alert_at'    => $alert_at,
            'completed'   => $validated['completed'] ?? false,
        ]);

        return redirect()->route('todos.index')
            ->with('success', 'Todo updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        // Ensure the authenticated user owns this todo
        if ($todo->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        // Soft delete the todo
        $todo->delete();

        // Return flash message + redirect back
        return redirect()
            ->route('todos.index')
            ->with('success', 'Todo deleted successfully.');
    }

    public function toggle(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'completed' => 'required|boolean',
        ]);

        $todo->update([
            'completed' => $validated['completed'],
        ]);

        // If it's an Inertia request, just redirect back with partial reload
        return back()->with('success', 'Todo status updated.');
    }
}
