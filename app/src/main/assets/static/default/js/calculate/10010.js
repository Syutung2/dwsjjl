$(document).ready(function () {
    initDataDoc({"A": "李萨如图形观察记录", "B": "测扫描频率及扫描因数"});
    $("#setTab_A").click(function () {
        var img = $("<img src='../../static/default/images/experiment/10010-1.gif'>");
        $("#shiyan_input").append(img)
    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("此实验表无计算环节")
    })
    $("#setTab_B").click(function () {
        if (!(fn_group($("#group_B"), "B"))) {
            $("#counter_B").css("display", "none");
            return 0
        }
        var group = $("#group_B").val();
        SET_TAB("B", 1, group, 2, 2, "shiyan_input");
        for (var i = 1; i <= group; i++) {
            SET_INPUT("B", 0, i);
            $("#B_u2_" + i).remove();
            if (i > 1)$("#B_d2_" + i).remove();
            $("#B_u1_" + i).html(i);
            $("#B_d1_" + i).html("")
        }
        $("#B_u1_0").html("n");
        $("#B_u2_0").attr("colspan", group + 1).html("<h3>测扫描频率及扫描因数</h3>");
        $("#B_1_0").html("f<sub>y</sub> (Hz)");
        $("#B_d1_0").html("f<sub>x</sub> = f<sub>y</sub>/n (Hz)");
        $("#B_d2_0").html(LaTeX("\\bar{f_{x}}"));
        $("#B_d2_1").attr("colspan", group).html("")
    })
    $("#input").on("click", "#counter_B", function () {
        $("#shiyan_output").html("");
        var group = parseInt($("#group_B").val());
        var arr = new Array();
        for (var i = 1; i <= group; i++) {
            arr.push(i)
        }
        if (!check("B", 1, arr, "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var num = new Array();
        var sum = 0;
        for (var i = 1; i <= group; i++) {
            num[i] = parseFloat($("#B_1_" + i + ">input").val()) / parseFloat($("#B_u1_" + i).html());
            sum += num[i];
            $("#B_d1_" + i).html(num[i].toFixed(1))
        }
        var ave = sum / group;
        $("#B_d2_1").html(ave.toFixed(2));
        var t10 = (1 / ave) * 1000;
        var smys = t10 / 10;
        $("#shiyan_output").append(LaTeX("t_{10}=1/\\bar{f_{x}}=" + t10.toFixed(2) + "ms"), "<br/>", "扫描因数：<br/>", LaTeX("\\frac{t_{10}}{10}=" + smys.toFixed(3) + " ms/div"))
    })
})