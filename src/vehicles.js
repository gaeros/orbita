export const falcon = {
  name:'Falcon 9',slug:'falcon-9',cover:'./vehicles/f9.jpg',
  subtitle:'Il primo razzo orbitale con un primo stadio riutilizzabile.',
  intro:'Falcon 9 porta satelliti e capsule Dragon in orbita. Il primo stadio compie la parte iniziale della salita e può atterrare per volare di nuovo. Il secondo accompagna il carico fino all’orbita richiesta.',
  sections:[
    {title:'Il veicolo', slides:[
      ['Panoramica','overview','Il diametro di 3,7 metri si riferisce al corpo del razzo. La carenatura che protegge i satelliti è più larga.',[['Altezza','70 m'],['Diametro','3,7 m'],['Massa','549.054 kg'],['Carico in orbita bassa','22.800 kg'],['Carico in orbita di trasferimento geostazionaria','8.300 kg']]],
      ['Primo stadio','stage1','Nove Merlin alimentati a ossigeno liquido e cherosene RP-1 spingono il razzo al decollo. Quattro gambe si aprono nella fase finale del rientro.'],
      ['Interstadio','interstage','Questa struttura collega i due stadi fino alla separazione. Durante il rientro, quattro alette a griglia guidano il primo stadio verso la zona di atterraggio.'],
      ['Secondo stadio','stage2','Un singolo Merlin Vacuum può riaccendersi durante la missione per immettere i carichi in orbite differenti.',[['Motori','1'],['Tempo di combustione','397 s'],['Spinta','981 kN']]],
      ['Carico utile','fairing','Una carenatura in materiale composito protegge i satelliti durante la salita nell’atmosfera. Nelle missioni Dragon la capsula prende il suo posto.',[['Altezza della carenatura','13,1 m'],['Diametro della carenatura','5,2 m']]]
    ]},
    {title:'Motori Merlin',slides:[
      ['Al livello del mare','stage1','I nove motori del primo stadio sono progettati per funzionare nell’atmosfera e per essere riutilizzati dopo il volo.',[['Propellenti','Ossigeno liquido / RP-1'],['Spinta per motore','845 kN']]],
      ['Nel vuoto','stage2','Il secondo stadio usa una versione del Merlin con un ugello più ampio, ottimizzato per lo spazio.',[['Spinta nel vuoto','981 kN']]]
    ]},
    {title:'Falcon 9 in volo',slides:[
      ['Missioni Dragon','dragon','Con Dragon, Falcon 9 trasporta equipaggi o rifornimenti verso la Stazione Spaziale Internazionale.'],
      ['Lanci orbitali','flight','Nelle missioni condivise più clienti possono inviare i propri satelliti in orbita con lo stesso lancio.']
    ]}
  ]
};

export const starship = {
  name:'Starship',slug:'starship',cover:'./starship.jpg',
  subtitle:'Un sistema di trasporto per l’orbita terrestre, la Luna e Marte.',
  intro:'Starship è il nome della nave e dell’intero sistema di lancio. SpaceX progetta entrambi gli stadi per il recupero e il riutilizzo. I dati si riferiscono alla configurazione illustrata nella scheda ufficiale.',
  sections:[
    {title:'Il sistema di lancio',slides:[
      ['Panoramica Starship','stack','La nave Starship viaggia sopra il booster Super Heavy: insieme formano un veicolo alto 124 metri.',[['Altezza','124 m'],['Diametro','9 m'],['Carico in orbita previsto','Oltre 100 t']]],
      ['Starship','ship','Dopo la separazione, la nave continua verso l’orbita. È progettata per trasportare carichi e, in futuro, equipaggi.',[['Altezza','52 m'],['Diametro','9 m']]],
      ['Super Heavy','booster','Il booster sostiene il veicolo durante la prima parte della salita. Al rientro, il sistema è progettato per il recupero con i bracci della torre.',[['Altezza','72 m'],['Motori Raptor','33']]],
      ['Motori Raptor','raptor','I Raptor di Starship e Super Heavy utilizzano metano e ossigeno liquidi. Nella configurazione descritta, la nave monta tre motori per il volo atmosferico e tre per il vuoto.',[['Propellenti','Metano / ossigeno liquido']]]
    ]},
    {title:'Destinazioni',slides:[
      ['Luna','moon','Per le missioni lunari SpaceX prevede il trasferimento di propellente tra veicoli in orbita terrestre prima della partenza.'],
      ['Marte','mars','Il trasporto di materiali sulla superficie marziana è uno degli obiettivi del programma. Richiede voli di lunga durata e la capacità di atterrare con il carico.']
    ]},
    {title:'Starbase',slides:[['Sviluppo e voli','starbase','A Starbase, in Texas, SpaceX costruisce, collauda e lancia Starship. Le torri servono a integrare i due stadi sulla rampa e a recuperare i veicoli al rientro.']]}
  ]
};

export const glenn={
  name:'New Glenn',slug:'new-glenn',cover:'./vehicles/new-glenn.jpg',
  subtitle:'Il vettore orbitale di Blue Origin.',
  intro:'New Glenn porta satelliti e altri carichi in orbita. Il primo stadio è progettato per il recupero e il riutilizzo.',
  sections:[{title:'Configurazione',slides:[['I due stadi','new-glenn','Sette motori BE-4 alimentano il primo stadio. Il secondo utilizza due BE-3U a idrogeno liquido per portare il carico verso la sua destinazione.',[['Diametro della carenatura','7 m'],['Carico in orbita bassa','45 t']]]]}]
};
export const shepard={
  name:'New Shepard',slug:'new-shepard',cover:'./vehicles/new-shepard.jpg',
  subtitle:'Il sistema suborbitale di Blue Origin.',
  intro:'New Shepard trasporta persone ed esperimenti oltre i 100 chilometri di quota. Durante il volo, la capsula si separa dal booster e offre alcuni minuti di microgravità.',
  sections:[{title:'Il volo',slides:[['Capsula e booster','new-shepard','La capsula pressurizzata torna a terra con i paracadute. Il booster riaccende il motore BE-3PM per atterrare verticalmente.',[['Posti nella capsula','6'],['Durata tipica','11 minuti']]]]}]
};
