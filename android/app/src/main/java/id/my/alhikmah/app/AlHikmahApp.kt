package id.my.alhikmah.app

import android.app.Application
import com.tappx.sdk.android.Tappx

class AlHikmahApp : Application() {
    override fun onCreate() {
        super.onCreate()
        Tappx.setAppKey(this, BuildConfig.TAPPX_APP_KEY)
    }
}