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

let result = [];

let obj = jsonSource;

recurse(obj);

console.log(JSON.stringify(result, null, 4));


function recurse(value, name) {
  if (Object(value) !== value) {
    result.push({ name: name, value: value });
  } else if (Array.isArray(value)) {
    
    for (let i = 0; i < value.length; i++) {
      recurse(value[i], name + "[" + i + "]");
    }
    if (value.length === 0) {
      result.push({ name: name, value: [] });
    }
  } else {
    let isEmpty = true;
    for (const p in value) {
      isEmpty = false;
      recurse(value[p], name ? name + "." + p : p);
    }
    if (isEmpty) {
      result.push({ name: name, value: {} });
    }
  }
}
