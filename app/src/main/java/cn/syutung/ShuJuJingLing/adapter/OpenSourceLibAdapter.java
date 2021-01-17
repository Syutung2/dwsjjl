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
import cn.syutung.ShuJuJingLing.globalnum.OpenSourceLibs;
import cn.syutung.ShuJuJingLing.menu.OpenSourceLib;
import cn.syutung.ShuJuJingLing.menu.Question;

public class OpenSourceLibAdapter  extends ArrayAdapter<OpenSourceLib> {
    private final int resourceId;

    public OpenSourceLibAdapter(@NonNull Context context, int resourceId) {
        super(context, resourceId, OpenSourceLibs.getOpenSourceLibs());
        this.resourceId = resourceId;
    }



    public View getView(int position, View convertView, ViewGroup parent){
        OpenSourceLib question=getItem(position); //获取当前项的Fruit实例
        View view;
       ViewHolder viewHolder;
        if (convertView==null){
            view= LayoutInflater.from(getContext()).inflate(resourceId,parent,false);
            viewHolder= new ViewHolder();
            viewHolder.q=view.findViewById(R.id.textView4);

            view.setTag(viewHolder);
        } else{
            view=convertView;
            viewHolder=(ViewHolder) view.getTag();
        }

        viewHolder.q.setText(question.getName());
        return view;
    }



    static class ViewHolder{
        TextView q;
    }
}
