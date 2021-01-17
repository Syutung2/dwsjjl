package cn.syutung.ShuJuJingLing

import android.content.Context
import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ListView
import cn.syutung.ShuJuJingLing.adapter.Menu2Adaper
import cn.syutung.ShuJuJingLing.adapter.OpenSourceLibAdapter
import cn.syutung.ShuJuJingLing.globalnum.OpenSourceLibs
import cn.syutung.ShuJuJingLing.menu.Menus
import cn.syutung.ShuJuJingLing.menu.OpenSourceLib
import java.util.*
import kotlin.collections.ArrayList

class OpenSourceActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_open_source)
        hideStatusBarNavigationBar()
        creatMenu(this)


    }
    private fun hideStatusBarNavigationBar() {
        val window = window
        val random: Random = Random()
        window.decorView.systemUiVisibility =  View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        window.statusBarColor = Color.rgb(0,0,255)
        window.navigationBarColor = Color.TRANSPARENT
    }
    private fun creatMenu(context: Context) {
        val open = OpenSourceLibAdapter(context,R.layout.pdf)
        val oopen1 = findViewById<ListView>(R.id.kyyyy)
        oopen1.adapter = open

    }
}