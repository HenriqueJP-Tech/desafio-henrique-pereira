class CaixaDaLanchonete {
  constructor() {
    // Definindo o cardápio
    this.cardapio = {
      cafe: { descricao: 'Café', valor: 3.00 },
      chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
      suco: { descricao: 'Suco Natural', valor: 6.20 },
      sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
      queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
      salgado: { descricao: 'Salgado', valor: 7.25 },
      combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
      combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
    };

    // Definindo as formas de pagamento válidas
    this.formasDePagamentoValidas = ['dinheiro', 'debito', 'credito'];
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (!this.formasDePagamentoValidas.includes(formaDePagamento)) {
      return 'Forma de pagamento inválida!';
    }

    if (!itens || itens.length === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    let valorTotal = 0;
    let temItemPrincipal = false;

    for (const item of itens) {
      const [codigo, quantidade] = item.split(',');

      if (!this.cardapio[codigo]) {
        return 'Item inválido!';
      }

      if (!this.cardapio[codigo].descricao.includes('(extra') && !temItemPrincipal) {
        temItemPrincipal = true;
      }

      valorTotal += this.cardapio[codigo].valor * parseInt(quantidade);
    }

    if (!temItemPrincipal) {
      return 'Não há itens principais no carrinho de compra!';
    }

    if (formaDePagamento === 'dinheiro') {
      valorTotal *= 0.95; // Aplicando desconto de 5% para pagamento em dinheiro
    } else if (formaDePagamento === 'credito') {
      valorTotal *= 1.03; // Acréscimo de 3% para pagamento em crédito
    }

    return `R$ ${valorTotal.toFixed(2)}`;
  }
}

// Exemplo de uso
const caixa = new CaixaDaLanchonete();

console.log(caixa.calcularValorDaCompra('debito', ['chantily,1'])); // "Item extra não pode ser pedido sem o principal"
console.log(caixa.calcularValorDaCompra('debito', ['cafe,1','chantily,1'])); // "R$ 4,50"
console.log(caixa.calcularValorDaCompra('credito', ['combo1,1','cafe,2'])); // "R$ 15,96"
