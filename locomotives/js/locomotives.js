const compareStrings = (s1, s2) => (s1 < s2 ? -1 : s1 > s2 ? 1 : 0);
const getSortString = (loco) =>
  `${loco.country}-${loco.railroad}-${loco.class.padStart(10, "0")}-${loco.id}`;
const compareLocomotives = (l1, l2) =>
  compareStrings(getSortString(l1), getSortString(l2));

const parseCsvFile = (buffer) => {
  const decoder = new TextDecoder("windows-1250");
  const text = decoder.decode(buffer);
  const rows = text.split("\r\n").filter((row) => row.length > 0);
  const cells = rows.map((row) => row.split(";"));

  return cells;
};

const mapCsvRowToLocomotive = (row) => ({
  id: row[0],
  railroad: row[1],
  class: row[2],
  country: row[3],
  modelBrand: row[4],
  details: row[5],
  images: row[6],
  price: row[7],
  sold: row[8],
});

window.onload = function () {
  const parentElement = document.getElementById("locomotives");

  fetch("./data/locomotives.csv")
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const csvFileCells = parseCsvFile(buffer);

      const parsedData = csvFileCells
        .slice(1)
        .map(mapCsvRowToLocomotive)
        .sort(compareLocomotives);

      parsedData.forEach((locomotive) => {
        const locomotiveElement = document.createElement("lm-locomotive");
        setAttributes(locomotiveElement, {
          id: locomotive.id,
          title: `${locomotive.railroad} ${locomotive.class}`,
          country: locomotive.country,
          images: locomotive.images,
          price: `Cena: ${locomotive.price}€`,
          info: `Izdelava: ${locomotive.modelBrand}\n\n${locomotive.details}`,
          sold: locomotive.sold,
        });
        parentElement.appendChild(locomotiveElement);
      });
    });
};
