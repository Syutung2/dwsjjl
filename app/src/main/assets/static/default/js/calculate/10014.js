$(document).ready(function () {
    initDataDoc({"A": "自准法", "B": "反射法"});
    $("#setTab_A").click(function () {
        $("#shiyan_input").append("<div style='color: #ff0000;text-align: left;margin:10px 0;'>请输入形如【162.43】的数据，这里162.43 <=> 162<sub>。</sub>43<sub>'</sub>在计算中，我们会自动转换，如果计算结果出现A>ψ请更换1,2两行数据位置<br/>尤其注意这里【0'】也要输入【.0】 </div>");
        SET_TAB("A", 2, 4, 1, 0, "shiyan_input");
        SET_INPUT("A", 0, 1);
        SET_INPUT("A", 0, 2);
        $("#A_u1_0").html("位置");
        $("#A_u1_1").html("左游标");
        $("#A_u1_2").html("右游标");
        $("#A_u1_3").html("ψ");
        $("#A_u1_4").html("顶角A")
    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        if (!check("A", 2, [1, 2], "^[0-9]+([.]{1}[0-9]+){1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var L1 = new Array();
        var L2 = new Array();
        var L3 = new Array();
        var L4 = new Array();
        for (var i = 1; i <= 2; i++) {
            L1[i] = $("#A_" + i + "_1>input").val() + "";
            var a = L1[i].split(".");
            L1[i] = a[0];
            L2[i] = a[1]
        }
        for (var j = 1; j <= 2; j++) {
            L3[j] = $("#A_" + j + "_2>input").val() + "";
            var b = L3[j].split(".");
            L3[j] = b[0];
            L4[j] = b[1]
        }
        var H1 = new Array();
        var H2 = new Array();
        var sum = new Array();
        for (var k = 1; k <= 2; k++) {
            H1[k] = parseInt(L1[k]) * 60 + parseInt(L2[k]);
            H2[k] = parseInt(L3[k]) * 60 + parseInt(L4[k]);
            sum[k] = parseInt(H1[k]) + parseInt(H2[k])
        }
        a = sum[2] - sum[1];
        if (a < 0) {
            a += (360 * 60)
        }
        var y1 = (a * 60) / 2;
        var y2 = 180 * 60 * 60 - y1;
        var a1 = parseInt(y1 / 3600);
        var a2 = parseInt((y1 - (parseInt(y1 / 3600)) * 3600) / 60);
        var a3 = (y1 % 60);
        var b1 = parseInt(y2 / 3600);
        var b2 = parseInt((y2 - (parseInt(y2 / 3600)) * 3600) / 60);
        var b3 = (y2 % 60);
        $("#A_2_3").remove();
        $("#A_2_4").remove();
        $("#A_1_3").attr("rowspan", "2").html(LaTeX(a1 + "^{o}" + a2 + "'" + a3 + "''"));
        $("#A_1_4").attr("rowspan", "2").html(LaTeX(b1 + "^{o}" + b2 + "'" + b3 + "''"));
        $("#shiyan_output").append(LaTeX("\\varphi =\\frac{[(\\theta _{2}^{'}-\\theta _{1}^{'})+(\\theta _{2}^{''}-\\theta _{1}^{''})]}{2}=\\frac{[(" + L1[2] + "^{o}" + L2[2] + "'-" + L1[1] + "^{o}" + L2[1] + "')+(" + L3[2] + "^{o}" + L4[2] + "'-" + L3[1] + "^{o}" + L4[1] + "')]}{2}=" + a1 + "^{o}" + a2 + "'" + a3 + "''"), "<br/>", LaTeX("A = 180^{o}-" + a1 + "^{o}" + a2 + "'" + a3 + "''=" + b1 + "^{o}" + b2 + "'" + b3 + "''"), "<br/>", "<div style='color: #ff0000'>这里如果你有多组数据请重复此过程，之后求取A的平均值即可</div>")
    })
    $("#setTab_B").click(function () {
        $("#shiyan_input").append("<div style='color: #ff0000;text-align: left;margin:10px 0;'>请输入形如【162.43】的数据，这里162.43 <=> 162<sup>。</sup>43<sup>'</sup>在计算中，我们会自动转换，如果计算结果出现A<<60,请更换1,2两行数据位置<br/>尤其注意这里【0'】也要输入【.0】 </div>");
        SET_TAB("B", 2, 4, 1, 0, "shiyan_input");
        SET_INPUT("B", 0, 1);
        SET_INPUT("B", 0, 2);
        $("#B_u1_0").html("位置");
        $("#B_u1_1").html("左游标");
        $("#B_u1_2").html("右游标");
        $("#B_u1_3").html("ψ");
        $("#B_u1_4").html("顶角A")
    })
    $("#input").on("click", "#counter_B", function () {
        $("#shiyan_output").html("");
        if (!check("B", 2, [1, 2], "^[0-9]+([.]{1}[0-9]+){1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var L1 = new Array();
        var L2 = new Array();
        var L3 = new Array();
        var L4 = new Array();
        for (var i = 1; i <= 2; i++) {
            L1[i] = $("#B_" + i + "_1>input").val() + "";
            var a = L1[i].split(".");
            L1[i] = a[0];
            L2[i] = a[1]
        }
        for (var j = 1; j <= 2; j++) {
            L3[j] = $("#B_" + j + "_2>input").val() + "";
            var b = L3[j].split(".");
            L3[j] = b[0];
            L4[j] = b[1]
        }
        var H1 = new Array();
        var H2 = new Array();
        var sum = new Array();
        for (var k = 1; k <= 2; k++) {
            H1[k] = parseInt(L1[k]) * 60 + parseInt(L2[k]);
            H2[k] = parseInt(L3[k]) * 60 + parseInt(L4[k]);
            sum[k] = parseInt(H1[k]) + parseInt(H2[k])
        }
        a = sum[2] - sum[1];
        if (a < 0) {
            a += (360 * 60)
        }
        var y1 = (a * 60) / 2;
        var y2 = y1 / 2;
        var a1 = parseInt(y1 / 3600);
        var a2 = parseInt((y1 - (parseInt(y1 / 3600)) * 3600) / 60);
        var a3 = (y1 % 60);
        var b1 = parseInt(y2 / 3600);
        var b2 = parseInt((y2 - (parseInt(y2 / 3600)) * 3600) / 60);
        var b3 = (y2 % 60);
        $("#B_2_3").remove();
        $("#B_2_4").remove();
        $("#B_1_3").attr("rowspan", "2").html(LaTeX(a1 + "^{o}" + a2 + "'" + a3 + "''"));
        $("#B_1_4").attr("rowspan", "2").html(LaTeX(b1 + "^{o}" + b2 + "'" + b3 + "''"));
        $("#shiyan_output").append(LaTeX("\\varphi =\\frac{[(\\theta _{2}^{'}-\\theta _{1}^{'})+(\\theta _{2}^{''}-\\theta _{1}^{''})]}{2}=\\frac{[(" + L1[2] + "^{o}" + L2[2] + "'-" + L1[1] + "^{o}" + L2[1] + "')+(" + L3[2] + "^{o}" + L4[2] + "'-" + L3[1] + "^{o}" + L4[1] + "')]}{2}=" + a1 + "^{o}" + a2 + "'" + a3 + "''"), "<br/>", LaTeX("A = \\frac{" + a1 + "^{o}" + a2 + "'" + a3 + "''}{2}=" + b1 + "^{o}" + b2 + "'" + b3 + "''"), "<br/>", "<div style='color: #ff0000'>这里如果你有多组数据请重复此过程，之后求取A的平均值即可</div>")
    })
})