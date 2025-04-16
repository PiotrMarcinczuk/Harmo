import { createRoot } from "react-dom/client";
import Modal from "react-modal";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./pages/LoginForm";
import Main from "./pages/Main";
import RegisterForm from "./pages/RegisterForm";
import FirstTimetable from "./pages/FirstTimetable";
import "./output.css";
import SelectTimetable from "./pages/SelectTimetable";
import RegisteredAccount from "./pages/RegisteredAccount";
import { Provider } from "react-redux";
import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <main>
          <LoginForm />
        </main>
      </>
    ),
  },
  {
    path: "/konto-zarejestrowane",
    element: (
      <>
        <Header />
        <main>
          <RegisteredAccount />
        </main>
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Header />
        <main>
          <RegisterForm />
        </main>
      </>
    ),
  },
  {
    path: `/plan/:timetableId`,
    element: (
      <>
        <Header />
        <main>
          <Main componentType="CalendarMain" />
        </main>
      </>
    ),
  },
  {
    path: `/plan/:timetableId/wszystkie-zadania`,
    element: (
      <>
        <Header />
        <main>
          <Main componentType="EventManage" />
        </main>
      </>
    ),
  },
  {
    path: `/plan/:timetableId/wszystkie-zadania/dodaj`,
    element: (
      <>
        <Header />
        <main>
          <Main componentType="CreateEvent" />
        </main>
      </>
    ),
  },
  {
    path: `/plan/:timetableId/wszystkie-zadania/edytuj/:eventId`,
    element: (
      <>
        <Header />
        <main>
          <Main componentType="EditEvent" />
        </main>
      </>
    ),
  },
  {
    path: `/pomoc`,
    element: (
      <>
        <Header />
        <main>
          <Main componentType="Help" />
        </main>
      </>
    ),
  },
  {
    path: `/plan/:timetableId/moje-zadania`,
    element: (
      <>
        <Header />
        <main>
          <Main componentType="MyTask" />
        </main>
      </>
    ),
  },
  {
    path: `/plan/:timetableId/lista-uzytkownikow`,
    element: (
      <>
        <Header />
        <main>
          <Main componentType="CollaboratorManage" />
        </main>
      </>
    ),
  },
  {
    path: `/plan/:timetableId/lista-uzytkownikow/dodaj`,
    element: (
      <>
        <Header />
        <main>
          <Main componentType="RegisterCollaborator" />
        </main>
      </>
    ),
  },
  {
    path: `/plan/:timetableId/lista-uzytkownikow/dodaj-istniejacego`,
    element: (
      <>
        <Header />
        <main>
          <Main componentType="AddCollaborator" />
        </main>
      </>
    ),
  },
  {
    path: `/plan/:timetableId/lista-uzytkownikow/edytuj/:userId`,
    element: (
      <>
        <Header />
        <main>
          <Main componentType="EditCollaborator" />
        </main>
      </>
    ),
  },
  {
    path: `/plan/:timetableId/moje-konto`,
    element: (
      <>
        <Header />
        <main>
          <Main componentType="MyAccount" />
        </main>
      </>
    ),
  },
  {
    path: "/pierwszy-plan",
    element: (
      <>
        <Header />
        <main>
          <FirstTimetable firstFlag={true} />
        </main>
      </>
    ),
  },
  {
    path: "/stworz-plan",
    element: (
      <>
        <Header />
        <main>
          <FirstTimetable firstFlag={false} />
        </main>
      </>
    ),
  },
  {
    path: "/wybor-plan",
    element: (
      <>
        <Header />
        <main>
          <SelectTimetable />
        </main>
      </>
    ),
  },
]);

Modal.setAppElement("#root");
const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
