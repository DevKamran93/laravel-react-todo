<?php

namespace App\Listeners;

use App\Events\TodoCompleted;
use App\Mail\TodoCompletedMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendTodoCompletedEmail implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(TodoCompleted $event): void
    {
        $todo = $event->todo;

        if($todo->user && $todo->user->email){
            Mail::to($todo->user->email)->send(new TodoCompletedMail($todo));
        }
    }
}
