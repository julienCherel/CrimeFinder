// retourne les nombres de crime pour chaque catégorie
// entrée : lat et lng : les coordonnées géographique
//        : date : la date du crime en format YYYY-MM (2017-01)
// var : categories : tableau contenant toutes les catégories de crime
//     : crimeArray : tableau contenant les effectifs

function crimeArray(lat, lng, date){

    // récupère les différentes catégories pour une date donnée

    fetch('https://data.police.uk/api/crime-categories?date='+date).then(
        function(response){
            if(response.ok){
                response.json().then(function(data){
                    categories = [];
                    for(i=1;i<data.length;i++){
                        categories.push([data[i].url,data[i].name]);
                    }})}
            else{
                throw new Error("Données non disponible pour cette date");
            }
        })


    // récupère les valeurs de chaque catégorie de crime

    fetch('https://data.police.uk/api/crimes-street/all-crime?lat='+lat+'&lng='+lng+'&date='+date).then(
    function(response){
        if(response.ok){
            response.json().then(function(data){
                var crimeArray = [];

                var total = 0;
                var tmp='';
                var list = document.getElementById('liste_id');
                for(c=0;c<categories.length-1;c++){
                    var count = 0;
                    var donnees = [];
                    for(i=0;i<data.length;i++){
                        if(data[i].category == categories[c][0]){
                            count++;
                            total++;
                            donnees.push(data[i]);                        }
                    }
                    crimeArray.push([categories[c][1],count,donnees]);
                    
                }
                for (var i = 0; i < crimeArray.length; i++) {
                    var contenue = crimeArray[i][2];                    
                    tmp+='<h5 class="panel-title">';
                    tmp+='<a data-toggle="collapse" '+
                    'class="list-group-item d-flex justify-content-between align-items-center" '+
                    'href="#cat'+crimeArray[i][0].substring(0,3)+'">'+
                    crimeArray[i][0]+'<span class="badge badge-primary badge-pill">'+
                    crimeArray[i][1]+'</span></a>';
                    tmp+='</h5>';
                    var tmp2 = '<div id="cat'+crimeArray[i][0].substring(0,3)+'" class="panel-collapse collapse">';
                    tmp2+='<ul class="list-group">'
                    for (var j = 0; j < contenue.length; j++) {
                        //console.log(contenue[j].location_type,contenue[j].context,
                        //contenue[j].outcome_status);
                        console.log(contenue[j]);
                        tmp2+='<li class="list-group-item"> Street : '
                        +contenue[j].location.street.name+'<br />Location type : '+
                        contenue[j].location_type+'</li>';
                        }
                    
                    tmp2+='</ul></div>';
                    tmp+=tmp2;
                }
                crimeArray.push(["Total",total]);
                //console.log(crimeArray);
                document.getElementById("crime").innerHTML = "";
                if(total == 0){
                    document.getElementById("crime").setAttribute("class","text-danger");
                    document.getElementById("crime").innerHTML = "Données non disponible pour cette date et cordonnées";
                    list.innerHTML = "";
                } else{
                    list.innerHTML=tmp;
                }
            })
        } else {
            console.log(date)
            if (date == '-undefined') {
                document.getElementById("crime").setAttribute("class","text-danger");
                document.getElementById("date").setAttribute("class","form-control is-invalid");
                document.getElementById("crime").innerHTML = "Veuillez selectionner une date et cliquer sur le map";

            }
            throw new Error("Données non disponible pour cette date et cordonnées");
        }
    })}


    function StreetLevelCrimeByLatLng(lat,lng,date){
    fetch("https://data.police.uk/api/crimes-street/all-crime?lat="+lat+"&lng="+lng+"&date="+date).then(
        function(response){
            response.json().then(function(d){
                p = document.getElementById('crime');
                //console.log(d[0].category);
                p.innerHTML = d[0].category;
                }
            )
        }
        )
    }

    function dateUpdate(){
        document.getElementById("date").setAttribute("class","form-control");

    }
