# Harmonogram App - README

## Opis aplikacji
Aplikacja do zarządzania harmonogramami, pozwalająca na tworzenie, edytowanie i zarządzanie zadaniami przypisanymi do określonych dni i użytkowników. Umożliwia również kontrolowanie dostępu użytkowników przez tworzenie ograniczonych kont.

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

![dodaj_zadanie](https://github.com/user-attachments/assets/1cf961f8-f062-4b58-93ae-8749668c4a71)
Ekran umożliwiający dodawanie nowych zadań do harmonogramu. Możesz wybrać użytkownika, dzień oraz przypisać szczegóły zadania.

![zadanie_opis](https://github.com/user-attachments/assets/9bf4f9b3-3ac6-4bd7-8187-2177a37f40db)
Widok szczegółów zadania, gdzie użytkownicy mogą przeglądać informacje dotyczące zadania.


## Aplikacja dostępna jest pod:
https://symmetric-rune-454911-m9.ey.r.appspot.com/

