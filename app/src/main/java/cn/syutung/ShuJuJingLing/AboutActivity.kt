package cn.syutung.ShuJuJingLing

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import io.github.varenyzc.opensourceaboutpages.AboutPageMessageItem
import io.github.varenyzc.opensourceaboutpages.LogoCard
import io.github.varenyzc.opensourceaboutpages.MessageCard
import java.util.*


class AboutActivity : AppCompatActivity() {
    @SuppressLint("UseCompatLoadingForDrawables", "SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_about2)
        val logoCard: LogoCard = findViewById<View>(R.id.logo) as LogoCard
        hideStatusBarNavigationBar()
        val item1 = AboutPageMessageItem(this)
        item1.icon.setImageDrawable(getDrawable(R.drawable.open))
        item1.descriptionText.text="欢迎来点一个Star"
        item1.mainText.text="开源代码"
        item1.setOnItemClickListener {
            Toast.makeText(this,"当前版本号1.0",Toast.LENGTH_SHORT).show();
        }

        val item2 = AboutPageMessageItem(this)
        item2.icon.setImageDrawable(getDrawable(R.drawable.veision))
        item2.descriptionText.text="Version:2.3.1"
        item2.mainText.text="版本号"
        item2.setOnItemClickListener {
            val urls: Uri = Uri.parse("https://github.com/Syutung2/dwsjjl")
            val intent =  Intent(Intent.ACTION_VIEW, urls);
            startActivity(intent)
        }

        logoCard.addMessageItem(item2);
        logoCard.addMessageItem(item1);

        val item3 = AboutPageMessageItem(this)
        item3.icon.setImageDrawable(getDrawable(R.drawable.logo))
        item3.descriptionText.text="Syutung"
        item3.mainText.text="开发者"
        item3.setOnItemClickListener {
            val urls: Uri = Uri.parse("https://github.com/Syutung2/")
            val intent =  Intent(Intent.ACTION_VIEW, urls);
            startActivity(intent)
        }
        logoCard.addMessageItem(item3);
        val item4 = AboutPageMessageItem(this)
        item4.icon.setImageDrawable(getDrawable(R.drawable.ic_launcher_round))
        item4.descriptionText.text="数据小助手"
        item4.mainText.text="数据处理来源"
        item4.setOnItemClickListener {
            val urls: Uri = Uri.parse("http://www.testzs.cn/")
            val intent =  Intent(Intent.ACTION_VIEW, urls);
            startActivity(intent)
        }
        logoCard.addMessageItem(item4);

        var mc = findViewById<MessageCard>(R.id.message)
        val i = AboutPageMessageItem(this)
        i.icon.setImageDrawable(getDrawable(R.drawable.au))
        i.descriptionText.text="Syutung"
        i.mainText.text="王旭东"
        mc.addMessageItem(i);
        val p = AboutPageMessageItem(this)
        p.icon.setImageDrawable(getDrawable(R.drawable.github))
        p.mainText.text="在Github上关注我"
        p.setOnItemClickListener {
            val urls: Uri = Uri.parse("https://github.com/Syutung2/")
            val intent =  Intent(Intent.ACTION_VIEW, urls);
            startActivity(intent)
        }
        mc.addMessageItem(p);

        val p1 = AboutPageMessageItem(this)
        p1.icon.setImageDrawable(getDrawable(R.drawable.weibo))
        p1.mainText.text="在Weibo微博上关注我"
        p1.setOnItemClickListener {
            val urls: Uri = Uri.parse("https://weibo.com/u/7244983106")
            val intent =  Intent(Intent.ACTION_VIEW, urls);
            startActivity(intent)
        }
        mc.addMessageItem(p1);
        val i1 = AboutPageMessageItem(this)
        i1.icon.setImageDrawable(getDrawable(R.drawable.email))
        i1.descriptionText.text="wangxudong@syutung.cn"
        i1.mainText.text="电子邮件"
        mc.addMessageItem(i1);
    }
    private fun hideStatusBarNavigationBar() {
        val window = window
        val random: Random = Random()
        window.decorView.systemUiVisibility =  View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.TRANSPARENT
    }
}