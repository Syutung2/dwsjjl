$("#setTab_A").click(function () {
    $("#shiyan_input").html("");
    $("#counter_A").remove();
    if (!(fn_group($("#group_A"), "A"))) {
        $("#counter_A").css("display", "none");
        return 0
    }
    var group = $("#group_A").val();
    SET_TAB("A", group, 2, 1, 0, "shiyan_input");
    SET_INPUT("A", 0, 1);
    SET_INPUT("A", 0, 2);
    $("#A_u1_0").html("序号");
    $("#A_u1_1").html("X");
    $("#A_u1_2").html("Y");
    var button = '<button id="counter_A" class="xb3 xm3 xl6 xs6 xb9-move xm9-move xl6-move xs6-move button-big calc button border-main margin-top">下一步</button>';
    $("#shiyan_input").after($(button));
})
$("#input").on("click", "#counter_A", function () {
    $("#shiyan_output").html("");
    var group = $("#group_A").val();
    if (!check("A", group, [1,2], "^[-]?[A-Za-z0-9.]+$")) {
        $("#shiyan_output").html("");
        return 0
    }
    if (screen.availWidth < 420) {
        var img = $('<canvas id="myChart1" width="300" height="150"></canvas>')
    } else if (screen.availWidth < 1000) {
        var img = $('<canvas id="myChart1" width="670" height="420"></canvas>')
    } else {
        var img = $('<canvas id="myChart1" width="740" height="500"></canvas>')
    }
    $("#shiyan_output").append("【图片上右键另存为图片可下载到本地】", img);
    var ctx = document.getElementById("myChart1").getContext("2d");
    var data = {
        labels: [],
        datasets: [{
            fillColor: "rgba(220,220,220,0)",
            strokeColor: "#000",
            pointColor: "#000",
            pointStrokeColor: "#000",
            data: []
        }]
    }
    for (var i = 0; i < group; i++) {
        data.labels[i] = $("#A_" + (i + 1) + "_1>input").val();
    }
    for (var i = 0; i < group; i++) {
        data.datasets[0].data[i] = parseFloat($("#A_" + (i + 1) + "_2>input").val());
    }
    new Chart(ctx).Line(data, {bezierCurveTension: 0, bezierCurve: false});
})