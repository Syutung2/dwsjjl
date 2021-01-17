function initDataDoc(data) {
    $("#A").removeClass("hidden");
    for (var item in data) {
        var button = $('<div class="xb3 xm3 xs6 xl6"><button id="nav_' + item + '" data-for="' + item + '" class="x10 x1-move margin-top nav_select button button-big border-main select-table">' + data[item] + '</button></div>');
        $("#calculateNav").append(button)
    }
    $("#calculateNav").on("click", function (e) {
        if (e.target.tagName == "BUTTON") {
            var name = $("#" + e.target.id).data("for");
            $(".init").addClass("hidden");
            $("#" + name).removeClass("hidden");
            $("#shiyan_input,#shiyan_output").html("");
            $(".calc").remove()
        }
    })
    $(".set-tab").on("click", function () {
        $("#shiyan_input").html("");
        $("#shiyan_output").html("");
        $(".calc").remove();
        var flag = $(this).data("for");
        var button = '<button id="counter_' + flag + '" class="xb3 xm3 xl6 xs6 xb9-move xm9-move xl6-move xs6-move button-big calc button border-main margin-top">下一步</button>';
        $("#shiyan_input").after($(button));
    })
}
// 转换为科学计数法
function kxjs(num,decimal) {
    if (num < 0.001) {
        num = new String(num);
        var data = num.split("e");
        data[0] = Number(data[0]);
        num = data[0].toFixed(decimal)+"*10^{"+data[1]+"}";
    }
    return num;
}
function bqd(arr, error, print, target, flag, unit) {
    error = new String(error);
    var decimal = error.split(".")[1].length;
    error = Number(parseFloat(error).toFixed(decimal));
    var sum = 0;
    var arrLength = arr.length - 1;
    for (var i = 1; i <= arrLength; i++) {
        sum += Number(arr[i])
    }
    sum = Number(sum.toFixed(decimal));
    var ave = Number((sum / arrLength).toFixed(decimal));
    var cancha = new Array();
    for (var j = 1; j <= arrLength; j++) {
        cancha[j] = Number((parseFloat(arr[j]) - ave).toFixed(decimal))
    }
    var canchaAbs = [];
    for (j = 1; j <= arrLength; j++) {
        canchaAbs[j] = Number((Math.abs(cancha[j])).toFixed(decimal))
    }
    canchaAbs[0] = null;
    var max = Math.max.apply(null, canchaAbs);
    var tw = 0;
    for (i = 1; i <= arrLength; i++) {
        tw += cancha[i] * cancha[i]
    }
    tw = Number(tw);
    var biaozhuncha = Number((Math.sqrt(tw / (arrLength - 1))).toFixed(decimal));
    var biaozhuncha_3 = Number((biaozhuncha * 3).toFixed(decimal));
    if (max > (3 * biaozhuncha_3)) {
        window.alert("检测到您输入的数据中存在粗大误差!!!")
    }
    var avebiaozhuncha = Number((biaozhuncha / Math.sqrt(arrLength)).toFixed(decimal));
    var zhixin = 0;
    switch (arrLength) {
        case 1:
            zhixin = 100;
            break;
        case 2:
            zhixin = 12.71;
            break;
        case 3:
            zhixin = 4.30;
            break;
        case 4:
            zhixin = 3.18;
            break;
        case 5:
            zhixin = 2.78;
            break;
        case 6:
            zhixin = 2.57;
            break;
        case 7:
            zhixin = 2.45;
            break;
        case 8:
            zhixin = 2.36;
            break;
        case 9:
            zhixin = 2.31;
            break;
        case 10:
            zhixin = 2.26;
            break;
        case 11:
            zhixin = 2.23;
            break;
        case 12:
            zhixin = 2.20;
            break;
        case 13:
            zhixin = 2.18;
            break;
        case 14:
            zhixin = 2.16;
            break;
        case 15:
            zhixin = 2.14;
            break;
        case 16:
            zhixin = 2.13;
            break;
        case 17:
            zhixin = 2.12;
            break;
        case 18:
            zhixin = 2.11;
            break;
        case 19:
            zhixin = 2.10;
            break;
        case 20:
            zhixin = 2.09;
            break;
        default:
            zhixin = 1.96
    }
    var ua = Number((zhixin * avebiaozhuncha).toFixed(decimal));
    var u = Number((Math.sqrt(ua * ua + error * error)).toFixed(decimal));
    var e = Number(((u / ave) * 100).toFixed(decimal));
    if (print) {
        $(target).append("各直接测量量的不确定度计算：<br/>", "①" + LaTeX(flag) + "的平均值为：", LaTeX("\\bar{" + flag + "}=\\frac{1}{" + arrLength + "}\\sum_{i=1}^{" + arrLength + "} " + flag + "_{i}=" + ave.toFixed(decimal) + unit), "<br/>", "②" + LaTeX(flag) + "的实验标准差为：", LaTeX("S_{" + flag + "}=\\sqrt{\\frac{\\sum_{i=1}^{" + flag + "}(" + flag + "_{i}-\\bar{" + flag + "})^{2}}{" + arrLength + "-1}}=" + biaozhuncha.toFixed(decimal) + unit), "<br/>", LaTeX("3\\sigma _{" + flag + "}\\approx 3S_{" + flag + "}\\approx " + biaozhuncha_3.toFixed(decimal) + unit + ">|\\bigtriangleup " + flag + "_{max}|=" + max.toFixed(decimal) + unit), "故无粗大误差<br/>", "③" + LaTeX(flag) + "的平均值的实验标准差为：", LaTeX("\\bar{S_{" + flag + "}}=\\frac{S_{" + flag + "}}{\\sqrt{" + flag + "}}=" + avebiaozhuncha.toFixed(decimal) + unit), "<br/>", "④取置信度P=95%,n=" + arrLength + ",查表得t<sub>p</sub>=" + zhixin + "则" + LaTeX(flag) + "的A类不确定度为<br/>", LaTeX("U_{A" + flag + "}=t_{p}\\bar{S_{" + flag + "}}=" + ua + unit), "<br/>", "⑤" + LaTeX(flag) + "的B类不确定度为测量仪器的误差限，即" + LaTeX("U_{B" + flag + "}=") + error + unit, "<br/>", "⑥" + LaTeX(flag) + "的总不确定度为：" + LaTeX("U_{" + flag + "}=\\sqrt{U_{A" + flag + "}^{2}+U_{B" + flag + "}^{2}}=" + u.toFixed(decimal) + unit), "<br/>", "⑦测量值" + LaTeX(flag) + "的结果表示为【置信度P=95%】：<br/>", LaTeX(flag + "=(\\bar{" + flag + "}\\pm U_{" + flag + "})=(" + ave.toFixed(decimal) + "\\pm" + u.toFixed(decimal) + ")" + unit), "<br/>", LaTeX("E_{" + flag + "}=\\frac{U_{" + flag + "}}{\\bar{" + flag + "}}\\times 100\\%=" + e.toFixed(decimal) + "\\%"), "<br/>")
    }
    return {
        length: arrLength,
        sum: sum,
        ave: ave,
        tw: tw,
        biaozhuncha: biaozhuncha,
        biaozhuncha_3: biaozhuncha_3,
        cancha_max: max,
        avebiaozhuncha: avebiaozhuncha,
        zhixin: zhixin,
        ua: ua,
        ub: error,
        u: u,
        e: e
    }
}
function ave(arr) {
    var n = arr.length - 1;
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += Number(arr[i])
    }
    return sum / n
}
function AddFavorite(sURL, sTitle) {
    sURL = encodeURI(sURL);
    try {
        window.external.addFavorite(sURL, sTitle)
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "")
        } catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.")
        }
    }
}
function fnDate() {
    var myDate = new Date();
    myDate.toLocaleDateString();
    var mytime = myDate.toLocaleTimeString();
    $("#time").html(mytime, 1000)
}
function fnNotice(speed, delay) {
    var notice = $("#notice ul");
    var notice_height = parseInt(notice.css("height"));
    var i = 0;
    var time;

    function scoller() {
        time = setInterval(function () {
            if (i <= -notice_height) {
                clearInterval(time);
                $(notice).css("margin-top", "0px");
                i = 0;
                scoller()
            } else if (i % 50 == 0) {
                clearInterval(time);
                setTimeout(function () {
                    i--;
                    scoller()
                }, delay)
            } else {
                $(notice).css("margin-top", i--)
            }
        }, speed)
    }

    setTimeout(scoller(), 0)
}
function SET_TAB(label, a, b, c, e, div) {
    var x = parseInt(a);
    var y = parseInt(b);
    var u = parseInt(c);
    var d = parseInt(e);
    var labl = label + "";
    var id = div + "";
    var table = $("<table class='table table-hover table-condensed table-bordered js_table text-center'>");
    for (var k = u; k >= 1; k--) {
        var tr = $("<tr>");
        tr.appendTo(table);
        for (var h = 0; h <= y; h++) {
            var td = $("<td id=" + labl + "_u" + k + "_" + h + ">" + labl + "_u" + k + "_" + h + "</td>");
            td.appendTo(tr)
        }
    }
    for (var i = 1; i <= x; i++) {
        var tr = $("<tr>");
        tr.appendTo(table);
        for (var j = 0; j <= y; j++) {
            var td = $("<td id=" + labl + "_" + i + "_" + j + "></td>");
            td.appendTo(tr)
        }
    }
    for (var k = 1; k <= d; k++) {
        var tr = $("<tr>");
        tr.appendTo(table);
        for (var h = 0; h <= y; h++) {
            var td = $("<td id=" + labl + "_" + "d" + k + "_" + h + ">" + labl + "_" + "d" + k + "_" + h + "</td>");
            td.appendTo(tr)
        }
    }
    table.appendTo($('#' + id));
    for (var i = 1; i <= x; i++) {
        for (var j = 1; j <= y; j++) {
            $("#" + labl + "_" + i + "_" + j).addClass("" + labl + "_x_" + i).addClass("" + labl + "_y_" + j)
        }
    }
    for (var k = 1; k <= x; k++) {
        $("#" + labl + "_" + k + "_" + 0).text("☛" + k + "☚")
    }
}
function SET_INPUT(label, a, b) {
    var x = parseInt(a);
    var y = parseInt(b);
    var labl = label + "";
    var input = "<input type='text' maxlength='10'>";
    if (x == 0 && y == 0) {
    } else if (x == 0) {
        $("." + labl + "_y_" + y).html(input)
    } else if (y == 0) {
        $("." + labl + "_x_" + x).html(input)
    } else {
        $("." + labl + "_y_" + y).html(input);
        $("." + labl + "_x_" + x).html(input)
    }
}
function fn_preg(c, preg) {
    preg = new String(preg);
    var id = $(c).data("for");
    var reg = new RegExp(preg);
    var bool = reg.test($(c).val());
    if (bool) {
        $("#" + id).attr("class", "table-detection-y icon-check-circle-o").html("&nbsp;检测通过");
        return 1
    } else {
        $("#" + id).attr("class", "table-detection-n icon-times-circle-o").html("&nbsp;存在错误，请检查");
        return 0
    }
}
function fn_group(e, flag) {
    var group = $(e).val();
    if (!group || parseInt(group) != group || group < 2) {
        $("#" + flag + " #table-detection-group").attr("class", "table-detection-n icon-times-circle-o").html("&nbsp;存在错误，请检查");
        return 0
    } else if (group > 100) {
        $("#" + flag + " #table-detection-group").attr("class", "table-detection-w icon-minus-square-o").html("&nbsp;警告项，可能有错误");
        return 1
    } else {
        $("#" + flag + " #table-detection-group").attr("class", "table-detection-y icon-check-circle-o").html("&nbsp;检测通过");
        return 1
    }
}
function fn_error(e, flag) {
    var error = $(e).val();
    if (!error || parseFloat(error) != error) {
        $("#" + flag + " #table-detection-error").attr("class", "table-detection-n icon-times-circle-o").html("&nbsp;存在错误，请检查");
        return 0
    } else if (error < 0) {
        $("#" + flag + " #table-detection-error").attr("class", "table-detection-w icon-minus-square-o").html("&nbsp;警告项，可能有错误");
        return 1
    } else {
        $("#" + flag + " #table-detection-error").attr("class", "table-detection-y icon-check-circle-o").html("&nbsp;检测通过");
        return 1
    }
}
function check(flag, group, count, regStr) {
    var error = 0;
    var n = count.length;
    var col = new Array();
    for (var k = 0; k < n; k++) {
        col[k] = new Array();
        for (var j = 0; j < group + 1; j++) {
            col[k][j] = ""
        }
    }
    var reg = new RegExp(regStr);
    for (var i = 0; i < n; i++) {
        for (var j = 1; j <= group; j++) {
            var input = "#" + flag + "_" + j + "_" + count[i] + ">input";
            col[i][j] = $(input).val();
            var bool = reg.test(col[i][j]);
            if (bool) {
                $(input).css("background-color", "#00ff00")
            } else {
                $(input).css("background-color", "#EE3333");
                error = 1
            }
        }
    }
    return error == 1 ? 0 : 1
}
function LaTeX(str) {
    return '<img src="' + Latex_host + str + '" alt=""/>'
}
$(document).ready(function () {
    $("latex").each(function () {
        var str = $(this).html();
        $(this).replaceWith('<img src="' + Latex_host + str + '"/>')
    })
    $("#header_button_1").click(function () {
        $("#login,#mask").css("display", "block")
    });
    $("#login_off").click(function () {
        $("#login,#mask").css("display", "none")
    });
    $("#header_button_2").click(function () {
        $("#enter,#mask").css("display", "block")
    });
    $("#enter_off").click(function () {
        $("#enter,#mask").css("display", "none")
    });
    $("#header_button_3").click(function () {
        AddFavorite(window.location, document.title)
    });
    try {
        setInterval(function () {
            fnDate()
        }, 1000)
    } catch (e) {
    }
    setTimeout(function () {
        try {
            fnNotice(20, 3000)
        } catch (e) {
        }
    }, 2000);
    $(".tab-nav").click(function () {
        $(".tab-nav").removeClass("current-nav");
        $(this).addClass("current-nav");
        var current_nav = $(this).index() + 1;
        $(".tab-content").removeClass("current-content");
        $(".tab-content:nth-child(" + current_nav + ")").addClass("current-content")
    })
})