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
