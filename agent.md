# agent.md : Guide de Développement Fullstack (Senior)

Ce document définit les standards de conception, d'architecture et de qualité pour l'ensemble du projet. En tant qu'agent de codage, vous devez suivre ces directives de manière stricte.

---

# 1. Principes de Design (Senior Level)

**Le code est lu 10× plus souvent qu’il n’est écrit.**

- **Lisibilité :** Un code senior est un code qui se lit comme une phrase. Pas de fonctions de plus de 20 lignes.
- **Commentaires :** Pas de commentaires évidents, mais des commentaires sur le "Pourquoi". **Tous les commentaires dans le code doivent être en anglais**.
- **Clean Code :**
  - **Meaningful Names** : Un nom (variable, fonction, classe) doit révéler son intention.
  - **SRP (Single Responsibility Principle)** : Une fonction ou un composant ne doit faire qu'une seule chose et le faire bien.
  - **DRY (Don't Repeat Yourself)** : Abstraire la logique commune. Utiliser des enums pour les valeurs partagées ou répétées.
- **YAGNI (You Ain't Gonna Need It) :** Ne pas coder de fonctionnalités inutiles à l'instant T. Ne pas casser ce qui marche si ce n'est pas nécessaire à la tâche.
- **SOLID :** Respecter les règles de conception SOLID pour la maintenabilité.

---

# 2. Frontend - React & TypeScript

## 2.1. Stack Technique

L'application est bâtie sur un environnement **Full TypeScript (Strict Mode)**.

- **Vite / React** : Framework de base et build tool.
- **Shadcn/ui** : Composants atomiques (Radix UI + Tailwind). Thémisation via `ThemeProvider`.
- **Zustand** : État global métier (Auth, UI, Panier) avec persistance.
- **TanStack Query (v5)** : Source unique de vérité pour le _Server State_ (caching, synchronisation).
- **React Router** : Routing déclaratif (Data APIs).
- **i18next** : Internationalisation via le Provider natif.

## 2.2. Architecture & Organisation (Vertical Slices)

Nous utilisons une structure par **domaine métier**.

```text
src/
├── assets/              # Ressources statiques (images, polices, global css)
├── components/
│   └── ui/              # Composants atomiques Shadcn (Button, Input, etc.)
├── config/              # Configuration i18next, env vars, constantes globales
├── features/            # Logique métier par domaine
│   └── [feature-name]/
│       ├── api/         # Custom hooks TanStack Query & services API
│       ├── components/  # Composants complexes internes à la feature
│       ├── hooks/       # Logique métier, sélecteurs Zustand, hooks "Container"
│       ├── types/       # Interfaces et types TypeScript propres à la feature
│       └── index.ts     # Facade Pattern : exporte uniquement ce qui est public
├── lib/                 # Clients configurés (queryClient, axiosInstance)
├── providers/           # Providers globaux (Auth, QueryClient, Theme, i18n)
├── routes/              # Définition des routes React Router
├── store/               # Stores Zustand transversaux (authStore, uiStore)
└── types/               # Types TypeScript globaux
```

## 2.3. Patterns de Développement

- **Container / Presenter** : Séparer strictement la logique (Hooks/Zustand/Query) des composants de rendu (Props uniquement).
- **Custom Hooks** : Toute logique métier, formatage i18n complexe ou appel API doit être encapsulé dans un hook.
- **Early Return** : Utiliser des retours anticipés pour gérer les états de chargement, d'erreur et de vide afin d'éviter l'imbrication du JSX.
- **Error Boundaries & Suspense** : Isoler les features pour qu'un crash local ne fasse pas tomber toute l'app.

## 2.4. Gestion de l'État (La Source de Vérité)

- **Zustand (Global State)** : Uniquement pour les données transversales (Auth, préférences UI, panier). Utiliser l'immutabilité et des sélecteurs.
- **TanStack Query (Server State)** : Pour tout ce qui provient de l'API. **Interdiction** de copier ces données dans Zustand.
- **Flux Réactif** : Zustand peut piloter Query (ex: un ID dans Zustand qui sert de `queryKey` pour TanStack Query).
- **Gestion des Effets** : Préférer les callbacks de Query (`onSuccess`, `onError`) pour déclencher des actions dans Zustand.

---

# 3. Backend - Fastapi

## 3.1. Structure du Projet (Separation of Concerns)

**Stack**: FastAPI + SQLModel + PostgreSQL + Alembic + TestContainers

Ce projet implémente les principes de Clean Architecture et de séparation des responsabilités :

- **api/app/core** : Contient tout ce qui est commun à plusieurs modules ou réutilisé dans plusieurs endroits (exceptions, sécurité, locales).
- **api/app/module** : Inspiré du Domain Driven Design (DDD) simplifié. Chaque module est indépendant et représente une entité métier.
- **Repository Pattern & UOW** :
  - La **route** délègue la logique métier au **Service Layer**.
  - Le **Service Layer** délègue l'interaction avec les données au **Repository**. Les erreurs sont gérées par les services.
  - **UOW (Unit of Work)** : Les opérations de commit/rollback sont centralisées dans le gestionnaire de session Asyncio. Les services flush les opérations du repository et lèvent des exceptions en cas d'erreur.
  - **Modules Isolation** : Un Service ne doit pas avoir accès au Repository d'un autre module. Deux Repository ne doivent jamais communiquer entre eux.

```text
modules/<domain>/
  endpoints.py     # FastAPI routes + dependency injection
  models.py        # SQLModel definitions (Tables)
  schemas.py       # Pydantic request/response
  repository.py    # Database access (Opérations SQL uniquement)
  service.py       # Business logic (Gestion erreurs & UOW)
```

## 3.2 Directives de Développement

- **Async/await requis** : Toutes les opérations de base de données doivent être asynchrones. Utilisez `async def`, `await`, et `AsyncSession`.
- **Gestion des erreurs** : Pour les erreurs, utiliser les classes définies dans le dossier `core/exceptions`. S'il faut créer une nouvelle exception pour être plus précis, faites-le.
- **Internationalisation** : Utilise les locales pour les messages. Si le message n'est pas dans les locales, le créer.
- **Gestion des transactions dans les tests** : Le rollback (retour arrière) est automatique ; ne faites pas de commit manuel dans le code de test, sauf si vous surchargez avec `commit=True` dans les seeds (données de test).
- **Liaisons plusieurs-à-plusieurs (many-to-many) multiples** : Utilisez explicitement `link_model=` (par exemple, `UserTeamLink`, `AtlasTeamLink`) et définissez les clés étrangères (foreign keys) directement dans les modèles de liaison.
- **Schémas Pydantic par module** : Les schémas situés dans chaque module (ex : `api/app/modules/users/schemas.py`) définissent les modèles de requête et de réponse. Utilisez `ConfigDict(from_attributes=True)` pour permettre la conversion automatique des instances SQLModel en modèles Pydantic.
- **Immuabilité** : Favoriser l'usage de schémas Pydantic "frozen" (`frozen=True`) pour les objets de configuration et de transfert de données. Toute transformation de donnée doit produire un nouvel objet plutôt que de modifier l'existant (Pattern `model_copy`).
- **Base de données** : PostgreSQL avec l'extension PostGIS, migrations de schéma gérées via Alembic.
- **Migrations** : À chaque fois qu'un modèle SQLModel est modifié, créer une migration avec la commande `make-migration`. À chaque fois qu'un modèle est créé, l'importer dans `alembic/env.py` avant de créer la migration.
- **Authentification** : Jetons JWT + schéma OAuth2 (Password flow), inscription par e-mail et support pour Google OAuth.
- **Commandes système** : Les commandes pour manipuler des containers ou gérer Alembic sont dans des **Makefiles**. Avant de lancer des commandes via un shell, toujours vérifier qu'il n'est pas possible d'utiliser une commande Make existante.

---

# 4. Stratégie de Tests (Qualité Obligatoire)

L'agent doit systématiquement générer les tests avec le code livré.

## 4.1. Tests Backend (Pytest + TestContainers)

- **Règles fondamentales** :
  - Toute logique métier → test unitaire.
  - Un test = un comportement.
  - Pas de dépendance réelle (DB, API, etc.) pour les tests unitaires.
- **Tests Unitaires (Pytest)** :
  - Cibles : `app/core/`, `app/modules/{domain}/services`.
  - Règle : Mock systématique des dépendances externes. Focus sur la logique métier.
- **Tests d'Intégration (TestClient)** :
  - Cibles : `app/module/{domain}/endpoints`.
  - Règle : Doit tester le cycle complet (Request -> Route -> Service -> Repository -> Response).
  - Setup : Utilisation de `pytest-asyncio` + **TestContainers** pour lancer des instances réelles de base de données dans Docker pendant les tests. La commande est `make launch-tests`.
  - Toujours tester l'intégralité des endpoints avec une logique poussée, notamment au niveau des relations entre entités.

## 4.2. Tests Frontend (Vitest + React Testing Library)

- **Tests Unitaires & Intégration (Standard)** :
  - Outils : **Vitest** (moteur) + **React Testing Library** (RTL) + **user-event**.
  - Pourquoi : Vitest partage la configuration de Vite, garantissant une exécution ultra-rapide et une parité totale avec le code de production.
  - Règle : Tester le rendu du point de vue de l'utilisateur (rôles ARIA, textes) plutôt que l'implémentation interne.
  - Data Mocking : Utiliser **MSW (Mock Service Worker)** pour intercepter les requêtes réseau. **Interdiction** de mocker manuellement les hooks de TanStack Query afin de tester le cycle de vie réel des données (Loading -> Success/Error).

- **Tests End-to-End (E2E)** :
  - Outil : **Playwright**.
  - Usage : Uniquement pour les parcours critiques (ex: Login flow, Checkout complet).

---

**Consigne finale pour l'Agent :**
Avant toute génération de code, assure-toi que les types (TypeScript ou Pydantic) sont rigoureux. **Tous les commentaires dans le code généré doivent être en anglais**.
