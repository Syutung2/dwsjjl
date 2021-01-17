$(document).ready(function () {
    initDataDoc({"A": "滑线变阻器制流作用", "B": "滑线变阻器分压作用"});
    $("#setTab_A").click(function () {
        if (!(fn_group($("#group_A"), "A"))) {
            $("#counter_A").css("display", "none");
            return 0
        }
        var group = $("#group_A").val();
        SET_TAB("A", group, 2, 1, 0, "shiyan_input");
        SET_INPUT("A", 0, 2);
        $("#A_u2_1,#A_u2_2").remove();
        $("#A_u2_0").attr("colspan", "3").html("<h3>滑线变阻器制流作用</h3>");
        $("#A_u1_0").html("序号");
        $("#A_u1_1").html("X");
        $("#A_u1_2").html("I/mA");
        var interval = parseFloat((1 / (group - 1)).toFixed(2));
        $("#A_1_1").text("0");
        for (var i = 2; i <= group; i++) {
            $("#A_" + i + "_1").text((0 + interval * (i - 1)).toFixed(2) + "L")
        }
    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        var group = $("#group_A").val();
        if (!check("A", group, [2], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
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
        $("#shiyan_output").append("滑线变阻器制流作用【图片上右键另存为图片可下载到本地】", img);
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
            data.labels[i] = $("#A_" + (i + 1) + "_1").html()
        }
        for (var i = 0; i < group; i++) {
            data.datasets[0].data[i] = parseFloat($("#A_" + (i + 1) + "_2>input").val())
        }
        new Chart(ctx).Line(data, {bezierCurveTension: 0, bezierCurve: false})
    })
    $("#setTab_B").click(function () {
        if (!(fn_group($("#group_B"), "B"))) {
            $("#counter_B").css("display", "none");
            return 0
        }
        var group = $("#group_B").val();
        SET_TAB("B", group, 2, 2, 0, "shiyan_input");
        SET_INPUT("B", 0, 2);
        $("#B_u2_1,#B_u2_2").remove();
        $("#B_u2_0").attr("colspan", "3").html("<h3>滑线变阻器分压作用</h3>");
        $("#B_u1_0").html("序号");
        $("#B_u1_1").html("X");
        $("#B_u1_2").html("U/V");
        var interval = parseFloat((1 / (group - 1)).toFixed(2));
        $("#B_1_1").text("0");
        for (var i = 2; i <= group; i++) {
            $("#B_" + i + "_1").text((0 + interval * (i - 1)).toFixed(2) + "L")
        }
    })
    $("#input").on("click", "#counter_B", function () {
        $("#shiyan_output").html("");
        var group = $("#group_B").val();
        if (!check("B", group, [2], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        if (screen.availWidth < 420) {
            var img = $('<canvas id="myChart2" width="300" height="150"></canvas>')
        } else if (screen.availWidth < 1000) {
            var img = $('<canvas id="myChart2" width="670" height="420"></canvas>')
        } else {
            var img = $('<canvas id="myChart2" width="740" height="500"></canvas>')
        }
        $("#shiyan_output").append("滑线变阻器分压作用【图片上右键另存为图片可下载到本地】", img);
        var ctx = document.getElementById("myChart2").getContext("2d");
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
            data.labels[i] = $("#B_" + (i + 1) + "_1").html()
        }
        for (var i = 0; i < group; i++) {
            data.datasets[0].data[i] = parseFloat($("#B_" + (i + 1) + "_2>input").val())
        }
        new Chart(ctx).Line(data, {bezierCurveTension: 0, bezierCurve: false})
    })
})