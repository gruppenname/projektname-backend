<h1 align="center"> projektname-backend </h1>

Das Backend für Projektname, eine einfache ToDo-Anwendung, in der ToDo's nach einem Key gespeichert werden.

# Verwenden
Beispiele für die möglichen Routen sind in der `test.http` Datei angelegt.

## Entwickeln
Für die lokale Entwicklung wird eine Postgres-Instanz benötigt. Dafür kann der Befehl `docker run --rm --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword --network=host -d postgres` verwendet werden.

Die Anwendung erwartet Umgebungsvariablen, .z.B. um die Verbindung zur Datenbank aufzubauen. Dies kann durch das direkte Setzen der Umgebungsvariablen oder durch das Erzeugen einer `.env` Datei gemacht werden. Die erwarteten Variablen befinden sich in der `.env.example` Datei.

Um die lokale Datenbank auf den aktuellen Stand des Schemas zu bringen, kann der `npm run migrate:dev` verwendet werden.

Bei Datenbankschemaänderungen muss eine neue Migrationsdatei generiert werden. Hier wird der Befehl `npx prisma migrate dev --name name_of_the_migration` verwendet.

## Tests
Die Tests werden über Jest ausgeführt und können über den Befehl `npm test` gestartet werden.

## Deployment
Vor jedem Deploy sollte die Datenbank auf den aktuellen Stand gebracht werden, indem neue Migrationen ausgeführt werden. Dieser Befehlt sollte dafür ausgeführt werden:

`npm run migrate`

Das Backend kann mit dem Befehl `npm start` gestartet werden.
