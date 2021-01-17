$(document).ready(function () {
    initDataDoc({"A": "迈克尔逊干涉仪的调节与使用"});
    $("#setTab_A").click(function () {
        if (!(fn_group($("#group_A"), "A") && fn_preg("#bz", '^\\d+(\\.\\d+)?$'))) {
            $("#counter_A").css("display", "none");
            return 0
        }
        var group = $("#group_A").val();
        SET_TAB("A", group, 4, 1, 0, "shiyan_input");
        SET_INPUT("A", 0, 2);
        $("#A_u1_0").html("次数i");
        $("#A_u1_1").html("环数");
        $("#A_u1_2").html("di/(mm)");
        $("#A_u1_3").html("△d=|d<sub>i</sub>-d<sub>i-1</sub>|");
        $("#A_u1_4").html("△d值");
        $("#A_1_3,#A_1_4").html("///");
        for (var i = 1; i <= group; i++) {
            $("#A_" + i + "_1").text(i * 50);
            $("#A_" + (i + 1) + "_3").html("△d<sub>" + i + "</sub>=|d<sub>" + (i + 1) + "</sub>-d<sub>" + i + "</sub>|")
        }
    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        var unit = $("#unit_A").val();
        var group = $("#group_A").val();
        var biaozhun = $("#bz").val();
        if (!check("A", group, [2], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var xiaoshu = 3;
        var L0 = new Array();
        var L1 = new Array();
        var sum = 0;
        for (var i = 2; i <= group; i++) {
            L0[i] = Math.abs(parseFloat($("#A_" + i + "_2>input").val()) - parseFloat($("#A_" + (i - 1) + "_2>input").val()));
            $("#A_" + i + "_4").html(L0[i].toFixed(xiaoshu))
        }
        for (var k = 1; k <= (group / 2); k++) {
            L1[k] = Math.abs(parseFloat($("#A_" + ((group / 2) + k) + "_2>input").val()) - parseFloat($("#A_" + k + "_2>input").val()));
            sum += parseFloat(L1[k])
        }
        var ave = sum / Math.pow((group / 2), 2);
        var y = (ave * 2) / 50;
        var y1 = y * 1000000;
        $("#shiyan_output").append("本实验数据采用逐差法处理数据<div id='zhucha'></div>");
        var a = bqd(L1, "0.00005", true, "#shiyan_output", "L_{i}", "mm");
        var uy = 1000000 * a.u * 2 / 250;
        var ey = (uy / y1) * 100;
        var ud = (Math.abs(biaozhun - y1) / biaozhun) * 100;
        $("#shiyan_output").append(LaTeX("\\overline{\\Delta d} = \\frac{1}{" + (group / 2) + "^{2}}\\sum \\overline{\\Delta d_{i}}=" + ave.toFixed(xiaoshu) + "mm"), "<br/>", "由于", LaTeX("\\Delta d=\\frac{1}{2}N\\lambda "), "，<br/>代入N=50，△d=" + ave.toFixed(xiaoshu) + "mm得<br/>", LaTeX("\\lambda =\\frac{2\\Delta d}{N}=\\frac{2*" + ave.toFixed(xiaoshu) + "}{50}=" + y.toFixed(xiaoshu) + "mm=" + y1.toFixed(xiaoshu) + "nm"), "<br/>", "间接测量量的不确定度计算<br/>", LaTeX("U_{\\lambda }=U_{L_{i}}*2/250=" + uy.toFixed(2)), "<br/>", LaTeX("\\lambda =\\lambda \\pm U_{\\lambda }=(" + y1.toFixed(0) + "\\pm " + uy.toFixed(0) + ")nm"), "<br/>", LaTeX("E_{\\lambda }=\\frac{U_{\\lambda }}{\\lambda }\\times 100\\%=" + ey.toFixed(2) + "\\%"), "<br/>", "计算百分误差<br/>", LaTeX("U_{d}=\\frac{|\\lambda _{b}-\\lambda |}{\\lambda _{b}}=\\frac{|" + biaozhun + "-" + y1.toFixed(xiaoshu) + "|}{" + biaozhun + "}\\times 100\\%=" + ud.toFixed(xiaoshu) + "\\%"));
        $("#zhucha").html("△d<sub>" + 1 + "</sub>=|d<sub>" + ((group / 2) + 1) + "</sub>-d<sub>" + 1 + "</sub>|=" + L1[1].toFixed(xiaoshu) + "mm<br/>");
        for (var j = 2; j <= (group / 2); j++) {
            $("#zhucha").append("△d<sub>" + j + "</sub>=|d<sub>" + ((group / 2) + j) + "</sub>-d<sub>" + j + "</sub>|=" + L1[j].toFixed(xiaoshu) + "mm<br/>")
        }
    })
})