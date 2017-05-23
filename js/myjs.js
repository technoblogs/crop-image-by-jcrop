$(document).ready(function () {

    $("#img").change(function (event)
    {
        if ($('#cropbox').data('Jcrop')) {
            $('#cropbox').data('Jcrop').destroy();
        }
        if (typeof (FileReader) != "undefined") {
            $('#myModal').modal('show');
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png)$/;
            $($(this)[0].files).each(function () {
                var getfile = $(this);
                if (regex.test(getfile[0].name.toLowerCase())) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("#cropbox").attr('src', e.target.result);
                        $("#rowImageData").val(e.target.result);
                        $('#cropbox').Jcrop({
                            setSelect: [0, 0, 200, 300],
                            onSelect: updateCoords
                        });
                    }
                    reader.readAsDataURL(getfile[0]);
                }
                else {
                    alert(getfile[0].name + " is not image file.");
                    return false;
                }
            });
        }
        else {
            alert("Browser does not supportFileReader.");
        }
    });

    $("#imageCropForm").submit(function (e) {
        var url = "crop.php"; 
        $.ajax({
            type: "POST",
            url: url,
            data: $("#imageCropForm").serialize(), 
            success: function (data)
            {

                var img = '<img class="edit_doc_img" src="' + data + '" width="200" height="300">';
                $("#imageList").append('<div class="col-sm-3">' + img  + '</div>');
                $('#myModal').modal('hide');
            }
        });
        e.preventDefault();
       
    });
});

function updateCoords(c)
{
    $('#x').val(c.x);
    $('#y').val(c.y);
    $('#w').val(c.w);
    $('#h').val(c.h);
}
;

function checkCoords()
{
    if (parseInt($('#w').val()))
        return true;
    alert('Please select a crop region then press submit.');
    return false;
}