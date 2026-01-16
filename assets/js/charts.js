/* ============================================
   CHARTS.JS - Gerenciamento de Gráficos
   ============================================ */

/**
 * Classe para renderizar gráficos simples na dashboard
 * Utiliza elementos HTML e CSS para criar visualizações
 */
class Charts {
    /**
     * Renderiza gráfico de barras/colunas
     * @param {string} elementId - ID do elemento container
     * @param {Array} data - Array com dados {label, value}
     * @param {string} type - Tipo: 'bar' ou 'column'
     */
    static renderBarChart(elementId, data, type = 'bar') {
        const container = document.getElementById(elementId);
        if (!container) return;

        container.innerHTML = '';

        // Encontra valor máximo para proporção
        const maxValue = Math.max(...data.map(d => d.value));

        // Cria barras
        data.forEach((item, index) => {
            const percentage = (item.value / maxValue) * 100;
            const colors = [
                '#2563eb', '#1e40af', '#3b82f6', '#60a5fa', '#93c5fd'
            ];
            const color = colors[index % colors.length];

            const barWrapper = document.createElement('div');
            barWrapper.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                flex: 1;
            `;

            const bar = document.createElement('div');
            bar.style.cssText = `
                width: 100%;
                height: ${percentage}%;
                background: linear-gradient(135deg, ${color}, ${this.lightenColor(color)});
                border-radius: 8px 8px 0 0;
                cursor: pointer;
                transition: all 0.3s ease;
                min-height: 20px;
                position: relative;
                display: flex;
                align-items: flex-end;
                justify-content: center;
                padding-bottom: 4px;
                color: white;
                font-size: 12px;
                font-weight: 600;
            `;

            bar.addEventListener('mouseenter', function() {
                this.style.opacity = '0.8';
                this.style.transform = 'scaleY(1.05)';
            });

            bar.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
                this.style.transform = 'scaleY(1)';
            });

            bar.textContent = Utils.formatNumber(item.value);

            const label = document.createElement('p');
            label.style.cssText = `
                font-size: 12px;
                color: #666;
                text-align: center;
                width: 100%;
                word-break: break-word;
            `;
            label.textContent = item.label;

            barWrapper.appendChild(bar);
            barWrapper.appendChild(label);
            container.appendChild(barWrapper);
        });
    }

    /**
     * Renderiza gráfico de pizza
     * @param {string} elementId - ID do elemento container
     * @param {Array} data - Array com dados {label, value, color}
     */
    static renderPieChart(elementId, data) {
        const container = document.getElementById(elementId);
        if (!container) return;

        container.innerHTML = '';
        container.style.cssText = 'display: flex; gap: 30px; align-items: center;';

        // Calcula total
        const total = data.reduce((sum, item) => sum + item.value, 0);

        // Cria SVG para pie chart
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '200');
        svg.setAttribute('height', '200');
        svg.setAttribute('viewBox', '0 0 200 200');

        let currentAngle = -90; // Começa no topo

        data.forEach((item, index) => {
            const percentage = item.value / total;
            const sliceAngle = percentage * 360;
            const endAngle = currentAngle + sliceAngle;

            const color = item.color || this.getColorByIndex(index);
            const slice = this.createPieSlice(100, 100, 80, currentAngle, endAngle, color);
            svg.appendChild(slice);

            currentAngle = endAngle;
        });

        container.appendChild(svg);

        // Cria legenda
        const legend = document.createElement('div');
        legend.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';

        data.forEach((item, index) => {
            const color = item.color || this.getColorByIndex(index);
            const legendItem = document.createElement('div');
            legendItem.style.cssText = 'display: flex; align-items: center; gap: 8px; font-size: 14px;';

            const colorBox = document.createElement('div');
            colorBox.style.cssText = `
                width: 16px;
                height: 16px;
                background-color: ${color};
                border-radius: 3px;
            `;

            const label = document.createElement('span');
            const percentage = ((item.value / total) * 100).toFixed(1);
            label.textContent = `${item.label}: ${percentage}%`;

            legendItem.appendChild(colorBox);
            legendItem.appendChild(label);
            legend.appendChild(legendItem);
        });

        container.appendChild(legend);
    }

    /**
     * Renderiza gráfico de linha
     * @param {string} elementId - ID do elemento container
     * @param {Array} data - Array com dados {label, value}
     */
    static renderLineChart(elementId, data) {
        const container = document.getElementById(elementId);
        if (!container) return;

        container.innerHTML = '';
        container.style.cssText = `
            position: relative;
            height: 300px;
            display: flex;
            align-items: flex-end;
            gap: 15px;
            padding: 20px;
        `;

        const maxValue = Math.max(...data.map(d => d.value));
        const points = [];

        data.forEach((item, index) => {
            const percentage = (item.value / maxValue) * 100;

            // Cria ponto
            const point = document.createElement('div');
            point.style.cssText = `
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            `;

            const bar = document.createElement('div');
            bar.style.cssText = `
                width: 100%;
                height: ${percentage}%;
                background: linear-gradient(180deg, #2563eb, #1e40af);
                border-radius: 8px 8px 0 0;
                cursor: pointer;
                transition: all 0.3s ease;
                min-height: 30px;
                position: relative;
            `;

            bar.addEventListener('mouseenter', function() {
                this.style.opacity = '0.8';
                this.style.transform = 'translateY(-5px)';
            });

            bar.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
                this.style.transform = 'translateY(0)';
            });

            const label = document.createElement('p');
            label.style.cssText = `
                font-size: 12px;
                color: #666;
                text-align: center;
                width: 100%;
            `;
            label.textContent = item.label;

            point.appendChild(bar);
            point.appendChild(label);
            container.appendChild(point);
            points.push({ element: point, value: item.value });
        });
    }

    /**
     * Cria um slice de pizza SVG
     * @private
     */
    static createPieSlice(cx, cy, radius, startAngle, endAngle, color) {
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = cx + radius * Math.cos(startRad);
        const y1 = cy + radius * Math.sin(startRad);
        const x2 = cx + radius * Math.cos(endRad);
        const y2 = cy + radius * Math.sin(endRad);

        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute(
            'd',
            `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
        );
        path.setAttribute('fill', color);
        path.setAttribute('stroke', 'white');
        path.setAttribute('stroke-width', '2');
        path.style.cursor = 'pointer';
        path.style.transition = 'all 0.3s ease';

        path.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.filter = 'drop-shadow(0 0 10px rgba(0,0,0,0.2))';
        });

        path.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
            this.style.filter = 'drop-shadow(0 0 0px rgba(0,0,0,0))';
        });

        return path;
    }

    /**
     * Obtém cor por índice
     * @private
     */
    static getColorByIndex(index) {
        const colors = [
            '#2563eb', '#1e40af', '#3b82f6', '#60a5fa',
            '#f59e0b', '#ef4444', '#10b981', '#8b5cf6'
        ];
        return colors[index % colors.length];
    }

    /**
     * Clareia uma cor hex
     * @private
     */
    static lightenColor(color) {
        const hex = color.replace('#', '');
        const r = Math.min(255, Math.floor(parseInt(hex.substr(0, 2), 16) * 1.2));
        const g = Math.min(255, Math.floor(parseInt(hex.substr(2, 2), 16) * 1.2));
        const b = Math.min(255, Math.floor(parseInt(hex.substr(4, 2), 16) * 1.2));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
}

// Exporta a classe
window.Charts = Charts;
