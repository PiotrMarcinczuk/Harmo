import CalendarMain from "../components/CalendarMain";
import CollaboratorManage from "../components/CollaboratorManage";
import EventManage from "../components/EventManage";
import MyTask from "../components/MyTask";
import MyAccount from "../components/MyAccount";
import Help from "../pages/Help";
export default function Main({ componentType }: { componentType: string }) {
  if (componentType === "CalendarMain") return <CalendarMain />;
  if (componentType === "CollaboratorManage")
    return <CollaboratorManage initialComponentType="CollaboratorsList" />;
  if (componentType === "RegisterCollaborator")
    return <CollaboratorManage initialComponentType="RegisterCollaborator" />;
  if (componentType === "AddCollaborator")
    return <CollaboratorManage initialComponentType="AddCollaborator" />;
  if (componentType === "EditCollaborator")
    return <CollaboratorManage initialComponentType="EditCollaborator" />;

  if (componentType === "EventManage")
    return <EventManage initialComponentType="EventsList" />;
  if (componentType === "CreateEvent")
    return <EventManage initialComponentType="CreateEvent" />;
  if (componentType === "EditEvent")
    return <EventManage initialComponentType="EditEvent" />;
  if (componentType === "MyTask") return <MyTask />;
  if (componentType === "MyAccount") return <MyAccount />;
  if (componentType === "Help") return <Help />;
}
