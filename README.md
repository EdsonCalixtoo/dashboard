# 📊 Dashboard Profissional

Uma dashboard moderna e responsiva desenvolvida com **HTML, CSS e JavaScript puro**, demonstrando código bem organizado e profissional.

## 🎯 Características

- ✅ **Totalmente Responsivo** - Funciona em desktop, tablet e mobile
- ✅ **Design Moderno** - Interface limpa e profissional
- ✅ **Código Bem Organizado** - Separação clara de concerns
- ✅ **Gráficos Interativos** - Gráficos de barras, pizza e linha
- ✅ **Modo Mobile First** - Design otimizado para todos os dispositivos
- ✅ **Sem Dependências Externas** - 100% vanilla JavaScript
- ✅ **Acessível** - Segue boas práticas de acessibilidade
- ✅ **Performance** - Otimizado para velocidade

## 📁 Estrutura do Projeto

```
Dashboard/
│
├── index.html                 # Arquivo HTML principal
│
├── assets/
│   ├── css/
│   │   ├── style.css         # Estilos principais
│   │   └── responsive.css    # Estilos responsivos
│   │
│   ├── js/
│   │   ├── config.js         # Configurações da aplicação
│   │   ├── utils.js          # Funções utilitárias
│   │   ├── charts.js         # Gerenciamento de gráficos
│   │   ├── data.js           # Dados de exemplo
│   │   ├── ui.js             # Gerenciamento da interface
│   │   └── app.js            # Arquivo principal
│   │
│   └── images/               # Imagens da aplicação
│
└── README.md                  # Documentação
```

## 🚀 Como Usar

### Instalação

1. Clone ou baixe o projeto
2. Abra `index.html` no seu navegador
3. Pronto! A dashboard está funcionando

Não há dependências externas para instalar.

### Primeiro Acesso

- Veja a dashboard principal com KPIs e gráficos
- Navegue pelos diferentes seções usando o menu lateral
- Interaja com os gráficos (hover para ver detalhes)
- Teste em diferentes tamanhos de tela (redimensione o navegador)

## 📚 Documentação dos Arquivos

### HTML (index.html)

Estrutura semântica completa com:
- Sidebar de navegação
- Header com busca e perfil
- Seções de conteúdo
- Dados carregados dinamicamente

### CSS (assets/css/)

**style.css** - Estilos principais:
- Sistema de cores com variáveis CSS
- Layout flexbox e grid
- Animações e transições
- Componentes reutilizáveis

**responsive.css** - Design responsivo:
- Mobile first approach
- Breakpoints: 768px e 480px
- Modo landscape
- Estilos de impressão

### JavaScript Modular

#### config.js
Configurações centralizadas:
```javascript
const CONFIG = {
    API: { ... },
    UI: { ... },
    DATA: { ... },
    FEATURES: { ... },
    MESSAGES: { ... }
};
```

#### utils.js
Funções utilitárias:
- Formatação de datas e moedas
- Validações
- Cookies
- Requisições HTTP
- Debounce/Throttle
- Logging

```javascript
Utils.formatCurrency(45230)        // R$ 45.230,00
Utils.formatDate(new Date())       // 16/01/2026
Utils.getTimeAgo(date)             // há 5 minutos
Utils.isValidEmail(email)          // true/false
```

#### charts.js
Sistema de gráficos:
- Gráficos de barras
- Gráficos de pizza
- Gráficos de linha
- Totalmente interativos

```javascript
Charts.renderBarChart('elementId', data);
Charts.renderPieChart('elementId', data);
Charts.renderLineChart('elementId', data);
```

#### data.js
Dados de exemplo:
- Vendas mensais
- Distribuição por categoria
- Análise de conversão
- Tráfego por dispositivo
- Usuários
- Atividades
- Relatórios

#### ui.js
Gerenciamento da interface:
- Navegação entre seções
- Renderização de componentes
- Interatividade
- Notificações toast

```javascript
UI.init()                          // Inicializa a interface
UI.switchSection('dashboard')      // Muda de seção
UI.showToast('Sucesso!')          // Mostra notificação
```

#### app.js
Aplicação principal:
- Inicialização
- Global listeners
- Verificação de navegador
- Carregamento de configurações
- Métodos auxiliares

```javascript
const app = new App();
app.init();
app.getStats();
app.exportToCSV(data);
```

## 🎨 Esquema de Cores

```
Primária:    #2563eb (Azul)
Secundária:  #1e40af (Azul Escuro)
Accent:      #f59e0b (Âmbar)
Sucesso:     #10b981 (Verde)
Erro:        #ef4444 (Vermelho)
```

## 📱 Responsividade

### Desktop (>= 1024px)
- Sidebar fixo
- Layout completo
- Todos os elementos visíveis

### Tablet (768px - 1023px)
- Sidebar reduzido
- Grid 2 colunas
- Ajustes de espaçamento

### Mobile (< 768px)
- Sidebar mobile (drawer)
- Grid 1 coluna
- Menu hamburger
- Navegação otimizada

### Extra Small (< 480px)
- Ajustes finos
- Texto reduzido
- Padding otimizado

## 🔧 Customização

### Alterar Cores

Edite `assets/css/style.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    /* ... */
}
```

### Adicionar Seção

1. Adicione no HTML:
```html
<section id="nova-secao" class="section">
    <!-- Conteúdo -->
</section>
```

2. Adicione nav link:
```html
<a href="#" class="nav-link" data-section="nova-secao">
    <i class="icon">📌</i> Nova Seção
</a>
```

3. Adicione titulo em `ui.js`:
```javascript
const titles = {
    // ...
    'nova-secao': 'Nova Seção'
};
```

### Integrar com API

Substitua dados em `data.js` com chamadas reais:
```javascript
async function loadData() {
    const data = await Utils.fetch('https://api.example.com/data');
    return data;
}
```

## 🔒 Segurança

- Sem dados sensíveis no código
- Validações de entrada
- XSS protection
- CSRF safe (em produção, use tokens)

## ⚡ Performance

- Minificar CSS e JS em produção
- Lazy loading de imagens
- Cache de dados
- Debounce de eventos

## 🌐 Navegadores Suportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 8+)

## 📊 Dados Exemplo

Os dados são fictícios e servem apenas como exemplo. Para dados reais, altere `assets/js/data.js` ou integre uma API.

## 🤝 Contribuições

Para melhorias ou sugestões, sinta-se livre para fazer modificações!

## 📝 Licença

Projeto de demonstração profissional. Use livremente.

## 👨‍💻 Autor

Dashboard desenvolvida como exemplo de código bem organizado e profissional para apresentações em empresas.

---

**Desenvolvido com ❤️ em JavaScript puro**

Para debug, abra o console e digite: `App.showDebugInfo()`
