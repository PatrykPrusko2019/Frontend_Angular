# FrontendAngular
Aplikacja Frontendowa, trzeba jeszcze pobrac aplikacje Backendowa : https://github.com/PatrykPrusko2019/BackendWebAPI.git 
Opis dokładny aplikacji jest : https://github.com/PatrykPrusko2019/Frontend_Angular/blob/master/FrontendAngular/DescriptionOfApp/Aplikacja%20Frontend%20u%C5%BCywaj%C4%85ca%20Angulara%20(1).pdf

W katalogu -> Frontend_Angular/FrontendAngular/DescriptionOfApp
/Aplikacja Frontend używająca Angulara (1).pdf

Jeszcze dodaje relacje jakie są na tabelach w bazie danych w MS-SQL:
AdmissionDocuments - Providers   -> wiele do jeden
AdmissionDocuments - Labels -> wiele do wielu
AdmissionDocuments - Products -> 1 do wielu
AdmissionDocuments - Storages -> wiele do 1
Providers - Addressess -> 1 do 1
AdmissionDocuments -> ItemsOfProduct -> 1 do wielu.

Reszte w PDF.


Wytyczne danej aplikacji:
Aplikacja generująca nowe dokumenty zewnętrzne do magazynu.
Dokument przyjęcia zewnętrznego składa się z następujących danych:
● Dostawca
● Lista towarów
● Magazyn docelowy
● Lista przypisanych etykiet
Aplikacja powinna składać się z dwóch projektów:
● Front-End - Angular
● Back-End - .NET C# REST API
Aplikacja powinna operować na bazie danych Microsoft SQL Server oraz korzystać z ORM
EF Core
Opis funkcjonalności aplikacji:
1. Widoki
a. Lista magazynów
i. Wyświetlenie listy magazynów
b. Lista towarów
i. Wyświetlenie listy towarów
ii. Dodanie nowego towaru
iii. Edycja towaru
iv. Usunięcie towaru
c. Lista dostawców
i. Wyświetlenie listy dostawców
ii. Dodanie nowego dostawcy
iii. Edycja dostawcy
iv. Usunięcie dostawcy
d. Lista dokumentów przyjęć
i. Wyświetlenie listy dokumentów przyjęć
1. Anulowane dokumenty nie są widoczne na liście
ii. Dodanie nowego dokumentu przyjęcia
iii. Edycja dokumentu przyjęcia
1. Zatwierdzone dokumenty nie udostępniają możliwości edycji
iv. Zatwierdzenie Dokumentu przyjęcia
v. Anulowanie dokumentu przyjęcia
2. Obiekty powinny zawierać następujące dane
a. Magazyn
i. Nazwa
ii. Symbol
b. Towar
i. Nazwa
ii. Kod
c. Dostawca
i. Nazwa Firmy
ii. Adres
d. Etykieta
i. Nazwa
e. Dokument przyjęcia
i. Magazyn docelowy
ii. Dostawca
iii. Lista towarów (wraz z ilością i ceną)
iv. Etykiety
3. Założenia
a. Wiele dokumentów może mieć jednego dostawcę, natomiast jeden
dokument nie może mieć wielu dostawców
b. Jeden dokument może mieć kilka etykiet, jedna etykieta może być przypisana
do wielu dokumentów
c. Jeden dokument może mieć wiele pozycji towarów, jedna pozycja towaru


może mieć jeden dokument
d. Jeden dokument może mieć jeden magazyn, jeden magazyn może mieć wiele
dokumentów
5. Wszystkie dane powinny być przechowywane w bazie danych Microsoft SQL Server.
Operacje bazodanowe powinny zostać wykonane za pomocą EF Core
