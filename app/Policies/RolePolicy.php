<?php

namespace App\Policies;

use App\Models\Role;
use App\Models\Admin;
use Illuminate\Auth\Access\Response;

class RolePolicy
{
    use HandlesAuthorization;
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Admin $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Admin $user, Role $role): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Admin $user): bool
    {
        return ($user->can('Role'));
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Admin $user, Role $role): bool
    {
        return ($user->can('Role'));
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Admin $user, Role $role): bool
    {
        return ($user->can('Role'));
    }
}
