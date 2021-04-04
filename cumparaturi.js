function Produs(produs, cantitate) {
    this.produs = produs;
    this.cantitate = cantitate;
  }

  //adaug produsul in localstorage si tabel
  function addProd(){
    var prod = document.getElementById("produs").value;
    var can = document.getElementById("cantitate").value;
    let pr={produs: prod,
    cantitate: can
    }
    adaugaProdus(pr);
    var produs=new Produs(prod,can);
    if (produs.produs && produs.cantitate) { 
    //localStorage.setItem(produs.produs,produs.cantitate); 
    let cos=localStorage.getItem("cos")? localStorage.getItem("cos"):"[]";
    cos=JSON.parse(cos);
    cos.push(pr);
    localStorage.setItem("cos",JSON.stringify(cos));
    }
  }

  //adaug prod in tabel
  function adaugaProdus(produs){
    
    let tabel=document.getElementById("cumparaturi");
  
    let tr=document.createElement("tr");
  
    let td=document.createElement("td");
    td.innerHTML=produs.produs;
    tr.appendChild(td);
  
    let td1=document.createElement("td");
    td1.innerHTML=produs.cantitate;
    tr.appendChild(td1);

    tabel.appendChild(tr);
  }

  //adaug din localStorage in tabel
  function getFromStorage(){
    console.log("hello");
    let cos=localStorage.getItem("cos")? localStorage.getItem("cos"):"[]";
    cos=JSON.parse(cos);
    cos.forEach(element => {
      console.log(element);
      adaugaProdus(element);
    });
  }
  getFromStorage();