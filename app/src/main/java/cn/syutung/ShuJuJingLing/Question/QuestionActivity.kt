package cn.syutung.ShuJuJingLing.Question

import android.graphics.Color
import android.graphics.drawable.GradientDrawable
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import cn.syutung.ShuJuJingLing.R
import cn.syutung.ShuJuJingLing.globalnum.Questions
import cn.syutung.ShuJuJingLing.menu.Question
import cn.syutung.ShuJuJingLing.adapter.QuestionAdapter
import cn.syutung.ShuJuJingLing.util.Tools
import java.util.*
import kotlin.collections.ArrayList

class QuestionActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_question)
        hideStatusBarNavigationBar()
        val q = findViewById<ImageView>(R.id.qb)
        val a :ArrayList<Question> = Questions.getQuestions()
        val c : QuestionAdapter = QuestionAdapter(this, R.layout.qa, a)
        val MAX_NUM = a.size
        var i = 0
        val left = findViewById<ImageView>(R.id.imageView7)
        val right = findViewById<ImageView>(R.id.imageView8)
        val t2 = findViewById<TextView>(R.id.textView2)
        val t6 = findViewById<TextView>(R.id.textView6)

        val drawable1 = GradientDrawable()
        val random : Random = Random()
        drawable1.setColor(Color.argb(
            255,
            random.nextInt(150) + 1,
            random.nextInt(150) + 1,
            random.nextInt(150) + 1
        ))
        drawable1.cornerRadius = 38f
        q.setImageDrawable(drawable1)
        t2.text = a[i].question
        t6.text = a[i].answer

        left.setOnClickListener {
            i--
            if (i<0){
                Tools.SetToasts(this,"已经是第一道题目了！")
                i = 0;
            }else{
                val drawable1 = GradientDrawable()
                val random : Random = Random()
                drawable1.setColor(Color.argb(
                    255,
                    random.nextInt(150) + 1,
                    random.nextInt(150) + 1,
                    random.nextInt(150) + 1
                ))

                drawable1.cornerRadius = 38f
                q.setImageDrawable(drawable1)
                t2.text = a[i].question
                t6.text = a[i].answer
            }
        }
        right.setOnClickListener {
            i++
            if (i>=MAX_NUM){
                Tools.SetToasts(this,"已经是最后一道题目了！")
                i = MAX_NUM-1;
            }else{
                val drawable1 = GradientDrawable()
                val random : Random = Random()
                drawable1.setColor(Color.argb(
                    255,
                    random.nextInt(150) + 1,
                    random.nextInt(150) + 1,
                    random.nextInt(150) + 1
                ))
                drawable1.cornerRadius = 38f

                q.setImageDrawable(drawable1)
                t2.text = a[i].question
                t6.text = a[i].answer
            }

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