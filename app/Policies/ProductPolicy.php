<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\Admin;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ProductPolicy
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
    public function view(Admin $user, Product $product): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Admin $user): bool
    {
        return ($user->can('Create Product'));
    }
    /**
     * Determine whether the user can store models.
     */
    public function store(Admin $user): bool
    {
        return ($user->can('Create Product'));
    }

    /**
     * Determine whether the user can edit models.
     */
    public function edit(Admin $user): bool
    {
        return ($user->can('Edit Product'));
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Admin $user, Product $product): bool
    {
        return ($user->can('Edit Product'));
    }
    /**
     * Determine whether the user can clone the model.
     */
    public function clone(Admin $user, Product $product): bool
    {
        return ($user->can('Clone Product'));
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Admin $user, Product $product): bool
    {
        return ($user->can('Delete Product'));
    }
}
