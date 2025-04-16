import AdminNavigation from "./AdminNavigation";
import RegisterCollaborator from "./RegisterCollaborator";
import UserAPI from "../api/UserAPI";
import useCollaborator from "../hooks/useCollaborator";
import { useState, useEffect, useCallback, memo } from "react";
import { type Collaborator } from "../interfaces/app_interfaces";
import { useParams, Link } from "react-router-dom";
import CollaboratorsList from "./CollaboratorsList";
import EmptyList from "./EmptyList";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import UpcommingEvents from "./UpcommingEvents";
import AddCollaborator from "./AddCollaborator";
import useMobileMenu from "../hooks/useMobileMenu";
import MenuButton from "./MenuButton";
import { useSelector } from "react-redux";

const CollaboratorManage = memo(function CollaboratorManage({
  initialComponentType,
}: any) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [componentType, setComponentType] = useState("");
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const { timetableId } = useParams();
  const { getCollaborators, removeUser } = UserAPI();
  const { collaborator, changeCollaborator } = useCollaborator();
  const { isMenuOpen, setIsMenuOpen, xlMenu, mobileMenu } = useMobileMenu();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { load } = useSelector((state: any) => state.load);

  const navigate = useNavigate();
  const fetchCollaborators = useCallback(async () => {
    if (!timetableId || load) return;
    try {
      const collaboratorsResponse: { data: Collaborator[] } =
        await getCollaborators(parseInt(timetableId));
      setCollaborators(collaboratorsResponse.data);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    }
  }, [load]);

  useEffect(() => {
    fetchCollaborators();
  }, [timetableId, componentType]);

  useEffect(() => {
    setComponentType(initialComponentType);
  }, [initialComponentType, load]);

  // const changeComponent = useCallback((componentType: string) => {
  //   setComponentType(componentType);
  // }, []);

  const handlePopup = useCallback(async () => {
    if (!collaborator.user_id) return;
    setComponentType("CollaboratorsList");
    setIsPopupVisible(true);
  }, [collaborator]);

  const handleClickPopupConfirm = useCallback(async () => {
    if (!collaborator.user_id) return;
    try {
      await removeUser(userInfo.user_id, collaborator.user_id);
      setIsPopupVisible(false);
      await fetchCollaborators();
    } catch (error) {
      return error;
    }
  }, [collaborator]);

  return (
    <section className="h-full">
      <div className=" w-full relative pt-2">
        <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div
          className={`fixed transform z-50 transition-transform duration-300  ${
            isMenuOpen ? "translate-x-0" : "-translate-x-96"
          }`}>
          {userInfo.is_admin ? <AdminNavigation /> : null}
        </div>
        <div className="max-w-1920 mx-auto flex flex-wrap">
          <div className="w-full mx-auto rounded mt-10 lg:mt-2">
            <div className="flex bg-gray-300 mt-2 mx-auto w-full md:w-2/3 xl:w-1/2">
              <div className="flex mx-auto text-lg lg:text-2xl">
                <Link
                  to={`/plan/${timetableId}/lista-uzytkownikow`}
                  className="flex items-center font-bold px-1 lg:px-4 manage-option">
                  <p>{!mobileMenu ? "Lista użytkowników" : "Lista"}</p>
                </Link>
                <Link
                  to={`/plan/${timetableId}/lista-uzytkownikow/dodaj-istniejacego`}
                  className="flex items-center font-bold px-1 lg:px-4 manage-option">
                  <p>{!mobileMenu ? "Dodaj istniejącego" : "Dodaj"}</p>
                </Link>
                <Link
                  to={`/plan/${timetableId}/lista-uzytkownikow/dodaj`}
                  className="flex items-center font-bold px-1 lg:px-4 manage-option">
                  <p>{!mobileMenu ? "Stwórz nowego" : "Stwórz"}</p>
                </Link>
                <Link
                  to={
                    collaborator &&
                    `/plan/${timetableId}/lista-uzytkownikow/edytuj/${collaborator.user_id}`
                  }
                  className="flex items-center font-bold px-1 lg:px-4 manage-option">
                  <p>Edytuj</p>
                </Link>
                <button
                  onClick={collaborator && handlePopup}
                  className="flex items-center font-bold px-1 lg:px-4 manage-option">
                  <p>Usuń</p>
                </button>
              </div>
            </div>
            {xlMenu && <UpcommingEvents />}
            {!collaborator &&
              componentType === "EditCollaborator" &&
              navigate(`/plan/${timetableId}/lista-uzytkownikow`)}
            {collaborators.length > 0 &&
              componentType === "CollaboratorsList" && (
                <CollaboratorsList
                  collaborators={collaborators}
                  onSelectCollaborator={changeCollaborator}
                />
              )}
            {/* len 1 because always exist admin */}
            {collaborators.length === 1 &&
              componentType === "CollaboratorsList" && (
                <EmptyList componentType="CollaboratorsList" />
              )}
            {componentType === "RegisterCollaborator" && (
              <RegisterCollaborator
                setComponentType={setComponentType}
                isCreating={true}
              />
            )}
            {componentType === "AddCollaborator" && (
              <AddCollaborator setComponentType={setComponentType} />
            )}
            {collaborator && componentType === "EditCollaborator" && (
              <RegisterCollaborator
                setComponentType={setComponentType}
                tempData={collaborator}
                isCreating={false}
              />
            )}
            <Modal
              isOpen={isPopupVisible}
              onRequestClose={() => setIsPopupVisible(false)}
              className="modal max-w-[800px] max-h-[600px] p-6 bg-white rounded-lg shadow-lg mx-auto my-20"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <div
                className="text-2xl xl:text-nowrap"
                tabIndex={0}
                ref={(div) => div && div.focus()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleClickPopupConfirm();
                  if (e.key === "Escape") setIsPopupVisible(false);
                }}>
                <div className="content mx-auto">
                  <p className="mb-2 text-center">
                    Czy napewno chcesz usunac tego użytkownika?
                  </p>
                  {collaborator && (
                    <>
                      <p>Imie: {collaborator.name}</p>
                      <p>Email: {collaborator.email}</p>
                    </>
                  )}
                </div>
                <div className="actions content mx-auto mt-2 relative">
                  <button
                    onClick={() => setIsPopupVisible(false)}
                    className="button bg-green-700 p-2">
                    Anuluj
                  </button>
                  <button
                    className="button bg-red-700 p-2 absolute right-0"
                    onClick={handleClickPopupConfirm}>
                    Potwierdz
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
});

export default CollaboratorManage;
