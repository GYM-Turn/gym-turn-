import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url

# 1. Cargar variables de entorno
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# --- SEGURIDAD ---
SECRET_KEY = os.getenv('SECRET_KEY', 'clave-secreta-de-emergencia-123')

# En Railway, la variable DEBUG debe ser False en producción
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'

# Configuración de Hosts permitidos
ALLOWED_HOSTS = [
    'gym-turn-production.up.railway.app', # Tu dominio de Railway
    'localhost', 
    '127.0.0.1',
    '*' 
]

# --- NUEVA CONFIGURACIÓN CSRF Y COOKIES ---
# Esto permite que el admin de Django funcione en Railway
CSRF_TRUSTED_ORIGINS = [
    'https://gym-turn-production.up.railway.app',
    'https://gym-turn-omega.vercel.app',
]

# Seguridad de cookies para producción
if not DEBUG:
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SAMESITE = 'None'
    SESSION_COOKIE_SAMESITE = 'None'

# --- APLICACIONES ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'usuarios',
    'reservas',
    'clases',
    'pagos',
    'rest_framework',
    "corsheaders", 
]

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
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'LionGoldenFitness.wsgi.application'

# --- BASE DE DATOS (POSTGRESQL) ---
# Usamos la base de datos de Railway configurada por variable de entorno
DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL', 'postgres://postgres:Lafiesta@localhost:5432/gym_db'),
        conn_max_age=600
    )
}

# --- INTERNACIONALIZACIÓN ---
LANGUAGE_CODE = 'es-ar'
TIME_ZONE = 'America/Argentina/Buenos_Aires'
USE_I18N = True
USE_TZ = True

# --- ARCHIVOS ESTÁTICOS Y MEDIA ---
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Configuración de WhiteNoise para servir estáticos en producción
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# MEDIA CONFIGURATION
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# --- CONFIGURACIÓN DE TAMAÑO DE CARGA ---
DATA_UPLOAD_MAX_MEMORY_SIZE = 10485760 
FILE_UPLOAD_MAX_MEMORY_SIZE = 10485760

# --- CONFIGURACIÓN DE CORS ---
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://.*\.vercel\.app$",
]

CORS_ALLOWED_ORIGINS = [
    "https://gym-turn-omega.vercel.app",
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'