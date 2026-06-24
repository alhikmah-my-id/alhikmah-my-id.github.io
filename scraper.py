import requests
from bs4 import BeautifulSoup

# URL Target
url = "https://alhikmah.my.id/"

def ambil_data_situs(url):
    try:
        # Mengirim permintaan ke situs
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Mengambil Judul Halaman Utama
            print(f"=== Judul Situs: {soup.title.text} ===\n")
            
            # Mengambil semua link yang ada di halaman utama
            print("Daftar Link di Halaman Utama:")
            links = soup.find_all('a')
            for index, link in enumerate(links[:15], 1): # Batasi 15 link pertama
                href = link.get('href')
                text = link.text.strip()
                if href:
                    print(f"{index}. {text} -> {href}")
        else:
            print(f"Gagal mengakses situs. Status code: {response.status_code}")
            
    except Exception as e:
        print(f"Terjadi kesalahan: {e}")

if __name__ == "__main__":
    ambil_data_situs(url)
