var editor_loc='';
var editor_act='';
$('#proceed').prop('disabled', true);
$('#proceed').on('click', function(e){
    if(document.getElementById('PAGELOCATOR').checked&&document.getElementById('PAGEACTION').checked) {
  
          console.log("Both");
          FLAG=1;
          gen_page("Both");
          
  
      }
     else{
  
      if(document.getElementById('PAGELOCATOR').checked){
        console.log("Page Loc")
        FLAG=2;
        gen_page("PageLoc");
      }
      
      if(document.getElementById('PAGEACTION').checked){
        console.log("Page Act")
        FLAG=3;
        gen_page("PageAct");
      }
      else{
        if(!document.getElementById('PAGEACTION').checked&&!document.getElementById('PAGELOCATOR').checked){
          $.notify("Please Select Class", "warn");
        }
      }
              }
   
   
  
  });


  
function gen_page(SELE){

    var XPATH=[]
    var NAME=[]
    var TAG=[];
     $("input:checkbox").each(function() {
            if ($(this).is(":checked")&&$(this).attr('id')==="CHECK_ELE") {
              
    
          var q= $(this).attr('value');
          var o= $(this).attr('rel');
          var j= $(this).attr('rel2');
         
          XPATH.push(q);
          TAG.push(j);
          NAME.push(o);
          
          }
          
            });
            if(XPATH.length===0){
              $.notify("Please select the locators", "warn");
            }
            else{
              ///console.log(XPATH);
            
               $.getJSON('/to_pageloc', {
              
               xpath:JSON.stringify(XPATH),
               name:JSON.stringify(NAME),
               tag:JSON.stringify(TAG),
               
            }, function(data) {
              ///console.log(data.result);
              
              var TAB=`<div id="tabhead" class="tab"><button id="L" class="tablinks" onclick="openCity2('London')"><b>Page Locator</b></button><button id="P" class="tablinks" onclick="openCity2('Paris')"><b>Page Action</b></button><button onclick="window.location.href = '/';" class="tablinks" ><i class="fa fa-arrow-left" ></i></button></div>`
              document.getElementById("mainContainer2").innerHTML='<div id="London"  style="left:0;margin:0;height:700px" class="w3-container city"><textarea id=code></textarea></div><div id="Paris" class="w3-container city" style="left:0;margin:0;height:700px;display:none"><textarea id=code2></textarea></div>'
              $( "#tabhead" ).replaceWith( TAB);

              if(SELE==="Both"){
                $("#L").show();
                $("#P").show();
  
              }
              if(SELE==="PageLoc"){
                $("#L").show();
                $("#P").hide();
                
              }
              if(SELE==="PageAct"){
                $("#L").hide();
                $("#P").show();
  
  
              }
              editor_loc = CodeMirror.fromTextArea(document.getElementById("code"), {
               lineNumbers: true,
              mode:"text/x-java",
               matchBrackets: true,
               autoRefresh:true
               
            });
            editor_act = CodeMirror.fromTextArea(document.getElementById("code2"), {
              lineNumbers: true,
             mode:"text/x-java",
              matchBrackets: true,
              autoRefresh:true
              
           });
             editor_loc.setSize(865, 700);
    editor_act.setSize(865, 700);
              editor_loc.setValue(data.result);
              
              
              editor_loc.refresh();
              editor_act.setValue(data.result2);
             
              $('#proceed').prop('disabled', true);
              $('L').click();
              editor_loc.refresh();
              $('P').click();
              editor_act.refresh();
              $('L').click();
              editor_loc.refresh();
              
            });
          }
          }	