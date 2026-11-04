# ALHIKMAH ProGuard Rules
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable
-keep class id.my.alhikmah.app.** { *; }
-keep class com.tappx.** { *; }
-keep class com.google.gson.** { *; }
-dontwarn okhttp3.**
-dontwarn okio.**
-dontwarn com.tappx.**