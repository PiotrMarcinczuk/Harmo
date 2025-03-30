import { useState } from "react";
export default function useCollaborator() {
  const [collaborator, setCollaborator] = useState<any | null>(null);
  const changeCollaborator = (collaborator: any) => {
    setCollaborator(collaborator);
  };

  return { collaborator, changeCollaborator };
}
