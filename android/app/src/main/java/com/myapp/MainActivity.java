package com.myapp;

import com.facebook.react.ReactActivity;
import com.BV.LinearGradient.LinearGradientPackage; 
import android.os.Bundle;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
}
// @Override
// protected List<ReactPackage> getPackages() {
//   return Arrays.<ReactPackage>asList(
//     new MainReactPackage(),
//     new LinearGradientPackage() // <---- and This!
//   );
// }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    new LinearGradientPackage();
    return "MyApp";
    
  }
}
