{{-- <x-mail::message>
# Introduction

The body of your message.

<x-mail::button :url="''">
Button Text
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message> --}}

@component('mail::message')
# Todo Completed ✅

The todo **{{ $todo->title }}** has been marked as completed.

@if($todo->description)
**Description:**
{{ $todo->description }}
@endif

@component('mail::button', ['url' => url("/todos/{$todo->id}")])
View Todo
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
