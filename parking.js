// Q:
/*
Neka je dat parking sa samo jednim praznim mjestom. Poznato je početno i završno stanje parkinga, odnosno raspored automobila na parking pozicijama. 
U jednom koraku dozvoljeno je pomjeriti samo jedan automobil sa njegove pozicije i parkirati na slobodno mjesto. 
Potrebno je pronaći najmanji broj koraka koji je potrebno uraditi kako bi se automobili iz početnog stanja premjestili u završno stanje. 
Automobili su označeni različitim cijelim brojevima od 1 do N, dok je prazno mjesto označeno brojem 0.

Pretpostavimo da je početno stanje parkinga označeno sa:
2 0 1 3
Gdje su 1, 2 i 3 različiti automobili, a 0 predstavlja prazno parking mjesto.
Pretpostavimo da je završno stanje parkinga označeno sa:
3 1 0 2
U prvom koraku možemo zamijeniti 1 i 0 u početnom stanju, tako da dobijamo 2 1 0 3. U drugom koraku možemo zamijeniti 2 i 0, tako da dobijamo 0 1 2 3. 
Postupak se nastavlja dok ne dođemo do završnog stanja. Program kao ulaz u prvom redu prima početno stanje kao cijele brojeve razdvojene praznim prostorom (space), 
dok u drugom redu prima završno stanje na analogan način. Program kao izlaz daje u prvom redu najmanji broj koraka koji je neophodan da se od početnog stanja dođe do završnog, 
a onda u narednim redovima ispisuje redoslijedom stanje u parking prostora u svakom od koraka (ne uključujući početno, a uključujući završno stanje).

Primjer ulaza:
2 0 1 3
3 1 0 2

Primjer izlaza:
4
2 1 0 3
0 1 2 3
3 1 2 0
3 1 0 2
*/

/////////////////////////////////////////////////////////////////////////////
// A:

function minStepsToReachEnd(s, e) {
  // Pretvaranje ulaznih stringova u nizove brojeva
  const start = s.split(" ").map(Number);
  const end = e.split(" ").map(Number);

  const n = start.length; // Dobijamo dužinu niza, tj. broj pozicija na parkingu

  // Pretvaranje nizova brojeva u stringove radi lakšeg poređenja
  const startStr = start.map(String).join("");
  const endStr = end.map(String).join("");

  // Ako je početno stanje već jednako završnom stanju, nema potrebe za pomjeranjem
  if (startStr === endStr) {
    console.log(0);
    return;
  }

  // Set za praćenje posjećenih stanja kako bi se izbjegle petlje
  const visited = new Set();
  // Red za BFS koji sadrži trenutna stanja i putanje do njih
  const queue = [[startStr, [startStr]]];

  visited.add(startStr); // Dodajemo početno stanje u set posjećenih stanja

  while (queue.length > 0) {
    // Dokle god imamo stanja u redu
    const [current, path] = queue.shift(); // Uzimamo prvo stanje iz reda i putanju do njega
    const zeroIndex = current.indexOf("0"); // Nalazimo poziciju praznog mjesta (0)

    // Iteriramo kroz sve pozicije na parkingu
    for (let i = 0; i < n; i++) {
      if (i !== zeroIndex) {
        // Ako trenutna pozicija nije prazno mjesto
        const nextState = current.split(""); // Kreiramo novi niz kao kopiju trenutnog stanja
        // Zamjenjujemo prazno mjesto sa autom na poziciji i
        [nextState[zeroIndex], nextState[i]] = [
          nextState[i],
          nextState[zeroIndex],
        ];
        const nextStr = nextState.join(""); // Pretvaramo novi niz u string

        if (!visited.has(nextStr)) {
          // Ako novo stanje nije već posjećeno
          const newPath = path.concat([nextStr]); // Dodajemo novo stanje u trenutnu putanju

          //console.log("Next state:", nextStr); // Ispisujemo novo stanje

          // Ako smo dostigli završno stanje, ispisujemo rezultate
          if (nextStr === endStr) {
            console.log(newPath.length - 1); // Broj koraka je dužina putanje minus 1 (jer ne računamo početno stanje)
            newPath
              .slice(1)
              .forEach((state) => console.log(state.split("").join(" "))); // Ispisujemo sve korake do završnog stanja
            return;
          }

          visited.add(nextStr); // Dodajemo novo stanje u set posjećenih stanja
          queue.push([nextStr, newPath]); // Dodajemo novo stanje u red za BFS zajedno sa trenutnom putanjom
        }
      }
    }
  }
}
// Ulazni podaci - početno i završno stanje parkinga
const startState = "2 0 1 3";
const endState = "3 1 0 2";
/*
  console.log(
    "Calling function with startState:",
    startState,
    "and endState:",
    endState
  ); // Ispisujemo ulazne podatke
  */

// Poziv funkcije
minStepsToReachEnd(startState, endState);
