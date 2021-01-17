package cn.syutung.ShuJuJingLing

import android.app.WallpaperManager
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.GradientDrawable
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.ListView
import androidx.annotation.RequiresApi
import androidx.constraintlayout.widget.ConstraintLayout
import cn.syutung.ShuJuJingLing.globalnum.Numbers
import cn.syutung.ShuJuJingLing.menu.Menus
import cn.syutung.ShuJuJingLing.adapter.Menu2Adaper
import cn.syutung.ShuJuJingLing.Question.NoQuestionActivity
import cn.syutung.ShuJuJingLing.Question.QuestionActivity
import cn.syutung.ShuJuJingLing.Question.ChuLiActivity
import cn.syutung.ShuJuJingLing.util.Blur
import java.util.*

class Activity2 : AppCompatActivity() {
    private val menus1 : ArrayList<Menus> = ArrayList()

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_menu2)

        if (Numbers.Quanxian){
            if (Numbers.IS_BLUR){
                        val wallpaperManager = WallpaperManager.getInstance(this)
                        Log.d(Numbers.TAG,wallpaperManager.toString())
                        val wallpaperDrawable = wallpaperManager.drawable
                        val sy : ConstraintLayout = findViewById(R.id.shouyyw2)
                        val bm = (wallpaperDrawable as BitmapDrawable).bitmap
                        println(wallpaperManager.wallpaperInfo)
                        val q = Blur.blur(this,bm)
                        val bd  = BitmapDrawable(q);
                        sy.background = bd
            }else{
                    val wallpaperManager = WallpaperManager.getInstance(this)
                    val wallpaperDrawable = wallpaperManager.drawable
                    val sy : ConstraintLayout = findViewById(R.id.shouyyw2)
                    sy.background = wallpaperDrawable
            }
        }else{
            val drawable1 = GradientDrawable()
            val random : Random = Random()
            drawable1.setColor(Color.argb(random.nextInt(130), random.nextInt(130), random.nextInt(130), 255))
            val sy : ConstraintLayout = findViewById(R.id.shouyyw2)
            sy.background = drawable1
        }
        hideStatusBarNavigationBar()

        val menu = findViewById<ListView>(R.id.menus2)
        creatMenu(this,menu)

        menu.onItemClickListener = AdapterView.OnItemClickListener { parent, view, position, id ->
            when(position){
                0 ->{
                    val intent = Intent(this, PDFActivity::class.java)
                    startActivity(intent)
                }
                1->{
                    when (Numbers.NUM) {
                        1 -> {
                            val intent = Intent(this, NoQuestionActivity::class.java)
                            startActivity(intent)
                        }
                        2 -> {
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        3 -> {
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        4->{
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        5->{
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        6->{
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        7->{
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        8->{
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        9->{
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        10->{
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        11->{
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        12->{
                            val intent = Intent(this, NoQuestionActivity::class.java)
                            startActivity(intent)
                        }
                        13->{
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        14->{
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        15->{
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        16->{
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        17->{
                            val intent = Intent(this,ChuLiActivity::class.java)
                            startActivity(intent)
                        }
                        18->{
                            val intent = Intent(this, NoQuestionActivity::class.java)
                            startActivity(intent)
                        }
                        19->{
                            val intent = Intent(this, NoQuestionActivity::class.java)
                            startActivity(intent)
                        }

                    }

                }
                2->{
                    val intent = Intent(this, QuestionActivity::class.java)
                    startActivity(intent)
                }
                3->{
                    val intent = Intent(this, AboutActivity::class.java)
                    startActivity(intent)
                }
                4->{
                    val intent = Intent(this, SetActivity::class.java)
                    startActivity(intent)
                }
            }

        }
    }
    @RequiresApi(Build.VERSION_CODES.HONEYCOMB)
    private fun hideStatusBarNavigationBar() {
        val window = window
        val random:Random= Random()
        window.decorView.systemUiVisibility =  View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.TRANSPARENT
    }
    private fun creatMenu(context: Context, menu: ListView) {
        menus1.add( Menus("实验原理实验内容看这里","方法原理",991,888))
        //menus1.add( Menus("实验器材看这里","仪器介绍",992))
        menus1.add( Menus("实验处理看这里\n" +
                "这里直接调用HTML访问Web端","数据处理",993,991))
        menus1.add( Menus("问题思考看这里\n" +
                "这里直接调用HTML访问Web端","问题思考",994,991))
        menus1.add( Menus("增强功能","关于制作者",995,991))
        menus1.add( Menus("增强功能","设置",996,991))


        val adapter = Menu2Adaper(this, R.layout.menu2, menus1)
        menu.adapter = adapter

    }
}