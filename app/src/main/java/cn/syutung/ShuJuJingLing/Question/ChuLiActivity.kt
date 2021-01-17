package cn.syutung.ShuJuJingLing.Question

import android.annotation.SuppressLint
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import cn.syutung.ShuJuJingLing.R
import cn.syutung.ShuJuJingLing.globalnum.Numbers
import java.util.*


class ChuLiActivity : AppCompatActivity() {
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_l2)
        hideStatusBarNavigationBar()
        val webView = findViewById<WebView>(R.id.sjcl)
        println("http://81996.top/experiment/1000${Numbers.SJCL_NUM}/data.html")
        webView.settings.javaScriptCanOpenWindowsAutomatically = true
        webView.settings.allowFileAccess = true

        val user_agent =
            "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/124 (KHTML, like Gecko) Safari/125.1"
        webView.settings.userAgentString = user_agent
        webView.settings.javaScriptEnabled = true;


        if (Numbers.SJCL_NUM<10){
            webView.loadUrl("file:///android_asset/experiment/1000${Numbers.SJCL_NUM}/data.html")
            println(webView.url)



        }else{
            webView.loadUrl("file:///android_asset/experiment/100${Numbers.SJCL_NUM}/data.html")
        }
    }
    private fun hideStatusBarNavigationBar() {
        val window = window
        val random:Random= Random()
        window.decorView.systemUiVisibility =  View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.TRANSPARENT
    }
}