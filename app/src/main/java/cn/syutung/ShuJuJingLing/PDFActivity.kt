package cn.syutung.ShuJuJingLing

import android.annotation.SuppressLint
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isVisible
import cn.syutung.ShuJuJingLing.globalnum.Numbers
import cn.syutung.ShuJuJingLing.util.SPUtils
import com.github.barteksc.pdfviewer.PDFView
import java.util.*


class PDFActivity : AppCompatActivity() {
    private lateinit var pdfView: PDFView
    private val REQUEST_EXTERNAL_STORAGE = 1
    private lateinit var pageTv: TextView
    private lateinit var pageTv1: TextView
    private var p = 0

    @SuppressLint("SetJavaScriptEnabled", "SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_p_d_f2)
        hideStatusBarNavigationBar()
        pdfView = findViewById(R.id.pdfView);
        pageTv =  findViewById(R.id.pageTv);
        pageTv1 = findViewById(R.id.pageTv1);
        var myPage : Int = SPUtils.get(this, "page", 0) as Int

        pdfView.fromAsset(Numbers.NUM.toString()+".pdf")
                .swipeHorizontal(true) //
                .enableDoubletap(false) //设置默认显示第0页
                .defaultPage(myPage) //允许在当前页面上绘制一些内容，通常在屏幕中间可见。
                .onLoad { nbPages ->
                    pageTv.setText(nbPages.toString() + "")
                    pageTv1.setText("$myPage/")
                } //设置翻页监听
                .onPageChange { page, pageCount ->
                    p = page
                    pageTv1.setText("$page/")
                } //设置页面滑动监听

                .enableAnnotationRendering(false)
                .password(null)
                .scrollHandle(null) // 改善低分辨率屏幕上的渲染
                .enableAntialiasing(true) // 页面间的间距。定义间距颜色，设置背景视图
                .spacing(0)
            .load()



    }
    override fun onDestroy() {
        super.onDestroy()
        SPUtils.put(this, "page", p)
    }


    private fun hideStatusBarNavigationBar() {
        val window = window
        val random:Random= Random()
        window.decorView.systemUiVisibility =  View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.TRANSPARENT
    }
}