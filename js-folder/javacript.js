$(function (e) {
    getEmployeeDetails();
});

function getEmployeeDetails() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/Employee",
        success: function (res) {
            
            for (var i = 0; i < res.length; i++) {
                
                let data = `
                <tr id=${res[i].id}>
                    <td>
                        <img src="${res[i].img}">
                    </td>
                    <td>${res[i].name}</td>
                    <td>${res[i].gender}</td>
                    <td>
                        ${res[i].department.map(element => `<span class="span">${element}</span>`).join(' ')}
                    </td>   
                    <td>₹ ${res[i].salary}</td>
                    <td>${res[i].startDate}</td>
                    <td class="icon"> 
                        <span>
                            <i class="material-icons" onclick="openPopup(this)">&#xe872;</i>
                        </span>
                        <span>
                            <i class="material-icons" onclick="editData(this)">&#xe3c9;</i>
                        </span>
                    </td>
                </tr>
                `;
                $("#tbl-details").append(data);
            }
        },
        error: function (err) {
 
        }
    })
}

function deleteData(id){
        $.ajax(
            {
                url:"http://localhost:3000/Employee/"+id,
                type:"DELETE",
                success:() =>{
                    console.log('something')
                },
                error:(e)=>{console.log(e)}
            }
        )
}


// function getEmplyeeList(){
//         $.ajax({
//             type:"GET",
//             url:"http://localhost:3000/Employee",
//             success:function(res){
//                 console.log(res);
//             },
//             error:function(err){
//                 console.log(err)
//             }
//         })
// }

function openPopup(e) {
    document.getElementById("myForm").style.display = "block";
    document.getElementsByClassName("backdrop")[0].style.display = "block";
    x=e.closest('tr');
    const id=x.id
    $('#deletedata').click(()=> deleteData(id));
}
  
function closePopup() {
    document.getElementById("myForm").style.display = "none";
    document.getElementsByClassName("backdrop")[0].style.display = "none";
}
function openSearchbar(){
    if(document.getElementById("myInput").style.display =="")
        document.getElementById("myInput").style.display ="none"
    else
        document.getElementById("myInput").style.display ="";  
}

function editData(e){   
    x=e.closest('tr');
    const eid=x.id;
    localStorage.setItem('eid',eid);
    window.location.replace('../template/form.html');
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