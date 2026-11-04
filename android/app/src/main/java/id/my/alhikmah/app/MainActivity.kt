package id.my.alhikmah.app

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.tappx.sdk.android.TappxInterstitial
import com.tappx.sdk.android.TappxInterstitialListener
import id.my.alhikmah.app.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var interstitial: TappxInterstitial

    private val tappxKeys = listOf(
        "pub-65263-android-0300",
        "pub-57747-android-0996",
        "pub-60567-android-4416",
        "pub-65262-android-8892",
        "pub-79956-android-6297",
        "pub-79955-android-5582"
    )
    private var keyIndex = 0

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupWebView()
        setupSwipeRefresh()
        setupTappx()

        binding.webView.loadUrl(BuildConfig.SITE_URL)
    }

    private fun setupWebView() {
        binding.webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            cacheMode = WebSettings.LOAD_DEFAULT
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            mediaPlaybackRequiresUserGesture = false
            loadWithOverviewMode = true
            useWideViewPort = true
        }

        binding.webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                return false
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                binding.swipeRefresh.isRefreshing = false
            }
        }

        binding.webView.webChromeClient = WebChromeClient()
    }

    private fun setupSwipeRefresh() {
        binding.swipeRefresh.setOnRefreshListener {
            binding.webView.reload()
        }
    }

    private fun setupTappx() {
        interstitial = TappxInterstitial(this, currentTappxKey())
        interstitial.setListener(object : TappxInterstitialListener {
            override fun onInterstitialLoaded() {
                interstitial.show()
            }

            override fun onInterstitialLoadFailed(reason: String?) {
                rotateTappxKey()
            }

            override fun onInterstitialClicked() {}
            override fun onInterstitialShown() {}
            override fun onInterstitialDismissed() {
                rotateTappxKey()
            }
        })
        interstitial.load()
    }

    private fun currentTappxKey(): String = tappxKeys[keyIndex % tappxKeys.size]

    private fun rotateTappxKey() {
        keyIndex = (keyIndex + 1) % tappxKeys.size
    }

    override fun onBackPressed() {
        if (binding.webView.canGoBack()) {
            binding.webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}