# Dashboard

Uma dashboard que comecei um tempo atrás para estudar e praticar. Sempre gostei de entender como as coisas funcionam por baixo, então fiz tudo com vanilla JavaScript.

## O que tem aqui

Dashboard com as seções básicas: um overview com KPIs e gráficos, análises de dados, gerenciamento de usuários, alguns relatórios e configurações. Nada de super complexo, mas serve pra entender melhor como estruturar um projeto maior.

## Rodando

Bem direto. Abre o `index.html` no navegador e pronto.

## Estrutura

```
Dashboard/
├── index.html           # A página principal
├── assets/
│   ├── css/
│   │   ├── style.css        # Estilos principais
│   │   └── responsive.css   # Responsividade
│   └── js/
│       ├── config.js    # Configurações
│       ├── utils.js     # Funções úteis
│       ├── charts.js    # Gráficos
│       ├── data.js      # Dados de exemplo
│       ├── ui.js        # Interface
│       └── app.js       # App principal
```

### Funcionalidades

**Dashboard**
- Cards com alguns KPIs
- Gráfico de vendas
- Gráfico de categorias
- Lista de atividades

**Análises**
- Gráfico de conversão
- Tráfego por dispositivo
- Filtros

**Usuários**
- Tabela com dados

**Relatórios**
- Cards com relatórios

**Configurações**
- Notificações
- Algumas opções

## Responsividade

Funciona bem em mobile, tablet e desktop.

## Customização

As cores estão em variáveis CSS em `style.css`.

Os dados estão em `data.js`.

Se quiser adicionar uma seção nova, é só copiar uma existente, mudar o id e adicionar o link no menu.

## Organização do Código

Separei em módulos:

- **config.js**: Configurações
- **utils.js**: Funções reutilizáveis
- **charts.js**: Renderização de gráficos
- **data.js**: Dados
- **ui.js**: Interface e navegação
- **app.js**: Inicialização

## Debug

Abre o console do navegador (F12) e digita `App.showDebugInfo()`. Mostra informações de tudo que tá rodando.

## Debug

Abre o console do navegador (F12) e digita `App.showDebugInfo()` pra ver informações.

## Dados

Os dados são fictícios por enquanto. Não tem integração com API ainda.

## Notas

Esse projeto foi bom pra aprender melhor sobre modularização em JavaScript. Provavelmente não vou desenvolver muito mais, mas deixa como está. Pode ser útil como referência.
