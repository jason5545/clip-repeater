# React Native 的 ProGuard 規則
-keepclassmembers class com.facebook.react.** { *; }
-keep class com.facebook.react.modules.** { *; }
-keep class com.facebook.react.uimanager.** { *; }

# React Native 影片播放器的規則
-keep class com.brentvatne.react.** { *; }

# 保留 JavaScript 介面
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# 移除調試日誌
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
}

# 保留應用程式元件名稱
-keep public class com.cliprepeater.MainActivity
-keep public class com.cliprepeater.MainApplication 