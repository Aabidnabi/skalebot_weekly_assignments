class Investment {
  constructor(symbol, shares, purchasePrice) {
    this.symbol = symbol.toUpperCase();
    this.shares = shares;
    this.purchasePrice = purchasePrice;
  }

  calculateValue(currentPrice) {
    return this.shares * currentPrice;
  }
}

class Portfolio {
  constructor(owner) {
    this.owner = owner;
    this.holdings = [];
    this.lastUpdated = new Date();
  }

  addInvestment(symbol, shares, price) {
    const newInvestment = new Investment(symbol, shares, price);
    this.holdings.push(newInvestment);
    return this;
  }

  getPortfolioSummary(marketData) {
    let totalValue = 0;
    let totalCost = 0;

    const summary = this.holdings.map((stock) => {
      const { symbol, shares, purchasePrice } = stock;
      const currentPrice = marketData[symbol] || purchasePrice;
      const currentValue = stock.calculateValue(currentPrice);
      const costBasis = shares * purchasePrice;

      totalValue += currentValue;
      totalCost += costBasis;

      return {
        symbol,
        currentValue,
        profit: currentValue - costBasis,
      };
    });

    const totalProfit = totalValue - totalCost;

    return {
      owner: this.owner,
      holdings: summary,
      totalValue,
      totalProfit,
      performance: totalCost > 0 ? (totalProfit / totalCost) * 100 : 0,
    };
  }
}

// Mock Data Example
const myMarketData = { AAPL: 185.5, GOOGL: 142.2, TSLA: 240.1 };
const myPortfolio = new Portfolio('Alex Developer');

myPortfolio
  .addInvestment('AAPL', 10, 150.0)
  .addInvestment('GOOGL', 5, 120.0)
  .addInvestment('TSLA', 2, 280.0);

const report = myPortfolio.getPortfolioSummary(myMarketData);

console.log(`Portfolio Report for: ${report.owner}`);
console.log('-------------------------------------');
report.holdings.forEach((item) => {
  console.log(
    `${item.symbol}: $${item.currentValue.toFixed(2)} (Profit: $${item.profit.toFixed(2)})`,
  );
});
console.log('-------------------------------------');
console.log(`Total Value: $${report.totalValue.toFixed(2)}`);
console.log(`Performance: ${report.performance.toFixed(2)}%`);
