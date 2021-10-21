module.exports = (docs, fields, lang) => {
  const newDocs = [];
  for (let doc of docs) {
    console.log(doc);
    //let doc = doc;
    for (let field of fields) {
      const splited = field.split('.');
      let toChange = doc[splited[0]]; //{ ...doc.toObject() };
      let index = 0;
      for (let f of splited) {
        doc[f] = toChange;
        if (index == splited.length - 1) {
          toChange[f] = toChange[f][lang];
        } else if (index !== 0) {
          toChange = toChange[f];
        }

        index++;
      }
      console.log('doc: ', doc.city);
    }
    newDocs.push(doc);
  }

  return newDocs;
};
