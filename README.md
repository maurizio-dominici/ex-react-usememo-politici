# 📌 Milestone 1: Recuperare e visualizzare i dati

1. Effettua una chiamata API a http://localhost:3333/politicians

- Salva la risposta in uno stato React (useState).

2. Mostra i politici in una lista di card, visualizzando almeno le seguenti proprietà:

   - Nome (name)
   - Immagine (image)
   - Posizione (position)
   - Breve biografia (biography)

### Obiettivo:

Caricare e mostrare i politici in un’interfaccia chiara e leggibile.

# 📌 Milestone 2: Implementare la ricerca ottimizzata

1. Aggiungi un campo di ricerca (input type="text") sopra la lista dei politici.

2. Permetti all’utente di filtrare i risultati in base a nome o biografia (se il testo cercato è incluso).

- Suggerimento: Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca.

❌ Non usare useEffect per aggiornare l’array filtrato.

# Obiettivo:

Migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia.
