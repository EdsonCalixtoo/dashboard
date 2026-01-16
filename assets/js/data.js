/* ============================================
   DATA.JS - Dados de Exemplo da Dashboard
   ============================================ */

/**
 * Objeto com dados de exemplo para a dashboard
 * Em produção, esses dados viriam de uma API
 */
const DATA = {
    // Vendas mensais (últimos 6 meses)
    monthlySales: [
        { label: 'Janeiro', value: 32000 },
        { label: 'Fevereiro', value: 28500 },
        { label: 'Março', value: 41000 },
        { label: 'Abril', value: 35800 },
        { label: 'Maio', value: 45230 },
        { label: 'Junho', value: 48900 }
    ],

    // Distribuição por categoria
    categoryDistribution: [
        { label: 'Eletrônicos', value: 35, color: '#2563eb' },
        { label: 'Roupas', value: 25, color: '#1e40af' },
        { label: 'Alimentos', value: 20, color: '#f59e0b' },
        { label: 'Livros', value: 15, color: '#10b981' },
        { label: 'Outros', value: 5, color: '#8b5cf6' }
    ],

    // Análise de conversão
    conversionData: [
        { label: 'Visitantes', value: 125000 },
        { label: 'Adicionados ao Carrinho', value: 45000 },
        { label: 'Checkout Iniciado', value: 15000 },
        { label: 'Compra Finalizada', value: 12400 }
    ],

    // Tráfego por dispositivo
    deviceTraffic: [
        { label: 'Desktop', value: 55, color: '#2563eb' },
        { label: 'Mobile', value: 35, color: '#1e40af' },
        { label: 'Tablet', value: 10, color: '#f59e0b' }
    ],

    // Usuários da plataforma
    users: [
        {
            id: 1,
            name: 'João Silva',
            email: 'joao.silva@email.com',
            status: 'Ativo',
            joined: '2025-08-15'
        },
        {
            id: 2,
            name: 'Maria Santos',
            email: 'maria.santos@email.com',
            status: 'Ativo',
            joined: '2025-09-20'
        },
        {
            id: 3,
            name: 'Pedro Costa',
            email: 'pedro.costa@email.com',
            status: 'Inativo',
            joined: '2025-07-10'
        },
        {
            id: 4,
            name: 'Ana Oliveira',
            email: 'ana.oliveira@email.com',
            status: 'Ativo',
            joined: '2025-10-05'
        },
        {
            id: 5,
            name: 'Lucas Martins',
            email: 'lucas.martins@email.com',
            status: 'Ativo',
            joined: '2025-11-12'
        }
    ],

    // Atividades recentes
    activities: [
        {
            id: 1,
            icon: '💳',
            title: 'Novo pedido de R$ 2.450',
            description: 'Cliente: João Silva',
            timestamp: new Date(Date.now() - 5 * 60000) // 5 minutos atrás
        },
        {
            id: 2,
            icon: '👥',
            title: '5 novos usuários cadastrados',
            description: 'Crescimento de 2.3%',
            timestamp: new Date(Date.now() - 2 * 3600000) // 2 horas atrás
        },
        {
            id: 3,
            icon: '⚠️',
            title: 'Estoque baixo detectado',
            description: 'Produto: Eletrônico X-100',
            timestamp: new Date(Date.now() - 1 * 3600000) // 1 hora atrás
        },
        {
            id: 4,
            icon: '📈',
            title: 'Vendas mensais aumentaram',
            description: '+15% em relação ao mês anterior',
            timestamp: new Date(Date.now() - 24 * 3600000) // 1 dia atrás
        },
        {
            id: 5,
            icon: '✅',
            title: 'Backup concluído com sucesso',
            description: 'Sistema de dados atualizado',
            timestamp: new Date(Date.now() - 48 * 3600000) // 2 dias atrás
        }
    ],

    // Relatórios disponíveis
    reports: [
        {
            id: 1,
            title: 'Relatório de Vendas',
            description: 'Análise completa das vendas do período',
            date: '2025-01-15',
            icon: '📊'
        },
        {
            id: 2,
            title: 'Relatório de Clientes',
            description: 'Informações sobre comportamento dos clientes',
            date: '2025-01-14',
            icon: '👥'
        },
        {
            id: 3,
            title: 'Relatório de Estoque',
            description: 'Movimentação e disponibilidade de produtos',
            date: '2025-01-13',
            icon: '📦'
        },
        {
            id: 4,
            title: 'Relatório Financeiro',
            description: 'Análise de receitas e despesas',
            date: '2025-01-12',
            icon: '💰'
        },
        {
            id: 5,
            title: 'Relatório de Marketing',
            description: 'Desempenho de campanhas e ROI',
            date: '2025-01-11',
            icon: '📢'
        },
        {
            id: 6,
            title: 'Relatório de Performance',
            description: 'Métricas de desempenho do sistema',
            date: '2025-01-10',
            icon: '⚡'
        }
    ]
};

// Exporta os dados
window.DATA = DATA;
