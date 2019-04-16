
========================MODE_EXAMEN========================


1) Pour utiliser CrushedVoltaire, il faut installer une extension permettant
d'importer une base de donnée dans le navigateur:
	-Chrome: LocalStorage Manager

2) Pour importer la base de donnée, il faut ajouter au localStorage avec l'extension
en la copiant depuis de fichier "VoltaireBDD.txt". (Ctrl+A, Ctrl+C dans le fichier)
	-Chrome: dans l'extension cliquer sur "import"

3) Vous pouvez passer l'examen en collant le contenu de "CrushedVoltaire.js" dans
l'onglet "Console" du menu "Inspecter l'élément", puis taper la ligne:
	ModeExam()

==========================AUTRE==============================

Le fichier contient aussi d'autres fonctions, elles sont commentées.

Les fonctions learn(), learnComplete() et Exo() se lancent dans les entraînements.
Attention: elles nécessitent d'attendre les requêtes pour ne pas ralentir le processus:
	Dans l'onglet "Network" du menu "Inspecter l'élément", vous pouvez voir le nombre de 
	requêtes envoyées. Il faut attendre que ce nombre se stabilise avant de lancer une
	autre fonction. Si vous quitez la page avant que les requêtes ne soient arrêtées,
	vous n'enregistrerez pas votre progression.

Merci d'être un minimum discret et ne pas diffuser CrushedVoltaire trop fortement.
N'hésitez pas à m'envoyer un mail pour une question ou une suggestion.

Made By LiuCypher
e-mail: crushed.voltaire@gmx.fr