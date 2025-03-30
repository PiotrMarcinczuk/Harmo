import { useState, memo } from "react";
import { type Collaborator } from "../interfaces/app_interfaces";
import UserAPI from "../api/UserAPI";

const CollaboratorsList = memo(function CollaboratorsList({
  collaborators,
  onSelectCollaborator,
}: {
  collaborators: Collaborator[];
  onSelectCollaborator: (id: number | null) => void;
}) {
  const [selectedCollaboratorId, setSelectedCollaboratorId] = useState<
    number | null
  >(null);

  const { getUser } = UserAPI();

  const changeColor = (collaborator: any) => {
    const id = collaborator.user_id;
    if (selectedCollaboratorId === id) {
      setSelectedCollaboratorId(null);
      onSelectCollaborator(null);
    } else {
      setSelectedCollaboratorId(id);
      onSelectCollaborator(collaborator);
    }
  };

  return (
    <div className="mx-auto w-full min-h-screen md:w-2/3 xl:w-1/2">
      {collaborators.map((collaborator) => {
        return (
          collaborator.user_id !== getUser().user_id && (
            <div
              onClick={() => changeColor(collaborator)}
              className={`px-4 my-2 hover:cursor-pointer ${
                selectedCollaboratorId === collaborator.user_id
                  ? "bg-selected-collaborator"
                  : "bg-white"
              }`}
              key={collaborator.user_id}>
              <p className="text-3xl">{collaborator.name}</p>
              <p className="text-2xl">{collaborator.email}</p>
            </div>
          )
        );
      })}
    </div>
  );
});

export default CollaboratorsList;
