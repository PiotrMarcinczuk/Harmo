# Harmonogram App - README

## Opis aplikacji
Aplikacja do zarządzania harmonogramami, pozwalająca na tworzenie, edytowanie i zarządzanie zadaniami przypisanymi do określonych dni i użytkowników. Umożliwia również kontrolowanie dostępu użytkowników przez tworzenie ograniczonych kont. W utworzonej aplikacji do przesyłania danych użytkownika wykorzystany został standard tokenu JWT, który odpowiada ze bezpieczeństwo danych.

## Funkcjonalności

### 1. Tworzenie odrębnych harmonogramów
Umożliwia tworzenie wielu niezależnych harmonogramów, co pozwala na lepszą organizację pracy.

### 2. Tworzenie ograniczonych kont dla użytkowników harmonogramu
Aplikacja pozwala na tworzenie kont dla użytkowników harmonogramu, które posiadają inne uprawnienia niż konta właścicieli harmonogramu.

#### Przykładowe konta do testowania aplikacji:
- **Administrator (Właściciel harmonogramu)**  
  Email: `wyniotonator@example.com`  
  Hasło: `Kasztan!122`
  
- **Współpracownik (Użytkownik harmonogramu)**  
  Email: `karolk@example.com`  
  Hasło: `Kasztan!122!`

### 3. Tworzenie zadań przypisanych do konkretnych dni i użytkowników
Umożliwia tworzenie zadań i przypisanie ich do konkretnych dni oraz użytkowników.

### 4. Przedstawienie harmonogramu w postaci kartek z kalendarza
Harmonogram jest przedstawiany w formie kartek z kalendarza, co ułatwia wizualizację rozplanowanych zadań na poszczególnych dniach. Dzięki temu użytkownicy mogą łatwo monitorować zaplanowane działania.

### 5. Odczytanie informacji dotyczących zadań w konkretnym harmonogramie
Użytkownicy mogą z wielu miejsc aplikacji przejść do widoku przedstawiającego informacje dotyczącego konkretnego zadania.

## Wykorzystane technologie

- **React** - Frontend.
- **Express**: - Backend.
- **PostgreSQL** - Database.

## Najważniejsze widoki
![logowanie_rej](https://github.com/user-attachments/assets/b4feff14-cd56-4d11-8540-79fdc2f57776)
Pierwszy widok aplikacji umożliwiający zalogowanie się lub rejestrację.

![image](https://github.com/user-attachments/assets/4322b691-0d74-43b0-bef3-a98f942b3eb0)
Główny widok przedstawiający harmonogram w postaci kalendarza, który przedstawia nastepne piętnaście dni.


![dodaj_zadanie](https://github.com/user-attachments/assets/1cf961f8-f062-4b58-93ae-8749668c4a71)
Ekran umożliwiający dodawanie nowych zadań do harmonogramu. Możesz wybrać użytkownika, dzień oraz przypisać szczegóły zadania.

![zadanie_opis](https://github.com/user-attachments/assets/9bf4f9b3-3ac6-4bd7-8187-2177a37f40db)
Widok szczegółów zadania, gdzie użytkownicy mogą przeglądać informacje dotyczące zadania.


## Instalacja lokalnie

- Zacznij od sklonowania repozytorium na swoje lokalne środowisko:
  
```bash
git clone https://github.com/PiotrMarcinczuk/Project-1-Harmo.git
cd Project-1-Harmo/frontend/vite-project
```

- Instalacja zależności
```bash
npm install

cd ../backend/src

npm install dotenv

uzupełnienie pliku .env własnym zmiennymi środowiskowymi
```
- Baza danych
```bash
psql -h 'localhost' -U 'postgres'

npx sequelize-cli db:migrate

npx sequelize-cli db:seed --seed 20250325124408-demo-users.js
npx sequelize-cli db:seed --seed 20250325125242-demo-timetables.js
npx sequelize-cli db:seed --seed 20250325125327-demo-user-t.js 
npx sequelize-cli db:seed --seed 20250325125300-demo-events.js
npx sequelize-cli db:seed --seed 20250325132208-demo-new-events.js
```
- Właczenie aplikacji
```bash
npx ts-node server.ts

cd ../frontend/vite-project

npm run dev
```


