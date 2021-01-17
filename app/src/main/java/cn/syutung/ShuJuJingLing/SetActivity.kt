package cn.syutung.ShuJuJingLing

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isVisible
import cn.syutung.ShuJuJingLing.globalnum.Numbers
import cn.syutung.ShuJuJingLing.util.Tools
import java.util.*


class SetActivity : AppCompatActivity() {
    @SuppressLint("UseSwitchCompatOrMaterialCode")

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        //Tools.getSetInformation(this)

        setContentView(R.layout.activity_set)
        val switch : Switch = findViewById(R.id.switch1)
        switch.isChecked = Numbers.IS_BLUR


        hideStatusBarNavigationBar()
        val edit : EditText = findViewById(R.id.editTextTextPersonName)
        val button : Button = findViewById(R.id.button)
        val imageView3 :ImageView = findViewById(R.id.imageView3)
        val test :TextView = findViewById(R.id.textView8)

        if(switch.isChecked){
            test.isVisible  = true
            button.isVisible = true
            edit.isVisible = true
        }else{
            test.isVisible  = false
            button.isVisible = false
            edit.isVisible = false
        }


        imageView3.setOnClickListener {
            val intent = Intent(this, Activity::class.java)
            startActivity(intent)
            finish()
        }
        button.setOnClickListener {
            if (edit.text.toString().toFloat()>=25f){
                Tools.SetToasts(this,"设置失败，范围0-25")

            }else{
                Numbers.BLUR_RIDUS = edit.text.toString().toFloat()
                Tools.SetToasts(this,"设置成功，请点击主页按钮返回首页")
            }

        }
        switch.setOnCheckedChangeListener { buttonView, isChecked ->
            buttonView.setOnClickListener {
                Numbers.IS_BLUR = isChecked
                Tools.saveSetInformation(this , isChecked)
            }
        }
        val kywd = findViewById<TextView>(R.id.kywd)
        kywd.setOnClickListener {
            val intent = Intent(this, OpenSourceActivity::class.java)
            startActivity(intent)
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