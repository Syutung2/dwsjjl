package cn.syutung.ShuJuJingLing

import android.Manifest
import android.app.WallpaperManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Color
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.GradientDrawable
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.ListView
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.ConstraintLayout
import cn.syutung.ShuJuJingLing.globalnum.Numbers
import cn.syutung.ShuJuJingLing.adapter.Menu1Adapter
import cn.syutung.ShuJuJingLing.menu.Menus
import cn.syutung.ShuJuJingLing.util.Blur
import cn.syutung.ShuJuJingLing.util.Tools
import java.util.*


class Activity : AppCompatActivity() {
    private val menus1 : ArrayList<Menus> = ArrayList()

    override fun onCreate(savedInstanceState: Bundle?) {
        check()
        val q = checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED
        Tools.getSetInformation(this)

        Numbers.Quanxian = !q
        Numbers.isWrited = Tools.getSaveInformation(this)
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        if (!Numbers.isWrited){
            //getZiyuan()
            Numbers.isWrited = true;
            Tools.saveSaveInformation(this,Numbers.isWrited)
        }

        if (Numbers.Quanxian){
            if (Numbers.IS_BLUR){
                    val wallpaperManager = WallpaperManager.getInstance(this)
                    Log.d(Numbers.TAG,wallpaperManager.toString())
                    val wallpaperDrawable = wallpaperManager.drawable
                    val sy : ConstraintLayout = findViewById(R.id.shouye111)
                    val bm = (wallpaperDrawable as BitmapDrawable).bitmap
                    println(wallpaperManager.wallpaperInfo)
                    val q = Blur.blur(this,bm)
                    val bd  = BitmapDrawable(q);
                    sy.background = bd
            }else{
                    val wallpaperManager = WallpaperManager.getInstance(this)
                    val wallpaperDrawable = wallpaperManager.drawable
                    val sy : ConstraintLayout = findViewById(R.id.shouye111)
                    sy.background = wallpaperDrawable
            }
        }else{
            val drawable1 = GradientDrawable()
            val random : Random = Random()
            drawable1.setColor(Color.argb(random.nextInt(130), random.nextInt(130), random.nextInt(130), 255))
            val sy : ConstraintLayout = findViewById(R.id.shouye111)
            sy.background = drawable1
        }

        hideStatusBarNavigationBar()
        val menu = findViewById<ListView>(R.id.shouye)
        creatMenu(this,menu)


        menu.onItemClickListener = AdapterView.OnItemClickListener { parent, view, position, id ->
            val m: Menus = menus1[position]
            when(m.id){
                222->{
                    val intent = Intent(this, SetActivity::class.java)
                    startActivity(intent)
                    finish()
                }
                else->{
                    val intent = Intent(this, Activity2::class.java)
                    Numbers.NUM = m.id;
                    Numbers.SJCL_NUM = m.sjclid;
                    startActivity(intent)
                }
            }

        }
    }
    private fun check() {
        if (checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE), 2)
        }
        /***
         * if (checkSelfPermission(Manifest.permission.READ_PHONE_STATE)!=PackageManager.PERMISSION_GRANTED){
        requestPermissions(arrayOf(Manifest.permission.READ_PHONE_STATE), 2)

        }
         */
    }
    private fun hideStatusBarNavigationBar() {
        val window = window
        val random:Random= Random()
        window.decorView.systemUiVisibility =  View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.TRANSPARENT
    }


    private fun sendRegTokenToServer(token: String?) {
        Log.i(Numbers.TAG, "sending token to server. token:$token")
    }
    private fun creatMenu(context: Context,menu: ListView) {
        menus1.add( Menus("绪论","力学部分",1,0))
        menus1.add( Menus("力学基本测量","力学部分",2,1))
        menus1.add( Menus("拉伸法测定金属杨氏模量","力学部分",3,2))
        menus1.add( Menus("刚体的转动惯量","力学部分",4,4))
        menus1.add( Menus("制流电路、分压电路和电学实验基础知识","电学部分",5,6))
        menus1.add( Menus("惠斯通电桥","电学部分",6,7))
        menus1.add( Menus("示波器的使用","电学部分",7,10))
        menus1.add( Menus("利用霍尔效应测磁场","电学部分",8,11))
        menus1.add( Menus("分光计的调节和三棱镜顶角的测定","光学部分",9,14))
        menus1.add( Menus("光栅衍射","光学部分",10,15))
        menus1.add( Menus("牛顿环和劈尖干涉","光学部分",11,17))
        menus1.add( Menus("光电效应、普朗克常量","近代/综合",12,18))
        menus1.add( Menus("迈克尔逊干涉仪","近代/综合",13,19))
        menus1.add( Menus("密立根油滴实验","近代/综合",14,20))
        menus1.add( Menus("超声声速测量","近代/综合",15,21))
        menus1.add( Menus("动态悬挂法测金属杨氏模量","近代/综合",16,22))
        menus1.add( Menus("核磁共振","近代/综合",17,23))
        menus1.add( Menus("光敏传感器的光电特性","近代/综合",18,26))
        menus1.add( Menus("太阳能电池特性实验","近代/综合",19,27))

        val adapter =
                Menu1Adapter(this, R.layout.menu, menus1)
        menu.adapter = adapter

    }

}


