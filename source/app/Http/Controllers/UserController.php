<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserUpdateRequest;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
           'user' => Auth::user()
        ]);
    }

    /**
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function allUsers() :JsonResponse
    {
//        $this->authorize('viewAny', User::class);
        return response()->json(User::all());
    }

    public function user(User $user): JsonResponse
    {
//        $this->authorize('viewAny', $user);
        return response()->json($user);
    }

    public function updateRole(User $user, UserUpdateRequest $request): JsonResponse
    {
        $user->syncRoles(...collect($request->get('roles'))->map(fn($scope) => $scope['name']));
        $user->syncPermissions(...collect($request->get('scopes'))->map(fn($scope) => $scope['name']));
        return response()->json($user);
    }
}
