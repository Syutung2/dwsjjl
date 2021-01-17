$(document).ready(function () {
    $("#setTab_A").click(function () {
        $("#shiyan_input").html("");
        $("#counter_A").remove();
        //$("#counter_A").css("display", "none");
        if (!(fn_group($("#group_A"), "A") && fn_error($("#error_A"), "A"))) {
            $("#counter_A").css("display", "none");
            return 0
        }
        var group = $("#group_A").val();
        SET_TAB("A", group/2, 4, 2, 0, "shiyan_input");
        SET_INPUT("A", 0, 1);
        SET_INPUT("A", 0, 3);
        $("#A_u2_1,#A_u2_2,#A_u2_3,#A_u2_4").remove();
        $("#A_u2_0").attr("colspan", "5").text("逐差法计算器");
        $("#A_u1_0").html("序号");
        $("#A_u1_1").html("测量数据");
        $("#A_u1_2").html("序号");
        $("#A_u1_3").html("测量数据");
        $("#A_u1_4").html("差值");
        for(var i=1;i<group;i++){
            $("#A_"+i+"_2").html("☛" + (i+group/2) + "☚");
        }
        var button = '<button id="counter_A" class="xb3 xm3 xl6 xs6 xb9-move xm9-move xl6-move xs6-move button-big calc button border-main margin-top">下一步</button>';
        $("#shiyan_input").after($(button));
    })
    $("#input").on("click", "#counter_A", function () {
        $("#shiyan_output").html("");
        var zimu = $("#zimu_A").val();
        var unit = $("#unit_A").val();
        var group = $("#group_A").val();
        var error = $("#error_A").val();
        var decimal = error.split(".")[1].length;
        if (!check("A", group/2, [1,3], "^[0-9]+([.]{1}[0-9]+){0,1}$")) {
            $("#shiyan_output").html("");
            return 0
        }
        var col = new Array();
        for(var i=1;i<=group/2;i++){
            col[i] = parseFloat($("#A_" + i + "_3>input").val()) - parseFloat($("#A_" + i + "_1>input").val());
        }
        console.log("123");
        bqd(col,error,true,"#shiyan_output",zimu,unit);
        for(var i=1;i<=group/2;i++){
            $("#A_" + i + "_4").html((col[i]).toFixed(decimal));
        }
    })
})