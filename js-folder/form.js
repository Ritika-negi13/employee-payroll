$(document).ready(() => {
    if (localStorage.getItem('eid')) {
        getFormElements(localStorage.getItem('eid'));
    }
}
)

function getFormElements(id) {

    var x = $.ajax({
        url: "http://localhost:3000/Employee/" + id,
        type: 'GET',
        success: (data) => {
            console.log(data.img)

            $('#name')[0].value = data.name
            $(`input[value='${data.img}']`).prop('checked', true)
            $(`input[value='${data.gender}']`).prop('checked', true)
            const departments = data.department
            for (let i = 0; i < departments.length; i++) {

                $(`input[value='${departments[i]}']`).prop('checked', true)
            }

            $(`option[value='${data.salary}']`).prop('selected', true)
            const [day, month, year] = data.startDate.split(" ")
            $(`option[value='${day}']`).prop('selected', true)
            $(`option[value='${month}']`).prop('selected', true)
            $(`option[value='${year}']`).prop('selected', true)
            $('textarea')[0].value = data.notes
        }

    })

}

function onSubmit(e) {
    e.preventDefault()
    var jsonData = {};
    var formData = $('#form').serializeArray();
    var startDate = "";
    var dept = [];
    $.each(formData, function () {
        if (this.name == 'day' || this.name == 'month' || this.name == 'year') {
            startDate += this.value;
            if (this.name != 'year')
                startDate += ' '
        }
        else
            if (this.name == 'department') {
                dept.push(this.value);
            }
            else
                if (jsonData[this.name]) {
                    if (!jsonData[this.name].push) {
                        jsonData[this.name] = [jsonData[this.name]];
                    }
                    jsonData[this.name].push(this.value || '');
                } else {
                    jsonData[this.name] = this.value || '';
                }
    });
    jsonData['startDate'] = startDate;
    jsonData['department'] = dept;
    if(localStorage.getItem('eid')){
        id=localStorage.getItem('eid')
        $.ajax(
            {
                url: "http://localhost:3000/Employee/"+id,
                type: "PUT",
                data: JSON.stringify(jsonData),
                success: function () {
                    localStorage.removeItem('eid');
                    
                    window.location.replace('../index.html');
                },
                error: function (err) {
                    console.error(err);
                }
            });
    }
    else{
        $.ajax(
            {
                url: "http://localhost:3000/Employee",
                type: "POST",
                data: JSON.stringify(jsonData),
                success: function () {
                    window.location.replace('../index.html');
                },
                error: function (err) {
                    console.error(err);
                }
            });
    }
    e.preventDefault();
}
function onReset(){
    if(localStorage.getItem('eid'))
    {
        localStorage.removeItem('eid')
        alert(eid)
    }    
    window.location.reload();
}
