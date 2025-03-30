import { useState, useEffect, useCallback } from "react";
import UserAPI from "../api/UserAPI";
import { useParams } from "react-router-dom";

export default function SelectUser({ assignedUsersId, data, setData }: any) {
  const [users, setUsers] = useState<any[]>([]);
  const [clickedUsers, setClickedUsers] = useState<any[]>([]);
  const { getCollaborators, getUserById } = UserAPI();
  const { timetableId } = useParams<{ timetableId: string }>();

  const fetchUsers = useCallback(async () => {
    try {
      const tempAssignedUsers: any[] = [];
      const responseUsers = await getCollaborators(Number(timetableId));

      const assignedUsersPromises = assignedUsersId.map(
        async (userId: number) => {
          const responseClicked = await getUserById(userId);
          return (responseClicked as { data: any }).data;
        }
      );

      const resolvedAssignedUsers = await Promise.all(assignedUsersPromises);

      resolvedAssignedUsers.forEach((user) => {
        tempAssignedUsers.push(user);
      });

      const filteredUsers = responseUsers.data.filter(
        (user: any) =>
          !tempAssignedUsers.some(
            (assignedUser) => assignedUser.user_id === user.user_id
          )
      );

      setUsers(filteredUsers);
      setClickedUsers(tempAssignedUsers);
    } catch (error) {
      return error;
    }
  }, []);

  const handleClickUser = (user: any) => {
    if (clickedUsers.includes(user)) return;
    const newClickedUsers = [...clickedUsers, user];
    setUsers(users.filter((u) => u !== user));
    setClickedUsers(newClickedUsers);
    setData({
      ...data,
      assignedUsersId: newClickedUsers.map((u) => u.user_id),
    });
  };

  const handleClikUserSecond = (user: any) => {
    if (!clickedUsers.includes(user)) return;
    setUsers([...users, user]);
    const newClickedUsers = clickedUsers.filter((item) => item !== user);
    setClickedUsers(newClickedUsers);
    setData({
      ...data,
      assignedUsersId: newClickedUsers.map((u) => u.user_id),
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []); //[data]

  return (
    <section>
      {users.length > 0 && (
        <div className="mt-4">
          <p>Dostępni użytkownicy</p>
          <div className="bg-green-400 flex flex-wrap">
            {users.map((user: any) => {
              return (
                <div
                  onClick={() => handleClickUser(user)}
                  className="p-2 m-2 bg-gray-300 special-event-card"
                  key={user.user_id}>
                  <p>{user.nickname}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {clickedUsers.length > 0 && (
        <div className="mt-4">
          <p>Przypisani użytkownicy</p>
          <div className="bg-red-400 flex flex-wrap">
            {clickedUsers.map((user: any) => {
              return (
                <div
                  onClick={() => handleClikUserSecond(user)}
                  className="p-2 m-2 bg-gray-300 special-event-card"
                  key={user.user_id}>
                  <p>{user.nickname}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
