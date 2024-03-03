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

      const existingVanIndex = acc.findIndex((item) => item.vanName === vanName);
      if (existingVanIndex === -1) {
        acc.push({
          vanName,
          numSold: 1,
          totalSales: transaction.total,
          totalNights: nightsRented,
        });
      } else {
        acc[existingVanIndex].numSold++;
        acc[existingVanIndex].totalSales += transaction.total;
        acc[existingVanIndex].totalNights += nightsRented;
      }
      return acc;
    }, [] as { vanName: string; numSold: number; totalSales: number; totalNights: number }[]);
  }

  //sold by van last 30 days
  static getVansSoldByVanLastThirtyDays(transactions: Order[]) {
    return this.getTransactionsLastThirtyDays(transactions).reduce((acc, transaction) => {
      const vanName = transaction.vanOrdered.vanName as string;

      const nightsRented = calculateNumberOfDays(
        transaction.datesReserved[0] as Timestamp,
        transaction.datesReserved[1] as Timestamp
      );

      const existingVanIndex = acc.findIndex((item) => item.vanName === vanName);
      if (existingVanIndex === -1) {
        acc.push({
          vanName,
          numSold: 1,
          totalSales: transaction.total,
          totalNights: nightsRented,
        });
      } else {
        acc[existingVanIndex].numSold++;
        acc[existingVanIndex].totalSales += transaction.total;
        acc[existingVanIndex].totalNights += nightsRented;
      }
      return acc;
    }, [] as { vanName: string; numSold: number; totalSales: number; totalNights: number }[]);
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
