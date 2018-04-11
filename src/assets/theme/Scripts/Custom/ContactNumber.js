function removedivNumber(item) {
    var divContactnumber = item.replace('AspandivContactNumber', 'divContactNumber');
    var spandivContactNumber = item.replace('AspandivContactNumber', 'spandivContactNumber');
    $("#" + divContactnumber).remove();
    $("#" + spandivContactNumber).remove();
}

$(document).ready(function () {
    $(".AddMoreContactNumbers").click(function () {
        var id = this.id;
        var mainidvalue = id.replace('AddMoreContactNumbers', '');
        var hdnnumberid = id.replace('AddMoreContactNumbers', 'hdnContactnumber');
        var number = $("#" + hdnnumberid).val();
        $("#ContactNumberAppend" + mainidvalue).after('<div id="' + mainidvalue + 'divContactNumber' + number + '" class="col-sm-8" style="margin-top:10px"><div class="col-sm-6 nopadding"><input type="text"  class="form-control add-member-input name fldbrder" placeholder=" Contact Number" maxlength="50" required></div><div class="col-sm-5">' +
'<select class="form-control"><option>Home</option><option>Mobile</option><option>Office</option><option>Fax</option></select>' +
'</div><div class="col-sm-1"><a id="' + mainidvalue + 'AspandivContactNumber' + number + '" data-tooltip="tooltip" title="Remove" data-placement="top" onclick="removedivNumber(this.id)"  ><i style="font-size: 26px; margin-top: 11px; color:red" class="fa fa-minus"></i></a></div></div>' +
'<div class="col-sm-4" id="' + mainidvalue + 'spandivContactNumber' + number + '">&nbsp</div>');
        number = parseInt(number) + 1;
        $("#" + hdnnumberid).val("");
        $("#" + hdnnumberid).val(number);
    });
});