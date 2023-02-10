package com.example.peddigitallite.ui.gallery;

import android.app.AlertDialog;
import android.net.ConnectivityManager;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.example.peddigitallite.R;
import com.example.peddigitallite.databinding.FragmentGalleryBinding;
import com.example.peddigitallite.databinding.FragmentSlideshowBinding;
import com.example.peddigitallite.ui.home.HomeFragment;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.app.DownloadManager;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;


public class GalleryFragment extends Fragment {

    private FragmentGalleryBinding binding;
    GetXMLTask task;


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {


        View rootView = inflater.inflate(R.layout.fragment_gallery, container, false);

        ImageView primero = (ImageView) rootView.findViewById(R.id.imageView3);
        primero.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(verificar("VideosPrimero") == 0){
                    if(isInternetAvailable()){
                        loadJSON("PrimerGrado/VideoTemasGrado1.json", "VideosPrimero");
                    }else{
                        mensaje_alerta(GalleryFragment.this.getActivity(), 2);
                    }
                }else{
                    mensaje_alerta(GalleryFragment.this.getActivity(), 1);
                }
            }
        });

        ImageView segundo = (ImageView) rootView.findViewById(R.id.imageView4);
        segundo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(verificar("VideosSegundo") == 0){
                    if(isInternetAvailable()){
                        loadJSON("SegundoGrado/VideoTemasGrado1.json", "VideosSegundo");
                    }else{
                        mensaje_alerta(GalleryFragment.this.getActivity(), 2);
                    }
                }else{
                    mensaje_alerta(GalleryFragment.this.getActivity(), 1);
                }
            }
        });

        ImageView tercero = (ImageView) rootView.findViewById(R.id.imageView5);
        tercero.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(verificar("VideosTercero") == 0){
                    if(isInternetAvailable()){
                        loadJSON("TercerGrado/VideoTemasGrado1.json", "VideosTercero");
                    }else{
                        mensaje_alerta(GalleryFragment.this.getActivity(), 2);
                    }
                }else{
                    mensaje_alerta(GalleryFragment.this.getActivity(), 1);
                }
            }
        });

        ImageView cuarto = (ImageView) rootView.findViewById(R.id.imageView7);
        cuarto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(verificar("VideosCuarto") == 0){
                    if(isInternetAvailable()){
                        loadJSON("CuartoGrado/VideoTemasGrado1.json", "VideosCuarto");
                    }else{
                        mensaje_alerta(GalleryFragment.this.getActivity(), 2);
                    }
                }else{
                    mensaje_alerta(GalleryFragment.this.getActivity(), 1);
                }
            }
        });

        ImageView quinto = (ImageView) rootView.findViewById(R.id.imageView8);
        quinto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(verificar("VideosQuinto") == 0){
                    if(isInternetAvailable()){
                        loadJSON("QuintoGrado/VideoTemasGrado1.json", "VideosQuinto");
                    }else{
                        mensaje_alerta(GalleryFragment.this.getActivity(), 2);
                    }
                }else{
                    mensaje_alerta(GalleryFragment.this.getActivity(), 1);
                }
            }
        });

        verificar_descargados(rootView);

        return rootView;
    }

    public int verificar(String carpeta){
        File file = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM),carpeta);
        if(file.exists()){
           return 1;
        }else{
           return 0;
        }
    }

    public boolean isInternetAvailable() {
        try {
            Process p = java.lang.Runtime.getRuntime().exec("ping -c 1 www.google.es");
            int val  = p.waitFor();
            boolean reachable = (val == 0);
            return reachable;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public void mensaje_alerta(Context context, Integer tipo){

        String mensaje = "";

        if(tipo == 1){
            mensaje = "Recursos descargados.";
        }else{
            mensaje = "Debe estar conectado a una red wi-fi, o datos móviles para descargar los recursos.";
        }

        AlertDialog.Builder builder1 = new AlertDialog.Builder(context);
        builder1.setMessage(mensaje);
        builder1.setTitle("  Atención!");
        if(tipo == 1){
            builder1.setIcon(R.drawable.success);
        }else{
            builder1.setIcon(R.drawable.network);
        }

        builder1.setPositiveButton(
            "Ok",
            new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.cancel();
            }
        });

        AlertDialog alert11 = builder1.create();
        alert11.show();
    }

    public void verificar_descargados(View vista){
        ImageView img_1= (ImageView) vista.findViewById(R.id.imageView3);
        ImageView img_2= (ImageView) vista.findViewById(R.id.imageView4);
        ImageView img_3= (ImageView) vista.findViewById(R.id.imageView5);
        ImageView img_4= (ImageView) vista.findViewById(R.id.imageView7);
        ImageView img_5= (ImageView) vista.findViewById(R.id.imageView8);

        File file_1 = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM),"VideosPrimero");
        if(file_1.exists()){
            img_1.setImageResource(R.drawable.grado1_2);
        }else{
            img_1.setImageResource(R.drawable.grado1);
        }

        File file_2 = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM),"VideosSegundo");
        if(file_2.exists()){
            img_2.setImageResource(R.drawable.grado2_2);
        }else{
            img_2.setImageResource(R.drawable.grado2);
        }

        File file_3 = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM),"VideosTercero");
        if(file_3.exists()){
            img_3.setImageResource(R.drawable.grado3_2);
        }else{
            img_3.setImageResource(R.drawable.grado3);
        }

        File file_4 = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM),"VideosCuarto");
        if(file_4.exists()){
            img_4.setImageResource(R.drawable.grado4_2);
        }else{
            img_4.setImageResource(R.drawable.grado4);
        }
        File file_5 = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM),"VideosQuinto");
        if(file_5.exists()){
            img_5.setImageResource(R.drawable.grado5_2);
        }else{
            img_5.setImageResource(R.drawable.grado5);
        }
    }

    public void loadJSON(String nombreArchivo, String carpeta){
        try {
            JSONArray m_jArray = new JSONArray(loadJSONFromAsset(nombreArchivo));
            String rutas[] = new String[m_jArray.length()];
            for (int i = 0; i < m_jArray.length(); i++) {
                JSONObject jo_inside = m_jArray.getJSONObject(i);
                String url = jo_inside.getString("nomvid");
                rutas[i] = url;
            }

            task = new GetXMLTask( GalleryFragment.this.getActivity(), carpeta);
            task.execute(rutas);

        } catch (JSONException e) {
            Log.i("error", e.getMessage());
        }
    }

    public String loadJSONFromAsset(String nombreArchivo) {
        String json = null;
        try {
            InputStream is = GalleryFragment.this.getContext().getAssets().open(nombreArchivo);
            int size = is.available();
            byte[] buffer = new byte[size];
            is.read(buffer);
            is.close();
            json = new String(buffer, "UTF-8");
        } catch (IOException ex) {
            ex.printStackTrace();
            return null;
        }
        return json;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    private class GetXMLTask extends AsyncTask<String, Integer, Void> {
        ProgressDialog progressDialog;
        private Activity context;
        String carpet;
        int noOfURLs;
        List<Integer> rowItems;

        public GetXMLTask(Activity context, String pCarpet) {
            this.carpet = pCarpet;
            this.context = context;
        }

        @Override
        protected void onPreExecute() {
            progressDialog = new ProgressDialog(context);
            progressDialog.setTitle("Espere un momento...");
            progressDialog.setMessage("Loading...");
            progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
            progressDialog.setIcon(R.drawable.ic_arrow_drop_down_circle_24dp);
            progressDialog.setIndeterminate(false);
            progressDialog.setMax(100);
            progressDialog.setCancelable(true);
            progressDialog.setCanceledOnTouchOutside(false);
            progressDialog.setOnCancelListener(new DialogInterface.OnCancelListener() {

                @Override
                public void onCancel(DialogInterface dialog) {
                    // TODO Auto-generated method stub
                    Log.d("GettingCancelled","onCancel(DialogInterface dialog)");
                    task.cancel(true);
                    GalleryFragment.this.getActivity().finish();
                }
            });
            progressDialog.show();
        }


        @Override
        protected Void doInBackground(String... urls) {
            noOfURLs = urls.length;
            rowItems = new ArrayList<Integer>();

            for (String url : urls) {
                rowItems.add(0);
                downloadImage(url);
                if (isCancelled()==true){
                    Log.d("GettingCancelled","isCancelled");
                    break;
                }
            }

            verificar_descargados(context);

            return null;
        }

        private void downloadImage(String urlString) {
            publishProgress((int) (((rowItems.size()+1) * 100) / noOfURLs));
            File myFolder = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM), carpet);
            myFolder.mkdir();

            String fileURL = "http://ped-lite.lecsidesarrollos.com.co/"+carpet+"/"+urlString;
            try {
                URL url = new URL(fileURL);
                HttpURLConnection c = (HttpURLConnection) url.openConnection();
                c.setRequestMethod("GET");
                c.setDoOutput(true);
                c.connect();
                FileOutputStream f = new FileOutputStream(new File(myFolder, urlString));
                InputStream in = c.getInputStream();
                byte[] buffer = new byte[1024];
                int len1 = 0;
                while ((len1 = in.read(buffer)) > 0) {
                    f.write(buffer, 0, len1);
                }
                f.close();
            } catch (IOException e) {
                Log.d("Error....", e.toString());
            }
        }

        public void verificar_descargados(Activity vista){
            ImageView img_1= (ImageView) vista.findViewById(R.id.imageView3);
            ImageView img_2= (ImageView) vista.findViewById(R.id.imageView4);
            ImageView img_3= (ImageView) vista.findViewById(R.id.imageView5);
            ImageView img_4= (ImageView) vista.findViewById(R.id.imageView7);
            ImageView img_5= (ImageView) vista.findViewById(R.id.imageView8);

            File file_1 = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM),"VideosPrimero");
            if(file_1.exists()){
                img_1.setImageResource(R.drawable.grado1_2);
            }else{
                img_1.setImageResource(R.drawable.grado1);
            }

            File file_2 = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM),"VideosSegundo");
            if(file_2.exists()){
                img_2.setImageResource(R.drawable.grado2_2);
            }else{
                img_2.setImageResource(R.drawable.grado2);
            }

            File file_3 = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM),"VideosTercero");
            if(file_3.exists()){
                img_3.setImageResource(R.drawable.grado3_2);
            }else{
                img_3.setImageResource(R.drawable.grado3);
            }

            File file_4 = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM),"VideosCuarto");
            if(file_4.exists()){
                img_4.setImageResource(R.drawable.grado4_2);
            }else{
                img_4.setImageResource(R.drawable.grado4);
            }
            File file_5 = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM),"VideosQuinto");
            if(file_5.exists()){
                img_5.setImageResource(R.drawable.grado5_2);
            }else{
                img_5.setImageResource(R.drawable.grado5);
            }
        }

        protected void onProgressUpdate(Integer... progress) {
            progressDialog.setProgress(progress[0]);
            if (rowItems != null) {
                progressDialog.setMessage("Descargando " + rowItems.size() + " de " + noOfURLs+" videos.");
            }
        }

        @Override
        protected void onPostExecute(Void rowItems) {
            //passing the row items to the custom listView adapter
            progressDialog.dismiss();
        }
    }
}