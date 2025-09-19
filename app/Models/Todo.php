<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Todo extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'alert',
        'alert_at',
        'completed',
        'user_id',
    ];

    // Cast booleans automatically
    protected $casts = [
        'alert'     => 'boolean',
        'completed' => 'boolean',
        // 'alert_at'  => 'datetime:d-M-Y h:i a',
        'alert_at'  => 'datetime',
        'created_at' => 'datetime:d-m-Y',
    ];

    protected $appends = ['alert_at_form'];

    /**
     * Mutator: Always store as Carbon (DB format)
     */
    public function setAlertAtAttribute($value)
    {
        $this->attributes['alert_at'] = $value ? Carbon::parse($value) : null;
    }

    /**
     * Accessor: Return in a human-readable format by default
     */
    public function getAlertAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->timezone(config('app.timezone'))->format('d-M-Y h:i a') : null;
    }

    /**
     * Accessor for forms: return value in `Y-m-d\TH:i` (datetime-local input format)
     */
    public function getAlertAtFormAttribute()
    {
        return $this->attributes['alert_at'] ? Carbon::parse($this->attributes['alert_at'])->timezone(config('app.timezone'))->format('Y-m-d\TH:i') : null;
    }

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
