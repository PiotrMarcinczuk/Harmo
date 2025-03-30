export default function Help() {
  return (
    <section className="max-w-1920  mx-auto">
      <div className="w-full p-2">
        <div className="bg-red-200 max-w-1732 mx-auto text-xl p-4">
          <div>
            <h1>Pomoc - Współpracownik i Właściciel</h1>
            <h2 className="text-2xl font-bold mt-4">Konto użytkownika</h2>
            <ul>
              <li>
                - Aby zarejestrować swoje konto kliknij przycisk{" "}
                <b>"Rejestracja"</b> i uzupełnij zaprezentowany formularz swoimi
                danymi.
              </li>
              <li>
                - Aby korzystać z aplikacji musisz być zalogowany, aby to zrobić
                wpisz dane otrzymane od właścicela harmonogramu lub użyj danych
                podanych wcześniej w procesie rejestracji.
              </li>
              <li>
                - Wszystkie informacje dotyczące konta użytkownika dostępne są
                do edycje w zakładce <b>"Moje konto"</b> w nawigacji
                użytkownika.
              </li>
              <li>
                - Każde pole musi spełnić pewne warunki aby mogło być zmienione
                wrazie niezgodności przy próbie edycji zostanie wyświetlony
                stosowny komunikat.
              </li>
              <li>
                - Każda zmiana danych użytkownika spowoduje wylogowanie z
                systemu.
              </li>
            </ul>
            <h2 className="text-2xl font-bold mt-4">Harmonogram i kalendarz</h2>
            <ul>
              <li>
                - Każdy użytkownik niezależnie od tego czy jest właścicielem czy
                współpracownikiem może być przypisany do maksymalnie pięciu
                harmonogramów.
              </li>
              <li>
                - Nawigacje można ukryć\pokazać klikając na ikonę napis
                <b>"Zamknij\Otwórz Menu"</b> w lewym górnym rogu.
              </li>
              <li>
                - Jedynie użytkownik, który jest właścicielem(sam zarejestrował
                swoje konto) może tworzyć nowe harmonogramy klikając opcję
                <b>"Wyjdź z planu"</b> w nawigacji a następnie{" "}
                <b>"Stwórz nowy plan"</b>.
              </li>
              <li>
                - Widok główny prezentuje kalendarz z najbliższymi piętnastoma
                dniami, miesiącami można nawigować się dzięki przyciskom
                prezentującym strzałki w lewo i prawo.
              </li>
              <li>
                - Po kliknieciu na konkretny dzień użytkownik zobaczy listę
                wszystkich zadań przypisanych do tego dnia wraz z ich nazwą oraz
                godzinami na które są zaplanowane.
              </li>
              <li>
                - Po kliknięciu na konkretne zadanie użytkownik zobaczy
                szczegółowe informacje na jego temat takie jak: dzień i data,
                nazwa, godzinę i datę rozpoczęcia i zakończenia, opis,
                przypisanych użytkowników.
              </li>
              <li>
                - Aktualne zadania do wykonania do których danu użytkownik jest
                przypisany są widoczne w zakładce <b>"Moje Zadania"</b> w
                nawigacji.
              </li>
            </ul>
            <h2 className="text-2xl font-bold mt-4">Ogólne zasady</h2>
            <p>
              W razie jakichkolwiek problemów z aplikacja poniżej przedstawione
              zostały kroki do ich potencjalnego rozwiązania.
            </p>
            <ul>
              <li>
                - Odświeżenie strony z wyczyszczeniem pamięci podręcznej skrót:
                Ctrl + F5.
              </li>
              <li>
                - Usunięcie wszystkich ciasteczek i danych z LocalStorage
                przeglądarki a następnie odświeżenie strony.
              </li>
              <li>
                - W razie dalszych problemów proszę o kontakt z administratorem
                mail: <a href="mailto:">piotrmarcinczuk@gmail.com</a>.
              </li>
            </ul>
          </div>

          <div>
            <h1>Pomoc - Właściciel</h1>
            <h2 className="text-2xl font-bold mt-4">
              Zarządzanie współpracownikami
            </h2>
            <ul>
              <li>
                - Właściciel po kliknieciu na <b>"Zarządzanie użytkownikami"</b>
                zostanie przekierowany na widok zawierący listę wszystkich
                użytkowników w danym harmonogramie(właściciel nie będzie tu
                widoczny) oraz opcje slużące do zarządzania użytkownikami.
              </li>
              <li>
                - Właściciel po kliknięciu na <b>"Dodaj istniejącego"</b>{" "}
                zostanie przekierowany do formularza, w którym może dodać do
                swojego harmonogramu użytkownika, który istnieje już w systemie
                np. współpracownik został stworzony przez innego właściciela.
              </li>
              <li>
                - Właściciel po kliknięciu na <b>"Stwórz nowego"</b> zostanie
                przekierowany do formularza, który zawiera takie same pola jak w
                przypadku rejestracji. Każde pole musi spełnić pewne warunki aby
                współpracownik mógł zostać stworzony i dodany do harmonogramu
                wrazie niezgodności zostanie wyświetlony stosowny komunikat.
              </li>
              <li>
                - Właściciel po kliknięciu na konkretnego współpracownika z
                listy i kliknięciu <b>"Edytuj"</b> zostanie przekierowany do
                formularza, który jest wypełniony aktualnymi danymi
                współpracownika. Każde pole musi spełnić pewne warunki aby
                współpracownik mógł zostać edytowany wrazie niezgodności
                zostanie wyświetlony stosowny komunikat.
              </li>
              <li>
                - Właściciel po kliknięciu na konkretnego współpracownika z
                listy i kliknięciu <b>"Usuń"</b> zostanie usunięty z
                harmonogramu.
              </li>
            </ul>
            <h2 className="text-2xl font-bold mt-4">Zarządzanie zadaniami</h2>
            <ul>
              <li>
                - Właściciel po kliknieciu na <b>"Zarządzanie zadaniami"</b>{" "}
                zostanie przekierowany na widok zawierący listę wszystkich zadań
                w danym harmonogramie oraz opcje slużące do zarządzania nimi.
              </li>
              <li>
                - Właściciel po kliknięciu na <b>"Dodaj"</b> zostanie
                przekierowany do formularza, który po uzupełnieniu odpowiednich
                pól pozwoli stworzyć zadanie. Każde pole musi spełnić pewne
                warunki aby zadanie mogło zostać utworzone i dodane do
                harmonogramu wrazie niezgodności zostanie wyświetlony stosowny
                komunikat.
              </li>
              <li>
                - Właściciel po kliknięciu na konkretne zadanie z listy i
                kliknięciu <b>"Edytuj"</b> zostanie przekierowany do formularza,
                który jest wypełniony aktualnymi danymi zadania. Każde pole musi
                spełnić pewne warunki aby współpracownik mógł zostać edytowany
                wrazie niezgodności zostanie wyświetlony stosowny komunikat.
              </li>
              <li>
                - Właściciel po kliknięciu na konkretne zadanie z listy i
                kliknięciu <b>"Usuń"</b> usuwa zadanie.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
