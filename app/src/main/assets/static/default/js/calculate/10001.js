function fn_midu() {
    var midu = $("#midu_D").val();
    if (!midu || parseInt(midu) != midu) {
        $("#table-detection-midu").attr("class", "table-detection-n icon-times-circle-o").html("&nbsp;存在错误，请检查");
        return 0
    } else if (midu < 0 || midu > 20) {
        $("#table-detection-midu").attr("class", "table-detection-w icon-minus-square-o").html("&nbsp;警告项，可能有错误");
        return 1
    } else {
        $("#table-detection-midu").attr("class", "table-detection-y icon-check-circle-o").html("&nbsp;检测通过");
        return 1
    }
}
$(document).ready(function () {
    initDataDoc({"A": "金属片长度", "B": "圆柱体测量数据", "C": "小钢球直径", "D": "金属块质量"});
    $("#setTab_A").click(function () {
        if (!(fn_group($("#group_A"), "A") && fn_error($("#error_A"), "A"))) {
            $("#counter_A").css("display", "none");
            return 0
        }
        var unit = $("#unit_A").val();
        var group = $("#group_A").val();
        SET_TAB("A", group, 4, 2, 2, "shiyan_input");
        SET_INPUT("A", 0, 1);
        SET_INPUT("A", 0, 2);
        $("#A_u1_0,#A_u2_2,#A_u2_3,#A_u2_4").remove();
        $("#A_u2_0").attr("rowspan", "2").text("");
        $("#A_u2_1").attr("colspan", "4").text("钢板尺");
        $("#A_u1_1").html("L<sub>0</sub>/" + unit);
        $("#A_u1_2").html("L<sub>1</sub>/" + unit);
        $("#A_u1_3").html("L=L<sub>1</sub>-L<sub>0</sub>/" + unit);
        $("#A_u1_4").html("ΔL/" + unit);
        $("#A_d1_0").text("平均值");
        $("#A_d1_2,#A_d1_3,#A_d1_4").remove();
        $("#A_d1_1").attr("colspan", "4").html('');
        $("#A_d2_0").text("总不确定度");
        $("#A_d2_2,#A_d2_3,#A_d2_4").remove();
        $("#A_d2_1").attr("colspan", "4").html('')
    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        var unit = $("#unit_A").val();
        var group = $("#group_A").val();
        var error = $("#error_A").val();
        if (!check("A", group, [1, 2], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var decimal = error.split(".")[1].length;
        var zimu = "L";
        var col_1 = new Array();
        var col_2 = new Array();
        var col_3 = new Array();
        for (var i = 1; i <= group; i++) {
            col_1[i] = parseFloat($("#A_" + i + "_1>input").val());
            col_2[i] = parseFloat($("#A_" + i + "_2>input").val());
            col_3[i] = col_2[i] - col_1[i];
            $("#A_" + i + "_3").html(col_3[i].toFixed(decimal))
        }
        var a = bqd(col_3, error, true, "#shiyan_output", zimu, unit);
        for (var k = 1; k <= group; k++) {
            $("#A_" + k + "_4").html((col_3[k] - a.ave).toFixed(decimal))
        }
        $("#A_d1_1").html(LaTeX('\\bar{L}=' + a.ave + unit));
        $("#A_d2_1").html("U<sub>L</sub>=" + a.u + unit)
    })
    $("#setTab_B").click(function () {
        if (!(fn_group($("#group_B"), "B") && fn_error($("#error_B"), "B"))) {
            $("#counter_B").css("display", "none");
            return 0
        }
        var unit = $("#unit_B").val();
        var group = $("#group_B").val();
        SET_TAB("B", group, 8, 2, 2, "shiyan_input");
        SET_INPUT("B", 0, 1);
        SET_INPUT("B", 0, 3);
        SET_INPUT("B", 0, 5);
        SET_INPUT("B", 0, 7);
        $("#B_u1_0,#B_u2_2,#B_u2_3,#B_u2_4,#B_u2_5,#B_u2_6,#B_u2_7,#B_u2_8").remove();
        $("#B_u2_0").attr("rowspan", "2").text("");
        $("#B_u2_1").attr("colspan", "8").text("游标卡尺");
        $("#B_u1_1").html("D<sub>内</sub>/" + unit);
        $("#B_u1_2").html("△D/" + unit);
        $("#B_u1_3").html("D<sub>外</sub>/" + unit);
        $("#B_u1_4").html("△D/" + unit);
        $("#B_u1_5").html("高<sub>H</sub>/" + unit);
        $("#B_u1_6").html("△H/" + unit);
        $("#B_u1_7").html("深<sub>h</sub>/" + unit);
        $("#B_u1_8").html("△h/" + unit);
        $("#B_d1_0").text("平均值");
        $("#B_d1_2,#B_d1_4,#B_d1_6,#B_d1_8").remove();
        $("#B_d1_1,#B_d1_3,#B_d1_5,#B_d1_7").attr("colspan", "2").html('');
        $("#B_d2_0").text("总不确定度");
        $("#B_d2_2,#B_d2_4,#B_d2_6,#B_d2_8").remove();
        $("#B_d2_1,#B_d2_3,#B_d2_5,#B_d2_7").attr("colspan", "2").html('')
    })
    $("#input").on("click", "#counter_B", function () {
        $("#shiyan_output").html("");
        var unit = $("#unit_B").val();
        var group = $("#group_B").val();
        var error = $("#error_B").val();
        var decimal = error.split(".")[1].length;
        if (!check("B", group, [1, 3, 5, 7], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var col_1 = new Array();
        var col_2 = new Array();
        var col_3 = new Array();
        var col_4 = new Array();
        for (var i = 1; i <= group; i++) {
            col_1[i] = parseFloat($("#B_" + i + "_1>input").val());
            col_2[i] = parseFloat($("#B_" + i + "_3>input").val());
            col_3[i] = parseFloat($("#B_" + i + "_5>input").val());
            col_4[i] = parseFloat($("#B_" + i + "_7>input").val())
        }
        $("#shiyan_output").append('【D内】（注意：这里D<sub>n</sub>代表D<sub>内</sub>）：<br/>');
        var a = bqd(col_1, error, true, "#shiyan_output", "D_{n}", unit);
        $("#shiyan_output").append('<hr/>【D外】（注意：这里D<sub>w</sub>代表D<sub>外</sub>）：<br/>');
        var b = bqd(col_2, error, true, "#shiyan_output", "D_{w}", unit);
        $("#shiyan_output").append('<hr/>【高H】：<br/>');
        var c = bqd(col_3, error, true, "#shiyan_output", "H", unit);
        $("#shiyan_output").append('<hr/>【深h】：<br/>');
        var d = bqd(col_4, error, true, "#shiyan_output", "h", unit);
        for (var k = 1; k <= group; k++) {
            $("#B_" + k + "_2").html((col_1[k] - a.ave).toFixed(decimal));
            $("#B_" + k + "_4").html((col_2[k] - b.ave).toFixed(decimal));
            $("#B_" + k + "_6").html((col_3[k] - c.ave).toFixed(decimal));
            $("#B_" + k + "_8").html((col_4[k] - d.ave).toFixed(decimal))
        }
        $("#B_d1_1").html('内' + LaTeX('\\bar{D}=' + a.ave + unit));
        $("#B_d1_3").html('外' + LaTeX('\\bar{D}=' + b.ave + unit));
        $("#B_d1_5").html(LaTeX('\\bar{H}=' + c.ave + unit));
        $("#B_d1_7").html(LaTeX('\\bar{h}=' + d.ave + unit));
        $("#B_d2_1").html("U<sub>D内</sub>=" + a.u + unit);
        $("#B_d2_3").html("U<sub>D外</sub>=" + b.u + unit);
        $("#B_d2_5").html("U<sub>H</sub>=" + c.u + unit);
        $("#B_d2_7").html("U<sub>h</sub>=" + d.u + unit)
    })
    $("#setTab_C").click(function () {
        if (!(fn_group($("#group_C"), "C") && fn_error($("#error_C"), "C"))) {
            $("#counter_C").css("display", "none");
            return 0
        }
        var unit = $("#unit_C").val();
        var group = $("#group_C").val();
        SET_TAB("C", group, 2, 2, 1, "shiyan_input");
        SET_INPUT("C", 0, 1);
        $("#C_u1_0,#C_u2_2").remove();
        $("#C_u2_0").attr("rowspan", "2").text("");
        $("#C_u2_1").attr("colspan", "2").text("小钢球直径");
        $("#C_u1_1").html("D/" + unit);
        $("#C_u1_2").html(LaTeX("\\bigtriangleup D/" + unit + "=D-\\bar{D}"));
        $("#C_d1_0").text("平均值");
        $("#C_d1_2").remove();
        $("#C_d1_1").attr("colspan", "2").html('')
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
        var a = bqd(col_1, error, true, "#shiyan_output", "D", unit);
        for (var k = 1; k <= group; k++) {
            $("#C_" + k + "_2").html((col_1[k] - a.ave).toFixed(decimal))
        }
        $("#C_d1_1").html(LaTeX("\\bar{D}=" + a.ave + unit));
        var mian = new Array();
        mian[1] = Math.PI * a.ave * a.ave;
        mian[2] = 2 * Math.PI * a.ave;
        mian[3] = Math.sqrt(mian[2] * mian[2] * a.u * a.u);
        mian[4] = (mian[3] / mian[1]) * 100;
        $("#shiyan_output").append('<hr>【球的横截面积】<br/>', LaTeX("S=\\pi D^{2}=" + mian[1].toFixed(decimal) + unit + "^{2}"), "<br/>", LaTeX("\\frac{\\partial S}{\\partial \\bar{D}}=2*\\pi*\\bar{D}=" + mian[2].toFixed(decimal) + unit), "<br/>", LaTeX("U_{s}=\\sqrt{(\\frac{\\partial S}{\\partial D})^{2}(U_{\\bar{D}})^{2}}=" + mian[3].toFixed(decimal) + unit), "<br/>", LaTeX("S=(\\bar{S}\\pm U_{s})=(" + mian[1].toFixed(decimal) + "\\pm " + mian[3].toFixed(decimal) + ")mm^{2}"), "<br/>", LaTeX("E_{v}=\\frac{U_{v}}{\\bar{v}}\\times 100\\%=" + mian[4].toFixed(decimal) + "\\%"))
    });
    $("#setTab_D").click(function () {
        if (!(fn_error($("#error_D"), "D") && fn_midu())) {
            $("#counter_D").css("display", "none");
            return 0
        }
        var unit = $("#unit_D").val();
        SET_TAB("D", 1, 3, 1, 0, "shiyan_input");
        SET_INPUT("D", 0, 1);
        SET_INPUT("D", 0, 2);
        $("#D_u1_0").html("");
        $("#D_u1_1").html("m<sub>1</sub>/" + unit);
        $("#D_u1_2").html("m<sub>1</sub>/" + unit);
        $("#D_u1_3").html("△m")
    });
    $("#input").on("click", "#counter_D", function () {
        $("#shiyan_output").html("");
        var error = 0;
        var m = new Array();
        var decimal = 2;
        var smidu = $("#midu_D").val();
        for (var i = 1; i <= 2; i++) {
            m[i] = parseFloat($("#D_1_" + i + ">input").val());
            if (isNaN(m[i])) {
                $("#D_1_" + i + ">input").css("background-color", "#EE3333");
                $("#D_1_3").html("");
                error = 1
            } else {
                $("#D_1_" + i + ">input").css("background-color", "#00ff00")
            }
        }
        if (error) {
            return 0
        }
        $("#D_1_3").html((Math.abs(m[1] - m[2])).toFixed(decimal));
        var midu = new Array();
        error = $("#error_D").val();
        midu[1] = (m[1] / (Math.abs(m[1] - m[2]))) * smidu;
        midu[2] = (-m[2]) * smidu / (Math.pow(m[1] - m[2], 2));
        midu[3] = m[1] * smidu / (Math.pow(m[1] - m[2], 2));
        midu[4] = Math.sqrt((midu[2] * midu[2] + midu[3] * midu[3]) * error * error);
        midu[5] = midu[4] * 100 / midu[1];
        $("#shiyan_output").append('【金属密度测量】<br/>', LaTeX('V\\rho _{w}g=(m_{1}-m_{2})g'), "<br/>", LaTeX('V=\\frac{m_{1}-m_{2}}{\\rho _{w}}'), "<br/>", LaTeX('\\rho =\\frac{\\bar{m}}{m_{1}-m_{2}}\\rho _{w}=' + midu[1].toFixed(decimal) + 'g/cm^{3}'), "<br/>", LaTeX('\\frac{\\partial \\rho }{\\partial m_{1}}=\\frac{-m_{2}}{(m_{1}-m_{2})^{2}}\\rho _{w}=' + midu[2].toFixed(decimal) + 'g'), "<br/>", LaTeX('\\frac{\\partial \\rho }{\\partial m_{2}}=\\frac{m_{1}}{(m_{1}-m_{2})^{2}}\\rho _{w}=' + midu[3].toFixed(decimal) + 'g'), "<br/>", LaTeX('U_{\\rho }=\\sqrt{(\\frac{\\partial \\rho }{\\partial m_{1}})^{2}(U_{\\bar{m_{1}}})^{2}+(\\frac{\\partial \\rho }{\\partial m_{2}})^{2}(U_{\\bar{m_{2}}})^{2}}=' + midu[4].toFixed(decimal) + 'g'), "<br/>", LaTeX('\\rho =(\\rho \\pm U_{\\rho })=(' + midu[1].toFixed(decimal) + '\\pm ' + midu[4].toFixed(decimal) + ')g'), "<br/>", LaTeX('E_{\\rho }=\\frac{U_{\\rho }}{\\rho }\\times 100\\%=' + midu[5].toFixed(decimal) + '\\%'))
    })
})