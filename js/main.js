const jsonSource = {
  model: {
    "@context": "https://r-cdbapp02.abus.de/api/v1/context/model",
    "@id":
      "https://r-cdbapp02.abus.de/api/v1/collection/document/00000831_002@02",
    abus_arbeitstitel: "ZYL_05_01",
    abus_artikelkategorie: "Entwicklung",
    abus_bez_werkst: "CuZn37/F55",
    abus_empb: 1,
    abus_urheber: "2062",
    abus_urheberdatum: "2006-03-21T00:00:00",
    "system:rules":
      "https://r-cdbapp02.abus.de/api/v1/collection/document/00000831_002@02/rules",
    "relship:files": {
      "@id": "https://r-cdb.abus.de/api-test",
      targets: [
        {
          "@id": "https://r-cdbapp00.abus.de/api-test/[0]",
          cdb_cdate: "2020-01-01T15:52:23",
          cdbf_fsize: 108165,
          cdbf_name: "00000831_002.drw",
          cdbf_object_id: "1aa5398f-7c36-11e2-a97c-00505681164f",
          "system:classname": "cdb_file",
          "system:content_type": "application/octet-stream",
        },
        {
          "@id": "https://r-cdbapp01.abus.de/api-test/[1]",
          cdb_cdate: "2021-02-02T15:52:23",
          cdbf_fsize: 108165,
          cdbf_name: "00000831_002.drw",
          cdbf_object_id: "1aa5398f-7c36-11e2-a97c-00505681164f",
          "system:classname": "cdb_file",
          "system:content_type": "application/octet-stream",
        },
      ],
    },
  },
  relship: {
    LastChange: {
      abus_ae_kat: "Modifikation",
    },
    example: true,
  },
};

let result = {
  results: [],
};

let obj = jsonSource;

for (const [key, value] of Object.entries(obj)) {
  if (isObject(value)) {
    stepIn(value);
  } else addResultObject(findPath(obj, key, value), value);
}

console.log(JSON.stringify(result, null, 4));


/**Funktionen**/

function stepIn(value) {
  for (const [insideKey, insideValue] of Object.entries(value)) {
    if (insideValue instanceof Array) {
      for (let i = 0; i < insideValue.length; i++) {
        if (typeof insideValue[i] === "object") {
          stepIn(insideValue[i]);
        }
      }
    } else if (
      typeof insideValue !== "object" && !(insideValue instanceof Array)
    ) {
      addResultObject(findPath(obj, insideKey, insideValue), insideValue);
    } else {
      stepIn(insideValue);
    }
  }
}

function addResultObject(path, value) {
  let objForArray = { name: path, value: value };
  result.results.push(objForArray);
}

function isObject(value) {
  return typeof value === "object" && value !== null ? true : false;
}

function findPath(obj, name, value, currentPath) {
  currentPath = currentPath || "";

  let matchingPath;

  if (!obj || typeof obj !== "object") return;

  if (obj[name] === value) return `${currentPath}['${name}']`;

  for (const key of Object.keys(obj)) {
    if (key === name && obj[key] === value) {
      matchingPath = currentPath;
    } else {
      if (currentPath === "") {
        matchingPath = findPath(obj[key], name, value, `${key}.`);
      } else {
        matchingPath = findPath(obj[key], name, value, `${currentPath}['${key}']`);
      }
    }

    if (matchingPath) break;
  }

  return matchingPath;
}

