package cn.syutung.ShuJuJingLing.Question

import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import cn.syutung.ShuJuJingLing.R
import java.util.*

class NoQuestionActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_no_shu_ju2)
        hideStatusBarNavigationBar()
    }
    private fun hideStatusBarNavigationBar() {
        val window = window
        val random:Random= Random()
        window.decorView.systemUiVisibility =  View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.TRANSPARENT
    }

}