var FLAG=0;
var xpath_data=[];
function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
          return true;
      }
  }

  return false;
}
function Launch_Browser(){
  $('#launch').prop('disabled', true);
  if($('input[name=url]').val().trim()==="" || !$('input[name=url]').val().includes("http")){
    $('#launch').prop('disabled', false);
    $.notify("Please Provide a valid URL", "error");

  }
  else{
  $.getJSON('/to_browse', {
    chat: $('input[name=url]').val(),
  }, function(data) {
    if(data.status==="FAIL"){
      
      $.notify("Browser Already Launched", "error");
    }
    $('#launch').prop('disabled', false);

});
}
   

}
$("#spin").hide();
$('#proceed').prop('disabled', true);
$('#collect').on('click', function() {
  $('#collect').prop('disabled', true);
  
  $("#mainContainer2").hide();
 
  $("#spin").show();
  $("#startpage").hide();
  $.getJSON('/collect', {
    chat: $('input[name=url]').val(),
  }, function(data) {
    if(data.status==="NOWINDOW"){

      $("#spin").hide();
      $("#startpage").show();
      $.notify("No suitable tabs found", "error");
      $('#collect').prop('disabled', false);


    }
    if(data.status==="FAIL"){
      $("#spin").hide();
      $("#startpage").show();
      $.notify("Driver is not initialized", "error");
      $('#collect').prop('disabled', false);
    }
    else{
      $("#spin").hide();
      var elemen='';
     for (d=0;d<data.result.length;d++){
      if(containsObject(data.result[d],xpath_data)){
       //pass
      }
      else{
        ///console.log(data.result[d],xpath_data);
        xpath_data.push(data.result[d]);
      }


     }
     ////xpath_data=xpath_data.concat(data.result);
      
      
      

      for(k=0;k<xpath_data.length;k++){
        var TXT=''
        xpath_data[k]['TEXT'].trim()===""?TXT=xpath_data[k]['OBJ']:TXT=xpath_data[k]['TEXT'];
        if(TXT.length>70){
          TXT=TXT.substring(0,70)+"..."
        }
        
      elemen+=' <li><div class="sectionContent '+xpath_data[k]['TAG']+'"   ><input id="CHECK_ELE" type="checkbox" name="Ele_value" value="'+xpath_data[k]['XPATH']+'" rel2="'+xpath_data[k]['TAG']+'" rel3="'+xpath_data[k]['TEXT']+'" rel="'+xpath_data[k]['OBJ']+'"><button type="button" class="collapsible2"> <h4 > <b>'+TXT+'</b></h4></button><div class="content2" ><p><h5><b>'+xpath_data[k]['XPATH']+'</b><a id="locate" rel="'+xpath_data[k]['XPATH']+'" onclick="Locate(this);" style="float:right;border:0px;" href="#"><i  class="fa fa-eye" style="color:#1c53a3;font-size:24px"></i></a></h5></p></div></div></li>';
    }
   
      document.getElementById("mainContainer2").innerHTML="<h2 style='padding-left:25px;margin:5px;'>Showing Total "+String(xpath_data.length)+" Results <a id='eraser' onclick='Eraser()' data-toggle='tooltip' title='Clear' style='margin:5px; ' href='#'><i class='fa fa-eraser' style='font-size:25px'></i></a><a id='XlsID'  data-toggle='tooltip' title='Save as Excel' style='margin:5px; ' href='#' onclick='downloadXls()'><i class='fa fa-file-excel-o' style='font-size:25px'></i></a></h2><br><input  type='text' id='myInput' onkeyup='myFunction()' placeholder='Search for Contents..' title='Type in a name'><br><ul id='myUL2'></ul>";
      document.getElementById("myUL2").innerHTML=elemen;
      $("#mainContainer2").show();
      for (i1 = 0; i1 < coll2.length; i1++) {
        coll2[i1].addEventListener("click", function() {
          this.classList.toggle("active");
          var content2 = this.nextElementSibling;
          if (content2.style.display === "block") {
            content2.style.display = "none";
          } else {
            content2.style.display = "block";
          }
        });
      }
      sections = $('.sectionContent');
      updateContentVisibility();


      $('#proceed').prop('disabled', false);
      $('#collect').prop('disabled', false);
    }
   

});
   
   

});
var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}
var editor_loc='';
$('#PAGELOCATOR').trigger('click');
$('#PAGEACTION').trigger('click');
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
            
            var TAB=`<div style=";border-color: #0d274c;border: 1px solid transparent;" class="w3-bar w3-black"><button id="L" class="w3-bar-item w3-button" onclick="openCity('London')">Page Locator</button><button id="P" class="w3-bar-item w3-button" onclick="openCity('Paris')">Page Action</button><a id="addcart" onclick="AddCart()" href="#" style="margin:7px;float:right;"><i class="fa fa-cart-plus" style="font-size:26px"></i></a><input name="filename_text" style="margin:7px;float:right;" placeholder="File Name" type="text" /></div>`
            document.getElementById("mainContainer2").innerHTML=TAB+'<div id="London"  style="left:0;margin:0;height:700px" class="w3-container city"><textarea id=code></textarea></div><div id="Paris" class="w3-container city" style="left:0;margin:0;height:700px;display:none"><textarea id=code2></textarea></div>'
            
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
            setTimeout(function() {
              editor_act.refresh();
          },1);
            $('#proceed').prop('disabled', true);
            $('pre').click();
            
          });
        }
        }	
   function Eraser(){

    $("#mainContainer2").hide();
    $("#startpage").show();
    xpath_data=[];
    $('#proceed').prop('disabled', true);

   }
   
   function Locate(x){

    x=x.rel;
  console.log(x);
  $.getJSON('/locate', {
    xpath:x,
    }, function(data) {

      if(data.status==="FAIL"){
        $.notify("Failed to locate the element", "warn");

      }


    });
   }

   function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(args) {
    var data, filename, link;

    var csv = convertArrayOfObjectsToCSV({
        data: xpath_data
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}
function downloadXls(){


  downloadCSV({ filename: "AllSteps.csv" });
}