# CoronaHACK
App, die unterstützt, Infektionsketten zu unterbrechen. Hierbei werden die sozialen Kontakte getrackt. Dabei werden Menschen, die mit einer infizierten Person in Kontakt standen informiert und können so schnell und AGIL (#SCRUM) die notwendigen Maßnahmen (Quarantäne, etc.) durchführen

## Konzept ContactReminder

### Bluetooth

Menschen haben die App auf ihrem Handy aktiviert und dann dieses verbindet sich automatisch mit den Handy von anderen Menschen (die auch die App installiert habe). Anschließend wird dieser Kontakt irgendwo gespeichert.

### NFC

Man kann auch die App mit NFC nutzen (siehe Bluetooth).

### GPS

Geht man in einen Laden, fällt das der App auf und sie fragt, ob man in diesem Laden war anschließend kann der Standort mit Menschen, die zur gleichen Zeit im Laden war gekoppelt werden.

## Features

* Nachverfolgung von Infektionsketten
* Heatmap von Coronaausbreitung
* Punktesystem in der Reduzierung von sozialen Kontakten mit Wettbewerb (Lukas gewinnt)
* schnellere Maßnahmen

## Technische Umsetzung



## ToDo
+  **Wir müssen uns über die Verantwortlichkeiten der API/DB einig werden**

* Entscheidung, ob wir eine DB nutzen wollen /lokales DB auf Smartphone --> Datenschutz?!
* Finalisierung Frontend
* API-Calls (für TBD)  und DB-Modellierung (Nutzung von AWS?)
* timestamp und nach qr-code filtern in letzte Kontakte (+Headliner)
* APP MUSS SCHÖNER WERDEN
* Fix App for iPhone
* REFACTOREN

## Links

https://trello.com/b/bGuF3fPl/coronahack
