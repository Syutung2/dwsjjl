$(document).ready(function () {
    initDataDoc({"A": "牛顿环数据处理", "B": "劈尖干涉数据处理"});
    $("#setTab_A").click(function () {
        if (!(fn_group($("#group_A"), "A") && fn_error("#xh", 'A'))) {
            $("#counter_A").css("display", "none");
            return 0
        }
        var unit = $("#unit_A").val();
        var group = $("#group_A").val();
        var xuhao = parseInt($("#xh").val());
        SET_TAB("A", group, 11, 1, 0, "shiyan_input");
        SET_INPUT("A", 0, 2);
        SET_INPUT("A", 0, 3);
        SET_INPUT("A", 0, 7);
        SET_INPUT("A", 0, 8);
        for (var i = 1; i <= group; i++) {
            $("#A_" + i + "_0").remove();
            $("#A_" + i + "_1").text((xuhao - i + 1));
            $("#A_" + i + "_6").text((xuhao - i + 1 - group))
        }
        $("#A_u1_0,#A_d1_0").remove();
        $("#A_u1_1").html("环数m/" + unit);
        $("#A_u1_2").html("环左半径/" + unit);
        $("#A_u1_3").html("环右半径/" + unit);
        $("#A_u1_4").html("直径/" + unit);
        $("#A_u1_5").html("D<sub>m</sub><sup>2</sup>/" + unit + "<sup>2</sup>");
        $("#A_u1_6").html("环数n/" + unit);
        $("#A_u1_7").html("环左半径/" + unit);
        $("#A_u1_8").html("环右半径/" + unit);
        $("#A_u1_9").html("直径/" + unit);
        $("#A_u1_10").html("D<sub>n</sub><sup>2</sup>/" + unit + "<sup>2</sup>");
        $("#A_u1_11").html("D<sub>m</sub><sup>2</sup>-D<sub>n</sub><sup>2</sup>/" + unit + "<sup>2</sup>")
    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        var unit = $("#unit_A").val();
        var group = $("#group_A").val();
        if (!check("A", group, [2, 3, 7, 8], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var L1 = new Array();
        var L2 = new Array();
        var L3 = new Array();
        var L4 = new Array();
        var L5 = new Array();
        var L6 = new Array();
        var L7 = new Array();
        var L8 = new Array();
        var L9 = new Array();
        var sum = 0;
        for (var i = 1; i <= group; i++) {
            L1[i] = parseFloat($("#A_" + i + "_2>input").val());
            L2[i] = parseFloat($("#A_" + i + "_3>input").val());
            L5[i] = parseFloat(Math.abs(L1[i] - L2[i])).toFixed(3);
            L7[i] = parseFloat(L5[i] * L5[i]).toFixed(3);
            L3[i] = parseFloat($("#A_" + i + "_7>input").val());
            L4[i] = parseFloat($("#A_" + i + "_8>input").val());
            L6[i] = parseFloat(Math.abs(L3[i] - L4[i])).toFixed(3);
            L8[i] = parseFloat(L6[i] * L6[i]).toFixed(3);
            L9[i] = parseFloat(L7[i] - L8[i]).toFixed(3);
            sum += parseFloat(L9[i]);
            $("#A_" + i + "_4").text(L5[i]);
            $("#A_" + i + "_5").text(L7[i]);
            $("#A_" + i + "_9").text(L6[i]);
            $("#A_" + i + "_10").text(L8[i]);
            $("#A_" + i + "_11").text(L9[i])
        }
        var ave = parseFloat(sum / group).toFixed(3);
        var r = parseFloat((ave * 1000) / (4 * group * 589.3 * 0.001)).toFixed(3);
        $("#shiyan_output").append("<h4>m-n=" + group + "</h4>", LaTeX("\\bar{R}=\\frac{\\overline{D_{m}^{2}-D_{n}^{2}}}{4(m-n)\\lambda }=\\frac{" + ave + "}{4*" + group + "*" + 589.3 + "*10^{-6}}=" + r + unit), "<br/>", "设", LaTeX("\\delta =\\overline{D_{m}^{2}-D_{n}^{2}}"), "<br/>");
        bqd(L9, 0.2, true, "#shiyan_output", "\\delta ", "mm")
    })
    $("#setTab_B").click(function () {
        SET_TAB("B", 4, 1, 1, 0, "shiyan_input");
        SET_INPUT("B", 0, 1);
        $("#B_u1_0").html("项目");
        $("#B_u1_1").html("属性值");
        $("#B_1_0").html("0环位置");
        $("#B_2_0").html("20环位置");
        $("#B_3_0").html("劈棱位置");
        $("#B_4_0").html("劈膜位置")
    })
    $("#input").on("click", "#counter_B", function () {
        $("#shiyan_output").html("");
        var unit = $("#unit_B").val();
        if (!check("B", 4, [1], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var huan_0 = $("#B_1_1>input").val();
        var huan_20 = $("#B_2_1>input").val();
        var pileng = $("#B_3_1>input").val();
        var pimo = $("#B_4_1>input").val();
        var Lk = (huan_0 - huan_20).toFixed(3);
        var L = (pileng - pimo).toFixed(3);
        var k = (L / (Lk / 20)).toFixed(0);
        var n = (k / L).toFixed(0);
        var e = (k * (589.3 * 0.001) / (2 * 1000)).toFixed(3);
        $("#shiyan_output").append("L<sub>k</sub>=L<sub>0环</sub>-L<sub>20环</sub>=" + huan_0 + "-" + huan_20 + "=" + Lk + unit + "<br/>L=L<sub>劈棱</sub>-L<sub>劈膜</sub>=" + pileng + "-" + pimo + "=" + L + unit + "<br/>", LaTeX("k=\\frac{L}{\\bar{k}/20}=\\frac{" + L + "}{" + Lk + "/20}=" + k), "<br/>", LaTeX("e = nL \\frac{\\lambda }{2}= k\\frac{\\lambda }{2}=" + k + "*\\frac{589.3*10^{-6}}{2}=" + e + unit))
    })
})