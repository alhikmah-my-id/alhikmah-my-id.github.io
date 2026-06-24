import os
from git import Repo

REPO_URL = "https://github.com/alhikmah-my-id/alhikmah-my-id.github.io.git"
LOCAL_DIR = "./alhikmah_repo"

def kelola_repositori():
    # 1. Clone repositori jika belum ada di lokal
    if not os.path.exists(LOCAL_DIR):
        print(f"Sedang meng-clone repositori ke {LOCAL_DIR}...")
        Repo.clone_from(REPO_URL, LOCAL_DIR)
        print("Clone selesai!")
    else:
        print("Repositori sudah ada di lokal. Melakukan Pull untuk update terbaru...")
        repo = Repo(LOCAL_DIR)
        origin = repo.remotes.origin
        origin.pull()
        print("Update (Pull) selesai!")

    # 2. Contoh membuat atau mengubah file di dalam repo
    file_path = os.path.join(LOCAL_DIR, "update_log.txt")
    with open(file_path, "a") as f:
        f.write("Update otomatis via Python Script.\n")
    print("File log berhasil diperbarui di lokal.")

if __name__ == "__main__":
    kelola_repositori()
