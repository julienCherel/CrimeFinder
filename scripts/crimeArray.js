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
                var tab=document.getElementById('tab_cat');
                for(c=0;c<categories.length-1;c++){
                    var count = 0;
                    for(i=0;i<data.length;i++){
                        if(data[i].category == categories[c][0]){
                            count++;
                            total++;
                        }
                    }
                    crimeArray.push([categories[c][1],count]);
                }
                crimeArray.push(["Total",total]);
                var txt='<a href="#" class="list-group-item ">';
                for (var i = 0; i < crimeArray.length; i++) {
                    txt+='<a href="#" class="list-group-item ">'
                    txt +=  crimeArray[i]+'</a>';
                }
                tab.innerHTML=txt;
                console.log(crimeArray);
            })
        } else {
            throw new Error("Données non disponible pour cette date et cordonnées");
        }
    })}
