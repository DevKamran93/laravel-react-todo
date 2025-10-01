<?php

namespace Tests;

use Tests\CreatesApplication;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    //
    use CreatesApplication, RefreshDatabase;


    protected function setUp(): void
    {
        parent::setUp();
        // dd(app()->environment(), config('database.default'));

        if (! app()->environment('testing')) {
            exit('❌ Tests aborted: not in testing environment');
        }
    }
}
