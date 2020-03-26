var sections = $('.sectionContent');
function updateContentVisibility(){
    var checked = $("#filterControls :checkbox:checked");
    if(checked.length){
        sections.hide();
        checked.each(function(){
            $("." + $(this).val()).show();
        });
    } else {
        sections.show();
    }
}

$(".nested :checkbox").click(updateContentVisibility);
function checkAll(ele) {
  var checkboxes = document.getElementsByName("Ele_value")
  if (ele.checked) {
      for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].type == 'checkbox') {
              checkboxes[i].checked = true;
          }
      }
  } else {
      for (var i = 0; i < checkboxes.length; i++) {
          console.log(i)
          if (checkboxes[i].type == 'checkbox') {
              checkboxes[i].checked = false;
          }
      }
  }
}
function checkAllContents(ele){


    var checkboxes = document.getElementsByName("Ele_value")
    if (ele.checked) {
        for (var i = 0; i < checkboxes.length; i++) {
            console.log(checkboxes[i].getAttribute('rel3').trim());
            if (checkboxes[i].type == 'checkbox' &&checkboxes[i].getAttribute('rel3').trim()!=="") {
                checkboxes[i].checked = true;
            }
        }
    } else {
        for (var i = 0; i < checkboxes.length; i++) {
            console.log(i)
            if (checkboxes[i].type == 'checkbox') {
                checkboxes[i].checked = false;
            }
        }
    }





}

  function openCity2(cityName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    document.getElementById(cityName).style.display = "block";  
  }