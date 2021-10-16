<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Requests\Users\UpdateProfileRequest;
use App\Http\Responses\SucceededResponse;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProfileRequest $request)
    {
        $this->userService->updateProfile(Auth::user()->id, $request->validated());
        return new SucceededResponse([], "Successfully updated profile");
    }


    public function updateRole(User $user, UserUpdateRequest $request): JsonResponse
    {
        $user->syncRoles(...collect($request->get('roles'))->map(fn($scope) => $scope['name']));
        $user->syncPermissions(...collect($request->get('scopes'))->map(fn($scope) => $scope['name']));
        return response()->json($user);
    }
}
