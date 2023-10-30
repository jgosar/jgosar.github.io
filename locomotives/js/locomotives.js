const compareStrings = (s1, s2) => (s1 < s2 ? -1 : s1 > s2 ? 1 : 0);

// sortFunctions
const byId = (loco) => `${loco.id.padStart(3, "0")}`;
const byPrice = (loco) => `${loco.price.padStart(3, "0")}`;
const byPriceDesc = (loco) => 0 - parseInt(loco.price, 10);
const byCountryAndType = (loco) =>
  `${loco.country}-${loco.railroad}-${loco.class.padStart(10, "0")}-${loco.id}`;

const SORT_FUNCTION_CONFIG = {
  id: {
    name: "Po IDju",
    function: byId,
  },
  price: {
    name: "Po ceni (naraščajoče)",
    function: byPrice,
  },
  priceDesc: {
    name: "Po ceni (padajoče)",
    function: byPriceDesc,
  },
  countryAndType: {
    name: "Po državi in tipu",
    function: byCountryAndType,
  },
};

let selectedSort = "countryAndType";

const compareLocomotives = (sortFunction) => (l1, l2) =>
  compareStrings(sortFunction(l1), sortFunction(l2));

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

const initSortOptions = () => {
  const parentElement = document.getElementById("sortSelector");
  Object.entries(SORT_FUNCTION_CONFIG).forEach(([key, value]) => {
    const radioButton = document.createElement("input");
    setAttributes(radioButton, {
      type: "radio",
      name: "sortFunction",
      value: key,
      checked: selectedSort === key,
      id: `sortBy${key}`,
      onclick: `changeSort('${key}')`,
    });
    parentElement.appendChild(radioButton);
    const radioLabel = document.createElement("label");
    setAttributes(radioLabel, {
      for: `sortBy${key}`,
      name: "sortFunction",
    });
    radioLabel.innerText = value.name;
    parentElement.appendChild(radioLabel);
    parentElement.appendChild(document.createElement("br"));
  });
};

const loadData = () => {
  const sortFunction = SORT_FUNCTION_CONFIG[selectedSort].function;
  const parentElement = document.getElementById("locomotives");
  parentElement.innerHTML = "";
  fetch("./data/locomotives.csv")
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const csvFileCells = parseCsvFile(buffer);

      const parsedData = csvFileCells
        .slice(1)
        .map(mapCsvRowToLocomotive)
        .sort(compareLocomotives(sortFunction));

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

window.onload = () => {
  initSortOptions();
  loadData();
};

changeSort = (newSelectedSort) => {
  selectedSort = newSelectedSort;
  loadData();
};
