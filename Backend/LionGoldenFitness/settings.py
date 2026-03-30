import os
from pathlib import Path
import dj_database_url
from dotenv import load_dotenv

# 🔥 IMPORTANTE: cargar .env
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# --- SEGURIDAD ---
SECRET_KEY = os.getenv('SECRET_KEY', 'fallback')
DEBUG = os.getenv('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = [
    'gym-turn-production.up.railway.app',
    'localhost',
    '127.0.0.1',
]

# --- CSRF ---
CSRF_TRUSTED_ORIGINS = [
    'https://gym-turn-production.up.railway.app',
    'https://gym-turn-omega.vercel.app',
]

# --- APPS ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',

    'cloudinary_storage',
    'django.contrib.staticfiles',
    'cloudinary',

    'usuarios',
    'reservas',
    'clases',
    'pagos',
    'rest_framework',
    'corsheaders',
]

# --- MIDDLEWARE ---
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'LionGoldenFitness.urls'

# 🔥 FIX ADMIN (este era el error)
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',  # 🔥 ESTE ES CLAVE
            ],
        },
    },
]

WSGI_APPLICATION = 'LionGoldenFitness.wsgi.application'

# --- DB (FIX REAL) ---
DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    print("✅ Usando PostgreSQL de Railway")
    DATABASES = {
        "default": dj_database_url.parse(DATABASE_URL, conn_max_age=600)
    }
else:
    print("⚠️ DATABASE_URL no encontrada → usando SQLite")
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

# --- INTERNACIONAL ---
LANGUAGE_CODE = 'es-ar'
TIME_ZONE = 'America/Argentina/Buenos_Aires'
USE_I18N = True
USE_TZ = True

# --- STATIC ---
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# --- STORAGE (Django 6 correcto) ---
STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# --- CLOUDINARY ---
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.getenv('CLOUDINARY_CLOUD_NAME'),
    'API_KEY': os.getenv('CLOUDINARY_API_KEY'),
    'API_SECRET': os.getenv('CLOUDINARY_API_SECRET'),
}

# --- MEDIA ---
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# --- CORS ---
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://.*\.vercel\.app$",
]

CORS_ALLOWED_ORIGINS = [
    "https://gym-turn-omega.vercel.app",
    "http://localhost:4200",
]

CORS_ALLOW_CREDENTIALS = True

# --- DEFAULT ---
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'