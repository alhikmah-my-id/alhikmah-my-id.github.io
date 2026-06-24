# Stage 1: Build & Execution Environment
FROM python:3.10-slim

# Set working directory di dalam kontainer
WORKDIR /app

# Instal dependensi sistem yang diperlukan (GCC untuk C/C++, Git, dan curl)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Salin file requirements atau instal library Python langsung
RUN pip install --no-cache-dir requests beautifulsoup4 GitPython

# Salin seluruh file proyek dari lokal ke dalam kontainer
COPY . .

# Berikan hak akses eksekusi jika diperlukan
RUN chmod +x scraper.py

# Env variable untuk memastikan output python langsung muncul di log
ENV PYTHONUNBUFFERED=1

# Perintah utama saat kontainer dijalankan (menjalankan Python Scraper)
CMD ["python", "scraper.py"]
