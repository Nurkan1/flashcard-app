# 📚 Flashcard Study App

Una aplicación web interactiva para crear y estudiar flashcards con animación 3D flip.

## ✨ Características

- 🎯 **Crear Decks** - Organiza tus tarjetas por temas
- 📝 **Gestión de Tarjetas** - Añade preguntas y respuestas fácilmente
- 🔄 **Modo de Estudio** - Animación 3D flip para practicar
- 💾 **Persistencia Local** - Tus datos se guardan automáticamente
- 📱 **Responsive Design** - Funciona perfectamente en móviles
- 🎨 **UI Moderna** - Diseño limpio con Tailwind CSS

## 🚀 Instalación Rápida

### Prerrequisitos
- Node.js 16+ 
- NPM (viene con Node.js)

### Pasos
1. Clona este repositorio
```bash
git clone https://github.com/Nurkan1/flashcard-app.git
cd flashcard-app
```

2. Instala dependencias
```bash
npm install
```

3. Inicia la aplicación
```bash
npm run dev
```

4. Abre `http://localhost:5173` en tu navegador

## 🎮 Cómo Usar

1. **Crear tu Primer Deck**
   - Haz clic en "Create Your First Deck"
   - Añade un título y descripción

2. **Añadir Tarjetas**
   - Ve a "Manage" en tu deck
   - Haz clic en "Add Card"
   - Escribe pregunta y respuesta

3. **Estudiar**
   - Haz clic en "Study This Deck"
   - Usa la animación flip para ver respuestas
   - Califica tu progreso con Correct/Incorrect

## 🛠️ Tecnologías

- **React 18** - Framework frontend
- **Vite** - Build tool y desarrollo rápido
- **Tailwind CSS** - Framework CSS
- **React Router** - Navegación
- **Lucide React** - Iconos
- **LocalStorage** - Persistencia de datos

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── context/       # Estado global (DeckContext)
├── pages/         # Páginas principales
└── App.jsx        # Componente principal
```

## 🎯 Funcionalidades Principales

- ✅ Crear y eliminar decks
- ✅ Añadir y eliminar tarjetas
- ✅ Modo de estudio con puntuación
- ✅ Animación 3D flip cards
- ✅ Persistencia automática
- ✅ Diseño responsive
- ✅ Navegación intuitiva

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! 

1. Fork este repositorio
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

*Hecho con ❤️ usando React, Vite y Tailwind CSS*
