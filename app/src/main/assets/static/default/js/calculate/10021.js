$(document).ready(function () {
    initDataDoc({"A": "相位法【空气】", "B": "干涉法【空气】", "C": "相位法【盐水】"});
    $("#setTab_A").click(function () {
        if (!(fn_group($("#group_A"), "A") && fn_error($("#error_A"), "A") && (fn_preg("#pl_A", "^\\d+(\\.\\d+)?$")))) {
            $("#counter_A").css("display", "none");
            return 0
        }
        $("#shiyan_input").append("<h2 style='margin-bottom: 5px;'>相位法测声速【空气】</h2>");
        var group = $("#group_A").val();
        SET_TAB("A", group, 4, 1, 0, "shiyan_input");
        SET_INPUT("A", 0, 1);
        SET_INPUT("A", 0, 3);
        $("#A_u1_0").html("序号");
        $("#A_u1_1").html(LaTeX("X_{n}/mm"));
        $("#A_u1_2").html("序号");
        $("#A_u1_3").html(LaTeX("X_{n+" + group + "}/mm"));
        $("#A_u1_4").html(LaTeX("X_{n+" + group + "}-X_{n}/mm"));
        for (var i = 1; i <= group; i++) {
            $("#A_" + i + "_0").html(i);
            $("#A_" + i + "_2").html(parseInt(i) + parseInt(group))
        }
    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        var unit = $("#unit_A").val();
        var group = $("#group_A").val();
        var error = $("#error_A").val();
        var f = $("#pl_A").val();
        if (!check("A", group, [1, 3], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var decimal = error.split(".")[1].length;
        var arr = new Array();
        var sum = 0;
        for (var i = 1; i <= group; i++) {
            arr[i] = $("#A_" + i + "_3>input").val() - $("#A_" + i + "_1>input").val();
            sum += parseFloat(arr[i]);
            $("#A_" + i + "_4").html(arr[i].toFixed(decimal));
            arr[i] /= 10
        }
        var ave = sum / group;
        var lmd = ave / 10;
        $("#shiyan_output").append(LaTeX("\\overline{X_{n+" + group + "}-X_{n}}=" + ave.toFixed(3)), "<br/>", LaTeX("\\bar{\\lambda }=\\frac{" + ave.toFixed(3) + "}{" + group + "}=" + lmd.toFixed(3) + unit), "<br/>");
        var a = bqd(arr, error, true, "#shiyan_output", "\\lambda ", unit);
        var v = lmd * f * 0.001;
        var uv = a.avebiaozhuncha * f * 0.001;
        var ev = (uv / v) * 100;
        f = Number(f);
        $("#shiyan_output").append(LaTeX("\\bar{\\upsilon }=\\bar{\\lambda }\\cdot f=" + lmd.toFixed(4) + "*0.001*" + f.toFixed(1) + "=" + v.toFixed(3) + "m/s"), "<br/>", LaTeX("U_{\\upsilon }=S_{\\lambda }*f=" + (a.avebiaozhuncha).toFixed(3) + "*0.001*" + f.toFixed(1) + "=" + uv.toFixed(3) + "m/s"), "<br/>", LaTeX("\\upsilon =\\bar{\\upsilon }\\pm U_{\\upsilon }=" + v.toFixed(3) + "\\pm " + uv.toFixed(3) + "m/s"), "<br/>", LaTeX("E_{\\upsilon }=\\frac{U_{\\upsilon }}{\\bar{\\upsilon }}\\times 100\\%=" + ev.toFixed(2) + "\\%"))
    })
    $("#setTab_B").click(function () {
        if (!(fn_group($("#group_B"), "B") && fn_error($("#error_B"), "B") && (fn_preg("#pl_B", "^\\d+(\\.\\d+)?$")))) {
            $("#counter_B").css("display", "none");
            return 0
        }
        $("#shiyan_input").append("<h2 style='margin-bottom: 5px;'>干涉法测声速【空气】</h2>");
        var group = $("#group_B").val();
        SET_TAB("B", group, 4, 1, 0, "shiyan_input");
        SET_INPUT("B", 0, 1);
        SET_INPUT("B", 0, 3);
        $("#B_u1_0").html("序号");
        $("#B_u1_1").html(LaTeX("X_{n}/mm"));
        $("#B_u1_2").html("序号");
        $("#B_u1_3").html(LaTeX("X_{n+" + group + "}/mm"));
        $("#B_u1_4").html(LaTeX("X_{n+" + group + "}-X_{n}/mm"));
        for (var i = 1; i <= group; i++) {
            $("#B_" + i + "_0").html(i);
            $("#B_" + i + "_2").html(parseInt(i) + parseInt(group))
        }
    })
    $("#input").on("click", "#counter_B", function () {
        $("#shiyan_output").html("");
        var unit = $("#unit_B").val();
        var group = $("#group_B").val();
        var error = $("#error_B").val();
        var f = $("#pl_B").val();
        if (!check("B", group, [1, 3], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var decimal = error.split(".")[1].length;
        var arr = new Array();
        var sum = 0;
        for (var i = 1; i <= group; i++) {
            arr[i] = $("#B_" + i + "_3>input").val() - $("#B_" + i + "_1>input").val();
            sum += parseFloat(arr[i]);
            $("#B_" + i + "_4").html(arr[i].toFixed(decimal));
            arr[i] /= 10
        }
        var ave = sum / group;
        var lmd = (ave / 10) * 2;
        $("#shiyan_output").append(LaTeX("\\overline{X_{n+" + group + "}-X_{n}}=" + ave.toFixed(3)), "<br/>", LaTeX("\\bar{\\lambda }=\\frac{" + ave.toFixed(3) + "}{" + group + "}*2=" + lmd.toFixed(3) + unit), "<br/>");
        var a = bqd(arr, error, true, "#shiyan_output", "\\lambda ", unit);
        var v = lmd * f * 0.001;
        var uv = a.avebiaozhuncha * f * 0.001;
        var ev = (uv / v) * 100;
        f = Number(f);
        $("#shiyan_output").append(LaTeX("\\bar{\\upsilon }=\\bar{\\lambda }\\cdot f=" + lmd.toFixed(4) + "*0.001*" + f.toFixed(1) + "=" + v.toFixed(3) + "m/s"), "<br/>", LaTeX("U_{\\upsilon }=S_{\\lambda }*f=" + (a.avebiaozhuncha).toFixed(3) + "*0.001*" + f.toFixed(1) + "=" + uv.toFixed(3) + "m/s"), "<br/>", LaTeX("\\upsilon =\\bar{\\upsilon }\\pm U_{\\upsilon }=" + v.toFixed(3) + "\\pm " + uv.toFixed(3) + "m/s"), "<br/>", LaTeX("E_{\\upsilon }=\\frac{U_{\\upsilon }}{\\bar{\\upsilon }}\\times 100\\%=" + ev.toFixed(2) + "\\%"))
    })
    $("#setTab_C").click(function () {
        if (!(fn_group($("#group_C"), "C") && fn_error($("#error_C"), "C") && (fn_preg("#pl_C", "^\\d+(\\.\\d+)?$")))) {
            $("#counter_C").css("display", "none");
            return 0
        }
        $("#shiyan_input").append("<h2 style='margin-bottom: 5px;'>相位法测声速【盐水】</h2>");
        var group = $("#group_C").val();
        SET_TAB("C", group, 4, 1, 0, "shiyan_input");
        SET_INPUT("C", 0, 1);
        SET_INPUT("C", 0, 3);
        $("#C_u1_0").html("序号");
        $("#C_u1_1").html(LaTeX("X_{n}/mm"));
        $("#C_u1_2").html("序号");
        $("#C_u1_3").html(LaTeX("X_{n+" + group + "}/mm"));
        $("#C_u1_4").html(LaTeX("X_{n+" + group + "}-X_{n}/mm"));
        for (var i = 1; i <= group; i++) {
            $("#C_" + i + "_0").html(i);
            $("#C_" + i + "_2").html(parseInt(i) + parseInt(group))
        }
    })
    $("#input").on("click", "#counter_C", function () {
        $("#shiyan_output").html("");
        var unit = $("#unit_C").val();
        var group = $("#group_C").val();
        var error = $("#error_C").val();
        var f = $("#pl_C").val();
        if (!check("C", group, [1, 3], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var decimal = error.split(".")[1].length;
        var arr = new Array();
        var sum = 0;
        for (var i = 1; i <= group; i++) {
            arr[i] = $("#C_" + i + "_3>input").val() - $("#C_" + i + "_1>input").val();
            sum += parseFloat(arr[i]);
            $("#C_" + i + "_4").html(arr[i].toFixed(decimal));
            arr[i] /= 10
        }
        var ave = sum / group;
        var lmd = ave / 10;
        $("#shiyan_output").append(LaTeX("\\overline{X_{n+" + group + "}-X_{n}}=" + ave.toFixed(3)), "<br/>", LaTeX("\\bar{\\lambda }=\\frac{" + ave.toFixed(3) + "}{" + group + "}=" + lmd.toFixed(3) + unit), "<br/>");
        var a = bqd(arr, error, true, "#shiyan_output", "\\lambda ", unit);
        var v = lmd * f * 0.001;
        var uv = a.avebiaozhuncha * f * 0.001;
        var ev = (uv / v) * 100;
        f = Number(f);
        $("#shiyan_output").append(LaTeX("\\bar{\\upsilon }=\\bar{\\lambda }\\cdot f=" + lmd.toFixed(4) + "*0.001*" + f.toFixed(1) + "=" + v.toFixed(3) + "m/s"), "<br/>", LaTeX("U_{\\upsilon }=S_{\\lambda }*f=" + (a.avebiaozhuncha).toFixed(3) + "*0.001*" + f.toFixed(1) + "=" + uv.toFixed(3) + "m/s"), "<br/>", LaTeX("\\upsilon =\\bar{\\upsilon }\\pm U_{\\upsilon }=" + v.toFixed(3) + "\\pm " + uv.toFixed(3) + "m/s"), "<br/>", LaTeX("E_{\\upsilon }=\\frac{U_{\\upsilon }}{\\bar{\\upsilon }}\\times 100\\%=" + ev.toFixed(2) + "\\%"))
    })
})