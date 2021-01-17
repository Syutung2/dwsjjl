$(document).ready(function () {
    initDataDoc({"A": " 光栅的衍射 "});
    $("#setTab_A").click(function () {
        $("#shiyan_input").append("<div style='color: #ff0000;text-align: left;margin:10px 0;'>请输入形如【162.43】的数据，这里162.43 <=> 162<sup>。</sup>43<sup>'</sup>在计算中，我们会自动转换<br/>尤其注意这里【0'】也要输入【.0】 </div>");
        $("#shiyan_input").append('<table class="table" id="shuju_kongzhi_table"> <tr><center><font size="5px" color="#8a2be2">请选择一种你要处理的颜色谱线</font></center></tr> <tr> <td><input id="purple" name="radio1" type="radio" value="purple" checked="checked"> <label for="purple">紫</label></td> <td><input id="green" name="radio1" type="radio" value="green"> <label for="green">绿</label></td> <td><input id="yellow1" name="radio1" type="radio" value="yellow1"> <label for="yellow1">黄1</label></td> <td><input id="yellow2" name="radio1" type="radio" value="yellow2"> <label for="yellow2">黄2</label></td> </tr> </table>');
        SET_TAB("A", 4, 2, 0, 0, "shiyan_input");
        SET_INPUT("A", 0, 1);
        SET_INPUT("A", 0, 2);
        $("#A_1_0").html("-1级");
        $("#A_2_0").html("-2级");
        $("#A_3_0").html("1级");
        $("#A_4_0").html("2级")
    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        if (!check("A", 4, [1, 2], "^[0-9]+([.]{1}[0-9]+){1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var radios = document.getElementsByName("radio1");
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked == true) {
                var choose = radios[i].value
            }
        }
        var bochang = 0;
        if (choose == "purple") {
            bochang = 435.8
        }
        if (choose == "green") {
            bochang = 548.1
        }
        if (choose == "yellow1") {
            bochang = 577.0
        }
        if (choose == "yellow2") {
            bochang = 579.1
        }
        var L1 = new Array();
        var L2 = new Array();
        var L3 = new Array();
        var L4 = new Array();
        for (var i = 1; i <= 4; i++) {
            L1[i] = $("#A_" + i + "_1>input").val();
            var a = L1[i].split(".");
            L1[i] = a[0];
            L2[i] = a[1]
        }
        for (var j = 1; j <= 4; j++) {
            L3[j] = $("#A_" + j + "_2>input").val() + "";
            var b = L3[j].split(".");
            L3[j] = b[0];
            L4[j] = b[1]
        }
        var H1 = new Array();
        var H2 = new Array();
        var sum = new Array();
        for (var k = 1; k <= 4; k++) {
            H1[k] = parseInt(L1[k]) * 60 + parseInt(L2[k]);
            H2[k] = parseInt(L3[k]) * 60 + parseInt(L4[k]);
            sum[k] = parseInt(H1[k]) + parseInt(H2[k])
        }
        a = sum[1] - sum[3];
        if (a < 0) {
            a += (360 * 60)
        }
        b = sum[2] - sum[4];
        if (b < 0) {
            b += (360 * 60)
        }
        var y1 = (a * 60) / 4;
        var y2 = (b * 60) / 4;
        var a1 = parseInt(y1 / 3600);
        var a2 = parseInt((y1 - (parseInt(y1 / 3600)) * 3600) / 60);
        var a3 = (y1 % 60);
        var b1 = parseInt(y2 / 3600);
        var b2 = parseInt((y2 - (parseInt(y2 / 3600)) * 3600) / 60);
        var b3 = (y2 % 60);
        if (choose == "purple") {
            $("#shiyan_output").html("紫色<br/>")
        }
        if (choose == "green") {
            $("#shiyan_output").html("绿色<br/>")
        }
        if (choose == "yellow1") {
            $("#shiyan_output").html("黄色1<br/>")
        }
        if (choose == "yellow2") {
            $("#shiyan_output").html("黄色2<br/>")
        }
        var aa = ((a1 + a2 / 60 + a3 / 3600) / 180) * Math.PI;
        var ab = (Math.sin(aa) / 300) * 1000000;
        var ea = (Math.abs(bochang - ab) / bochang) * 100;
        var ba = ((b1 + b2 / 60 + b3 / 3600) / 180) * Math.PI;
        var bb = (Math.sin(ba) / 600) * 1000000;
        var eb = (Math.abs(bochang - bb) / bochang) * 100;
        //var ave = (ab + bb) / 2;
        //$("#shiyan_output").append(LaTeX("\\varphi _{k=1}=\\frac{(" + L1[1] + "^{o}" + L2[1] + "'-" + L1[3] + "^{o}" + L2[3] + "')+(" + L3[1] + "^{o}" + L4[1] + "'-" + L3[3] + "^{o}" + L4[3] + "')}{2*2}=" + a1 + "^{o}" + a2 + "'" + a3 + "''"), "<br/>", LaTeX("d=\\frac{1}{300}nm,dsin\\varphi _{k}=\\pm k\\lambda ,\\lambda_{1} =" + ab.toFixed(2) + "nm"), "<br/>", LaTeX("\\varphi _{k=2}=\\frac{(" + L1[2] + "^{o}" + L2[2] + "'-" + L1[4] + "^{o}" + L2[4] + "')+(" + L3[2] + "^{o}" + L4[2] + "'-" + L3[4] + "^{o}" + L4[4] + "')}{2*2}=" + b1 + "^{o}" + b2 + "'" + b3 + "''"), "<br/>", LaTeX("d=\\frac{1}{300}nm,dsin\\varphi _{k}=\\pm k\\lambda ,\\lambda_{2} =" + bb.toFixed(2) + "nm"), "<br/>", LaTeX("\\bar{\\lambda }=\\frac{\\lambda _{1}+\\lambda _{2}}{2}=" + ave.toFixed(2) + "nm"), "<br/>", LaTeX("E=\\frac{|" + bochang + "-" + ave.toFixed(2) + "|}{" + bochang + "}\\times 100\\%=" + e.toFixed(2) + "\\%"))
        $("#shiyan_output").append(
            LaTeX("\\varphi _{k=1}=\\frac{(" + L1[1] + "^{o}" + L2[1] + "'-" + L1[3] + "^{o}" + L2[3] + "')+(" + L3[1] + "^{o}" + L4[1] + "'-" + L3[3] + "^{o}" + L4[3] + "')}{2*2}=" + a1 + "^{o}" + a2 + "'" + a3 + "''"), "<br/>",
            LaTeX("d=\\frac{1}{300}nm"),"<br/>",
            LaTeX("dsin\\varphi _{k}=\\pm k\\lambda "),"<br/>",
            LaTeX("\\lambda_{1} =" + ab.toFixed(2) + "nm"), "<br/>",
            LaTeX("E=\\frac{|" + bochang + "-" + ab.toFixed(2) + "|}{" + bochang + "}\\times 100\\%=" + ea.toFixed(2) + "\\%"),"<br/>",
            LaTeX("\\varphi _{k=2}=\\frac{(" + L1[2] + "^{o}" + L2[2] + "'-" + L1[4] + "^{o}" + L2[4] + "')+(" + L3[2] + "^{o}" + L4[2] + "'-" + L3[4] + "^{o}" + L4[4] + "')}{2*2}=" + b1 + "^{o}" + b2 + "'" + b3 + "''"), "<br/>",
            LaTeX("d=\\frac{1}{300}nm"),"<br/>",
            LaTeX("dsin\\varphi _{k}=\\pm k\\lambda "),"<br/>",
            LaTeX("\\lambda_{2} =" + bb.toFixed(2) + "nm"), "<br/>",
            LaTeX("E=\\frac{|" + bochang + "-" + bb.toFixed(2) + "|}{" + bochang + "}\\times 100\\%=" + eb.toFixed(2) + "\\%"))
    })
})