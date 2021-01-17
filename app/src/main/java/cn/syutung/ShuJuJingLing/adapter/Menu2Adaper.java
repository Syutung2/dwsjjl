package cn.syutung.ShuJuJingLing.adapter;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.Random;

import cn.syutung.ShuJuJingLing.R;
import cn.syutung.ShuJuJingLing.menu.Menus;

public class Menu2Adaper extends ArrayAdapter<Menus> {
    private final int resourceId;

    public Menu2Adaper(@NonNull Context context, int resourceId, ArrayList<Menus> list) {
        super(context, resourceId,list);
        this.resourceId = resourceId;
    }



    public View getView(int position, View convertView, ViewGroup parent){
        Menus music=getItem(position); //获取当前项的Fruit实例
        View view;
        Menu1Adapter.ViewHolder viewHolder;
        if (convertView==null){
            view= LayoutInflater.from(getContext()).inflate(resourceId,parent,false);
            viewHolder=new Menu1Adapter.ViewHolder();
            viewHolder.name=view.findViewById(R.id.name);
            viewHolder.leibie=view.findViewById(R.id.leibie);
            viewHolder.imageView = view.findViewById(R.id.imageView);

            GradientDrawable drawable=new GradientDrawable();
            drawable.setCornerRadius(12);
            drawable.setGradientRadius(23);

            viewHolder.shape = drawable;
            view.setTag(viewHolder);
        } else{
            view=convertView;
            viewHolder=(Menu1Adapter.ViewHolder) view.getTag();
        }

        viewHolder.name.setText(music.getName());
        viewHolder.leibie.setText(music.getFenlei());
        Random random = new Random();
        viewHolder.shape.setColor(Color.argb(255, random.nextInt(150)+1, random.nextInt(150)+1, random.nextInt(150)+1));
        viewHolder.imageView.setImageDrawable(viewHolder.shape);
        System.out.println(viewHolder.shape.getColor());


        return view;
    }



    static class ViewHolder{
        TextView name;
        TextView leibie;
        ImageView imageView;
        GradientDrawable shape;
    }
}
