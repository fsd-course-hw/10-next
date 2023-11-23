import { UiCetnerContentLayout } from "@/shared/ui/layouts/ui-center-content-layout";
import {
  CreateUserForm,
  UsersList,
  useUsersListAblity,
} from "@/features/users-list";

export function UsersPage() {
  const usersListAbility = useUsersListAblity();
  return (
    <UiCetnerContentLayout className="py-10">
      <h1 className="text-3xl">Пользователи</h1>
      {usersListAbility.can("create", "User") && (
        <>
          <h2 className="text-lg mb-2 font-semibold mt-10">
            Добавить пользователя
          </h2>
          <CreateUserForm />
        </>
      )}
      <h2 className="text-lg mb-2 font-semibold mt-10">Все пользователи</h2>
      <UsersList />
    </UiCetnerContentLayout>
  );
}
