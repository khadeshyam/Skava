package com.speechrecogn;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class PhoneCallModule extends ReactContextBaseJavaModule {

    PhoneCallModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "PhoneCallModule";
    }

    @ReactMethod
    public void makePhoneCall(String phoneNumber) {
        if (phoneNumber.trim().length() > 0) {
            if (ContextCompat.checkSelfPermission(getCurrentActivity(),Manifest.permission.CALL_PHONE) == PackageManager.PERMISSION_GRANTED) {
                String dial = "tel:" + phoneNumber;
                Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse(dial));
                getCurrentActivity().startActivity(intent);
            }
        } else {
            Toast.makeText(getCurrentActivity(), "Enter Phone Number", Toast.LENGTH_SHORT).show();
        }
    }
}
