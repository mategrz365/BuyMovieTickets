System rezerwacji miejsc w kinie. Składa się z następujących elementów:
a. Bazy danych, w której znajduję się baza użytkowników (email oraz hasło)
b. Panelu logowania oraz rejestracji użytkownika - weryfikacja za pomocą wyrażeń regularnych czy email ma prawidłową składnię i czy
minimalne wymagania hasła (tj. min. 8 znaków, min. jedna duża litera, cyfra i znak specjalny) są spełnione.
c. Panel wyboru kina (3 miejscowości, w każdej inna liczba miejsc i inne seanse – wszelkie dane na temat
kina mogą znajdują się w bazie danych)
d. Panel wyboru seansu (3 filmy) – seanse wyświetlane są na podstawie informacji zawartych w bazie danych dla wybranego kina
e. Wybór miejsca – sala kinowa wyświetlana jest na podstawie informacji zawartych w bazie danych, sesja wyboru
miejsca nie trwa dłużej niż 10 minut. Po tym czasie strona robi się nieaktywna.
f. Po wybraniu miejsca  pojawia się podsumowanie zamówienia i cena biletów.
g. Po zatwierdzeniu wysyłany jest mail z potwierdzeniem rezerwacji i ceną.
h. System dostosownay do urządzeń mobilnych

Użyte technologie:
HTML, SCSS, JS, MongoDB, NodeJS

dodatkowo:
express.js,
node-sass - kompilacja scss/css
Passport - uwierzytelnianie,
bcryptjs - zabezpieczenia hasła użytkownika,
ejs - wyświetlanie widoków,
mongoose - obsługa bazy danych,
sendgrid - wysyłanie e-mail do użytkownika
