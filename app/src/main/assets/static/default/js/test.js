/**
 * Created by xiaozhu on 2016/10/10.
 */
//测试文件
    //填入测试数据
function testData(Min,Max,decimal){
    $("#input input[type='text']").each(function(){
        var Range = Max - Min;
        var Rand = Math.random();
        var num = (parseFloat(Min) + parseFloat((Rand * Range).toFixed(decimal)));
        $(this).val(num.toFixed(decimal));
    })
}