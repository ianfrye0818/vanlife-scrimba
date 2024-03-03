import { Timestamp } from 'firebase/firestore';
import { Order } from '../types/Order';
import { calculateNumberOfDays } from './calculateNumberOfDays';

export default class IncomeCalculations {
  //total sales
  static getTotalSales(transactions: Order[]) {
    return transactions.reduce((acc, transaction) => acc + transaction.total, 0);
  }

  //total vans sold
  static getNumberOfVansSold(transactions: Order[]) {
    return transactions.length;
  }

  //total nights rented
  static getTotalNightsSold(transactions: Order[]) {
    return transactions.reduce((acc, transaction) => {
      return (
        acc +
        calculateNumberOfDays(
          transaction.datesReserved[0] as Timestamp,
          transaction.datesReserved[1] as Timestamp
        )
      );
    }, 0);
  }

  //transactions last 30 days
  static getTransactionsLastThirtyDays(transactions: Order[]) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return transactions.filter((transaction) => transaction.createdAt.toDate() > thirtyDaysAgo);
  }

  //total sales last 30 days
  static getTotalSalesLastThirtyDays(transactions: Order[]) {
    return this.getTransactionsLastThirtyDays(transactions).reduce(
      (acc, transaction) => acc + transaction.total,
      0
    );
  }

  //total vans sold last 30 days
  static getNumberOfVansSoldLastThirtyDays(transactions: Order[]) {
    return this.getTransactionsLastThirtyDays(transactions).length;
  }

  //total nights rented last 30 days
  static getTotalNightsSoldLastThirtyDays(transactions: Order[]) {
    return this.getTransactionsLastThirtyDays(transactions).reduce((acc, transaction) => {
      return (
        acc +
        calculateNumberOfDays(
          transaction.datesReserved[0] as Timestamp,
          transaction.datesReserved[1] as Timestamp
        )
      );
    }, 0);
  }

  //sold by van
  static getVansSoldByVan(transactions: Order[]) {
    return transactions.reduce((acc, transaction) => {
      const vanName = transaction.vanOrdered.vanName as string;

      const nightsRented = calculateNumberOfDays(
        transaction.datesReserved[0] as Timestamp,
        transaction.datesReserved[1] as Timestamp
      );

      if (!acc[vanName]) {
        acc[vanName] = {
          numSold: 1,
          totalSales: transaction.total,
          totalNights: nightsRented,
        };
      } else {
        acc[vanName].numSold++;
        acc[vanName].totalSales += transaction.total;
        acc[vanName].totalNights += nightsRented;
      }
      return acc;
    }, {} as { [key: string]: { numSold: number; totalSales: number; totalNights: number } });
  }

  //sold by van last 30 days
  static getVansSoldByVanLastThirtyDays(transactions: Order[]) {
    return this.getTransactionsLastThirtyDays(transactions).reduce((acc, transaction) => {
      const vanName = transaction.vanOrdered.vanName as string;

      const nightsRented = calculateNumberOfDays(
        transaction.datesReserved[0] as Timestamp,
        transaction.datesReserved[1] as Timestamp
      );

      if (!acc[vanName]) {
        acc[vanName] = {
          numSold: 1,
          totalSales: transaction.total,
          totalNights: nightsRented,
        };
      } else {
        acc[vanName].numSold++;
        acc[vanName].totalSales += transaction.total;
        acc[vanName].totalNights += nightsRented;
      }
      return acc;
    }, {} as { [key: string]: { numSold: number; totalSales: number; totalNights: number } });
  }

  //percentages
  //percentage of total sales by van
  static getPercentageOfTotalSalesByVan(transactions: Order[]) {
    const vansSoldByVan = this.getVansSoldByVan(transactions);
    const totalSales = this.getTotalSales(transactions);
    return Object.keys(vansSoldByVan).reduce((acc, vanName) => {
      acc[vanName] = (vansSoldByVan[vanName].totalSales / totalSales) * 100;
      return acc;
    }, {} as { [key: string]: number });
  }

  //percentage of total sales by van last 30 days
  static getPercentageOfTotalSalesByVanLastThirtyDays(transactions: Order[]) {
    const vansSoldByVan = this.getVansSoldByVanLastThirtyDays(transactions);
    const totalSales = this.getTotalSalesLastThirtyDays(transactions);
    return Object.keys(vansSoldByVan).reduce((acc, vanName) => {
      acc[vanName] = (vansSoldByVan[vanName].totalSales / totalSales) * 100;
      return acc;
    }, {} as { [key: string]: number });
  }

  //percentage of total nights by van
  static getPercentageOfTotalNightsByVan(transactions: Order[]) {
    const vansSoldByVan = this.getVansSoldByVan(transactions);
    const totalNights = this.getTotalNightsSold(transactions);
    return Object.keys(vansSoldByVan).reduce((acc, vanName) => {
      acc[vanName] = (vansSoldByVan[vanName].totalNights / totalNights) * 100;
      return acc;
    }, {} as { [key: string]: number });
  }

  //percentage of total nights by van last 30 days
  static getPercentageOfTotalNightsByVanLastThirtyDays(transactions: Order[]) {
    const vansSoldByVan = this.getVansSoldByVanLastThirtyDays(transactions);
    const totalNights = this.getTotalNightsSoldLastThirtyDays(transactions);
    return Object.keys(vansSoldByVan).reduce((acc, vanName) => {
      acc[vanName] = (vansSoldByVan[vanName].totalNights / totalNights) * 100;
      return acc;
    }, {} as { [key: string]: number });
  }

  //percentage increase in total
  static getPercentageIncreaseInTotal(transactions: Order[]) {
    const totalSales = this.getTotalSales(transactions);
    const totalNights = this.getTotalNightsSold(transactions);
    const totalSalesLastThirtyDays = this.getTotalSalesLastThirtyDays(transactions);
    const totalNightsLastThirtyDays = this.getTotalNightsSoldLastThirtyDays(transactions);
    return {
      sales: ((totalSales - totalSalesLastThirtyDays) / totalSalesLastThirtyDays) * 100,
      nights: ((totalNights - totalNightsLastThirtyDays) / totalNightsLastThirtyDays) * 100,
    };
  }

  //percentage increase in total sales
  static getPercentageIncreaseInTotalSales(transactions: Order[]) {
    const totalSales = this.getTotalSales(transactions);
    const totalSalesLastThirtyDays = this.getTotalSalesLastThirtyDays(transactions);
    return ((totalSales - totalSalesLastThirtyDays) / totalSalesLastThirtyDays) * 100;
  }

  //averages
  //average sales per transaction
  static getAverageSalesPerTransaction(transactions: Order[]) {
    return this.getTotalSales(transactions) / transactions.length;
  }

  //average nights rented per transaction
  static getAverageNightsRentedPerTransaction(transactions: Order[]) {
    return this.getTotalNightsSold(transactions) / transactions.length;
  }

  //average sales per van
  static getAverageSalesPerVan(transactions: Order[]) {
    const vansSoldByVan = this.getVansSoldByVan(transactions);
    return Object.keys(vansSoldByVan).reduce((acc, vanName) => {
      acc[vanName] = vansSoldByVan[vanName].totalSales / vansSoldByVan[vanName].numSold;
      return acc;
    }, {} as { [key: string]: number });
  }

  //average nights rented per van
  static getAverageNightsRentedPerVan(transactions: Order[]) {
    const vansSoldByVan = this.getVansSoldByVan(transactions);
    return Object.keys(vansSoldByVan).reduce((acc, vanName) => {
      acc[vanName] = vansSoldByVan[vanName].totalNights / vansSoldByVan[vanName].numSold;
      return acc;
    }, {} as { [key: string]: number });
  }

  //total customers
  static getTotalCustomers(transactions: Order[]) {
    return transactions.reduce((acc, transaction) => {
      if (!acc.includes(transaction.customerInfo.id)) {
        acc.push(transaction.customerInfo.id);
      }
      return acc;
    }, [] as string[]).length;
  }
}
