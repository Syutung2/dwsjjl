function fn_zero(e) {
    var zero = $(e).val();
    if (zero == "") {
        $("#table-detection-zero").attr("class", "table-detection-n icon-times-circle-o").html("&nbsp;存在错误，请检查");
        return 0
    } else {
        $("#table-detection-zero").attr("class", "table-detection-y icon-check-circle-o").html("&nbsp;检测通过");
        return 1
    }
}
function fn_null(e) {
    var zero = $(e).val();
    if (zero == "") {
        $(e).css("background-color", "#FF0000");
        return 1
    } else {
        $(e).css("background-color", "#00FF00");
        return 0
    }
}
$(document).ready(function () {
    initDataDoc({"A": "钢丝受力伸长记录", "B": "直径d数据记录", "C": "砝码质量数据记录", "D": "杨氏模量计算"});
    $("#setTab_A").click(function () {
        if (!(fn_group($("#group_A"), "A") && fn_error($("#error_A"), "A"))) {
            $("#counter_A").css("display", "none");
            return 0
        }
        var group = $("#group_A").val();
        SET_TAB("A", group, 6, 2, 0, "shiyan_input");
        SET_INPUT("A", 0, 2);
        SET_INPUT("A", 0, 3);
        $("#A_u2_1,#A_u2_2,#A_u2_3,#A_u2_4,#A_u2_5,#A_u2_6").remove();
        $("#A_u2_0").attr("colspan", "7").html("<h3>钢丝受力伸长数据记录</h3>");
        $("#A_u1_0").text("序号");
        $("#A_u1_1").text("所加砝码重量/kg");
        $("#A_u1_2").html("增砝码时的读数N<sub>i</sub>/cm");
        $("#A_u1_3").html("减砝码时的读数N<sub>i</sub>'/cm");
        $("#A_u1_4").html("平均值" + LaTeX("\\bar{N_{i}}=\\frac{N_{i}+N_{i}^{'}}{2}"));
        $("#A_u1_5").html("每增" + group / 2 + "个砝码读数差" + LaTeX("l_{i}=\\bar{N_{i+" + group / 2 + "}}-\\bar{N}_{i}"));
        $("#A_u1_6").html("li的绝对误差" + LaTeX("\\Delta l_{i}=\\left | l_{i}-\\bar{l_{i}} \\right |"));
        $("#A_1_1").html("m<sub>0</sub>");
        for (var i = 2; i <= group; i++) {
            $("#A_" + i + "_1").html("m<sub>0</sub>+" + (i - 1) + "m")
        }
        for (var i = 1; i <= group; i += 2) {
            $("#A_" + i + "_5,#A_" + i + "_6").attr("rowspan", "2");
            $("#A_" + (i + 1) + "_5,#A_" + (i + 1) + "_6").remove()
        }
    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        var unit = $("#unit_A").val();
        var group = $("#group_A").val();
        var error = $("#error_A").val();
        if (!check("A", group, [2, 3], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var decimal = error.split(".")[1].length;
        var arr1 = new Array();
        var arr2 = new Array();
        var arr3 = new Array();
        for (var i = 1; i <= group; i++) {
            arr1[i] = Number($("#A_" + i + "_2>input").val());
            arr2[i] = Number($("#A_" + i + "_3>input").val());
            arr3[i] = Number(((arr1[i] + arr2[i]) / 2).toFixed(decimal));
            $("#A_" + i + "_4").text(arr3[i])
        }
        var arr4 = new Array();
        var sum = 0;
        for (var i = 1; i <= group / 2; i++) {
            arr4[i] = Number((arr3[group / 2 + i] - arr3[i]).toFixed(decimal));
            sum += parseFloat(arr4[i])
        }
        var ave = sum / (group / 2);
        for (var i = 1, j = 1; i <= group; i += 2, j++) {
            $("#A_" + i + "_5").text((arr4[j]).toFixed(decimal));
            $("#A_" + i + "_6").text(Math.abs(arr4[j] - ave).toFixed(decimal))
        }
        var a = bqd(arr4, error, true, "#shiyan_output", "L_{i}", unit)
    })
    $("#setTab_B").click(function () {
        if (!(fn_group($("#group_B"), "B") && fn_error($("#error_B"), "B") && fn_zero())) {
            $("#counter_B").css("display", "none");
            return 0
        }
        var group = $("#group_B").val();
        SET_TAB("B", group, 2, 2, 1, "shiyan_input");
        SET_INPUT("B", 0, 1);
        $("#B_u2_1,#B_u2_2").remove();
        $("#B_u2_0").attr("colspan", "3").html("<h4>直径d数据记录</h4>");
        $("#B_u1_0").text("次数");
        $("#B_u1_1").html("d<sub>i</sub>/mm");
        $("#B_u1_2").html("△d/mm");
        $("#B_d1_0").html("平均值");
        $("#B_d1_1,#B_d1_2").html("")
    })
    $("#input").on("click", "#counter_B", function () {
        $("#shiyan_output").html("");
        var unit = $("#unit_B").val();
        var group = $("#group_B").val();
        var error = $("#error_B").val();
        var zero = $("#zero_B").val();
        var decimal = error.split(".")[1].length;
        if (!check("B", group, [1], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var arr1 = new Array();
        for (var i = 1; i <= group; i++) {
            arr1[i] = parseFloat($("#B_" + i + "_1>input").val()) - zero
        }
        var a = bqd(arr1, error, true, "#shiyan_output", "d", unit);
        var arr2 = new Array();
        for (var i = 1; i <= group; i++) {
            arr2[i] = Number((arr1[i] - a.ave).toFixed(decimal));
            $("#B_" + i + "_2").text((arr2[i]).toFixed(decimal))
        }
        $("#B_d1_1").text((a.ave).toFixed(decimal));
        var b = bqd(arr2, error, false);
        $("#B_d1_2").text((b.ave).toFixed(decimal))
    })
    $("#setTab_C").click(function () {
        if (!(fn_group($("#group_C"), "C") && fn_error($("#error_C"), "C"))) {
            $("#counter_C").css("display", "none");
            return 0
        }
        var unit = $("#unit_C").val();
        var group = $("#group_C").val();
        SET_TAB("C", group, 1, 2, 1, "shiyan_input");
        SET_INPUT("C", 0, 1);
        $("#C_u2_1").remove();
        $("#C_u2_0").attr("colspan", "2").html("<h4>砝码质量数据记录</h4>");
        $("#C_u1_1").html("砝码");
        $("#C_u1_2").html("m<sub>i</sub>/kg");
        $("#C_d1_0").html("平均值");
        $("#C_d1_1").html("")
    })
    $("#input").on("click", "#counter_C", function () {
        $("#shiyan_output").html("");
        var unit = $("#unit_C").val();
        var group = $("#group_C").val();
        var error = $("#error_C").val();
        var decimal = error.split(".")[1].length;
        if (!check("C", group, [1], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var col_1 = new Array();
        for (var i = 1; i <= group; i++) {
            col_1[i] = parseFloat($("#C_" + i + "_1>input").val())
        }
        var a = bqd(col_1, error, true, "#shiyan_output", "m", unit);
        $("#C_d1_1").html(a.ave)
    });
    $("#setTab_D").click(function () {
        SET_TAB("D", 12, 2, 1, 0, "shiyan_input");
        SET_INPUT("D", 0, 2);
        $("#D_u1_1,#D_u1_2").remove();
        $("#D_u1_0").attr("colspan", "3").html("<h4>计算杨氏模量相关参数</h4>");
        $("#D_1_1").html("钢板尺b/cm");
        $("#D_2_1").html("不确定度U<sub>b</sub>/cm");
        $("#D_3_1").html("米尺D/cm");
        $("#D_4_1").html("不确定度U<sub>D</sub>/cm");
        $("#D_5_1").html("米尺L/cm");
        $("#D_6_1").html("不确定度U<sub>L</sub>/mm");
        $("#D_7_1").html("直径d平均值/mm");
        $("#D_8_1").html("不确定度U<sub>d</sub>/mm");
        $("#D_9_1").html("m的平均值/kg");
        $("#D_10_1").html("不确定度U<sub>m</sub>/kg");
        $("#D_11_1").html("L<sub>i</sub>的平均值/mm");
        $("#D_12_1").html("不确定度U<sub>Li</sub>/mm")
    });
    $("#input").on("click", "#counter_D", function () {
        $("#shiyan_output").html("");
        if (!check("D", 12, [2], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var arr = new Array();
        arr[1] = parseFloat($("#D_1_2>input").val()) / 10;
        arr[2] = parseFloat($("#D_2_2>input").val()) / 10;
        arr[3] = parseFloat($("#D_3_2>input").val()) / 10;
        arr[4] = parseFloat($("#D_4_2>input").val()) / 10;
        arr[5] = parseFloat($("#D_5_2>input").val()) / 10;
        arr[6] = parseFloat($("#D_6_2>input").val()) / 100;
        arr[7] = parseFloat($("#D_7_2>input").val()) / 100;
        arr[8] = parseFloat($("#D_8_2>input").val()) / 100;
        arr[9] = parseFloat($("#D_9_2>input").val());
        arr[10] = parseFloat($("#D_10_2>input").val());
        arr[11] = parseFloat($("#D_11_2>input").val()) / 100;
        arr[12] = parseFloat($("#D_12_2>input").val()) / 100;
        var e = (32 * arr[9] * 9.8 * arr[5] * arr[3]) / (Math.PI * arr[7] * arr[7] * arr[11] * arr[1]);
        var ue = Math.sqrt(Math.pow(arr[10] / arr[9], 2) + Math.pow(arr[4] / arr[3], 2) + Math.pow(arr[6] / arr[5], 2) + Math.pow((arr[8] * 2) / arr[7], 2) + Math.pow(arr[2] / arr[1], 2) + Math.pow(arr[12] / arr[11], 2));
        var zue = ue * e;
        $("#shiyan_output").append("以下计算式已经经过单位统一<br/>", LaTeX("E=\\frac{32\\bar{m}gLD}{\\pi \\bar{d}^{2}\\bar{l_{i}}b}=\\frac{32*" + arr[9].toFixed(3) + "*9.8*" + arr[5].toFixed(3) + "*" + arr[3].toFixed(3) + "}{3.1415* " + arr[7].toFixed(3) + "^{2}*" + arr[11].toFixed(3) + "*" + arr[1].toFixed(3) + "}=" + e.toFixed(3) + "N/m^{2}"), "<br/>", LaTeX("\\frac{U_{E}}{E}=\\sqrt{(\\frac{U_{m}}{\\bar{m}})^{2}+(\\frac{U_{D}}{D})^{2}+(\\frac{U_{L}}{L})^{2}+(\\frac{2U_{d}}{\\bar{d}})^{2}+(\\frac{U_{b}}{b})^{2}+(\\frac{U_{\\bar{l_{i}}}}{\\bar{l_{i}}})^{2}}="), "<br/>", LaTeX("=\\sqrt{(\\frac{" + arr[10].toFixed(3) + "}{" + arr[9].toFixed(3) + "})^{2}+(\\frac{" + arr[4].toFixed(3) + "}{" + arr[3].toFixed(3) + "})^{2}+(\\frac{" + arr[6].toFixed(3) + "}{" + arr[5].toFixed(3) + "})^{2}+(\\frac{2*" + arr[8].toFixed(3) + "}{" + arr[7].toFixed(3) + "})^{2}+(\\frac{" + arr[2].toFixed(3) + "}{" + arr[1].toFixed(3) + "})^{2}+(\\frac{" + arr[12].toFixed(3) + "}{" + arr[11].toFixed(3) + "})^{2}}=" + ue.toFixed(3) + "N/m^{2}"), "<br/>", "绝对误差：", LaTeX("U_{E}=(\\frac{U_{E}}{E})*E=(\\frac{" + ue.toFixed(3) + "}{" + e.toFixed(3) + "})*E=" + zue.toFixed(3) + "N/m^{2}"), "<br/>", "所以", LaTeX("E\\pm U_{E}=" + e.toFixed(3) + "\\pm" + zue.toFixed(3) + "N/m^{2}"))
    })
})