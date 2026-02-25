# Zencode Talently – Frontend

## 🔧 Configuração do Projeto

1. Clone o repositório do frontend
2. Instale dependências:

```bash
npm install
# ou
yarn
```

3. Crie um arquivo `.env.local` na raiz com os valores:

```env
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=zencode-talenty
NEXT_PUBLIC_FIREBASE_AUTH_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SEND_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEAUSREMENT_ID

NEXT_PUBLIC_SERVER_WEB_URL=https://zentcode-backend-test.onrender.com
NEXT_PUBLIC_LOCAL_TOKEN_KEY=a74229b67ad223332cb231
NEXT_PUBLIC_LOCAL_TEMPORAL_UID=67ad223332cb23189865898
```

---

## 🔗 Base URL da API

```txt
https://zentcode-backend-test.onrender.com/
```

---

## 🔐 Autenticação

* **Login:** `/api/v1/auth_login_user` → **não requer token**
* **Demais rotas:** requer **Bearer Token** no header:

```http
Authorization: Bearer <TOKEN>
```

* Tokens devem ser armazenados no `localStorage` ou em um context para uso em requisições subsequentes.

---

## 📄 Rotas Principais

### Usuários

| Método | Endpoint                    | Descrição                                   |
| ------ | --------------------------- | ------------------------------------------- |
| POST   | `/api/v1/auth_login_user`   | Login do usuário                            |
| GET    | `/api/v1/user_find_account` | Buscar conta pelo termo (token obrigatório) |

### Candidatos

| Método | Endpoint                       | Descrição                             |
| ------ | ------------------------------ | ------------------------------------- |
| POST   | `/api/v1/candidate_create`     | Criar um candidato                    |
| POST   | `/api/v1/candidate_find_all`   | Listar todos os candidatos            |
| POST   | `/api/v1/candidate_find_one`   | Buscar candidato por termo            |
| POST   | `/api/v1/candidate_updateOne`  | Atualizar candidato                   |
| POST   | `/api/v1/candidate_destroyOne` | Remover candidato                     |
| POST   | `/api/v1/candidate_upset`      | Criar ou atualizar candidato (upsert) |

---

## 💡 Exemplo de uso com Axios

```ts
import axios from "axios";

// Recupera token do localStorage
const token = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_KEY);

const response = await axios.get(
  `${process.env.NEXT_PUBLIC_SERVER_WEB_URL}/api/v1/candidate_find_all`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

console.log(response.data);
```

---

## 🔥 Configuração do Firebase

No frontend, inicialize o Firebase usando as variáveis do `.env.local`:

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_AUTH_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SEND_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEAUSREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

## 🧩 Dicas importantes

1. **CORS:** Backend aceita requisições apenas de:

   * `http://localhost:3000`
   * `https://zencode-frontend-teste.onrender.com`
2. **Token:** use sempre `Bearer Token` nas rotas protegidas
3. **LocalStorage:** utilize `NEXT_PUBLIC_LOCAL_TOKEN_KEY` para armazenar token, `NEXT_PUBLIC_LOCAL_TEMPORAL_UID` se precisar de ID temporário
4. **Navegação entre páginas:**

   * App Router: `import { useRouter } from "next/navigation"`
   * Pages Router: `import { useRouter } from "next/router"`

---
