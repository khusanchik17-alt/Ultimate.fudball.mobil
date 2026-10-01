package com.ufmstudio.ultimatefootball;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

/**
 * Single-activity shell that hosts the WebGL game inside a WebView.
 *
 * The whole game ships as static assets in `android/assets/www`, so the shell
 * only has to:
 *   - create a hardware accelerated, fullscreen WebView,
 *   - load index.html from the APK,
 *   - forward the hardware back button to the game's UI router,
 *   - expose a tiny JavaScript bridge for saves and haptics.
 *
 * Deliberately written with plain framework APIs (no AndroidX) and Java 8
 * syntax so it builds on every supported Gradle/AGP combination.
 */
public class MainActivity extends Activity {

    private static final String TAG = "UltimateFootball";
    private static final String GAME_URL = "file:///android_asset/www/index.html";
    private static final long DOUBLE_BACK_MS = 2200L;

    private WebView webView;
    private long lastBackPress = 0L;
    private boolean pageLoaded = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        getWindow().setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        webView = new WebView(this);
        webView.setLayoutParams(new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
        webView.setBackgroundColor(0xFF050B14);
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        webView.setVerticalScrollBarEnabled(false);
        webView.setHorizontalScrollBarEnabled(false);
        webView.setLongClickable(false);
        webView.setHapticFeedbackEnabled(false);

        configureSettings(webView.getSettings());
        webView.setWebViewClient(new GameWebViewClient());
        webView.setWebChromeClient(new GameChromeClient());
        webView.addJavascriptInterface(new NativeBridge(this), "UFMNative");

        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(0xFF050B14);
        root.addView(webView);
        setContentView(root);

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
            pageLoaded = true;
        } else {
            webView.loadUrl(GAME_URL);
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void configureSettings(WebSettings settings) {
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(false);
        settings.setLoadsImagesAutomatically(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setTextZoom(100);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            settings.setOffscreenPreRaster(true);
        }
    }

    /** Keeps every navigation inside the packaged assets. */
    private class GameWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            if (url != null && url.startsWith("file://")) {
                return false;
            }
            Log.i(TAG, "blocked external navigation: " + url);
            return true;
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            pageLoaded = true;
            Log.i(TAG, "game loaded: " + url);
        }
    }

    /** Surfaces JS console output in logcat, which makes device debugging easy. */
    private class GameChromeClient extends WebChromeClient {
        @Override
        public boolean onConsoleMessage(ConsoleMessage message) {
            if (message == null) {
                return false;
            }
            String text = message.message() + " @" + message.lineNumber() + " (" + message.sourceId() + ")";
            switch (message.messageLevel()) {
                case ERROR:
                    Log.e(TAG, text);
                    break;
                case WARNING:
                    Log.w(TAG, text);
                    break;
                default:
                    Log.i(TAG, text);
                    break;
            }
            return true;
        }
    }

    private void enterImmersiveMode() {
        Window window = getWindow();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.setDecorFitsSystemWindows(false);
            WindowInsetsController controller = window.getInsetsController();
            if (controller != null) {
                controller.hide(WindowInsets.Type.systemBars());
                controller.setSystemBarsBehavior(
                        WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            }
        } else {
            window.getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            enterImmersiveMode();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) {
            webView.onResume();
            webView.resumeTimers();
            webView.evaluateJavascript("window.UFMPause && window.UFMPause(false);", null);
        }
        enterImmersiveMode();
    }

    @Override
    protected void onPause() {
        if (webView != null) {
            webView.evaluateJavascript("window.UFMPause && window.UFMPause(true);", null);
            webView.onPause();
        }
        super.onPause();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        if (webView != null) {
            webView.saveState(outState);
        }
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.removeJavascriptInterface("UFMNative");
            webView.loadUrl("about:blank");
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }

    /**
     * The game owns the navigation stack. Anything the game does not consume
     * (menu back at the root) exits after a confirming double press.
     */
    @Override
    public void onBackPressed() {
        if (webView == null || !pageLoaded) {
            super.onBackPressed();
            return;
        }
        webView.evaluateJavascript(
                "(function(){try{return !!(window.UFM && window.UFM.onBackPressed());}catch(e){return false;}})()",
                new ValueCallback<String>() {
                    @Override
                    public void onReceiveValue(String value) {
                        boolean handled = value != null && value.contains("true");
                        if (handled) {
                            return;
                        }
                        long now = System.currentTimeMillis();
                        if (now - lastBackPress < DOUBLE_BACK_MS) {
                            finish();
                        } else {
                            lastBackPress = now;
                            webView.evaluateJavascript(
                                    "window.UFM && window.UFM.toast && window.UFM.toast('again');", null);
                        }
                    }
                });
    }
}
