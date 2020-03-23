var xpath_dataRec=[];
var xpath_dataRec_api=[];
var APIS=[];
var flag_api=0;
var XPATHS=[];


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
////$('#Paris').click()
$('#stop').hide();
var watch = (function(){
    var timer = document.getElementById("timer");
    var stop = document.getElementById("stop");
    var reset = document.getElementById("reset");
    var time = "00:00"
    var seconds = 0;
    var minutes = 0;
    var t;
  
    timer.textContent = time;
  
    function buildTimer () {
      seconds++;
          if (seconds >= 60) {
              seconds = 0;
              minutes++;
              if (minutes >= 60) {
                  minutes = 0;
                  seconds = 0;
              }
          }
      timer.textContent = (minutes < 10 ? "0" + minutes.toString(): minutes) + ":" + (seconds < 10 ? "0" + seconds.toString(): seconds);
        


         try{
          $.getJSON('/QRec', {
				  
            track:"Hello",
         }, function(data) {
          if(data.status==="FAIL"){
            
            alert("Error: Driver is not initialized");
      
            clearTimeout(t);
        timer.textContent = time;
        seconds = 0; minutes = 0;
        $('#stop').hide();
        $('#start').show();
      

          
          }
          else{
       var listss=''
       if(data.data!==null&&data.data.length!==0){
        if(containsObject(JSON.parse(data.data),xpath_data)){
         //pass
         console.log("Already Present")
        }
        else{
          ///console.log(data.result[d],xpath_data);
          xpath_data.push(JSON.parse(data.data));
        }
    
      console.log(xpath_data);
      listss+=`<div style='margin:5px;'><label >About `+String(xpath_data.length)+` results</label><input style="margin:5px" placeholder="Search for objects.." type="text" id="myInput" onkeyup="searchFunction()" /></div><hr>`;
        for(var k=0;k<xpath_data.length;k++){
          var TXT=''
          xpath_data[k]['TEXT'].trim()===""?TXT=xpath_data[k]['OBJ']:TXT=xpath_data[k]['TEXT'];
          if(TXT.length>70){
            TXT=TXT.substring(0,70)+"..."
          }
          listss+=`<li><div class='sectionContent'><button type='button' onclick="showDetails(`+k+`);" class='collapsible'><strong>`+TXT+`<i style="float:right" class="fa fa-angle-right"></i></strong></button></div></li>`;
  
          
  
  
        
       
      }
     
      document.getElementById("mylist").innerHTML=listss
      showDetails(xpath_data.length-1);
      }
            
     
        
    }
        });


     }
     catch(err){
      $.notify("Object Picker says:"+err, "error");
      console.log(err);
      $("#stop").trigger("click");
      
      $.getJSON('/QRec_Stop', {
				  
        track:"Hello",
     }, function(data) {


     });

     }
    }
    function stopTimer () {
      stop.addEventListener("click", function(){
        clearTimeout(t);
        timer.textContent = time;
        seconds = 0; minutes = 0;
        $('#stop').hide();
        $('#start').show();
        
        $.getJSON('/QRec_Stop', {
				  
          track:"Hello",
       }, function(data) {
         ///
  
  
       });
        
      })
     
    }
    function startTimer () {
      start.addEventListener("click", function(){
        clearTimeout(t);
        t = setInterval(buildTimer,1000);
        $('#start').hide();
        $('#stop').show();
      });
      
    }
    
    return {
      start: startTimer(),
      stop: stopTimer()
      
    };
  })()
  window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "\o/";
  
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage;                            //Webkit, Safari, Chrome
  });


  function convertArrayOfObjectsToCSVRec(args) {
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
function convertArrayOfObjectsToCSVRec_api(args) {
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
function downloadCSVRec(args) {
  if(xpath_dataRec.length===0){

    $.notify("Empty Recordings", "warn");
  }
    var data, filename, link;

    var csv = convertArrayOfObjectsToCSVRec({
        data: xpath_dataRec
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




// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



$('input[type="radio"]').on('change', function(){
var choice= $(this).val();
if(choice==="api"){
  $('#myTable').hide();


  flag_api=1;
 



}
else{

 

  flag_api=0;

}
});


function EraseRec(){
document.getElementById("mylist").innerHTML=`    <li><div class='sectionContent'><button type='button' class='collapsible'> <i class="fa fa-rocket"></i> <strong> Launch the browser and Go to URL.</strong></button></div></li>
<li><div class='sectionContent'><button type='button' class='collapsible'> <i class="fa fa-list"></i><strong> Once Launched pick objects.</strong> </button></div></li>
<li><div class='sectionContent'><button type='button' class='collapsible'> <i class="fa fa-file-excel-o"></i><strong> Save all objects as Excel. </strong> </button></div></li>
<li><div class='sectionContent'><button type='button' class='collapsible'> <i class="fa fa-eraser"></i> <strong>Click on  Eraser to clear. </strong></button></div></li>
`;
  xpath_data=[];
  document.getElementById("OPP").innerHTML='';
  document.getElementById("CSS").innerHTML='';
  document.getElementById("PROP").innerHTML='';
  document.getElementById("Tokyo").innerHTML='';
  $("#card-footer").fadeOut();
   
 

}

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

$(document).ready(function() {
document.getElementById("prop").click();

});
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function setFontSize(el) {
    var fontSize = el.val();
    
    if ( isNumber(fontSize) && fontSize >= 0.5 ) {
      $('body').css({ fontSize: fontSize + 'em' });
    } else if ( fontSize ) {
      el.val('1');
      $('body').css({ fontSize: '1em' });  
    }
}

$(function() {
  
  $('#fontSize')
    .bind('change', function(){ setFontSize($(this)); })
    .bind('keyup', function(e){
      if (e.keyCode == 27) {
        $(this).val('1');
        $('#Tokyo').css({ fontSize: '1em' });  
      } else {
        setFontSize($(this));
      }
    });
  
  $(window)
    .bind('keyup', function(e){
      if (e.keyCode == 27) {
        $('#fontSize').val('1');
        $('#Tokyo').css({ fontSize: '1em' });  
      }
    });
  
});

function Launch(){


  $.getJSON('/launch', {
				  
    track:"Hello",
 }, function(data) {

console.log(data);
 });


}

function CopyToClipboard(containerid) {
  if (document.selection) { 
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select().createTextRange();
      document.execCommand("copy"); 
  
  } else if (window.getSelection) {
      var range = document.createRange();
       range.selectNode(document.getElementById(containerid));
       window.getSelection().addRange(range);
       document.execCommand("copy");
    alert("Xpath Copied to Clipboard"); 
  }}


  function GetAll(){


    $.getJSON('/collect', {
				  
      track:"Hello",
   }, function(data) {

    if(data.status==="FAIL"){
     alert("Error: Driver is not initialized");

    }



    else{
    for (d=0;d<data.data.length;d++){
      if(containsObject(data.data[d],xpath_data)){
       //pass
      }
      else{
        ///console.log(data.result[d],xpath_data);
        xpath_data.push(data.data[d]);
      }
    }
   
            var listss=''
   
    if(xpath_data!==null&&xpath_data.length!==0){
      listss+=`<div style='margin:5px;'><label >About `+String(xpath_data.length)+` results</label><input style="margin:5px" placeholder="Search for objects.." type="text" id="myInput" onkeyup="searchFunction()" /></div><hr>`;
      for(var k=0;k<xpath_data.length;k++){
        var TXT=''
        xpath_data[k]['TEXT'].trim()===""?TXT=xpath_data[k]['OBJ']:TXT=xpath_data[k]['TEXT'];
        if(TXT.length>70){
          TXT=TXT.substring(0,70)+"..."
        }
        listss+=`<li><div class='sectionContent'><button type='button' onclick="showDetails(`+k+`);" class='collapsible'><strong>`+TXT+`<i style="float:right" class="fa fa-angle-right"></i></strong></button></div></li>`;

        


      
     
    }
   
    document.getElementById("mylist").innerHTML=listss
    showDetails(xpath_data.length-1);
    }
  }
   });


  }

  function showDetails(x){



var row_data=xpath_data[x];
var node_html=''
for(var t=0;t<row_data["NODES"].length;t++){
  var table = document.getElementById('myTable').getElementsByTagName('tbody')[0];
  var row = table;
 
  
  node_html += '<tr><td class="text-left">'+row_data["NODES"][t]+'</td><td class="text-left">'+row_data["VALUES"][t].substring(0,50)+'</td></tr>';

 
  }
  row.innerHTML=node_html;
  var style_html='';
  for(var t=0;t<row_data["STYLE_NODES"].length;t++){
    var table2 = document.getElementById('myTable2').getElementsByTagName('tbody')[0];
    var row2 = table2;
   
    
    style_html+=  '<tr><td class="text-left">'+row_data["STYLE_NODES"][t]+'</td><td class="text-left">'+row_data["STYLE_VALUES"][t].substring(0,50)+'</td></tr>';

   
    }
    row2.innerHTML=style_html;
    var op_html=''
    for(var t=0;t<row_data["OPERATIONS"].length;t++){
      var table3 = document.getElementById('myTable3').getElementsByTagName('tbody')[0];
      var row3 = table3;
     
      
      op_html+= '<tr><td class="text-left">'+row_data["OPERATIONS"][t]+'</td><td class="text-left">'+row_data["OPERATIONS_VALUES"][t].substring(0,50)+'</td></tr>';

     
      }
      row3.innerHTML=op_html;
    document.getElementById("Tokyo").innerHTML=row_data["HIERARCHY"];
    document.getElementById("card-footer").innerHTML="<p >Relative Xpath: <span id='div1' >"+row_data["XPATH"]+"</span><a id='copy' title='Copy Xpath to Clipboard' href='#'><i style='font-size:20px;float:right;color:white;' class='fa fa-clipboard' ></i></a> </p>";
    $("#card-footer").fadeIn();
    var myEl = document.getElementById('copy');

    myEl.addEventListener('click', function() {
      CopyToClipboard('div1');
    }, false);

  }

  function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("mylist");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("button")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}