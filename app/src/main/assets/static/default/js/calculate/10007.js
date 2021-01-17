$(document).ready(function () {
    initDataDoc({"A": "普通法", "B": "交换法"});
    function cha(num) {
        var nums = new String(num);
        var arr = new Array();
        arr = nums.split(".");
        var sum = 0;
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            if (i == 0) {
                var n = arr[i].length;
                var b = 0;
                for (var j = 0; j < n; j++) {
                    var temp = arr[0][j] * Math.pow(10, (n - j - 1));
                    if (temp == 0) {
                        continue
                    }
                    switch (n - j) {
                        case 1:
                            b = 2;
                            break;
                        case 2:
                            b = 1;
                            break;
                        case 3:
                            b = 0.5;
                            break;
                        case 4:
                            b = 0.1;
                            break;
                        case 5:
                            b = 0.1;
                            break
                    }
                    sum += (parseFloat(temp * b * 0.01));
                    str += (temp + "*" + b + "\%+")
                }
            } else if (i == 1) {
                temp = arr[1];
                sum += (parseFloat(temp * 5 * 0.01 * 0.1));
                str += ("0." + temp + "*" + 5 + "\%+")
            }
        }
        var str = str.substring(0, str.length - 1);
        return {"data": sum, "str": str}
    }

    $("#setTab_A").click(function () {
        SET_TAB("A", 2, 6, 1, 0, "shiyan_input");
        SET_INPUT("A", 0, 1);
        SET_INPUT("A", 0, 2);
        SET_INPUT("A", 0, 4);
        $("#A_u1_0").html("");
        $("#A_u1_1").html("R<sub>1</sub>");
        $("#A_u1_2").html("R<sub>2</sub>");
        $("#A_u1_3").html("R<sub>1</sub>/R<sub>2</sub>");
        $("#A_u1_4").html("R<sub>0</sub>");
        $("#A_u1_5").html("R<sub>X</sub>");
        $("#A_u1_6").html("△'R<sub>X</sub>");
        $("#A_1_0").html("R<sub>X1</sub>");
        $("#A_2_0").html("R<sub>X2</sub>")
    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        if (!check("A", 2, [1, 2, 4], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var r1 = parseFloat($("#A_1_1>input").val());
        var r2 = parseFloat($("#A_1_2>input").val());
        var r0 = parseFloat($("#A_1_4>input").val());
        var r1r2 = r1 / r2;
        var rx = r1r2 * r0;
        var dr1 = cha(r1)["data"];
        var dr2 = cha(r2)["data"];
        var dr0 = cha(r0)["data"];
        var drx = rx * Math.sqrt(Math.pow(dr1 / r1, 2) + Math.pow(dr2 / r2, 2) + Math.pow(dr0 / r0, 2));
        var er = (drx / rx) * 100;
        $("#A_1_3").html(r1r2.toFixed(1));
        $("#A_1_5").html(rx.toFixed(2));
        $("#A_1_6").html(drx.toFixed(3));
        $("#shiyan_output").append("R<sub>X1</sub>：待测电阻计算：<br/>", LaTeX("R_{X}=\\frac{R_{1}}{R_{2}}R_{0}=" + rx.toFixed(2) + "\\Omega "), "<br/>", "不确定度计算：<br/>", LaTeX(cha(r1)["str"] + "=" + cha(r1)["data"].toFixed(3) + "\\Omega "), "<br/>", LaTeX(cha(r2)["str"] + "=" + cha(r2)["data"].toFixed(3) + "\\Omega "), "<br/>", LaTeX(cha(r0)["str"] + "=" + cha(r0)["data"].toFixed(3) + "\\Omega "), "<br/>", LaTeX("\\bigtriangleup ^{'}R_{X}=R_{X}\\sqrt{(\\frac{\\bigtriangleup R_{1}}{R_{1}})^{2}+(\\frac{\\bigtriangleup R_{2}}{R_{2}})^{2}+(\\frac{\\bigtriangleup R_{0}}{R_{0}})^{2}}\\approx " + drx.toFixed(3) + "\\Omega "), "<br/>", "结果表达：<br/>", LaTeX("R=R_{X}\\pm \\bigtriangleup R_{X}=(" + rx.toFixed(2) + "\\pm " + drx.toFixed(2) + ")\\Omega"), " P=95%<br/>", LaTeX("E_{r}=\\frac{\\bigtriangleup R_{X}}{R_{X}}\\times 100\\%=" + er.toFixed(2) + "\\%"), "<br/><hr>");
        var r1 = parseFloat($("#A_2_1>input").val());
        var r2 = parseFloat($("#A_2_2>input").val());
        var r0 = parseFloat($("#A_2_4>input").val());
        var r1r2 = r1 / r2;
        var rx = r1r2 * r0;
        var dr1 = cha(r1)["data"];
        var dr2 = cha(r2)["data"];
        var dr0 = cha(r0)["data"];
        var drx = rx * Math.sqrt(Math.pow(dr1 / r1, 2) + Math.pow(dr2 / r2, 2) + Math.pow(dr0 / r0, 2));
        var er = (drx / rx) * 100;
        $("#A_2_3").html(r1r2.toFixed(1));
        $("#A_2_5").html(rx.toFixed(2));
        $("#A_2_6").html(drx.toFixed(3));
        $("#shiyan_output").append("R<sub>X2</sub>：待测电阻计算：<br/>", LaTeX("R_{X}=\\frac{R_{1}}{R_{2}}R_{0}=" + rx.toFixed(2) + "\\Omega "), "<br/>", "不确定度计算：<br/>", LaTeX(cha(r1)["str"] + "=" + cha(r1)["data"].toFixed(3) + "\\Omega "), "<br/>", LaTeX(cha(r2)["str"] + "=" + cha(r2)["data"].toFixed(3) + "\\Omega "), "<br/>", LaTeX(cha(r0)["str"] + "=" + cha(r0)["data"].toFixed(3) + "\\Omega "), "<br/>", LaTeX("\\bigtriangleup ^{'}R_{X}=R_{X}\\sqrt{(\\frac{\\bigtriangleup R_{1}}{R_{1}})^{2}+(\\frac{\\bigtriangleup R_{2}}{R_{2}})^{2}+(\\frac{\\bigtriangleup R_{0}}{R_{0}})^{2}}\\approx " + drx.toFixed(3) + "\\Omega "), "<br/>", "结果表达：<br/>", LaTeX("R=R_{X}\\pm \\bigtriangleup R_{X}=(" + rx.toFixed(2) + "\\pm " + drx.toFixed(2) + ")\\Omega"), " P=95%<br/>", LaTeX("E_{r}=\\frac{\\bigtriangleup R_{X}}{R_{X}}\\times 100\\%=" + er.toFixed(2) + "\\%"), "<br/><hr>")
    })
    $("#setTab_B").click(function () {
        SET_TAB("B", 2, 9, 1, 0, "shiyan_input");
        SET_INPUT("B", 0, 1);
        SET_INPUT("B", 0, 2);
        SET_INPUT("B", 0, 3);
        SET_INPUT("B", 0, 4);
        SET_INPUT("B", 0, 6);
        SET_INPUT("B", 0, 7);
        $("#B_u1_0").html("");
        $("#B_u1_1").html("R<sub>1</sub>");
        $("#B_u1_2").html("R<sub>2</sub>");
        $("#B_u1_3").html("R<sub>0</sub>");
        $("#B_u1_4").html("R<sub>0</sub>'");
        $("#B_u1_5").html("R<sub>X</sub>");
        $("#B_u1_6").html("△R<sub>0</sub>");
        $("#B_u1_7").html("△d");
        $("#B_u1_8").html("△R<sub>X</sub>''");
        $("#B_u1_9").html("△R<sub>X</sub>'");
        $("#B_1_0").html("R<sub>X1</sub>");
        $("#B_2_0").html("R<sub>X2</sub>")
    })
    $("#input").on("click", "#counter_B", function () {
        $("#shiyan_output").html("");
        if (!check("B", 2, [1, 2, 3, 4, 6, 7], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var r1 = parseFloat($("#B_1_1>input").val());
        var r2 = parseFloat($("#B_1_2>input").val());
        var r0 = parseFloat($("#B_1_3>input").val());
        var pr0 = parseFloat($("#B_1_4>input").val());
        var sr0 = parseFloat($("#B_1_6>input").val());
        var sd = parseFloat($("#B_1_7>input").val());
        var rx = Math.sqrt(r0 * pr0);
        var dr0 = cha(r0)["data"];
        var prx = (Math.sqrt(2) / 2) * (dr0 / r0) * rx;
        var s = sd / (sr0 / r0);
        var pprx = (0.2 / s) * rx;
        var drx = Math.sqrt(prx * prx + pprx * pprx);
        var er = (drx / rx) * 100;
        $("#B_1_5").html(rx.toFixed(2));
        $("#B_1_8").html(pprx.toFixed(3));
        $("#B_1_9").html(prx.toFixed(3));
        $("#shiyan_output").append("R<sub>X1</sub>：待测电阻的计算<br/>", LaTeX("R_{X}=\\sqrt{R_{0}\\cdot R_{0}^{'}}=" + rx.toFixed(2) + "\\Omega "), "<br/>", "电阻箱等级所产生的不确定度：<br/>", LaTeX(cha(r0)["str"] + "=" + cha(r0)["data"].toFixed(2) + "\\Omega "), "<br/>", LaTeX("\\bigtriangleup R_{X}^{'}=\\frac{\\sqrt{2}}{2}*\\frac{\\bigtriangleup R_{0}}{R_{0}}*R_{X}=" + prx.toFixed(3) + "\\Omega "), "<br/>", LaTeX("S=\\frac{\\bigtriangleup d}{\\frac{\\bigtriangleup R_{X}}{R_{0}}}=" + s.toFixed(1)), "<br/>", LaTeX("\\bigtriangleup R_{X}^{''}=\\frac{0.2}{S}R_{X}=" + pprx.toFixed(3) + "\\Omega "), "<br/>", "待测电阻的不确定度：<br/>", LaTeX("\\bigtriangleup R_{X}=\\sqrt{\\bigtriangleup R_{X^{'}}^{2}+\\bigtriangleup R_{X^{''}}^{2}}=" + drx.toFixed(3) + "\\Omega "), "<br/>", "结果表达：<br/>", LaTeX("R=R_{X}\\pm \\bigtriangleup R_{X}=(" + rx.toFixed(2) + "\\pm " + drx.toFixed(2) + ")\\Omega"), " P=95%<br/>", LaTeX("E_{r}=\\frac{\\bigtriangleup R_{X}}{R_{X}}\\times 100\\%=" + er.toFixed(2) + "\\%"), "<br/><hr>");
        var r1 = parseFloat($("#B_2_1>input").val());
        var r2 = parseFloat($("#B_2_2>input").val());
        var r0 = parseFloat($("#B_2_3>input").val());
        var pr0 = parseFloat($("#B_2_4>input").val());
        var sr0 = parseFloat($("#B_2_6>input").val());
        var sd = parseFloat($("#B_2_7>input").val());
        var rx = Math.sqrt(r0 * pr0);
        var dr0 = cha(r0)["data"];
        var prx = (Math.sqrt(2) / 2) * (dr0 / r0) * rx;
        var s = sd / (sr0 / r0);
        var pprx = (0.2 / s) * rx;
        var drx = Math.sqrt(prx * prx + pprx * pprx);
        var er = (drx / rx) * 100;
        $("#B_2_5").html(rx.toFixed(2));
        $("#B_2_8").html(pprx.toFixed(3));
        $("#B_2_9").html(prx.toFixed(3));
        $("#shiyan_output").append("R<sub>X2</sub>：待测电阻的计算<br/>", LaTeX("R_{X}=\\sqrt{R_{0}\\cdot R_{0}^{'}}=" + rx.toFixed(2) + "\\Omega "), "<br/>", "电阻箱等级所产生的不确定度：<br/>", LaTeX(cha(r0)["str"] + "=" + cha(r0)["data"].toFixed(2) + "\\Omega "), "<br/>", LaTeX("\\bigtriangleup R_{X}^{'}=\\frac{\\sqrt{2}}{2}*\\frac{\\bigtriangleup R_{0}}{R_{0}}*R_{X}=" + prx.toFixed(3) + "\\Omega "), "<br/>", LaTeX("S=\\frac{\\bigtriangleup d}{\\frac{\\bigtriangleup R_{X}}{R_{0}}}=" + s.toFixed(1)), "<br/>", LaTeX("\\bigtriangleup R_{X}^{''}=\\frac{0.2}{S}R_{X}=" + pprx.toFixed(3) + "\\Omega "), "<br/>", "待测电阻的不确定度：<br/>", LaTeX("\\bigtriangleup R_{X}=\\sqrt{\\bigtriangleup R_{X^{'}}^{2}+\\bigtriangleup R_{X^{''}}^{2}}=" + drx.toFixed(3) + "\\Omega "), "<br/>", "结果表达：<br/>", LaTeX("R=R_{X}\\pm \\bigtriangleup R_{X}=(" + rx.toFixed(2) + "\\pm " + drx.toFixed(2) + ")\\Omega"), " P=95%<br/>", LaTeX("E_{r}=\\frac{\\bigtriangleup R_{X}}{R_{X}}\\times 100\\%=" + er.toFixed(2) + "\\%"), "<br/><hr>")
    })
})