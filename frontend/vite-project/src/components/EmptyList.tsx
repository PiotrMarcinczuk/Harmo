import { memo } from "react";

const EmptyList = memo(function EmptyList({ componentType }: any) {
  return (
    <div className="text-4xl text-center w-full">
      <div className="bg-white p-4 mt-10 mx-auto w-1/2">
        <p>
          {componentType === "EventsList" &&
            "W twoim planie nie ma żadnych aktualnych zadań"}
          {componentType === "CollaboratorsList" &&
            "W twoim planie nie ma żadnych wspołpracowników"}
        </p>
      </div>
    </div>
  );
});

export default EmptyList;
