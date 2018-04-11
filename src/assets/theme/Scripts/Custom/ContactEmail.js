function removedivEmail(item) {

    var divContactEmail = item.replace('AspandivContactEmail', 'divContactEmail');
    var spandivContactEmail = item.replace('AspandivContactEmail', 'spandivContactEmail');

    $("#" + divContactEmail).remove();
    $("#" + spandivContactEmail).remove();
}
$(document).ready(function () {
    $(".AddMoreContactEmails").click(function () {
        var id = this.id;
        var mainidvalue = id.replace('AddMoreContactEmails', '');
        var hdnnumberid = id.replace('AddMoreContactEmails', 'hdnContactEmail');
        var number = $("#" + hdnnumberid).val();
        $("#ContactEmailAppend" + mainidvalue).after('<div id="' + mainidvalue + 'divContactEmail' + number + '" class="col-sm-8" style="margin-top:10px"><div class="col-sm-6 nopadding"><input type="text"  class="form-control add-member-input name fldbrder" placeholder="Contact Email" maxlength="50" required></div><div class="col-sm-5">' +
'<select class="form-control"><option>Personal</option><option>Work</option></select>' +
'</div><div class="col-sm-1"><a  id="' + mainidvalue + 'AspandivContactEmail' + number + '" data-tooltip="tooltip" title="Remove" data-placement="top" onclick="removedivEmail( this.id )"  ><i style="font-size: 26px; margin-top: 11px; color:red" class="fa fa-minus"></i></a></div></div>' +
'<div class="col-sm-4" id="' + mainidvalue + 'spandivContactEmail' + number + '">&nbsp</div>');
        number = parseInt(number) + 1;
        $("#" + hdnnumberid).val("");
        $("#" + hdnnumberid).val(number);
    });
});