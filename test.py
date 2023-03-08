import json
jsonSource = {
    "model": {
        "@context": "https://r-cdbapp02.abus.de/api/v1/context/model",
        "@id": "https://r-cdbapp02.abus.de/api/v1/collection/document/00000831_002@02",
        "abus_arbeitstitel": "ZYL_05_01",
        "abus_artikelkategorie": "Entwicklung",
        "abus_bez_werkst": "CuZn37/F55",
        "abus_empb": 1,
        "abus_urheber": "2062",
        "abus_urheberdatum": "2006-03-21T00:00:00",
        "system:rules": "https://r-cdbapp02.abus.de/api/v1/collection/document/00000831_002@02/rules",
        "relship:files": {
            "@id": "https://r-cdb.abus.de/api-test",
            "targets": [
                {
                    "@id": "https://r-cdbapp00.abus.de/api-test/[0]",
                    "cdb_cdate": "2020-01-01T15:52:23",
                    "cdbf_fsize": 108165,
                    "cdbf_name": "00000831_002.drw",
                    "cdbf_object_id": "1aa5398f-7c36-11e2-a97c-00505681164f",
                    "system:classname": "cdb_file",
                    "system:content_type": "application/octet-stream"
                },
                {
                    "@id": "https://r-cdbapp01.abus.de/api-test/[1]",
                    "cdb_cdate": "2021-02-02T15:52:23",
                    "cdbf_fsize": 108165,
                    "cdbf_name": "00000831_002.drw",
                    "cdbf_object_id": "1aa5398f-7c36-11e2-a97c-00505681164f",
                    "system:classname": "cdb_file",
                    "system:content_type": "application/octet-stream"
                }
            ]
        }
    },
    "relship": {
        "LastChange": {
            "abus_ae_kat": "Modifikation"
        },
        "example": True
    }
}

result = {"result": []}

def recurse(value, name=""):
    if not isinstance(value, dict) and not isinstance(value, list):
        result["result"].append({"name": name, "value": value})
    elif isinstance(value, list):
        for i in range(len(value)):
            recurse(value[i], f"{name}[{i}]")
        if len(value) == 0:
            result["result"].append({"name": name, "value": []})
    else:
        is_empty = True
        for p in value:
            is_empty = False
            recurse(value[p], f"{name}.{p}" if name else p)
        if is_empty:
            result["result"].append({"name": name, "value": {}})

recurse(jsonSource)
print(json.dumps(result, indent=4))