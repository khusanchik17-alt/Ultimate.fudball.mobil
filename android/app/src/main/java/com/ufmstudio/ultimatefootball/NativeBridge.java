package com.ufmstudio.ultimatefootball;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.os.VibratorManager;
import android.webkit.JavascriptInterface;

/**
 * Small JavaScript bridge exposed to the game as `window.UFMNative`.
 *
 * Saves are mirrored into SharedPreferences, so progress survives even if the
 * WebView storage is cleared by the system ("Clear data" only wipes both).
 */
public class NativeBridge {

    private static final String PREFS = "ufm_progress";
    private static final String KEY_SAVE = "save_json";
    private static final String KEY_SETTINGS = "settings_json";

    private final Activity activity;
    private final SharedPreferences prefs;

    public NativeBridge(Activity activity) {
        this.activity = activity;
        this.prefs = activity.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    private SharedPreferences.Editor editor() {
        return prefs.edit();
    }

    // ------------------------------------------------------------------ saves
    @JavascriptInterface
    public void saveProgress(final String json) {
        if (json == null) {
            return;
        }
        editor().putString(KEY_SAVE, json).apply();
    }

    @JavascriptInterface
    public String loadSave() {
        return prefs.getString(KEY_SAVE, null);
    }

    @JavascriptInterface
    public void clearSave() {
        editor().remove(KEY_SAVE).apply();
    }

    // --------------------------------------------------------------- settings
    @JavascriptInterface
    public void saveSettings(final String json) {
        if (json == null) {
            return;
        }
        editor().putString(KEY_SETTINGS, json).apply();
    }

    @JavascriptInterface
    public String loadSettings() {
        return prefs.getString(KEY_SETTINGS, null);
    }

    // ----------------------------------------------------------------- device
    @JavascriptInterface
    public void vibrate(final int milliseconds) {
        int duration = milliseconds <= 0 ? 20 : Math.min(milliseconds, 200);
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                VibratorManager manager =
                        (VibratorManager) activity.getSystemService(Context.VIBRATOR_MANAGER_SERVICE);
                if (manager == null) {
                    return;
                }
                Vibrator vibrator = manager.getDefaultVibrator();
                if (vibrator != null && vibrator.hasVibrator()) {
                    vibrator.vibrate(VibrationEffect.createOneShot(duration, VibrationEffect.DEFAULT_AMPLITUDE));
                }
            } else {
                Vibrator vibrator = (Vibrator) activity.getSystemService(Context.VIBRATOR_SERVICE);
                if (vibrator != null && vibrator.hasVibrator()) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        vibrator.vibrate(VibrationEffect.createOneShot(duration, VibrationEffect.DEFAULT_AMPLITUDE));
                    } else {
                        vibrator.vibrate(duration);
                    }
                }
            }
        } catch (Exception error) {
            // vibration is a nicety - never crash the game over it
        }
    }

    @JavascriptInterface
    public int deviceApiLevel() {
        return Build.VERSION.SDK_INT;
    }

    @JavascriptInterface
    public String deviceModel() {
        return Build.MANUFACTURER + " " + Build.MODEL;
    }

    @JavascriptInterface
    public String appVersion() {
        return "1.0.0";
    }

    @JavascriptInterface
    public void exitApp() {
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                activity.finish();
            }
        });
    }
}
