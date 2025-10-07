# PageLoader Component

Un composant de chargement moderne et personnalisable pour HRNet.

## Utilisation

```jsx
import PageLoader from './components/PageLoader';

// Utilisation basique
<PageLoader />

// Avec taille personnalisée
<PageLoader size="small" />
<PageLoader size="large" />

// Avec message personnalisé
<PageLoader message="Loading employees..." />

// Sur fond clair (ex: dans une modale)
<PageLoader lightBackground={true} />

// Combinaison des props
<PageLoader size="large" message="Initializing application..." />
```

## Props

| Prop | Type | Valeur par défaut | Description |
|------|------|-------------------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Taille du loader |
| `message` | `string` | `'Loading...'` | Message affiché sous le spinner |
| `lightBackground` | `boolean` | `false` | Optimise les couleurs pour un fond clair |

## Variantes de taille

- **small** : 40x40px, pour les petites zones de chargement
- **medium** : 60x60px, taille standard pour la plupart des cas
- **large** : 80x80px, pour les chargements de page complète

## Fonctionnalités d'accessibilité

- Support du mode sombre automatique
- Respecte les préférences de mouvement réduit (`prefers-reduced-motion`)
- Support du mode haute contraste
- Animations fluides et optimisées

## Exemples d'usage

### Chargement de page (Suspense)

```jsx
<Suspense fallback={<PageLoader size="large" message="Loading page..." />}>
  <MyComponent />
</Suspense>
```

### Chargement de données

```jsx
{isLoading && (
  <PageLoader
    size="small"
    message="Fetching data..."
  />
)}
```

### Chargement modal

```jsx
<Modal>
  <PageLoader message="Processing..." />
</Modal>
```