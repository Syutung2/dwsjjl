function fn_error_kedu() {
    var error = $("#error-kedu").val();
    if (!error || parseFloat(error) != error) {
        $("#table-detection-error-kedu").attr("class", "table-detection-n icon-times-circle-o").html("&nbsp;存在错误，请检查");
        return 0
    } else if (error < 0) {
        $("#table-detection-error-kedu").attr("class", "table-detection-w icon-minus-square-o").html("&nbsp;警告项，可能有错误");
        return 1
    } else {
        $("#table-detection-error-kedu").attr("class", "table-detection-y icon-check-circle-o").html("&nbsp;检测通过");
        return 1
    }
}
function fn_error_tianping() {
    var error = $("#error-tianping").val();
    if (!error || parseFloat(error) != error) {
        $("#table-detection-error-tianping").attr("class", "table-detection-n icon-times-circle-o").html("&nbsp;存在错误，请检查");
        return 0
    } else if (error < 0) {
        $("#table-detection-error-tianping").attr("class", "table-detection-w icon-minus-square-o").html("&nbsp;警告项，可能有错误");
        return 1
    } else {
        $("#table-detection-error-tianping").attr("class", "table-detection-y icon-check-circle-o").html("&nbsp;检测通过");
        return 1
    }
}
function fn_error_luoxuan() {
    var error = $("#error-luoxuan").val();
    if (!error || parseFloat(error) != error) {
        $("#table-detection-error-luoxuan").attr("class", "table-detection-n icon-times-circle-o").html("&nbsp;存在错误，请检查");
        return 0
    } else if (error < 0) {
        $("#table-detection-error-luoxuan").attr("class", "table-detection-w icon-minus-square-o").html("&nbsp;警告项，可能有错误");
        return 1
    } else {
        $("#table-detection-error-luoxuan").attr("class", "table-detection-y icon-check-circle-o").html("&nbsp;检测通过");
        return 1
    }
}
$(document).ready(function () {
    initDataDoc({"A": "动态悬挂法测量金属的杨氏模量"});
    $("#setTab_A").click(function () {
        if (!(fn_group($("#group"), "A") && fn_error_kedu() && fn_error_tianping() && fn_error_luoxuan())) {
            $("#counter").css("display", "none");
            return 0
        }
        var group = parseFloat($("#group").val());
        SET_TAB("A", group + 4, 1, 1, 0, "shiyan_input");
        SET_INPUT("A", 0, 1);
        $("#A_u1_0").text("");
        $("#A_u1_1").text("材料(不锈钢，铜)");
        $("#A_1_0").html("长度L(cm)");
        $("#A_2_0").html("质量m(g)");
        for (var i = 1; i <= group; i++) {
            $("#A_" + (i + 2) + "_0").html("直径d<sub>" + i + "</sub>(mm)")
        }
        $("#A_" + (group + 3) + "_0").html("f<sub>左(Hz)</sub>");
        $("#A_" + (group + 4) + "_0").html("f<sub>右(Hz)</sub>")
    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        var group = parseFloat($("#group").val());
        if (!check("A", group + 4, [1], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var unit = $("#unit").val();
        var decimal = 2;
        var xiaoshu = decimal;
        var tianping = parseFloat($("#error-tianping").val());
        var kedu = parseFloat($("#error-kedu").val());
        var luoxuan = parseFloat($("#error-luoxuan").val());
        var sum_d = 0;
        var shuzu = new Array();
        var L = parseFloat($("#A_1_1>input").val());
        var m = parseFloat($("#A_2_1>input").val());
        for (var i = 0; i < group; i++) {
            shuzu[i] = parseFloat($("#A_" + (i + 3) + "_1>input").val());
            sum_d += shuzu[i]
        }
        var a = bqd(shuzu, luoxuan, false);
        var ave_d = sum_d / group;
        var f1 = parseFloat($("#A_" + (group + 3) + "_1>input").val());
        var f2 = parseFloat($("#A_" + (group + 4) + "_1>input").val());
        var ave_f = (f1 + f2) / 2;
        var fcha = Math.abs(f1 - f2) / 2;
        var ef = (fcha / ave_f);
        var e = (1.6067 * (Math.pow(L, 3) * m) * ave_f * ave_f) / Math.pow(ave_d, 4);
        e = e / 100000000;
        var ul = kedu / Math.sqrt(3);
        var el = ul / L;
        var um = tianping / Math.sqrt(3);
        var em = um / m;
        var ed = (a.u / ave_d).toFixed(decimal);
        var ee = Math.sqrt((3 * el) * (3 * el) + em * em + (4 * ed) * (4 * ed) + (2 * ef) * (2 * ef));
        var uue = ee * e;
        var eee = (uue / e) * 100;
        $("#shiyan_output").append(LaTeX("E=1.6067\\frac{l^{3}m}{d^{4}}f^{2}=1.6067*\\frac{" + L.toFixed(xiaoshu) + "^{3}*" + m.toFixed(xiaoshu) + "}{" + ave_d.toFixed(xiaoshu) + "^{4}}*" + ave_f.toFixed(xiaoshu) + "^{2}=" + e.toFixed(xiaoshu) + "*10^{11}N/m^{2}"), "<br/>", LaTeX("U = U_{lB}=\\frac{" + kedu.toFixed(xiaoshu) + "}{\\sqrt{3}}=" + ul.toFixed(xiaoshu) + ",E_{l}=\\frac{U_{lB}}{l}=" + (el * 10000).toFixed(xiaoshu) + "*10^{-4}"), "<br/>", LaTeX("U = U_{mB}=\\frac{" + tianping.toFixed(xiaoshu) + "}{\\sqrt{3}}=" + um.toFixed(xiaoshu) + ",E_{m}=\\frac{U_{mB}}{m}=" + (em * 10000).toFixed(xiaoshu) + "*10^{-4}"), "<br/>", LaTeX("U_{fB}=\\frac{|f_{l}-f_{r}|}{2}=" + fcha.toFixed(xiaoshu) + ",E_{f}=\\frac{U_{fB}}{\\bar{f}}=" + (ef * 10000).toFixed(xiaoshu) + "*10^{-4}"), "<br/>");
        bqd(shuzu, luoxuan, true, "#shiyan_output", "d", "mm");
        $("#shiyan_output").append(LaTeX("E_{e}=\\sqrt{(3E_{l})^{2}+E_{m}^{2}+(4E_{d})^{2}+(2E_{f})^{2}}=" + ee.toFixed(6)), "<br/>", LaTeX("U_{E}=E*E_{e}=" + uue.toFixed(xiaoshu) + "*10^{11}N/m^{2}"), "<br/>", LaTeX("E=E\\pm U_{E}=(" + e.toFixed(xiaoshu) + "\\pm" + uue.toFixed(xiaoshu) + ")*10^{11}N/m^{2}"), "<br/>", LaTeX("E_{e}=\\frac{U_{E}}{E}\\times 100\\%=" + eee.toFixed(xiaoshu) + "\\%"))
    })
})