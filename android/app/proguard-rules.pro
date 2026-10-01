# Ultimate Football Mobile - ProGuard/R8 rules.
# The app has no reflective code paths of its own, but R8 must keep the
# JavaScript bridge intact when minification is enabled.

-keepclassmembers class com.ufmstudio.ultimatefootball.NativeBridge {
    public *;
}

-keep class com.ufmstudio.ultimatefootball.MainActivity { *; }
-keepattributes JavascriptInterface
