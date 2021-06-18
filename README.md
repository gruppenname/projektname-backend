<h1 align="center"> projektname-backend </h1>

Das Backend für Projektname, eine einfache ToDo-Anwendung, in der ToDos nach einem Key gespeichert werden.

### Repository klonen

```bash
git clone https://github.com/gruppenname/projektname-backend.git
```

## Verwenden
Beispiele für die möglichen Routen sind in der `test.http` Datei angelegt.

## Entwickeln
Für die lokale Entwicklung wird eine Postgres-Instanz benötigt. Dafür kann der Befehl `docker run --rm --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword --network=host -d postgres` verwendet werden.

Die Anwendung erwartet Umgebungsvariablen, .z.B. um die Verbindung zur Datenbank aufzubauen. Dies kann durch das direkte Setzen der Umgebungsvariablen oder durch das Erzeugen einer `.env` Datei gemacht werden. Die erwarteten Variablen befinden sich in der `.env.example` Datei.

Um die lokale Datenbank auf den aktuellen Stand des Schemas zu bringen, kann der `npm run migrate:dev` verwendet werden.

Bei Datenbankschemaänderungen muss eine neue Migrationsdatei generiert werden. Hier wird der Befehl `npx prisma migrate dev --name name_of_the_migration` verwendet.

Vor jedem start sollte die Datenbank auf den aktuellen Stand gebracht werden, indem neue Migrationen ausgeführt werden. Dieser Befehlt sollte dafür ausgeführt werden:

`npm run migrate`

Das Backend kann mit dem Befehl `npm start` gestartet werden.

## Tests
Die Tests werden über Jest ausgeführt und können über den Befehl `npm test` gestartet werden.


## Deployment
Das Deployment findet in diesem Projekt über Kubernetes statt. Notwendig hierzu ist ein Clusterzugang für den ["Data Science Cluster"](https://labor.beuth-hochschule.de/ris/data-science-cluster/) der Beuth Hochschule für Technik Berlin und die Installation von kubectl.
<img width="700" alt="Screenshot 2021-06-10 at 11 34 11" src="https://user-images.githubusercontent.com/53577336/121501742-caaa9900-c9df-11eb-8a22-1a11a3fa212f.png">


Deployment-Dateien finden sich im Ordner "deployment" in den Ordnern "backend" und "database".

### Datenbank

Um die Datenbank aufzusetzen muss zunächst ein persistent volume claim (pvc) erstellt und deployt werden, welches dann ein Volume für die Anwendung bereitstellt und vom Datenbankpod gemountet werden kann. 
``` 
kubectl apply -f database/pvc.yaml
```
Danach kann das Deployment deployt werden. Das Deployment mountet das vorher erstellte PVC und fährt einen Pod hoch, in dem der Postgres-Server läuft.
``` 
kubectl apply -f database/deployment.yaml
```
Damit das Deployment innerhalb des Clusters unter einer stabilen IP-Adresse erreichbar ist, muss danach ein Service vom Typ Cluster-IP erstellt werden.
``` 
kubectl apply -f database/service.yaml
```

### Backend
Da das Backend Zugangsdaten für die Datenbank benötigt, die über Environment-Variablen konfigurierbar sind, wird zunächst eine ConfigMap benötigt, die die Zugangsdaten enthält. Normalerweile würde man jedoch für sicherheitskritische Daten an dieser Stelle ein [Secret](https://kubernetes.io/docs/concepts/configuration/secret/) verwenden. 
In der configmap muss der Connectionstring für die Datenbank eingetragen werden. Mit `kubectl get svc` können die aktuell deployten Services und deren IP-Adresse eingesehen werden. Die IP-Adresse und der Port des postgres-service muss dann in die configmap des Deployments.

``` 
kubectl apply -f backend/configmap.yaml
```
Ist die configmap deployt, kann das Deployment nachgezogen werden. Hier ist wichtig, dass zuvor ein Image vom Backend lokal gebaut und in die registry gepusht wurde. 
``` 
kubectl apply -f backend/deployment.yaml
```
Danach brauchen wir wieder eine stabile cluster-interne IP-Adresse für unser Deployment:
``` 
kubectl apply -f backend/service.yaml
```

