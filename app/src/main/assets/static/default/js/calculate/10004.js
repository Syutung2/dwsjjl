$(document).ready(function () {
    initDataDoc({"A": "各单次直接测量", "B": "系统本身的转动惯量I<sub>0</sub>", "C": "铝环对中心轴的转动惯量I", "D": "验证平行轴定理"});
    $("#setTab_A").click(function () {
        SET_TAB("A", 8, 2, 1, 0, "shiyan_input");
        SET_INPUT("A", 0, 2);
        $("#A_u1_1,#A_u1_2").remove();
        $("#A_u1_0").attr("colspan", "3").html("<h3>各单次直接测量量</h3>");
        $("#A_1_1").html("砝码质量m<sub>1</sub>/g");
        $("#A_2_1").html("塔轮半径R/cm");
        $("#A_3_1").html("铝环的质量m<sub>环</sub>/g");
        $("#A_4_1").html("铝环的外径D<sub>外</sub>/cm");
        $("#A_5_1").html("铝环的内径D<sub>内</sub>/cm");
        $("#A_6_1").html("小圆柱质量m<sub>柱</sub>/g");
        $("#A_7_1").html("小孔中心距d<sub>max</sub>/cm");
        $("#A_8_1").html("小孔中心距d<sub>min</sub>/cm")
    })
    var localArr = new Array();
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        if (!check("A", 8, [2], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        for (var i = 1; i <= 8; i++) {
            localArr[i] = $("#A_" + i + "_2>input").val()
        }
        localArr[1] /= 1000;
        localArr[2] /= 100;
        localArr[3] /= 1000;
        localArr[4] /= 100;
        localArr[5] /= 100;
        localArr[6] /= 1000;
        localArr[7] /= 100;
        localArr[8] /= 100;
        $("#shiyan_output").append("<span style='color: #ff0000'>注意：已经存储以下数据【已转换成标准单位】，请认真核对，如果有错误请重新进行上一步操作</span><br/>", "砝码质量m<sub>1</sub>=" + localArr[1].toFixed(3), "kg<br/>", "塔轮半径R=" + localArr[2].toFixed(4), "m<br/>", "铝环的质量m<sub>环</sub>=" + localArr[3].toFixed(4), "kg<br/>", "铝环的外径D<sub>外</sub>=" + localArr[4].toFixed(4) + "m<br/>", "铝环的内径D<sub>内</sub>=" + localArr[5].toFixed(4), "m<br/>", "小圆柱质量m<sub>柱</sub>=" + localArr[6].toFixed(4), "kg<br/>", "小孔中心距d<sub>max</sub>=" + localArr[7].toFixed(4), "m<br/>", "小孔中心距d<sub>min</sub>=" + localArr[8].toFixed(4) + "m");
        localArr[4] /= 2;
        localArr[5] /= 2
    })
    $("#setTab_B").click(function () {
        if (!(fn_group($("#group_B"), "B"))) {
            $("#counter_B").css("display", "none");
            return 0
        }
        var group = $("#group_B").val();
        SET_TAB("B", group, 2, 2, 1, "shiyan_input");
        SET_INPUT("B", 0, 1);
        SET_INPUT("B", 0, 2);
        $("#B_u2_1,#B_u2_2").remove();
        $("#B_u2_0").attr("colspan", "3").html("<h4>系统本身的转动惯量I<sub>0</sub></h4>");
        $("#B_u1_0").text("测量次数");
        $("#B_u1_1").html(LaTeX("\\beta /(rad/s^{2})"));
        $("#B_u1_2").html(LaTeX("\\beta ^{'}/(rad/s^{2})"));
        $("#B_d1_0").html("平均值");
        $("#B_d1_1,#B_d1_2").html("")
    })
    var ii = "error";
    $("#input").on("click", "#counter_B", function () {
        $("#shiyan_output").html("");
        var group = $("#group_B").val();
        if (!check("B", group, [1, 2], "^[-]?[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0;
        }
        var arr1 = new Array();
        var arr2 = new Array();
        for (var i = 1; i <= group; i++) {
            arr1[i] = Number($("#B_" + i + "_1>input").val());
            arr2[i] = Number($("#B_" + i + "_2>input").val());
        }
        var a = bqd(arr1, 0.00001, false);
        var b = bqd(arr2, 0.00001, false);
        $("#B_d1_1").text((a.ave).toFixed(5));
        $("#B_d1_2").text((b.ave).toFixed(5));
        ii = ((localArr[1] * 9.8 * localArr[2]) / (a.ave - b.ave)).toFixed(5);
        $("#shiyan_output").append(LaTeX("\\bar{I_{0}}=\\frac{m_{1}gR}{\\bar{\\beta }-\\bar{\\beta ^{'}}}=\\frac{" + localArr[1] + "*9.8*" + localArr[2] + "}{" + (a.ave).toFixed(5) + "-" + (b.ave).toFixed(5) + "}=" + ii + "kg*m^{2}"))
    })
    $("#setTab_C").click(function () {
        if (!(fn_group($("#group_C"), "C"))) {
            $("#counter_C").css("display", "none");
            return 0
        }
        var group = $("#group_C").val();
        SET_TAB("C", group, 5, 2, 1, "shiyan_input");
        SET_INPUT("C", 0, 1);
        SET_INPUT("C", 0, 3);
        $("#C_u2_1,#C_u2_2,#C_u2_3,#C_u2_4,#C_u2_5").remove();
        $("#C_u2_0").attr("colspan", "6").html("<h3>铝环对中心轴的转动惯量I</h3>");
        $("#C_u1_0").html("序号");
        $("#C_u1_1").html(LaTeX("y/g"));
        $("#C_u1_2").html(LaTeX("y^{2}/g^{2}"));
        $("#C_u1_3").html(LaTeX("x/S^{-2}"));
        $("#C_u1_4").html(LaTeX("x^{2}/S^{-4}"));
        $("#C_u1_5").html(LaTeX("xy/(g/S^{2})"));
        $("#C_d1_0").text("平均值");
        $("#C_d1_1,#C_d1_2,#C_d1_3,#C_d1_4,#C_d1_5").html("")
    })
    $("#input").on("click", "#counter_C", function () {
        $("#shiyan_output").html("");
        var group = $("#group_C").val();
        if (!check("C", group, [1, 3], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var col_1 = new Array();
        var col_2 = new Array();
        var col_3 = new Array();
        var col_4 = new Array();
        var col_5 = new Array();
        for (var i = 1; i <= group; i++) {
            col_1[i] = parseFloat($("#C_" + i + "_1>input").val());
            col_2[i] = col_1[i] * col_1[i];
            col_3[i] = parseFloat($("#C_" + i + "_3>input").val());
            col_4[i] = col_3[i] * col_3[i];
            col_5[i] = col_1[i] * col_3[i];
            $("#C_" + i + "_2").html(col_2[i].toFixed(1));
            $("#C_" + i + "_4").html(col_4[i].toFixed(5));
            $("#C_" + i + "_5").html(col_5[i].toFixed(5))
        }
        $("#C_d1_1").html(ave(col_1).toFixed(1));
        $("#C_d1_2").html(ave(col_2).toFixed(1));
        $("#C_d1_3").html(ave(col_3).toFixed(5));
        $("#C_d1_4").html(ave(col_4).toFixed(5));
        $("#C_d1_5").html(ave(col_5).toFixed(5));
        var a1 = (ave(col_3) * ave(col_1) - ave(col_5)) / (ave(col_3) * ave(col_3) - ave(col_4));
        var a0 = ave(col_1) - a1 * ave(col_3);
        var i = a1 * 9.8 * 0.001 * localArr[2];
        var ih = i - ii;
        var mv = a0 * 9.8 * 0.001 * localArr[2];
        var r = (ave(col_5) - ave(col_3) * ave(col_1)) / (Math.sqrt((ave(col_4) - ave(col_3) * ave(col_3)) * (ave(col_2) - ave(col_1) * ave(col_1))));
        var il = 0.5 * localArr[3] * (Math.pow(localArr[5], 2) + Math.pow(localArr[4], 2));
        var e = Math.abs((ih - il) / il) * 100;
        $("#shiyan_output").append(LaTeX("a_{1}=\\frac{\\bar{x}\\cdot \\bar{y}-\\overline{x\\cdot y}}{\\bar{x}^{2}-\\bar{x^{2}}}=\\frac{" + ave(col_3).toFixed(5) + "*" + ave(col_1).toFixed(5) + "-" + ave(col_5).toFixed(5) + "}{" + ave(col_3).toFixed(5) + "^{2}-" + ave(col_4).toFixed(5) + "}=" + a1.toFixed(5) + "kg*m^{2}"), "<br/>", LaTeX("a_{0}=\\bar{y}-a_{1}\\bar{x}=" + ave(col_1).toFixed(5) + "-(" + a1.toFixed(5) + "*" + ave(col_3).toFixed(5) + ")=" + a0.toFixed(5)), "<br/>", LaTeX("I=a_{1}gR=" + a1.toFixed(5) + "*9.8*0.001*" + localArr[2].toFixed(5) + "=" + i.toFixed(5) + "kg*m^{2}"), "<br/>", LaTeX("I_{p}=I-\\bar{I_{0}}=" + i.toFixed(5) + "-" + ii + "=" + ih.toFixed(5) + "kg*m^{2}"), "<br/>", LaTeX("M_{v}=a_{0}gR=" + a0.toFixed(5) + "*9.8*0.001*" + localArr[2].toFixed(5) + "=" + mv.toFixed(5) + "kg*m^{2}"), "<br/>", LaTeX("\\gamma =\\frac{\\overline{x*y}-\\bar{x}*\\bar{y}}{\\sqrt{(\\bar{x^{2}}-\\bar{x}^{2})(\\bar{y^{2}}-\\bar{y}^{2})}}="), "<br/>", LaTeX("\\gamma =\\frac{" + ave(col_5).toFixed(5) + "-" + ave(col_3).toFixed(5) + "*" + ave(col_1).toFixed(5) + "}{\\sqrt{(" + ave(col_4).toFixed(5) + "-{" + ave(col_3).toFixed(5) + "}^{2})(" + ave(col_2).toFixed(5) + "-{" + ave(col_1).toFixed(5) + "}^{2})}}=" + r.toFixed(5)), "<br/>", "I<sub>环理论</sub>=", LaTeX("\\frac{1}{2}m_{h}(R_{n}^{2}+R_{w}^{2})=\\frac{1}{2}*" + localArr[3].toFixed(5) + "*(" + localArr[5].toFixed(5) + "^{2}+" + localArr[4].toFixed(5) + "^{2})=" + il.toFixed(5) + "kg*m^{2}"), "<br/>", LaTeX("E=|\\frac{I_{h}-I_{l}}{I_{l}}|*100\\%=|\\frac{" + ih.toFixed(5) + "-" + il.toFixed(5) + "}{" + il.toFixed(5) + "}|*100\\%=" + e.toFixed(2) + "\\%"))
    });
    $("#setTab_D").click(function () {
        SET_TAB("D", 2, 4, 1, 0, "shiyan_input");
        SET_INPUT("D", 0, 2);
        SET_INPUT("D", 0, 4);
        $("#D_u1_0").html("");
        $("#D_u1_1").html("");
        $("#D_u1_2").html("测I<sub>1</sub>(2,2')");
        $("#D_u1_3").html("");
        $("#D_u1_4").html("测I<sub>2</sub>(1,3')");
        $("#D_1_1").html(LaTeX("\\beta _{1}/rad\\cdot s^{-2}"));
        $("#D_2_1").html(LaTeX("\\beta _{1}^{'}/rad\\cdot s^{-2}"));
        $("#D_1_3").html(LaTeX("\\beta _{2}/rad\\cdot s^{-2}"));
        $("#D_2_3").html(LaTeX("\\beta _{2}^{'}/rad\\cdot s^{-2}"))
    });
    $("#input").on("click", "#counter_D", function () {
        $("#shiyan_output").html("");
        if (!check("D", 2, [2, 4], "^[-]?[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var d11 = parseFloat($("#D_1_2>input").val());
        var d12 = parseFloat($("#D_2_2>input").val());
        var d21 = parseFloat($("#D_1_4>input").val());
        var d22 = parseFloat($("#D_2_4>input").val());
        var d = 0.5 * (localArr[7] + localArr[8]);
        var I1 = (localArr[1] * 9.8 *  localArr[2]) / (d11 - d12);
        var I2 = (localArr[1] * 9.8 *  localArr[2]) / (d21 - d22);
        var ic = I1 - I2;
        var m2 = 2 * localArr[6] * d * d;
        var e = (Math.abs(m2 - ic) / m2) * 100;
        $("#shiyan_output").append("两小孔中心间的距离为：",
            LaTeX("d=\\frac{1}{2}(d_{max}+d_{min})=\\frac{1}{2}*(" + localArr[7].toFixed(5) + "+" + localArr[8].toFixed(5) + ")=" + d.toFixed(5)) + "m",
            "<br/>",
            LaTeX("I_{1}=\\frac{m_{1}gR}{\\beta _{1}-\\beta _{1}^{'}}=\\frac{" + localArr[1].toFixed(5) + "*9.8*" + localArr[2].toFixed(5) + "}{" + d11.toFixed(5) + "-" + d12.toFixed(5) + "}=" +I1.toFixed(5) + "kg*m^{2}"),
            "<br/>",
            LaTeX("I_{2}=\\frac{m_{1}gR}{\\beta _{2}-\\beta _{2}^{'}}=\\frac{" + localArr[1].toFixed(5) + "*9.8*" + localArr[2].toFixed(5) + "}{" + d21.toFixed(5) + "-" + d22.toFixed(5) + "}=" + I2.toFixed(5) + "kg*m^{2}"),
            "<br/>",
            LaTeX("I_{2}-I_{1}=" + I2.toFixed(5) + "-" + I1.toFixed(5) + "=" + ic.toFixed(5) + "kg*m^{2}"),
            "<br/>",
            LaTeX("2m_{z}d^{2}=2*" + localArr[6].toFixed(5) + "*" + d.toFixed(5) + "=" + m2.toFixed(5) + "kg*m^{2}"),
            "<br/>",
            LaTeX("E=\\frac{|2m_{z}d^{2}-(I_{2}-I_{1})|}{2m_{z}d^{2}}*100\\%=\\frac{|2*" + localArr[6].toFixed(5) + "*" + d.toFixed(5) + "^{2}-(" + I1.toFixed(5) + "-" + I2.toFixed(5) + ")|}{2*" + localArr[6].toFixed(5) + "*" + d.toFixed(5) + "^{2}}*100\\%=" + e.toFixed(2) + "\\%"));
    })
})