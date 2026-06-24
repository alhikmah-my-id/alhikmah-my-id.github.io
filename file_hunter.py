import os

# Folder repositori hasil clone (sesuaikan dengan folder Anda)
TARGET_DIR = "./alhikmah_repo"

# Ekstensi file yang ingin dicari
EXTENSIONS = ('.go', '.rb', '.c', '.cpp', '.cc', '.cs')

def cari_file_coding(direktori):
    print(f"Mencari file coding di dalam folder: {direktori}\n")
    
    Target_ditemukan = False
    
    # Berjalan menyusuri semua folder dan sub-folder
    for root, dirs, files in os.walk(direktori):
        for file in files:
            if file.endswith(EXTENSIONS):
                target_ditemukan = True
                path_lengkap = os.path.join(root, file)
                print(f"Found: {file} -> {path_lengkap}")
                
    if not target_ditemukan:
        print("Tidak ditemukan file Go, Ruby, C, C++, atau C# di folder ini.")

if __name__ == "__main__":
    # Pastikan folder target ada sebelum menjalankan skrip
    if os.path.exists(TARGET_DIR):
        cari_file_coding(TARGET_DIR)
    else:
        print(f"Folder {TARGET_DIR} tidak ditemukan. Silakan jalankan 'git_manager.py' terlebih dahulu.")
