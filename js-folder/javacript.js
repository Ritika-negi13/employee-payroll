// function onSubmit()
// {
//     let name=document.getElementById("textname").value;
//     console.log("submit  : ");
//     alert(name);
// }
$(document).ready(()=>{
    $("#btnClick").click(function(e){
        //alert("Hi, all good??");
        getEmplyeeList();
    })
})
function getEmplyeeList(){
        $.ajax({
            type:"GET",
            url:"http://localhost:3000/employee",
            success:function(res){
                console.log(res);
            },
            error:function(err){
                console.log(err)
            }
        })
}

function openPopup() {
    document.getElementById("myForm").style.display = "block";
    document.getElementsByClassName("backdrop")[0].style.display = "block";
}
  
function closePopup() {
    document.getElementById("myForm").style.display = "none";
    document.getElementsByClassName("backdrop")[0].style.display = "none";
}
function deleteData(){
    document.getElementById("ondelete").style.display = "";
    console.log("delete")
}
function openSearchbar(){
    document.getElementById("myInput").style.display =""; 
}

function onSearch() {
    var input, filter, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table=document.getElementById("employeetable");
    tr=table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td2 =tr[i].getElementsByTagName("td")[2];
        if (td || td2) {
          txtValue = td.textContent || td.innerText;
          txtgender= td2.textContent || td2.innerText;
          console.log(filter);
          if ( txtValue.toUpperCase().indexOf(filter) > -1 || txtgender.toUpperCase().startsWith(filter)==1) {
            tr[i].style.display = "";
          } 
          else {
            tr[i].style.display = "none";
          }
        }      
    }
}