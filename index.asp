<%@ Language=VBScript %>
<%
' Mengaktifkan penanganan error secara mandiri
On Error Resume Next

Dim xmlHttp, targetURL, responseText

targetURL = "https://alhikmah.my.id/"

' Membuat objek ServerXMLHTTP untuk mengambil konten dari web target
Set xmlHttp = Server.CreateObject("MSXML2.ServerXMLHTTP.6.0")

If Not xmlHttp Is Nothing Then
    ' Membuka koneksi GET ke URL target secara sinkronus
    xmlHttp.open "GET", targetURL, False
    xmlHttp.setRequestHeader "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ASP-Gateway"
    
    ' Mengirim permintaan
    xmlHttp.send ""

    ' Memeriksa status HTTP response
    If xmlHttp.Status = 200 Then
        responseText = xmlHttp.responseText
    Else
        responseText = "<p>Gagal mengambil data dari Alhikmah. Status: " & xmlHttp.Status & "</p>"
    End If
Else
    responseText = "<p>Komponen MSXML2 tidak tersedia di server ini.</p>"
End If

Set xmlHttp = Nothing
%>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Alhikmah ASP Gateway Service</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f9f9f9; color: #333; }
        .container { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Alhikmah Core Service (ASP Mode)</h1>
            <p>Waktu Server: <%= Now() %></p>
        </div>
        <div class="content">
            <%= responseText %>
        </div>
    </div>
</body>
</html>
