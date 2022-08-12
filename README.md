Projektaufgabe Geosoft 2022
von Derya Sen und Maike Schröder

Voraussetzungen:
nodejs,
mongodb-server auf localhost:27017

starten:
"npm install"
"npm start"

Der Server läuft auf localhost:3000

Im Terminal muss das Image gepulled werden durch den Befehl: docker pull maschroder/gebirgeimage. Der container wird gestartet mit docker run --name gebirgecontainer -d -p 3001:3000 gebirgeimage. Jetzt muss die Komposition mit docker-compose up gestartet werden.


Für die Lösung des Projekts wurde Code der Lösungen von Felix Niebl und Noel Schnierer verwendet.


