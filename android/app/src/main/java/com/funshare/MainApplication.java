package com.funshare;
import cl.json.RNSharePackage;
import android.app.Application;
import com.evollu.react.fcm.FIRMessagingPackage;
import android.util.Log;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.facebook.react.ReactApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
 
import java.util.Arrays;
import java.util.List;
import com.imagepicker.ImagePickerPackage;
public class MainApplication extends Application implements ReactApplication {
   private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          
          new RNSharePackage(),
           new RNFetchBlobPackage(),
           new MainReactPackage(),
            new PickerPackage(),
           new FIRMessagingPackage(),
           new RNGeocoderPackage(),
          new ImagePickerPackage(),
          new FBSDKPackage(mCallbackManager)

      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
  @Override
public void onCreate() {
  super.onCreate();
  FacebookSdk.sdkInitialize(getApplicationContext());
  
}


}