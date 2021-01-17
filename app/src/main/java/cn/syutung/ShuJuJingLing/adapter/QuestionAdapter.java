package cn.syutung.ShuJuJingLing.adapter;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.Random;

import cn.syutung.ShuJuJingLing.R;
import cn.syutung.ShuJuJingLing.menu.Question;

public class QuestionAdapter extends ArrayAdapter<Question> {
    private final int resourceId;

    public QuestionAdapter(@NonNull Context context, int resourceId, ArrayList<Question> list) {
        super(context, resourceId,list);
        this.resourceId = resourceId;
    }



    public View getView(int position, View convertView, ViewGroup parent){
        Question question=getItem(position); //获取当前项的Fruit实例
        View view;
        ViewHolder viewHolder;
        if (convertView==null){
            view= LayoutInflater.from(getContext()).inflate(resourceId,parent,false);
            viewHolder= new ViewHolder();
            viewHolder.a=view.findViewById(R.id.a);
            viewHolder.q=view.findViewById(R.id.q);


            view.setTag(viewHolder);
        } else{
            view=convertView;
            viewHolder=(ViewHolder) view.getTag();
        }

        viewHolder.q.setText(question.getQuestion());
        viewHolder.a.setText(question.getAnswer());
        Random random = new Random();
        GradientDrawable drawable=new GradientDrawable();
        drawable.setCornerRadius(1);
        drawable.setColor(Color.argb(255, random.nextInt(150)+1, random.nextInt(150)+1, random.nextInt(150)+1));
        viewHolder.a.setBackground(drawable);
        GradientDrawable drawable1=new GradientDrawable();
        drawable1.setCornerRadius(1);
        drawable1.setColor(Color.argb(255, random.nextInt(150)+1, random.nextInt(150)+1, random.nextInt(150)+1));
        viewHolder.q.setBackground(drawable1);

        return view;
    }



    static class ViewHolder{
        TextView q;
        TextView a;


    }
}
