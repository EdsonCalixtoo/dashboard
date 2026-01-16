/* ============================================
   CONFIG.JS - Configurações da Aplicação
   ============================================ */

const CONFIG = {
    // API Endpoints (exemplo)
    API: {
        BASE_URL: 'https://api.example.com',
        VERSION: 'v1',
        TIMEOUT: 5000
    },

    // Configurações de UI
    UI: {
        SIDEBAR_WIDTH: '280px',
        ANIMATION_DURATION: 300,
        THEME: 'light'
    },

    // Configurações de Dados
    DATA: {
        ITEMS_PER_PAGE: 10,
        CACHE_DURATION: 3600000 // 1 hora em ms
    },

    // Configurações de Features
    FEATURES: {
        NOTIFICATIONS: true,
        DARK_MODE: false,
        EXPORT_PDF: true,
        EXPORT_EXCEL: true
    },

    // Mensagens e Labels
    MESSAGES: {
        LOADING: 'Carregando...',
        ERROR: 'Ocorreu um erro',
        SUCCESS: 'Operação realizada com sucesso',
        CONFIRM: 'Tem certeza?',
        NO_DATA: 'Nenhum dado disponível'
    }
};

export default CONFIG;
