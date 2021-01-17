package cn.syutung.ShuJuJingLing.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import cn.syutung.ShuJuJingLing.R;
import cn.syutung.ShuJuJingLing.menu.Menus;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import java.util.ArrayList;
import java.util.Random;

public class Menu1Adapter extends ArrayAdapter<Menus> {
    private final int resourceId;

    public Menu1Adapter(@NonNull Context context, int resourceId, ArrayList<Menus> list) {
        super(context, resourceId,list);
        this.resourceId = resourceId;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @SuppressLint({"CutPasteId", "ResourceType"})
    @Override
    public View getView(int position, View convertView, ViewGroup parent){
        Menus music=getItem(position); //获取当前项的Fruit实例
        View view;
        ViewHolder viewHolder;
        if (convertView==null){
            view= LayoutInflater.from(getContext()).inflate(resourceId,parent,false);
            viewHolder=new ViewHolder();
            viewHolder.name=view.findViewById(R.id.name);
            viewHolder.leibie=view.findViewById(R.id.leibie);
            viewHolder.imageView = view.findViewById(R.id.imageView);

            GradientDrawable drawable=new GradientDrawable();
            drawable.setCornerRadius(23);
            viewHolder.shape = drawable;
            view.setTag(viewHolder);
        } else{
            view=convertView;
            viewHolder=(ViewHolder) view.getTag();
        }

        // 获取控件实例，并调用set...方法使其显示出来
        viewHolder.name.setText(music.getName());
        viewHolder.leibie.setText(music.getFenlei());
        Random random = new Random();
        viewHolder.shape.setColor(Color.argb(255, random.nextInt(150)+1, random.nextInt(150)+1, random.nextInt(150)+1));
        viewHolder.imageView.setImageDrawable(viewHolder.shape);
        System.out.println(viewHolder.shape.getColor());


        return view;
    }



    static class ViewHolder{
        TextView name;//歌曲名
        TextView leibie;//歌手
        ImageView imageView;
        GradientDrawable shape;
    }
}
