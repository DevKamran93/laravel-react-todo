<?php

use App\Models\User;
use App\Models\Todo;
use function Pest\Laravel\{actingAs, post, assertDatabaseHas, withoutMiddleware};

it('creates a todo successfully', function () {
    $user = User::factory()->create();
    $this->withoutMiddleware();
    $response = $this->actingAs($user)->postJson('/todos', [
        'title'       => 'Learn Pest Testing',
        'description' => 'First pest-powered todo',
        'alert'       => false,
        'completed'   => false,
    ]);

    $response->assertStatus(200);

    assertDatabaseHas('todos', [
        'title'   => 'Learn Pest Testing',
        'user_id' => $user->id,
    ]);
});
