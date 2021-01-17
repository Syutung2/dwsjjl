$(document).ready(function () {
    initDataDoc({"A": "数据表1", "B": "数据表2"});
    $("#setTab_A").click(function () {
        if (!(fn_preg("#kh", "^\\d+(\\.\\d+)?$"))) {
            $("#counter_A").css("display", "none");
            return 0
        }
        SET_TAB("A", 5, 1, 1, 1, "shiyan_input");
        SET_INPUT("A", 0, 1);
        $("#A_u1_1").remove();
        $("#A_u1_0").attr("colspan", "2").html("霍尔效应测磁场数据记录");
        $("#A_1_0").html("I<sub>H</sub>(mA)");
        $("#A_2_0").html("+ B , + I (mV)");
        $("#A_3_0").html("+ B , - I (mV)");
        $("#A_4_0").html("- B , + I (mV)");
        $("#A_5_0").html("- B , - I (mV)");
        $("#A_d1_0").html("V<sub>H</sub>平均值 (mV)");
        $("#A_d1_1").html("")
    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        if (!check("A", 5, [1], "^[-]?[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var kh = parseFloat($("#kh").val());
        var ih = parseFloat($("#A_1_1>input").val());
        var sum = 0;
        for (var i = 2; i <= 5; i++) {
            sum += parseFloat($("#A_" + i + "_1>input").val())
        }
        var ave = sum / 4;
        var b = ave / (kh * ih);
        var di = 10 * 0.5 * 0.01;
        var dv = ave * 0.05 * 0.01;
        var db = Math.sqrt(Math.pow((1 / (kh * ih)), 2) * Math.pow(dv, 2) + Math.pow(ave / (kh * ih * ih), 2) * Math.pow(di, 2));
        var eb = (db / b) * 100;
        $("#A_d1_1").html(ave.toFixed(4));
        $("#shiyan_output").append("求出霍尔电动势：<br/>", LaTeX("\\bar{V_{H}}=\\frac{V_{1}+V_{2}+V_{3}+V_{4}}{4}=" + ave.toFixed(4) + "mV"), "<br/>", "求出磁场强度B的大小：<br/>", LaTeX("B=\\frac{\\bar{V_{H}}}{K_{H}I_{H}}=\\frac{" + ave.toFixed(4) + "}{" + kh.toFixed(2) + "*" + ih.toFixed(1) + "}=" + b.toFixed(4) + "KGS"), "<br/>", "不确定度的计算：<br/>", LaTeX("\\bigtriangleup I=10*0.5\\%=0.05mA"), "<br/>", LaTeX("\\bigtriangleup V=" + ave.toFixed(4) + "*0.05\\%=" + dv.toFixed(4) + "mV"), "<br/>", LaTeX("\\bigtriangleup B=\\sqrt{(\\frac{\\partial B}{\\partial V_{H}})^{2}\\bigtriangleup V^{2}+(\\frac{\\partial B}{\\partial I_{H}})^{2}\\bigtriangleup I^{2}}=" + db.toFixed(4) + "KGS"), "<br/>", "最终结果表示：", LaTeX("B=B\\pm \\bigtriangleup B=(" + b.toFixed(2) + "\\pm " + db.toFixed(2) + ")KGS"), "<br/>", LaTeX("E_{B}=\\frac{\\bigtriangleup B}{B}*100\\%=" + eb.toFixed(2) + "\\%"))
    })
    $("#setTab_B").click(function () {
        if (!((fn_preg("#im", "^\\d+(\\.\\d+)?$")) && (fn_preg("#c", "^\\d+(\\.\\d+)?$")) && (fn_preg("#d", "^\\d+(\\.\\d+)?$")))) {
            $("#counter_B").css("display", "none");
            return 0
        }
        var group = $("#group_B").val();
        SET_TAB("B", group, 6, 1, 0, "shiyan_input");
        SET_INPUT("B", 0, 1);
        SET_INPUT("B", 0, 2);
        SET_INPUT("B", 0, 3);
        SET_INPUT("B", 0, 4);
        SET_INPUT("B", 0, 5);
        $("#B_u1_0").html("序号");
        $("#B_u1_1").html("I<sub>S</sub>(mA)");
        $("#B_u1_2").html("V<sub>H1</sub>(mV)(+ I<sub>S</sub>,+ B)");
        $("#B_u1_3").html("V<sub>H2</sub>(mV)(+ I<sub>S</sub>,- B)");
        $("#B_u1_4").html("V<sub>H3</sub>(mV)(- I<sub>S</sub>,- B)");
        $("#B_u1_5").html("V<sub>H4</sub>(mV)(- I<sub>S</sub>,+ B)");
        $("#B_u1_6").html("V<sub>H</sub>平均值(mV)")
    })
    $("#input").on("click", "#counter_B", function () {
        $("#shiyan_output").html("");
        var group = $("#group_B").val();
        var im = $("#im").val();
        var c = $("#c").val();
        var d = $("#d").val();
        if (!check("B", group, [1, 2, 3, 4, 5], "^[-]?[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var sum = new Array();
        var ave = new Array();
        for (var i = 1; i <= group; i++) {
            sum[i] = parseFloat($("#B_" + i + "_2>input").val()) - parseFloat($("#B_" + i + "_3>input").val()) + parseFloat($("#B_" + i + "_4>input").val()) - parseFloat($("#B_" + i + "_5>input").val());
            ave[i] = sum[i] / 4;
            $("#B_" + i + "_6").html(ave[i].toFixed(3))
        }
        $("#shiyan_output").append("根据数据表格画图得【横轴I<sub>S</sub>/mA，纵轴", LaTeX("\\bar{V_{H}}/mV"), "】：<br/>");
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
            data.labels[i] = $("#B_" + (i + 1) + "_1>input").val();
            data.datasets[0].data[i] = parseFloat($("#B_" + (i + 1) + "_6").html())
        }
        new Chart(ctx).Line(data, {bezierCurveTension: 0, bezierCurve: false});
        var k = (ave[group] - ave[1]) / (parseFloat($("#B_" + group + "_1>input").val()) - parseFloat($("#B_1_1>input").val()));
        var rh = (k * d) / (c * im);
        $("#shiyan_output").append("<br/>由图可得斜率：<br/>", LaTeX("K=\\frac{\\bigtriangleup \\bar{V_{H}}}{\\bigtriangleup I_{S}}=\\frac{" + ave[group].toFixed(2) + "-" + ave[1].toFixed(2) + "}{" + $("#B_" + group + "_1>input").val() + "-" + $("#B_1_1>input").val() + "}=" + k.toFixed(2)), "<br/>", LaTeX("\\bar{V_{H}}=(R_{H}CI_{m}/d)I_{S}"), "<br/>", LaTeX("K=R_{H}CI_{m}/d"), "<br/>", "霍尔系数R<sub>H</sub>的计算<br/>", LaTeX("R_{H}=\\frac{K\\cdot d}{C\\cdot I_{m}}=\\frac{" + k.toFixed(2) + "*" + d + "}{" + c + "*" + im + "}=" + rh.toFixed(4) + " \\Omega \\cdot mm/(KGS)"))
    })
})