$(document).ready(function () {
    initDataDoc({"A": "油滴参数", "B": "静态（平衡）法", "C": "动态（非平衡）法"});
    $("#setTab_A").click(function () {
        SET_TAB("A", 7, 2, 1, 0, "shiyan_input");
        SET_INPUT("A", 0, 2);
        $("#A_u1_1,#A_u1_2").remove();
        $("#A_u1_0").attr("colspan", "3").html("<h3>油滴参数</h3>");
        $("#A_1_1").html(LaTeX("\\eta ") + "空气的粘滞系数/(kg/(m*s))");
        $("#A_2_1").html(LaTeX("\\rho ") + "油的密度/(kg/m^3)");
        $("#A_3_1").html("b修正常数/(m*cm(Hg))");
        $("#A_4_1").html("P大气压强/(cm(Hg))");
        $("#A_5_1").html("L下降距离/(m)");
        $("#A_6_1").html("d平行板间距离/(m)");
        $("#A_7_1").html("重力加速度/(m/s^2)");
        $("#A_1_2>input").val("0.0000183");
        $("#A_2_2>input").val("981");
        $("#A_3_2>input").val("0.00000617");
        $("#A_4_2>input").val("76.0");
        $("#A_5_2>input").val("0.002");
        $("#A_6_2>input").val("0.005");
        $("#A_7_2>input").val("9.8")
    })
    var localArr = new Array();
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        if (!check("A", 7, [2], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        for (var i = 1; i <= 7; i++) {
            localArr[i] = $("#A_" + i + "_2>input").val()
        }
        $("#shiyan_output").append("<span style='color: #ff0000'>注意：已经存储以下数据，请认真核对，如果有错误请重新进行上一步操作</span><br/>", LaTeX("\\eta ") + "空气的粘滞系数/(kg/(m*s)) = " + localArr[1], "<br/>", LaTeX("\\rho ") + "油的密度/(kg/m^3) = " + localArr[2], "<br/>", "b修正常数/(m*cm(Hg)) = " + localArr[3], "<br/>", "P大气压强/(cm(Hg)) = " + localArr[4], "<br/>", "L下降距离/(m) = " + localArr[5], "<br/>", "d平行板间距离/(m) = " + localArr[6], "<br/>", "重力加速度/(m/s^2) = " + localArr[7], "<br/>");
        for (var i = 1; i <= 7; i++) {
            localArr[i] = Number(localArr[i])
        }
    })
    $("#setTab_B").click(function () {
        if (!(fn_preg("#group_B", '^\\d+(\\.\\d+)?$'))) {
            $("#counter_B").css("display", "none");
            return 0
        }
        var group = $("#group_B").val();
        SET_TAB("B", group, 5, 1, 0, "shiyan_input");
        SET_INPUT("B", 0, 1);
        SET_INPUT("B", 0, 2);
        SET_INPUT("B", 0, 3);
        SET_INPUT("B", 0, 4);
        $("#B_u1_0").html("");
        $("#B_u1_1").html("电压（V）");
        $("#B_u1_2").html("下降时间（S）");
        $("#B_u1_3").html("带电量（" + LaTeX("*e^{19}C") + "）");
        $("#B_u1_4").html("带电荷数");
        $("#B_u1_5").html("单位电荷量（" + LaTeX("*e^{19}C") + "）")
    })
    $("#input").on("click", "#counter_B", function () {
        $("#shiyan_output").html("");
        if (!(fn_group($("#group_B"), "B"))) {
            $("#counter_B").css("display", "none");
            return 0
        }
        var group = $("#group_B").val();
        if (!check("B", group, [1, 2, 3, 4], "^[-]?[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var arr1 = new Array();
        var arr2 = new Array();
        var arr3 = new Array();
        var temp = 0;
        var n = 0;
        for (var i = 1; i <= group; i++) {
            arr1[i] = Number($("#B_" + i + "_1>input").val());
            arr2[i] = Number($("#B_" + i + "_2>input").val());
            arr3[i] = Number($("#B_" + i + "_4>input").val());
            temp = ($("#B_" + i + "_3>input").val()) / ($("#B_" + i + "_4>input").val());
            $("#B_" + i + "_5").html(temp)
        }
        var dy = ave(arr1);
        var xj = ave(arr2);
        n = parseInt(ave(arr3));
        var vq = localArr[5] / xj;
        var a = Math.sqrt((9 * localArr[1] * vq) / (2 * localArr[2] * localArr[7]));
        var m = (4 / 3) * Math.PI * Math.sqrt(Math.pow((a * a * (1 / (1 + (localArr[3] / (localArr[4] * a))))), 3)) * localArr[2];
        var q = (18 * Math.PI / Math.sqrt(2 * localArr[2] * localArr[7])) * Math.sqrt(Math.pow(((localArr[1] * localArr[5]) / (xj * (1 + localArr[3] / (localArr[4] * a)))), 3)) * (localArr[6] / dy);
        var ee = q / n;
        var e = 1.602e-19;
        var er = Math.abs((e - ee) / e) * 100;
        $("#shiyan_output").append("平均电压：", LaTeX("V=" + dy.toFixed(1) + "V"), "<br/>", "平均下降时间", LaTeX("t_{q}=" + xj.toFixed(2) + "s"), "<br/>", LaTeX("V_{g}=\\frac{l}{t_{g}}=\\frac{" + localArr[5].toFixed(3) + "}{" + xj.toFixed(2) + "}=" + vq.toFixed(6) + "m/s"), "<br/>", LaTeX("a=\\sqrt{\\frac{9\\eta V_{q}}{2\\rho g}}=" + (a * 10000000).toFixed(1) + "*10^{-7}m"), "<br/>", LaTeX("m=\\frac{4}{3}\\pi [\\frac{9\\eta V_{q}}{2\\rho g}*\\frac{1}{1+\\frac{b}{pa}}]^{\\frac{3}{2}}=" + (m * (1e+15)).toFixed(2) + "*10^{-15}kg"), "<br/>", LaTeX("q=\\frac{18\\pi }{\\sqrt{2\\rho g}}[\\frac{\\eta l}{t_{g}(1+\\frac{b}{pa})}]^{\\frac{3}{2}}\\frac{d}{V}=" + (q * (1e+19)).toFixed(3) + "*10^{-19}C"), "<br/>", LaTeX("e = " + (q * (1e+19)).toFixed(3) + "*10^{-19}/" + n + "=" + (ee * (1e+19)).toFixed(3) + "*10^{-19}C"), "<br/>", LaTeX("E_{r}=|\\frac{" + (e * (1e+19)).toFixed(3) + "*10^{-19}" + "-" + (ee * (1e+19)).toFixed(3) + "*10^{-19}" + "}{" + (e * (1e+19)).toFixed(3) + "*10^{-19}" + "}|*100\\%=" + er.toFixed(2) + "\\%"))
    })
    $("#setTab_C").click(function () {
        if (!(fn_preg("#group_C", '^\\d+(\\.\\d+)?$'))) {
            $("#counter_C").css("display", "none");
            return 0
        }
        var group = $("#group_C").val();
        SET_TAB("C", group, 6, 1, 0, "shiyan_input");
        SET_INPUT("C", 0, 1);
        SET_INPUT("C", 0, 2);
        SET_INPUT("C", 0, 3);
        SET_INPUT("C", 0, 4);
        SET_INPUT("C", 0, 5);
        $("#C_u1_0").html("");
        $("#C_u1_1").html("电压（V）");
        $("#C_u1_2").html("下降时间（S）");
        $("#C_u1_3").html("上升时间（S）");
        $("#C_u1_4").html("带电量（" + LaTeX("*e^{19}C") + "）");
        $("#C_u1_5").html("带电荷数");
        $("#C_u1_6").html("单位电荷量（" + LaTeX("*e^{19}C") + "）")
    })
    $("#input").on("click", "#counter_C", function () {
        $("#shiyan_output").html("");
        if (!(fn_preg("#group_C", '^\\d+(\\.\\d+)?$'))) {
            $("#counter_C").css("display", "none");
            return 0
        }
        var group = $("#group_C").val();
        if (!check("C", group, [1, 2, 3, 4, 5], "^[-]?[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var arr1 = new Array();
        var arr2 = new Array();
        var arr3 = new Array();
        var arr4 = new Array();
        var temp = 0;
        var n = 0;
        for (var i = 1; i <= group; i++) {
            arr1[i] = Number($("#C_" + i + "_1>input").val());
            arr2[i] = Number($("#C_" + i + "_2>input").val());
            arr3[i] = Number($("#C_" + i + "_3>input").val());
            arr4[i] = Number($("#C_" + i + "_5>input").val());
            temp = ($("#C_" + i + "_4>input").val()) / ($("#C_" + i + "_5>input").val());
            $("#C_" + i + "_6").html(temp)
        }
        var dy = ave(arr1);
        var xj = ave(arr2);
        var ss = ave(arr3);
        var n = parseInt(ave(arr4));
        var vq = localArr[5] / xj;
        var a = Math.sqrt((9 * localArr[1] * vq) / (2 * localArr[2] * localArr[7]));
        var m = (4 / 3) * Math.PI * Math.sqrt(Math.pow((a * a * (1 / (1 + (localArr[3] / (localArr[4] * a))))), 3)) * localArr[2];
        var k = (18 * Math.PI / Math.sqrt(2 * localArr[2] * localArr[7])) * Math.sqrt(Math.pow(((localArr[1] * localArr[5]) / (1 * (1 + localArr[3] / (localArr[4] * a)))), 3)) * (localArr[6]);
        var q = k * (1 / xj + 1 / ss) * Math.sqrt(1 / xj) * (1 / dy);
        var ee = q / n;
        var e = 1.602e-19;
        var er = Math.abs((e - ee) / e) * 100;
        $("#shiyan_output").append("平均电压：", LaTeX("V=" + dy.toFixed(1) + "V"), "<br/>", "平均下降时间", LaTeX("t_{q}=" + xj.toFixed(2) + "s"), "<br/>", LaTeX("V_{g}=\\frac{l}{t_{g}}=\\frac{" + localArr[5].toFixed(3) + "}{" + xj.toFixed(2) + "}=" + vq.toFixed(6) + "m/s"), "<br/>", LaTeX("a=\\sqrt{\\frac{9\\eta V_{q}}{2\\rho g}}=" + (a * 10000000).toFixed(1) + "*10^{-7}m"), "<br/>", LaTeX("m=\\frac{4}{3}\\pi [\\frac{9\\eta V_{q}}{2\\rho g}*\\frac{1}{1+\\frac{b}{pa}}]^{\\frac{3}{2}}=" + (m * (1e+15)).toFixed(2) + "*10^{-15}kg"), "<br/>", LaTeX("k=\\frac{18\\pi }{\\sqrt{2\\rho g}}[\\frac{\\eta l}{(1+\\frac{b}{pa})}]^{\\frac{3}{2}}*d=" + (k * (1e+14)).toFixed(3) + "*10^{-14}"), "<br/>", LaTeX("q=K(\\frac{1}{t_{e}}+\\frac{1}{t_{g}})(\\frac{1}{t_{g}})^{\\frac{1}{2}}(\\frac{1}{V})=" + (q * (1e+19)).toFixed(3) + "*10^{-19}C"), "<br/>", LaTeX("e = " + (q * (1e+19)).toFixed(3) + "*10^{-19}/" + n + "=" + (ee * (1e+19)).toFixed(3) + "*10^{-19}C"), "<br/>", LaTeX("E_{r}=|\\frac{" + (e * (1e+19)).toFixed(3) + "*10^{-19}" + "-" + (ee * (1e+19)).toFixed(3) + "*10^{-19}" + "}{" + (e * (1e+19)).toFixed(3) + "*10^{-19}" + "}|*100\\%=" + er.toFixed(2) + "\\%"))
    })
})