function fn_h() {
    var h = $("#h").val();
    if (!h || parseFloat(h) != h) {
        $("#table-detection-h").attr("class", "table-detection-n icon-times-circle-o").html("&nbsp;存在错误，请检查");
        return 0
    } else if (h < 0) {
        $("#table-detection-h").attr("class", "table-detection-w icon-minus-square-o").html("&nbsp;警告项，可能有错误");
        return 1
    } else {
        $("#table-detection-h").attr("class", "table-detection-y icon-check-circle-o").html("&nbsp;检测通过");
        return 1
    }
}
$(document).ready(function () {
    initDataDoc({"A": "核磁共振(MNMR)实验"});
    $("#setTab_A").click(function () {
        if (!(fn_h())) {
            $("#counter").css("display", "none");
            return 0
        }
        SET_TAB("A", 5, 4, 0, 0, "shiyan_input");
        SET_INPUT("A", 0, 3);
        $("#A_1_1").html("一号样品 CuSO<sub>4</sub>");
        $("#A_2_1").html("三号样品 氟碳酸");
        $("#A_3_1").html("四号样品 甘油");
        $("#A_4_1").html("五号样品 纯水");
        $("#A_5_1").html("二号样品 三氯化铁");

        $("#A_1_2").html("H：");
        $("#A_2_2").html("F：");
        $("#A_3_2").html("H：");
        $("#A_4_2").html("H：");
        $("#A_5_2").html("H：");

        $("#A_1_4").html("MHz");
        $("#A_2_4").html("MHz");
        $("#A_3_4").html("MHz");
        $("#A_4_4").html("MHz");
        $("#A_5_4").html("MHz")

    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        if (!check("A", 5, [3], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var decimal = 5;
        var h = parseFloat($("#h").val());
        var l1 = parseFloat($("#A_1_3>input").val());
        var l2 = parseFloat($("#A_2_3>input").val());
        var l3 = parseFloat($("#A_3_3>input").val());
        var l4 = parseFloat($("#A_4_3>input").val());
        var l5 = parseFloat($("#A_5_3>input").val());

        var w1 = parseFloat(2 * Math.PI * l1);
        var w3 = parseFloat(2 * Math.PI * l3);
        var w4 = parseFloat(2 * Math.PI * l4);
        var w5 = parseFloat(2 * Math.PI * l5);

        var ave = ((w1 + w3 + w4 + w5) / 4).toFixed(decimal);

        var b = (ave / (h * 100)).toFixed(decimal);
        var vf = ((2 * Math.PI * l2) / b).toFixed(decimal);
        var gf = (vf * 6.63) / (2 * Math.PI * 5.050787 * 10);
        var uf = gf * 0.5 * 5.050787;
        $("#shiyan_output").append(
            LaTeX("\\omega _{1}=2\\pi \\nu  _{1}=2*3.14159*" + l1.toFixed(decimal)
                + "=" + w1.toFixed(decimal) + "mHz"), "<br/>",
            LaTeX("\\omega _{3}=2\\pi \\nu  _{3}=2*3.14159*" + l3.toFixed(decimal)
                + "=" + w3.toFixed(decimal) + "mHz"), "<br/>",
            LaTeX("\\omega _{4}=2\\pi \\nu  _{4}=2*3.14159*" + l4.toFixed(decimal)
                + "=" + w4.toFixed(decimal) + "mHz"), "<br/>",
            LaTeX("\\omega _{5}=2\\pi \\nu  _{4}=2*3.14159*" + l5.toFixed(decimal)
                + "=" + w5.toFixed(decimal) + "mHz"), "<br/>",
            LaTeX("\\bar{\\omega }=\\frac{\\omega _{1}+\\omega _{3}+\\omega _{4}}{3}=\\frac{" +
                w1.toFixed(decimal) + "+" + w3.toFixed(decimal) + "+" + w4.toFixed(decimal) +"+"+ w5.toFixed(decimal) +"}{3}=" + ave + "mHz"), "<br/>", LaTeX("B_{0}=\\frac{2\\pi \\nu _{0}}{\\gamma _{H}}=\\frac{\\omega }{\\gamma _{H}}=\\frac{" + ave + "}{" + h.toFixed(decimal) + "}=" + b + "T"), "<br/>", "旋磁比γ<sub>F</sub>的值<br/>", LaTeX("\\gamma _{F}=\\frac{2\\pi \\nu _{F}}{B_{0}}=\\frac{2*" + Math.PI.toFixed(decimal) + "*" + l2.toFixed(decimal) + "}{" + b + "}=" + vf + "*10^{8}Hz/T"), "<br/>", "朗德因子g<sub>F</sub>值<br/>", LaTeX("g_{F}=\\frac{\\gamma _{F}h}{2\\pi \\mu_{N}}=\\frac{" + vf + "*10^{8}*" + 6.63 + "*10^{-34}}{2*" + Math.PI + "*5.050787*10^{-27}}=" + gf.toFixed(decimal) + ""), "<br/>", "核磁矩μ<sub>F</sub><br/>", LaTeX("\\mu _{F}=g_{F}I\\mu _{N}=" + gf.toFixed(decimal) + "*\\frac{1}{2}*5.050787*10^{-27}=" + uf.toFixed(decimal) + "*10^{-27}J/T"))
    })
})