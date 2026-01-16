/* ============================================
   UTILS.JS - Funções Utilitárias
   ============================================ */

/**
 * Classe com funções utilitárias para manipulação de dados
 * e operações comuns
 */
class Utils {
    /**
     * Formata número para formato de moeda brasileira
     * @param {number} value - Valor a ser formatado
     * @returns {string} - Valor formatado
     */
    static formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    /**
     * Formata data no padrão brasileiro
     * @param {Date|string} date - Data a ser formatada
     * @returns {string} - Data formatada
     */
    static formatDate(date) {
        const d = new Date(date);
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(d);
    }

    /**
     * Formata data e hora
     * @param {Date|string} date - Data a ser formatada
     * @returns {string} - Data e hora formatada
     */
    static formatDateTime(date) {
        const d = new Date(date);
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(d);
    }

    /**
     * Calcula tempo relativo (ex: "há 5 minutos")
     * @param {Date|string} date - Data a ser comparada
     * @returns {string} - Tempo relativo
     */
    static getTimeAgo(date) {
        const d = new Date(date);
        const now = new Date();
        const seconds = Math.floor((now - d) / 1000);

        if (seconds < 60) return 'agora';
        if (seconds < 3600) return `há ${Math.floor(seconds / 60)}m`;
        if (seconds < 86400) return `há ${Math.floor(seconds / 3600)}h`;
        if (seconds < 604800) return `há ${Math.floor(seconds / 86400)}d`;

        return this.formatDate(d);
    }

    /**
     * Formata número com separadores
     * @param {number} value - Número a ser formatado
     * @param {number} decimals - Casas decimais (padrão: 0)
     * @returns {string} - Número formatado
     */
    static formatNumber(value, decimals = 0) {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value);
    }

    /**
     * Capitaliza primeira letra de uma string
     * @param {string} str - String a ser capitalizada
     * @returns {string} - String capitalizada
     */
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Remove espaços em branco
     * @param {string} str - String a processar
     * @returns {string} - String sem espaços
     */
    static trim(str) {
        return str.trim();
    }

    /**
     * Gera ID único
     * @returns {string} - ID único
     */
    static generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Delay assíncrono
     * @param {number} ms - Milissegundos
     * @returns {Promise} - Promise que resolve após delay
     */
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Faz requisição HTTP (fetch wrapper)
     * @param {string} url - URL da requisição
     * @param {Object} options - Opções do fetch
     * @returns {Promise} - Response JSON
     */
    static async fetch(url, options = {}) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

    /**
     * Debounce para funções
     * @param {Function} func - Função a ser executada
     * @param {number} wait - Tempo de espera em ms
     * @returns {Function} - Função debounced
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle para funções
     * @param {Function} func - Função a ser executada
     * @param {number} limit - Intervalo em ms
     * @returns {Function} - Função throttled
     */
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Valida email
     * @param {string} email - Email a validar
     * @returns {boolean} - Email válido
     */
    static isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Cria cookie
     * @param {string} name - Nome do cookie
     * @param {string} value - Valor do cookie
     * @param {number} days - Dias até expiração
     */
    static setCookie(name, value, days = 7) {
        const d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    /**
     * Obtém valor de cookie
     * @param {string} name - Nome do cookie
     * @returns {string|null} - Valor do cookie
     */
    static getCookie(name) {
        const nameEQ = `${name}=`;
        const cookies = document.cookie.split(';');
        for (let c of cookies) {
            c = c.trim();
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length);
            }
        }
        return null;
    }

    /**
     * Deleta cookie
     * @param {string} name - Nome do cookie
     */
    static deleteCookie(name) {
        this.setCookie(name, '', -1);
    }

    /**
     * Log formatado para desenvolvimento
     * @param {string} category - Categoria do log
     * @param {*} data - Dados a logar
     */
    static log(category, data) {
        console.log(`%c[${category}]`, 'color: #2563eb; font-weight: bold;', data);
    }

    /**
     * Aviso formatado para desenvolvimento
     * @param {string} category - Categoria do aviso
     * @param {*} data - Dados do aviso
     */
    static warn(category, data) {
        console.warn(`%c[${category}]`, 'color: #f59e0b; font-weight: bold;', data);
    }

    /**
     * Erro formatado para desenvolvimento
     * @param {string} category - Categoria do erro
     * @param {*} data - Dados do erro
     */
    static error(category, data) {
        console.error(`%c[${category}]`, 'color: #ef4444; font-weight: bold;', data);
    }
}

// Exporta a classe
window.Utils = Utils;
