(function(){
  "use strict";


  var Moosipurk = function(){

    // SINGLETON PATTERN (4 rida)
    if(Moosipurk.instance){
      return Moosipurk.instance;
    }
    Moosipurk.instance = this; // this viitab moosipurgile

    this.routes = Moosipurk.routes;

    console.log(this);
    //console.log('moosipurgi sees');

    // KÕIK MUUTUJAD, mis on üldised ja muudetavad
    this.currentRoute = null; //hoian meeles mis lehel olen
    this.interval = null;


    //panen rakenduse tööle
    this.init();
  };
  //kirjeldatud kõik lehed
  Moosipurk.routes = {
    "home-view": {
      render: function(){
        //k2ivitan kui j6uan lehele
        console.log('JS avalehel');
        if(this.interval){clearInterval(this.interval) };
        var seconds = 0
        this.interval = window.setInterval(function(){
          seconds++;
          document.querySelector('#counter').innerHTML = seconds;



    //iga 500millisekundi tagant k2ivitab writedate
  }, 1000);
      }
    },
    "list-view": {
      render: function(){
        console.log('JS loendi lehel');

      }
    },
    "manage-view": {
      render: function(){
        console.log('JS halduse lehel');

      }
    }
  };

  //kõik moosipurgi funktsioonid tulevad siia sisse
  Moosipurk.prototype = {
    init: function(){
      console.log('rakendus käivitus');
      // Siia tuleb esialgne loogika


      window.addEventListener('hashchange', this.routeChange.bind(this));
//vaatan mis lehel olen, kui ei ole hashi lisan avalehe
    console.log(window.location.hash);
    if(!window.location.hash){
      window.location.hash = "home-view";
    }else{
      this.routeChange();
    }
      // hakka kuulama hiireklõpse
      this.bindMouseEvents();
    },
    bindMouseEvents: function(){
      document.querySelector('.add-new-jar').addEventListener('click', this.addNewClick.bind(this));
    },
    addNewClick: function(event){
      //console.log(event);
      var title = document.querySelector('.title').value
      var ingredients = document.querySelector('.ingredients').value
      console.log(title + ' ' + ingredients)

      var new_jar = new Jar(title, ingredients);
      var li = new_jar.createHtmlElement();
      document.querySelector('.list-of-jars').appendChild(li);

    },
    routeChange: function(event){


      this.currentRoute = window.location.hash.slice(1);

      if(this.routes[this.currentRoute]){

        this.updateMenu();
        console.log('>.< ' + this.currentRoute);
        //k2ivitan selle lehe jaoks etten2htud js
        this.routes[this.currentRoute].render();

      }else{
        console.log('404');
        window.location.hash = "home-view";

      }
    },
    updateMenu: function(){

      //kui on mingil menyyl klass active menu siis v6tame 2ra
      document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace(' active-menu', '');
      //k2esolevale lehele lisan juurde
      document.querySelector('.' + this.currentRoute).className += ' active-menu ';
    }



  };
  var Jar = function(new_title, new_ingredients){
     this.title = new_title;
     this.ingredients = new_ingredients;
   };

   Jar.prototype = {
     createHtmlElement: function(){
       // anda tagasi ilus html
       var li = document.createElement('li');

       var span = document.createElement('span');
       span.className = 'letter';

       var letter = document.createTextNode(this.title.charAt(0));
       span.appendChild(letter);

       li.appendChild(span);

       var content_span = document.createElement('span');
       content_span.className = 'content';

       var content = document.createTextNode(this.title + ' | ' + this.ingredients);
       content_span.appendChild(content);

       li.appendChild(content_span);

       console.log(li);

       return li;

       //return this.title + '<button class='add-new-jar' <br>';
     }
   };


   window.onload = function(){
     var app = new Moosipurk();
   };


})();
