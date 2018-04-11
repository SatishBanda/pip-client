$(function () {
    var scheduler = $(".scheduler").dxScheduler({
        dataSource: data,
        views: ["agenda", "month", "week", "workWeek", "day"],
        currentView: "workWeek",
        currentDate: new Date(2015, 4, 25),
        useDropDownViewSwitcher: false,
        firstDayOfWeek: 0,
        startDayHour: 8,
        endDayHour: 19,
        resources: [{
            fieldExpr: "ownerId",
            allowMultiple: true,
            dataSource: resourcesData,
            label: "Owner"
        }],
        width: "100%",
        height: 600
    }).dxScheduler("instance");

    var switchModeNames = ["Tabs", "Drop-Down Menu"];

    $("#view-switcher").dxSelectBox({
        items: switchModeNames,
        width: 200,
        value: switchModeNames[0],
        onValueChanged: function (data) {
            scheduler.option("useDropDownViewSwitcher",
                data.value === switchModeNames[1]);
        }
    });

    var resizing = $("#allow-resizing").dxCheckBox({
        text: "Allow resizing",
        value: true,
        onValueChanged: function (data) {
            scheduler.option("editing.allowResizing", data.value);
        }
    }).dxCheckBox("instance");

    var dragging = $("#allow-dragging").dxCheckBox({
        text: "Allow dragging",
        value: true,
        onValueChanged: function (data) {
            scheduler.option("editing.allowDragging", data.value);
        }
    }).dxCheckBox("instance");


    $("#allow-adding").dxCheckBox({
        text: "Allow adding",
        value: true,
        onValueChanged: function (data) {
            scheduler.option("editing.allowAdding", data.value);
        }
    });

    $("#allow-updating").dxCheckBox({
        text: "Allow updating",
        value: true,
        onValueChanged: function (data) {
            var value = data.value;
            scheduler.option("editing.allowUpdating", value);
            dragging.option("disabled", !value);
            resizing.option("disabled", !value);
        }
    });

    $("#allow-deleting").dxCheckBox({
        text: "Allow deleting",
        value: true,
        onValueChanged: function (data) {
            scheduler.option("editing.allowDeleting", data.value);
        }
    });
});