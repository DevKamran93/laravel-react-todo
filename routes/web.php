<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    // })->name('dashboard');
    // Route::resource('dashboard', DashboardController::class);
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard')
        ->middleware(['auth', 'verified']);

    // Todo
    Route::resource('/todos',TodoController::class);
    Route::put('todos/{todo}/toggle', [TodoController::class, 'toggle'])->name('todos.toggle');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
