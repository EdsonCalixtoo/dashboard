/* ============================================
   APP.JS - Arquivo Principal da Aplicação
   ============================================ */

/**
 * Classe principal que coordena toda a aplicação
 * Responsável pela inicialização e gerenciamento global
 */
class App {
    constructor() {
        this.name = 'Dashboard Profissional';
        this.version = '1.0.0';
        this.isReady = false;

        Utils.log('APP', `${this.name} v${this.version} carregando...`);
    }

    /**
     * Inicializa a aplicação
     */
    async init() {
        try {
            // 1. Verifica suporte do navegador
            this.checkBrowserSupport();

            // 2. Carrega configurações
            this.loadSettings();

            // 3. Inicializa interface
            UI.init();

            // 4. Setup de listeners globais
            this.setupGlobalListeners();

            // 5. Marca como pronto
            this.isReady = true;

            Utils.log('APP', '✅ Aplicação inicializada com sucesso!');
            UI.showToast('Dashboard carregada com sucesso', 'success');
        } catch (error) {
            Utils.error('APP', error);
            UI.showToast('Erro ao carregar a dashboard', 'error');
        }
    }

    /**
     * Verifica suporte do navegador
     */
    checkBrowserSupport() {
        const requiredFeatures = [
            { name: 'fetch', check: typeof fetch !== 'undefined' },
            { name: 'localStorage', check: typeof localStorage !== 'undefined' },
            { name: 'Promise', check: typeof Promise !== 'undefined' },
        ];

        const unsupported = requiredFeatures.filter(f => !f.check);

        if (unsupported.length > 0) {
            Utils.warn('APP', `Recursos não suportados: ${unsupported.map(f => f.name).join(', ')}`);
        }

        Utils.log('APP', `✓ Navegador: ${this.getBrowserInfo()}`);
    }

    /**
     * Obtém informações do navegador
     */
    getBrowserInfo() {
        const ua = navigator.userAgent;
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Outro navegador';
    }

    /**
     * Carrega configurações salvas
     */
    loadSettings() {
        // Carrega preferência de notificações
        const notifications = Utils.getCookie('notifications');
        if (notifications !== null) {
            const checkbox = document.getElementById('notifications');
            if (checkbox) {
                checkbox.checked = notifications === 'true';
            }
        }

        // Carrega preferência de dark mode
        const darkMode = Utils.getCookie('darkMode');
        if (darkMode !== null) {
            const checkbox = document.getElementById('darkMode');
            if (checkbox) {
                checkbox.checked = darkMode === 'true';
            }
        }

        Utils.log('APP', '✓ Configurações carregadas');
    }

    /**
     * Configura listeners globais
     */
    setupGlobalListeners() {
        // Detecta mudança de tamanho de tela
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 300));

        // Detecta mudança de visibilidade da página
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                Utils.log('APP', 'Página oculta');
            } else {
                Utils.log('APP', 'Página visível');
            }
        });

        // Evita saída acidental da página
        window.addEventListener('beforeunload', (e) => {
            // Descomentar se necessário
            // e.preventDefault();
            // e.returnValue = '';
        });

        // Log de erros globais
        window.addEventListener('error', (e) => {
            Utils.error('APP', `Erro global: ${e.message}`);
        });

        // Detecta mudanças de conexão
        window.addEventListener('online', () => {
            Utils.log('APP', '🌐 Conexão restaurada');
            UI.showToast('Conexão restaurada', 'success');
        });

        window.addEventListener('offline', () => {
            Utils.log('APP', '🚫 Sem conexão');
            UI.showToast('Você está offline', 'error');
        });

        Utils.log('APP', '✓ Global listeners configurados');
    }

    /**
     * Trata redimensionamento de tela
     */
    handleResize() {
        const width = window.innerWidth;
        Utils.log('APP', `Tamanho da tela: ${width}px`);

        // Ajusta comportamento conforme tamanho
        if (width < 768) {
            document.querySelector('.sidebar').classList.remove('open');
        }
    }

    /**
     * Faz logout
     */
    logout() {
        if (confirm('Deseja fazer logout?')) {
            Utils.log('APP', 'Usuário fazendo logout');
            Utils.deleteCookie('notifications');
            Utils.deleteCookie('darkMode');
            alert('Logout realizado com sucesso');
        }
    }

    /**
     * Exporta dados para CSV
     */
    exportToCSV(data, filename = 'export.csv') {
        try {
            // Converte dados para CSV
            const headers = Object.keys(data[0]);
            const csv = [
                headers.join(','),
                ...data.map(row => headers.map(h => row[h]).join(','))
            ].join('\n');

            // Cria arquivo
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            Utils.log('APP', `Dados exportados: ${filename}`);
            UI.showToast('Arquivo exportado com sucesso', 'success');
        } catch (error) {
            Utils.error('APP', error);
            UI.showToast('Erro ao exportar arquivo', 'error');
        }
    }

    /**
     * Atualiza dados em tempo real (simulado)
     */
    simulateRealTimeUpdate() {
        setInterval(() => {
            // Aqui você poderia fazer requisições ao servidor
            // ou atualizar dados em tempo real
            console.log('Verificando atualizações...');
        }, 30000); // A cada 30 segundos

        Utils.log('APP', '✓ Real-time updates ativado');
    }

    /**
     * Obtém estatísticas da aplicação
     */
    getStats() {
        return {
            appName: this.name,
            version: this.version,
            isReady: this.isReady,
            browser: this.getBrowserInfo(),
            timestamp: new Date().toISOString(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            storage: {
                localStorage: localStorage.length,
                cookies: document.cookie.split(';').length
            }
        };
    }

    /**
     * Mostra informações de debug
     */
    showDebugInfo() {
        const stats = this.getStats();
        console.table(stats);
        return stats;
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

// Aguarda DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {
    // Cria instância da aplicação
    const app = new App();

    // Inicializa
    app.init();

    // Expõe globalmente para debug
    window.App = app;

    // Log inicial
    console.clear();
    console.log('%cDashboard Profissional v1.0.0', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%cCódigo bem organizado e profissional', 'color: #10b981; font-size: 14px;');
    console.log('%cDigite "App.showDebugInfo()" no console para ver informações', 'color: #f59e0b; font-size: 12px;');
});

// Exporta a classe
window.App = App;
