# Configuración de Firebase

## Pasos para configurar Firebase en el proyecto

### 1. Crear proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear proyecto"
3. Dale un nombre al proyecto (ej: "consultorio-virtual-diana")
4. Sigue los pasos del asistente

### 2. Habilitar Autenticación

1. En la consola de Firebase, ve a "Authentication"
2. Haz clic en "Get started"
3. Ve a la pestaña "Sign-in method"
4. Habilita los siguientes proveedores:

#### Google
- Habilita "Google" como proveedor
- Configura el nombre del proyecto y el correo de soporte
- Guarda los cambios

#### Email/Password
- Habilita "Email/Password" como proveedor
- Opcionalmente, habilita "Email link (passwordless sign-in)" si lo deseas
- Guarda los cambios

### 3. Configurar Firestore Database

1. Ve a "Firestore Database"
2. Haz clic en "Create database"
3. Selecciona "Start in test mode" (para desarrollo)
4. Elige la ubicación más cercana
5. Haz clic en "Done"

### 4. Obtener configuración de la app

1. Ve a "Project settings" (ícono de engranaje)
2. En la sección "Your apps", haz clic en el ícono de web
3. Registra tu app con un nombre
4. Copia la configuración que aparece

### 5. Actualizar configuración en el código

1. Abre el archivo `src/firebase/config.ts`
2. Reemplaza la configuración de ejemplo con la tuya:

```typescript
const firebaseConfig = {
  apiKey: "tu-api-key-real",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
}
```

### 6. Configurar reglas de Firestore

En la consola de Firebase, ve a Firestore Database > Rules y actualiza las reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura a usuarios autenticados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Permitir lectura/escritura a administradores
    match /{document=**} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 7. Variables de entorno (Opcional)

Para mayor seguridad, puedes usar variables de entorno:

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Agrega las variables:

```env
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=tu-app-id
```

3. Actualiza `src/firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}
```

## Funcionalidades implementadas

### Autenticación
- ✅ Inicio de sesión con Google
- ✅ Registro con Google
- ✅ Inicio de sesión con Email y Contraseña
- ✅ Registro con Email y Contraseña
- ✅ Cierre de sesión
- ✅ Persistencia de sesión
- ✅ Validación de formularios
- ✅ Manejo de errores

### Roles de usuario
- ✅ Paciente
- ✅ Psicóloga
- ✅ Administrador

### Dashboard de paciente
- ✅ Estadísticas de consultas
- ✅ Agendar citas
- ✅ Unirse a consultas virtuales
- ✅ Historial de sesiones
- ✅ Notificaciones

### Características del sistema
- ✅ Tabs de autenticación (Email/Google)
- ✅ Validación en tiempo real
- ✅ Mostrar/ocultar contraseñas
- ✅ Confirmación de contraseña
- ✅ Términos y condiciones
- ✅ Redirección automática según rol
- ✅ Interfaz moderna y responsiva

## Próximos pasos

1. Implementar dashboard de psicóloga
2. Implementar dashboard de administrador
3. Agregar funcionalidad de video llamadas
4. Implementar sistema de mensajería
5. Agregar gestión de citas
6. Implementar notificaciones push
7. Agregar recuperación de contraseña
8. Implementar verificación de email

## Notas importantes

- Asegúrate de que el dominio de tu aplicación esté autorizado en Firebase
- Para producción, configura las reglas de Firestore apropiadamente
- Considera implementar HTTPS para producción
- Revisa las mejores prácticas de seguridad de Firebase
- La autenticación con email requiere verificación (opcional pero recomendado)
- Considera implementar rate limiting para prevenir spam
