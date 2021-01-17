package cn.syutung.ShuJuJingLing.util

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Bitmap
import android.widget.Toast
import cn.syutung.ShuJuJingLing.globalnum.Numbers
import java.io.*
import kotlin.jvm.Throws

object Tools {

    fun SetToasts(context: Context?, s: String?) {
        val toast = Toast(context)
        toast.setText(s)
        toast.duration = Toast.LENGTH_SHORT
        toast.show()
    }

    @SuppressLint("SdCardPath")
    fun saveSetInformation(context: Context?, boolean: Boolean) : Boolean   {
        val a = "/data/data/cn.syutung.sjjl/set.conf"
        try {
            val b : FileOutputStream = FileOutputStream(a)

            val c : String = if (boolean){
                "true" + "\n" + Numbers.BLUR_RIDUS
            }else{
                "false" + "\n" + Numbers.BLUR_RIDUS
            }
            b.write(c.toByteArray())
            b.flush()
            b.close()
            return true
        }catch (a :Exception  ){
        }
        return false
    }
    @SuppressLint("SdCardPath")
    fun saveSaveInformation(context: Context?, boolean: Boolean) : Boolean   {
        val a = "/data/data/cn.syutung.sjjl/save.conf"
        try {
            val b : FileOutputStream = FileOutputStream(a)

            val c : String = if (boolean){
                "true" + "\n"
            }else{
                "false" + "\n"
            }
            b.write(c.toByteArray())
            b.flush()
            b.close()
            return true
        }catch (a :Exception  ){
        }
        return false
    }
    @Throws(IOException::class)
    fun saveBitmapToFile(bitmap: Bitmap, _file: String) {
        var os: BufferedOutputStream? = null
        try {
            val file = File(_file)
            // String _filePath_file.replace(File.separatorChar +
            // file.getName(), "");
            val end = _file.lastIndexOf(File.separator)
            val _filePath = _file.substring(0, end)
            val filePath = File(_filePath)
            if (!filePath.exists()) {
                filePath.mkdirs()
            }
            file.createNewFile()
            os = BufferedOutputStream(FileOutputStream(file))
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, os)
        } finally {
            if (os != null) {
                try {
                    os.close()
                } catch (e: IOException) {
                }
            }
        }
    }



    @SuppressLint("SdCardPath")
    fun getSetInformation(context: Context?) : Boolean   {
        val a = "/data/data/cn.syutung.sjjl/set.conf"
        try {
            val b : FileInputStream = FileInputStream(a)
            val d : BufferedReader = BufferedReader(InputStreamReader(b))
            val c : String =  d.readLine()
            Numbers.IS_BLUR = (c == "true")
            Numbers.BLUR_RIDUS = d.readLine().toFloat()
            b.close()
            return true
        }catch (a :Exception  ){
            Numbers.IS_BLUR=true;
        }
        return false
    }
    @SuppressLint("SdCardPath")
    fun getSaveInformation(context: Context?) : Boolean   {
        val a = "/data/data/cn.syutung.sjjl/save.conf"
        try {
            val b : FileInputStream = FileInputStream(a)
            val d : BufferedReader = BufferedReader(InputStreamReader(b))
            val c : String =  d.readLine()
            Numbers.isWrited = c == "true"
            b.close()
            return true
        }catch (a :Exception  ){
            Numbers.isWrited=false;
        }
        return false
    }
}

