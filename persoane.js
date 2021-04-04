// adaug persoana in tabel
function adaugaPersoana(persoana){
    console.log(persoana);
    let tabel=document.getElementById("persoane");
  
    let tr=document.createElement("tr");
  
    let td=document.createElement("td");
    td.innerHTML=persoana.nume["#text"];
    tr.appendChild(td);
  
    let td1=document.createElement("td");
    td1.innerHTML=persoana.prenume["#text"];
    tr.appendChild(td1);
  
    let td2=document.createElement("td");
    td2.innerHTML=persoana.varsta["#text"];
    tr.appendChild(td2);
  
    tabel.appendChild(tr);
  }
  
  //promise care intoarce continutul fisierului resursa.xml
  function getFile(resursa) {
    return new Promise((resolve)=>{
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
       resolve(xhttp.responseText)
    
      }
         
      };
      xhttp.open("GET", resursa+".xml", true);
      xhttp.send();
    })
  }
  
  //scoate mesajul si adauga tabelul 
  function showTable(){
    let text=document.getElementById("status");
    text.style.display="none";
  
    let tab=document.getElementById("tabel");
    tab.style.display="";
  }
  
  //
  getFile("resurse/persoane")
  .then(response=>{
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(response,"text/xml");
  
    let temp=xmlToJson(xmlDoc);
    console.log(temp);
    temp.persoane.persoana.forEach(element=>{
      adaugaPersoana(element);
    })
    setTimeout(showTable,3000);
  })
  
  function xmlToJson(xml) {
      
      // Create the return object
      var obj = {};
  
      if (xml.nodeType == 1) { // element
          // do attributes
          if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
              for (var j = 0; j < xml.attributes.length; j++) {
                  var attribute = xml.attributes.item(j);
                  obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
              }
          }
      } else if (xml.nodeType == 3) { // text
          obj = xml.nodeValue;
      }
  
      // do children
      if (xml.hasChildNodes()) {
          for(var i = 0; i < xml.childNodes.length; i++) {
              var item = xml.childNodes.item(i);
              var nodeName = item.nodeName;
              if (typeof(obj[nodeName]) == "undefined") {
                  obj[nodeName] = xmlToJson(item);
              } else {
                  if (typeof(obj[nodeName].push) == "undefined") {
                      var old = obj[nodeName];
                      obj[nodeName] = [];
                      obj[nodeName].push(old);
                  }
                  obj[nodeName].push(xmlToJson(item));
              }
          }
      }
      return obj;
  };