/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Response templates for JSON API responses.
 */

// Creates an attribute object, whose values are to be added to Attributes object.
function Attribute(name, value) {
  return {
    "name": name,
    "value": value
  };
}

/*
* Creates an Attributes object from a list of Attribute objects.
* The Attributes object contains the values of the list items
* as key-value pairs. To be added inside Data object.
*/
function Attributes(attlist) {
  let atts = new Object();

  for (let att of attlist) {
    atts[att["name"]] = att["value"];
  }

  return atts;
}

// Creates a Data object. To be added to SingleDocumentObject.
function Data(type, id, attributes) {
  return {
    "type": type,
    "id": id,
    "attributes": attributes
  };
}

// Creates a single document to be send as an API response.
function SingleDocument(selfLink, data) {
  return {
    "links": {
      "self": selfLink
    },
    "data": data
  };
}

function Relatioships(rellist) {
  let rels = new Object();

  for (let rel of rellist) {
    rels[rel["name"]] = rel["value"];
  }

  return rels;
}

function Relationship(name, value) {
  return {
    "name": name,
    "value": value
  };
}

function Relationmain(parentType, id, type, data) {
  return {
    "links": {
      "self": "http://"+hostname+":"+port+"/api/"+parentType+"/"+id+"/relationships/"+type,
      "related": "http://"+hostname+":"+port+"/api/"+parentType+"/"+id+"/"+type
    },
    "data": data
  };
}

function RelationData(type, id) {
  return {
    "type": type,
    "id": id
  };
}