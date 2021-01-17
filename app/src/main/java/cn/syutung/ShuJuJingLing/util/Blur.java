package cn.syutung.ShuJuJingLing.util;

import android.content.Context;
import android.graphics.Bitmap;
import android.renderscript.Allocation;
import android.renderscript.Element;
import android.renderscript.RenderScript;
import android.renderscript.ScriptIntrinsicBlur;

import cn.syutung.ShuJuJingLing.globalnum.Numbers;

public class Blur {
    public static Bitmap blur(Context context,Bitmap bitmap) {
        Bitmap output = Bitmap.createBitmap(bitmap);
        RenderScript rs = RenderScript.create(context);
        ScriptIntrinsicBlur gaussianBlue = ScriptIntrinsicBlur.create(rs, Element.U8_4(rs)); //
        Allocation allIn = Allocation.createFromBitmap(rs, bitmap);
        Allocation allOut = Allocation.createFromBitmap(rs, output);
        gaussianBlue.setRadius(Numbers.BLUR_RIDUS); // 设置模糊半径，范围0f<radius<=25f
        gaussianBlue.setInput(allIn);
        gaussianBlue.forEach(allOut);
        allOut.copyTo(output);
        rs.destroy();
        return output;
    }

}
