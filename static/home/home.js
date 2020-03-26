function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }
  



  var cartitem2='';
			
			 var coll = document.getElementsByClassName("collapsible");
			 var coll2 = document.getElementsByClassName("collapsible2");
  $('#mycart').on('click', function(e){

    $.getJSON('/getcart', {
      chat:"Cart",
    }, function(data) {
      console.log(data.ITEMS);
      var cartitem=data.ITEMS;
      if (cartitem.length==0){
        var feat_emp='';
         console.log('empty');
         feat_emp='<div id="horform"   ><h3 id="e_cart" align="center" style="color:red;">  Oops! Your Cart is Empty</h3></div>';
         $('#horform').replaceWith(feat_emp);
         
          $('#myModal').modal('show');
         }
         else{
          $('#edit_cart').show()
         $('#deleteAcc').show()
         $('#down_cart').show()
        var feat='';
        var feat_tab='';
        console.log('not empty');
       $("#horform").hide();
       for(k=0;k<cartitem.length;k++){
     
       
       feat+=' <div   ><input  type="checkbox" name="vehicle1" value="'+cartitem[k]['ID']+' " ><button type="button" class="collapsible"> <b>File Name:</b>  '+cartitem[k]['nam']+'</button><div class="content" ><pre>'+cartitem[k]['content']+'</pre></div></div>';
     
                            
                                               
                                                   
                                               
       }
       
       var feat2=feat;
      // console.log("FEATT: "+feat2);
       document.getElementById("hor").innerHTML=feat2;
       //$('#hor').replaceWith(feat2);  
         $('#myModal').modal('show');
        
         for (i = 0; i < coll.length; i++) {
          coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
          });
        }



}


    });
   

  });
  function TriggerQAsk(){
    document.getElementById("chat-circle").click();
   }

   $("#PLPAbody").hide();
function PLPA(){

  $("#HOMEbody").fadeOut();
  $("#PLPAbody").fadeIn();
  $("#gluecode").fadeOut();
}
function HomeTrigger(){
  $("#PLPAbody").fadeOut();
  $("#HOMEbody").fadeIn();
  $("#gluecode").fadeOut();


}
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});
function open_recorder(){



  var left  = ($(window).width()/2)-(900/2),
  top   = ($(window).height()/2)-(600/2),
  popup = window.open ("/home/recorder", "mywin","menubar=1, width=900, resizable=0,height=600, top="+top+", left="+left);
}

function showGluecode(){
  $( '#step1' ).trigger( 'click' );
  $("#PLPAbody").fadeOut();
  $("#HOMEbody").fadeOut();
  $("#gluecode").fadeIn();
  editor_input.refresh();

}

$("#gluecode").hide();