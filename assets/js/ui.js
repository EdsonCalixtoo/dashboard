/* ============================================
   UI.JS - Gerenciamento da Interface
   ============================================ */

/**
 * Classe para gerenciar eventos e interações da UI
 */
class UI {
    /**
     * Inicializa todos os listeners de eventos
     */
    static init() {
        this.setupNavigation();
        this.setupSidebar();
        this.setupSearch();
        this.setupCharts();
        this.setupActivityList();
        this.setupUsersTable();
        this.setupReports();
        this.setupSettings();

        Utils.log('UI', 'Interface inicializada com sucesso');
    }

    /**
     * Configura navegação entre seções
     */
    static setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove classe active de todos
                navLinks.forEach(l => l.classList.remove('active'));
                // Adiciona ao clicado
                link.classList.add('active');

                // Obtém seção
                const sectionId = link.getAttribute('data-section');
                this.switchSection(sectionId);

                // Fecha sidebar em mobile
                if (window.innerWidth < 768) {
                    document.querySelector('.sidebar').classList.remove('open');
                }
            });
        });
    }

    /**
     * Muda seção ativa
     */
    static switchSection(sectionId) {
        // Oculta todas as seções
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.classList.remove('active'));

        // Mostra seção selecionada
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
        }

        // Atualiza título da página
        const titles = {
            dashboard: 'Dashboard',
            analytics: 'Análises',
            users: 'Gerenciar Usuários',
            reports: 'Relatórios',
            settings: 'Configurações'
        };

        document.getElementById('pageTitle').textContent = titles[sectionId] || 'Dashboard';
        document.getElementById('breadcrumb').textContent = titles[sectionId] || 'Início';
    }

    /**
     * Configura sidebar mobile
     */
    static setupSidebar() {
        const toggleBtn = document.getElementById('toggleSidebar');
        const sidebar = document.querySelector('.sidebar');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });

            // Fecha ao clicar fora
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.sidebar') && !e.target.closest('.toggle-sidebar')) {
                    sidebar.classList.remove('open');
                }
            });
        }
    }

    /**
     * Configura busca
     */
    static setupSearch() {
        const searchInput = document.getElementById('searchInput');

        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => {
                const query = e.target.value.toLowerCase();
                Utils.log('SEARCH', `Busca: ${query}`);
                // Implementar lógica de busca
            }, 300));
        }
    }

    /**
     * Renderiza gráficos
     */
    static setupCharts() {
        // Gráfico de vendas mensais
        Charts.renderBarChart('lineChart', DATA.monthlySales, 'bar');

        // Gráfico de pizza
        Charts.renderPieChart('pieChart', DATA.categoryDistribution);

        // Gráfico de conversão
        Charts.renderBarChart('conversionChart', DATA.conversionData, 'bar');

        // Gráfico de dispositivos
        Charts.renderPieChart('deviceChart', DATA.deviceTraffic);

        Utils.log('CHARTS', 'Gráficos renderizados');
    }

    /**
     * Renderiza lista de atividades
     */
    static setupActivityList() {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;

        activityList.innerHTML = '';

        DATA.activities.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';

            const icon = document.createElement('div');
            icon.className = 'activity-icon';
            icon.textContent = activity.icon;

            const content = document.createElement('div');
            content.className = 'activity-content';

            const title = document.createElement('p');
            title.className = 'activity-title';
            title.textContent = activity.title;

            const time = document.createElement('p');
            time.className = 'activity-time';
            time.textContent = Utils.getTimeAgo(activity.timestamp);

            content.appendChild(title);
            content.appendChild(time);

            activityItem.appendChild(icon);
            activityItem.appendChild(content);

            activityList.appendChild(activityItem);
        });

        Utils.log('ACTIVITY', `${DATA.activities.length} atividades carregadas`);
    }

    /**
     * Renderiza tabela de usuários
     */
    static setupUsersTable() {
        const usersTableBody = document.getElementById('usersTableBody');
        if (!usersTableBody) return;

        usersTableBody.innerHTML = '';

        DATA.users.forEach(user => {
            const row = document.createElement('tr');

            const statusClass = user.status === 'Ativo' ? 'status-active' : 'status-inactive';
            const statusBadge = `<span class="status-badge ${statusClass}">${user.status}</span>`;

            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${statusBadge}</td>
                <td>${Utils.formatDate(user.joined)}</td>
                <td>
                    <button class="btn-secondary" onclick="UI.editUser(${user.id})" style="padding: 6px 12px; font-size: 14px;">✏️ Editar</button>
                    <button class="btn-secondary" onclick="UI.deleteUser(${user.id})" style="padding: 6px 12px; font-size: 14px; margin-left: 4px;">🗑️ Deletar</button>
                </td>
            `;

            usersTableBody.appendChild(row);
        });

        Utils.log('USERS', `${DATA.users.length} usuários carregados`);
    }

    /**
     * Renderiza relatórios
     */
    static setupReports() {
        const reportsGrid = document.getElementById('reportsGrid');
        if (!reportsGrid) return;

        reportsGrid.innerHTML = '';

        DATA.reports.forEach(report => {
            const reportCard = document.createElement('div');
            reportCard.className = 'report-card';
            reportCard.style.cursor = 'pointer';

            reportCard.innerHTML = `
                <div style="font-size: 2.5rem; margin-bottom: 12px;">${report.icon}</div>
                <h4 class="report-title">${report.title}</h4>
                <p class="report-description">${report.description}</p>
                <p class="report-date">Gerado em ${Utils.formatDate(report.date)}</p>
            `;

            reportCard.addEventListener('click', () => {
                this.openReport(report.id);
            });

            reportsGrid.appendChild(reportCard);
        });

        Utils.log('REPORTS', `${DATA.reports.length} relatórios carregados`);
    }

    /**
     * Configura seção de configurações
     */
    static setupSettings() {
        const notificationsCheckbox = document.getElementById('notifications');
        const darkModeCheckbox = document.getElementById('darkMode');

        if (notificationsCheckbox) {
            notificationsCheckbox.addEventListener('change', (e) => {
                Utils.setCookie('notifications', e.target.checked);
                Utils.log('SETTINGS', `Notificações: ${e.target.checked}`);
            });
        }

        if (darkModeCheckbox) {
            darkModeCheckbox.addEventListener('change', (e) => {
                Utils.setCookie('darkMode', e.target.checked);
                Utils.log('SETTINGS', `Dark Mode: ${e.target.checked}`);
            });
        }
    }

    /**
     * Abre um relatório
     */
    static openReport(reportId) {
        const report = DATA.reports.find(r => r.id === reportId);
        if (report) {
            alert(`Abrindo relatório: ${report.title}`);
            Utils.log('REPORT', `Relatório #${reportId} aberto`);
        }
    }

    /**
     * Edita usuário
     */
    static editUser(userId) {
        const user = DATA.users.find(u => u.id === userId);
        if (user) {
            alert(`Editando usuário: ${user.name}`);
            Utils.log('USER', `Usuário #${userId} editando`);
        }
    }

    /**
     * Deleta usuário
     */
    static deleteUser(userId) {
        if (confirm('Tem certeza que deseja deletar este usuário?')) {
            const user = DATA.users.find(u => u.id === userId);
            if (user) {
                alert(`Usuário ${user.name} deletado`);
                Utils.log('USER', `Usuário #${userId} deletado`);
            }
        }
    }

    /**
     * Mostra notificação toast
     */
    static showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 16px 24px;
            background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
            z-index: 2000;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Exporta a classe
window.UI = UI;
